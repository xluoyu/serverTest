module.exports = {
    assetsDir: "static",
    devServer: {
        proxy: {
            "/api": {
                target: "http://0.0.0.0:3000/"
            }
        }
    }
}