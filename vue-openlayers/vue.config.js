module.exports = {
    publicPath: './',

    devServer: {
        // open: process.platform === 'darwin',
        host: 'localhost',
        port: 9099,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {}
    },

}