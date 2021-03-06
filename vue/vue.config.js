module.exports = {
    assetsDir: "static",
    devServer: {
        proxy: {
            "/api": {
                target: "http://0.0.0.0:3000/"
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({remUnit: 75})
                ]
            }
        }
    }
}