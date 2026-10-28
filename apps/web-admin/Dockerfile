FROM nginx:1.25-alpine

ARG WEB_PORT
ENV WEB_PORT=$WEB_PORT

COPY nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
COPY dist /usr/share/nginx/html

CMD ["/bin/sh", "-c", "envsubst '$$WEB_PORT' \
    < /etc/nginx/conf.d/nginx.conf.template \
    > /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'"]