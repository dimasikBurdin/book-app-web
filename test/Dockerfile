FROM node:18.16 
WORKDIR /app
RUN yarn install
COPY . .
# COPY stress-test.js .

CMD ["node", "stress-test.js"]