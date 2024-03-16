# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=18

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as build

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci 

RUN npm run build
################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM build as final

# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
#COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=build /usr/src/app/.output ./.output
COPY --from=build /usr/src/app/ecosystem.config.cjs ./ecosystem.config.cjs

RUN npm install pm2@latest -g

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD pm2 start ecosystem.config.cjs
