FROM node:12-alpine
 
RUN mkdir -p /opt/app;

WORKDIR /opt/app
 
ADD . .

ENV JWT_SECRET= \
    PORT=80

RUN yarn
RUN yarn prisma migrate dev
 
EXPOSE 4000
 
ENTRYPOINT [ "yarn", "dev" ]