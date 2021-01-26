FROM node:13-alpine

WORKDIR /app
COPY . /app

ARG APP_ENV
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_API_VERSION
ARG REACT_APP_AUTH_BASE_URL
ARG REACT_APP_AUTH_REALM

RUN npm install --only-prod \
  && REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL} \
     REACT_APP_API_VERSION=${REACT_APP_API_VERSION} \
     REACT_APP_AUTH_BASE_URL=${REACT_APP_AUTH_BASE_URL} \
     REACT_APP_AUTH_REALM=${REACT_APP_AUTH_REALM} \
     npm run build:${APP_ENV} \
  && rm -rf node_modules/ \
  && rm -rf src/ \
  && npm install serve -g

EXPOSE 3000

CMD serve -s build -l 3000
