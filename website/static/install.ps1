# Almadar CLI Installer for Windows
# https://almadar.io
#
# Usage:
#   irm https://almadar.io/install.ps1 | iex
#   $env:ALMADAR_VERSION = "v1.0.0"; irm https://almadar.io/install.ps1 | iex
#
# Environment variables:
#   ALMADAR_INSTALL_DIR - Installation directory (default: $HOME\.almadar\bin)
#   ALMADAR_VERSION     - Version to install (default: latest)

$ErrorActionPreference = 'Stop'

# Default values
$InstallDir = if ($env:ALMADAR_INSTALL_DIR) { $env:ALMADAR_INSTALL_DIR } else { "$HOME\.almadar\bin" }
$Version = if ($env:ALMADAR_VERSION) { $env:ALMADAR_VERSION } else { "latest" }
$GitHubRepo = "almadar-io/almadar"

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Get-Platform {
    $arch = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
    switch ($arch) {
        "X64" { return "windows-x64" }
        "Arm64" { return "windows-arm64" }
        default {
            Write-ColorOutput Red "Unsupported architecture: $arch"
            exit 1
        }
    }
}

function Get-LatestVersion {
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/$GitHubRepo/releases/latest" -Headers @{ "User-Agent" = "Almadar-Installer" }
    return $response.tag_name
}

function Install-AlmadarCLI {
    $Platform = Get-Platform

    Write-ColorOutput Blue "Almadar CLI Installer"
    Write-Output ""

    # Get version
    if ($Version -eq "latest") {
        Write-Output "Fetching latest version..."
        try {
            $Version = Get-LatestVersion
        } catch {
            Write-ColorOutput Red "Failed to get latest version: $_"
            exit 1
        }
    }

    Write-Output "Platform: $Platform"
    Write-Output "Version: $Version"
    Write-Output "Install directory: $InstallDir"
    Write-Output ""

    # Construct download URL
    $Filename = "almadar-$Platform.zip"
    $DownloadUrl = "https://github.com/$GitHubRepo/releases/download/$Version/$Filename"

    # Create temp directory
    $TempDir = New-TemporaryFile | ForEach-Object { Remove-Item $_; New-Item -ItemType Directory -Path $_ }

    try {
        # Download
        Write-Output "Downloading $Filename..."
        $ZipPath = Join-Path $TempDir $Filename
        Invoke-WebRequest -Uri $DownloadUrl -OutFile $ZipPath -UseBasicParsing

        # Extract
        Write-Output "Extracting..."
        Expand-Archive -Path $ZipPath -DestinationPath $TempDir -Force

        # Install
        Write-Output "Installing to $InstallDir..."
        if (-not (Test-Path $InstallDir)) {
            New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
        }

        $ExePath = Join-Path $TempDir "almadar.exe"
        if (Test-Path $ExePath) {
            Copy-Item $ExePath -Destination $InstallDir -Force
        } else {
            # Try to find it in subdirectory
            $ExePath = Get-ChildItem -Path $TempDir -Filter "almadar.exe" -Recurse | Select-Object -First 1
            if ($ExePath) {
                Copy-Item $ExePath.FullName -Destination $InstallDir -Force
            } else {
                Write-ColorOutput Red "Could not find almadar.exe in downloaded archive"
                exit 1
            }
        }

        Write-Output ""
        Write-ColorOutput Green "Almadar CLI installed successfully!"
        Write-Output ""

        # Check if in PATH
        $CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
        if ($CurrentPath -notlike "*$InstallDir*") {
            Write-ColorOutput Yellow "Add the following to your PATH:"
            Write-Output ""
            Write-Output "  [Environment]::SetEnvironmentVariable('Path', `$env:Path + ';$InstallDir', 'User')"
            Write-Output ""
            Write-Output "Or run this command to add it automatically:"
            Write-Output ""
            Write-Output "  [Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', 'User') + ';$InstallDir', 'User')"
            Write-Output ""
        }

        Write-Output "Then run 'almadar --help' to get started."
    }
    finally {
        # Cleanup
        Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Install-AlmadarCLI
