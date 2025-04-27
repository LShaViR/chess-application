FROM node:20

WORKDIR /app 

COPY package* .

RUN npm install
RUN npm install -g typescript ts-node
COPY prisma .

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
