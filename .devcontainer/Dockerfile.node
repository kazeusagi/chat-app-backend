FROM node:20-bullseye

RUN apt-get update && apt-get install -y \
  git \
  curl \
  unzip \
  sudo \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# sudo権限を付与
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# デフォルトユーザーの設定
USER node
