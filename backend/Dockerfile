FROM node:18-alpine
WORKDIR /app
COPY package*.json /app/
# COPY . .
RUN yarn install
COPY ./ /app/
RUN yarn build
ENV NODE_ENV production
EXPOSE 3003
CMD ["node", "dist/main"]