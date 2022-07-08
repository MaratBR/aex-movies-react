FROM node:16-alpine AS build 
WORKDIR /src
COPY . .
RUN yarn
RUN yarn build


FROM nginx:1.23.0 AS final
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx_server.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /dist
