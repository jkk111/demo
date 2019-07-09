FROM node:10.16

RUN mkdir -p "/opt/workdir"

COPY package.json /opt/workdir/package.json 
COPY yarn.lock /opt/workdir/yarn.lock

RUN yarn

COPY . .

EXPOSE 8080

ENTRYPOINT [ "yarn", "start" ]