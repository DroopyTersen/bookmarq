FROM zenika/alpine-chrome:with-node as base

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
# set for base and all layer that inherit from it
ENV NODE_ENV production
USER root

# Install all node_modules, including dev dependencies
FROM base as deps
WORKDIR /myapp
ADD yarn.lock package.json ./
RUN yarn install --production=false

# Setup production node_modules
FROM deps as production-deps
WORKDIR /myapp
RUN yarn install --production

# Build the app
FROM base as build
WORKDIR /myapp
COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD . .
RUN rm -rf public/css
RUN mkdir public/css
RUN npm run build

# Finally, copy the production image with minimal footprint
FROM base
WORKDIR /myapp
COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
ADD . .
CMD ["npm", "start"]
