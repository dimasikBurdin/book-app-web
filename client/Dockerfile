FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json /app/
# COPY . .
RUN yarn install
COPY ./ /app/
RUN yarn build
ENV NODE_ENV production
# EXPOSE 3000
# CMD ["yarn", "serve", "build"]

FROM nginx:1.21.0-alpine as production
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf