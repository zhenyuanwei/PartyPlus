FROM tutum/nginx
RUN rm /etc/nginx/sites-enabled/default
ADD sites-enabled/ /etc/nginx/sites-enabled
RUN mkdir /etc/nginx/ssl
ADD ssl/ /etc/nginx/ssl