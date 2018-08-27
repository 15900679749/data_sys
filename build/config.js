module.exports = {
    development: {
        NODE_ENV: '"development"',
        buildTime: +new Date(),
        http: JSON.stringify({
            root: 'http://fapi.bblink.cn', 
            upload: 'https://kong.bblink.cn/msg/upload'
        })
    },
    production: {
        NODE_ENV: '"production"',
        buildTime: +new Date(),
        http: JSON.stringify({
            root: 'http://api.uneedme.cn',
            upload: 'https://babyhos.bblink.cn/msg/upload'
        })
    }
}