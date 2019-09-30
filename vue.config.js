const path = require('path')

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8085,
        https: false,
        hotOnly: false,
        disableHostCheck: false,
        proxy: {
            '/api': {
                target: 'https://testcsc.liechacha.com/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}
