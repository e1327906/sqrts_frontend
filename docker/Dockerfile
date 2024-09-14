# Use the official Node.js image as the base image
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React app for production
RUN npm run build

# Use an Nginx image to serve the React app
FROM nginx:stable-alpine

# Copy the built React app from the build stage to Nginx's html folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file to the conf.d directory
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that Nginx will use
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]