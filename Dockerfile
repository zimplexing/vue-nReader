FROM node:8.9.1
RUN apt-get update
RUN apt-get install -y nginx
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN npm install
RUN npm run build 
RUN cp -r dist/* /var/www/html
RUN rm -rf /app
CMD ["nginx","-g","daemon off;"]
