FROM node:18-alpine

WORKDIR /app/backend

COPY /backend .

RUN npm install

CMD ["npm", "run", "start"]

# run build in terminal from root directory. Expose the port
# docker run -p 8000: 8000 node_express_test
# Should also include commands to build the frontend. Then remove from dockerignore.
# 
# Had to remove sudo from package.json start script " node src/server.js" @ ~ 2 hours
# Copied during class. 

# In class .env was exposed in the dockerignore to test. 
# I didn't want to be at that.