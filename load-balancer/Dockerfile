FROM openresty/openresty:buster-fat

# Replace nobody with www-data
RUN sed -i 's/nobody/www-data/g' /usr/local/openresty/nginx/conf/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf.template
