FROM node:16.14.2
WORKDIR /app
COPY package.json /app
RUN apt-get update -y
RUN apt-get remove -y gyp
RUN apt-get install -y curl bzip2 build-essential g++ python git make gcc gcc-multilib node-gyp
RUN apt-get install -y pkg-config xserver-xorg-dev libxext-dev pkg-config libxi-dev libglu1-mesa-dev libglew-dev
RUN npm install prebuild-install node-pre-gyp node-gyp -g
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "run", "dev"] 
#run dit in de terminal om de docker image te bouwen, dit kan een aantal minuten duren.
#op mijn systeem duurt dit ongeveer 3-5 minuten.
#docker build -t neuralbrowser .