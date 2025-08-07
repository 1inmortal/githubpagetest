# syntax=docker/dockerfile:1

# --- Base image for Python ---
FROM python:3.11-slim AS base

# --- Builder stage: install dependencies ---
FROM base AS builder
WORKDIR /app

# Install system dependencies for nmap and build tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        nmap \
        gcc \
        libffi-dev \
        libssl-dev \
        build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements.txt if present (for pip cache efficiency)
# If you have a requirements.txt, uncomment the next two lines and add it to your project
# COPY --link requirements.txt ./
# RUN --mount=type=bind,source=requirements.txt,target=requirements.txt \
#     --mount=type=cache,target=/root/.cache/pip \
#     pip install --user -r requirements.txt

# Install Python dependencies directly from the script (since no requirements.txt)
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --user python-nmap openai schedule python-dotenv

# --- Final stage ---
FROM base AS final
WORKDIR /app

# Copy installed Python packages from builder
ENV PATH="/root/.local/bin:$PATH"
COPY --from=builder /root/.local /root/.local

# Install nmap runtime dependency
RUN apt-get update && \
    apt-get install -y --no-install-recommends nmap && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m appuser
USER appuser

# Copy only the Python script (never .env or secrets!)
COPY --link Nmap.py ./

# Entrypoint
CMD ["python", "Nmap.py"]
