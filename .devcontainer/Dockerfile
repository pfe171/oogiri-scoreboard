FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-20.04

RUN set -x \
    && ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && echo 'Asia/Tokyo' >/etc/timezone

ARG USERNAME=vscode
RUN apt-get install -y --no-install-recommends \
    sudo

# bun
ARG BUN_VERSION=1.1.25
RUN set -x \
    && curl -fsSL https://bun.sh/install | sudo -u ${USERNAME} bash -s "bun-v${BUN_VERSION}"

USER ${USERNAME}
