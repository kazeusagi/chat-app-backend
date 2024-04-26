FROM debian:bullseye

RUN apt-get update && apt-get install -y \
  git \
  curl \
  unzip \
  sudo \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# non-root-userの作成
ARG USERNAME=user
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# sudo権限を持たせて作成
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# デフォルトユーザーの設定
USER $USERNAME

# bunのインストール
RUN curl -fsSL https://bun.sh/install | bash
