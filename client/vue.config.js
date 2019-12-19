module.exports = {
  "outputDir": "C:\\Users\\matan\\Desktop\\Comp\\Vue js\\ReleAi-Project\\server\\public",
  "devServer": {
    "proxy": {
      "/api/*": {
        "target": "http://localhost:5000"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}