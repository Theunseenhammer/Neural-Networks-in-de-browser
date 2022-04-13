const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        imagereq: './views/imgrecognition.html',
        lstm: './views/LSTM.html',
      }
    }
  }
})