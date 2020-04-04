# Get base image from community image repository
FROM node:alpine

# Set working directory to be used in the container, and,
# copy package.json into the container
# so that 'npm install' only runs when package.json is changed
WORKDIR /usr/flutter-cloud-app
COPY ./package.json .

# Add dependencies
RUN npm install

# Copy rest of the content from the folder to container
COPY . .

# Set default run command
CMD ["npm", "start"]