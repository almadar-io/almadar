# Branch Protection Rules

This document describes the branch protection rules that should be configured for the `almadar-io/almadar` repository.

## Main Branch Protection

Go to **Settings > Branches > Add branch protection rule** and configure:

### Branch name pattern
```
main
```

### Protection Rules

- [x] **Require a pull request before merging**
  - [x] Require approvals: 1
  - [ ] Dismiss stale pull request approvals when new commits are pushed
  - [ ] Require review from Code Owners

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Required status checks:
    - `Validate`
    - `Build Website`
    - `Lint`

- [x] **Require conversation resolution before merging**

- [ ] **Require signed commits** (optional, enable if team uses GPG signing)

- [x] **Require linear history** (prevents merge commits, keeps history clean)

- [ ] **Include administrators** (optional, enable for stricter enforcement)

- [x] **Restrict who can push to matching branches**
  - Allow: Repository administrators only
  - This forces all changes through PRs

## How to Configure

1. Go to https://github.com/almadar-io/almadar/settings/branches
2. Click "Add branch protection rule"
3. Enter `main` as the branch name pattern
4. Configure the rules as described above
5. Click "Create" or "Save changes"

## GitHub Pages Configuration

1. Go to https://github.com/almadar-io/almadar/settings/pages
2. Under "Build and deployment":
   - Source: GitHub Actions
3. The `deploy-website.yml` workflow will handle deployments automatically

## Secrets Required

No secrets are currently required for the CI/CD workflows.

Future secrets (when CLI binaries are added):
- `NPM_TOKEN` - For publishing to npm
- `HOMEBREW_TAP_TOKEN` - For updating Homebrew formula
