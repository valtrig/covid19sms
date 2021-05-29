# Build stage, uses 'node.js/npm' to generate the application's assets.
FROM node:alpine as builder

# Set the work directory.
WORKDIR /home/node

# Copy project files into the root of the work directory.
COPY --chown=node:node . ./

# Switch to the 'node' user.
USER node

# Use 'npm' to download dependencies and build the application.
RUN npm install

# Final stage, includes the assets generated from the build stage.
FROM nginx:alpine

# Copy the generated assets into the server's HTML root directory.
COPY --from=builder /home/node/public/ /usr/share/nginx/html/
