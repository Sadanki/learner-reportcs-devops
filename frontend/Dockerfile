# Build React app
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Serve with `serve`
FROM node:16
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build ./build
EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]
