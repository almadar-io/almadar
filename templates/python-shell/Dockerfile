# ===========================================
# Orbital Python Shell - Dockerfile
# ===========================================
# Multi-stage build for Cloud Run deployment

# Build stage
FROM python:3.11-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy project files (src needed for setuptools to find packages)
COPY pyproject.toml ./
COPY src/ ./src/

# Install dependencies (including torch CPU-only for smaller image)
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir . --extra-index-url https://download.pytorch.org/whl/cpu

# Production stage
FROM python:3.11-slim

WORKDIR /app

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy application code
COPY src/ ./src/

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV ENVIRONMENT=production

# Port (default 8000, Cloud Run overrides via PORT env var)
ENV PORT=8000

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

# Run the application (uses $PORT for Cloud Run compatibility)
CMD ["sh", "-c", "uvicorn orbital_app.main:app --host 0.0.0.0 --port ${PORT}"]
