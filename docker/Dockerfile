# NOTE: this will work as it is only on MacOS
# TODO: add Linux support

FROM node:18.15-alpine
ARG GROUP
ARG GID
ARG USER
ARG UID

USER root

# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-on-alpine
# Installs latest Chromium package.
RUN apk add --no-cache \
      chromium \
#      nss \
#      freetype \
#      harfbuzz \
#      ca-certificates \
#      ttf-freefont \
#      nodejs \
      #git \
      git
#      yarn
      
# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# same version of Puppeteer as in package-lock.json
RUN yarn add puppeteer@^10.4.0

# [BEGIN using the same user as in the host machine to preserve file ownership]
# Ignoring `addgroup` error as the group may already exist:
# - a MacOS user is a member of the `staff` group (gid=20), but a group with the same gid already exists in Alpine image (gn=dialout)
# - a Linux user is a member of the group with the same name (gid=1000), but a group with the same gid already exists in Node Alpine image (gn=node)
# TODO: getent group $GID | cut -d: -f1
RUN addgroup --gid $GID --system $GROUP || true

# When building the image on Linux, the `adduser` command will throw an error (which should be ignored by adding `|| true` at the end of the command),
# because the default Linux user (uid=1000) already exists in Node Alpine image (un=node)  
RUN adduser \
    --home "/home/$USER" \
#     --ingroup $GROUP \
#   macOS group match
    --ingroup "dialout" \
#   linux only match
#     --ingroup "node" \
    --system \
    --disabled-password \
    --uid $UID \
    $USER
    
USER $USER
# [END using the same user as in the host machine to preserve file ownership]

WORKDIR /home/$USER
RUN mkdir app

# this port is already exposed
#EXPOSE 3000