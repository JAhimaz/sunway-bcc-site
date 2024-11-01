# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV NEXT_PUBLIC_NODE_ENV="production"
ENV NEXT_PUBLIC_ALCHEMY_ID="dAHkvd7xaS9CwYbMF_5DD8gF3IzjFRtt"
ARG YARN_VERSION=berry

RUN corepack enable && \
  yarn set version ${YARN_VERSION}

FROM base as build

RUN apt-get update -qq && \
  apt-get install -y build-essential pkg-config python-is-python3

COPY --link package.json tsconfig.json next.config.js yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

# Copy application code
COPY --link . .

# Build application for production

RUN yarn build

FROM base

COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "yarn", "run", "start" ]
