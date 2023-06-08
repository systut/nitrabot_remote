FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . . 

WORKDIR /app/agribot_ui

RUN npm install

RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production
EXPOSE 3000
