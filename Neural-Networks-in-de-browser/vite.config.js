const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        ffn: './views/ffneuralnetwork.html',
        ffng: './views/ffneuralnetworkGPU.html',
        gru: './views/GRU.html',
        imagereq: './views/imgrecognition.html',
        lstm: './views/LSTM.html',
        rnn: './views/RNN.html',
      }
    }
  }
})