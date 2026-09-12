#1. first stage:build
#we use a slim image of python
FROM python:3.12-slim as builder
#specifiying the work directory in the container
WORKDIR /app
#installing compilation tools for some wheels
RUN apt-get update && apt-get install -y --no-install-recommends gcc build-essential && rm -rf /var/lib/apt/lists/*
#best practice about python dockerfile
#not allow python to copy .pyc file in the container
#force log displayin in reeltime
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

#copy the dependancies for cache layer
COPY requirements.txt .
#run the installation of depencies
RUN pip install --no-cache-dir --user -r requirements.txt

#second stage: final
FROM python:3.12-slim as final
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*
WORKDIR /app 
RUN groupadd -g 10001 appgroup && useradd -u 10001 -g appgroup -s /bin/bash -m appuser
COPY --from=builder --chown=appuser:appgroup /root/.local /home/appuser/.local
#copy the source code of application with non root rights
COPY --chown=appuser:appgroup . .
#set to nonroot user at the runtime
user appuser
EXPOSE 8000

CMD ["python", "-m", "uvicorn","main:app", "--host", "0.0.0.0","--port", "8000"]



