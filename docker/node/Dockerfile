FROM ubuntu:18.04

RUN apt update -y \
    && apt-get install -y \
    curl \
    sudo \
    wget \
    && curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - \
    && apt-get install -y nodejs \
    && npm install -g @quasar/cli
