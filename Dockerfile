FROM node:6.10.3-slim
RUN apt-get update \    && apt-get install -y nginx
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN  npm install \     && npm run build \     && cp -r dist/* /var/www/html \     && rm -rf /app
CMD ["nginx","-g","daemon off;"]

作者：三环没有少
链接：https://juejin.im/post/5a142d7b6fb9a0451170c2c7
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
