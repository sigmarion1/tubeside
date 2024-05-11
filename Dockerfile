FROM node
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

ENV NODE_OPTIONS=--max_old_space_size=1024

WORKDIR /usr/src/app

# COPY ./back/package.json ./back/yarn.lock ./

COPY ./back/package.json ./

USER node

# RUN yarn install --pure-lockfile

RUN npm install

COPY --chown=node:node ./back .

COPY --chown=node:node ./front/build ./build

EXPOSE 4000

CMD ["npm", "start"]