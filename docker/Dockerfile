# node image
FROM node:15-alpine

# directory within the virtualized docker environment
WORKDIR /app

# copies all to docker environment
COPY . /app

# install all node_modules and remove the cache
# build app
# delete node_modules
# install serve globally
RUN yarn && yarn cache clean \
  && yarn build \
  && rm -rf node_modules/ \
  && rm -rf src/ \
  && yarn global add serve

# expose port
EXPOSE 3000

# serve the application
CMD serve -s build -l 3000