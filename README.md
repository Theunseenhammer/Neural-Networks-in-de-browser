# Neural Networks in de browser
## Tonito Kusters, Roy Wendries, Max Kleinman & Jeremy Aué

This assignment was made by a group of students on behalf of the research lab Data Intelligence@Zuyd in the Netherlands.
The application demonstrates how neural networks could be created in the browser without using the host
for computing. Each neural network is created using the users computing power. 

## Features

- Import a dataset and create your own neural network using LSTM
- Customize variables such as learning rate, errorthreshold and iterations.
- Use your CPU or GPU to create neural networks.
- Export created neural networks for later use.
- Usable in Chrome, Edge and Firefox
- Site is fully functional on Android
- Use console to retrieve debuggin data

## Tech

Neural Networks in the browser uses a number of tools to work properly:
- [node.js] - evented I/O for the backend
- [Vanilla Javascript] - Programming language
- [Vite] - Fast project builder
- [Brain.js] - Library for creating Neural Networks
- [GPU.js] - Library for supporting GPU to create Neural Networks

## Installation

Neural Networks in de browser is only tested in v16.14.12 [Node.js](https://nodejs.org/).

Install the dependencies and devDependencies and start the server.

```sh
cd neural-networks-in-de-browser
npm i
npm run dev
```

For hosting the server on your local network use

```sh
npm run dev --host
```


Troubleshooting
If you're having trouble installing the project try downloading:
- [build-tools] Microsoft's build tools
- run commando: ```npm install --g --production windows-build-tools```
         



## Docker




## License

MIT


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Vite]: <https://vitejs.dev/guide/#scaffolding-your-first-vite-project>
   [Brain.js]: <https://brain.js.org/#/getting-started>
   [node.js]: <https://nodejs.org/en/>
   [GPU.js]: <https://gpu.rocks/#/>
   [Vanilla Javascript]: <https://nl.wikipedia.org/wiki/JavaScript>
   [build-tools]: <https://go.microsoft.com/fwlink/?LinkId=691126>
