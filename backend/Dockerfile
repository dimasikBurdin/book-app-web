FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build
ENV NODE_ENV production
EXPOSE 3003
CMD ["node", "dist/main"]