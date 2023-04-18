# node image
FROM node:18.4.0-alpine

# directory within the virtualized docker environment
WORKDIR /app

# copies all to docker environment
COPY . /app

# arguments
ARG REACT_APP_AUTH_BASE_URL
ARG REACT_APP_AUTH_REALM
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_API_VERSION
ARG REACT_APP_ROC_TOOLS_URL

# install all node_modules and remove the cache
# build app
# delete node_modules
# install serve globally
RUN yarn && yarn cache clean \
	&& yarn build \
	REACT_APP_AUTH_BASE_URL=${REACT_APP_AUTH_BASE_URL} \
	REACT_APP_AUTH_REALM=${REACT_APP_AUTH_REALM} \
	REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL} \
	REACT_APP_API_VERSION=${REACT_APP_API_VERSION} \
	REACT_APP_ROC_TOOLS_URL=${REACT_APP_ROC_TOOLS_URL} \
	&& rm -rf node_modules/ \
	&& rm -rf src/ \
	&& yarn global add serve

# expose port
EXPOSE 3000

# serve the application
CMD serve -s build -l 3000
