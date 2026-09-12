#stage:builder
FROM node:24-alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm ci 
COPY . .
RUN npm run build

#stage:final
FROM nginx:1.27-alpine as final
#update os
RUN apk update && apk upgrade --no-cache
WORKDIR /usr/share/nginx/html
#security: create nonroot user
RUN addgroup -g 10001 appgroup && adduser -u 10001 -G appgroup -s /bin/sh -D appuser
COPY --from=builder --chown=appuser:appgroup /app/dist .
#change default ports 80 to 8080 for non root user
RUN sed -i 's/listen\(.*\)80;/listen 8080;/g' /etc/nginx/conf.d/default.conf
#nginx needs to write in some symstem folder for log and cache
#so we change permissions for our non-root user
RUN chown -R appuser:appgroup /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown appuser:appgroup /var/run/nginx.pid

USER appuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]