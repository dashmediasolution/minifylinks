FROM node:24

WORKDIR /minifylinks

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm" , "run" , "dev"]