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
    },
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT'
        }
    }
}
