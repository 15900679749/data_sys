module.exports = {
    development: {
        NODE_ENV: '"development"',
        buildTime: +new Date(),
        http: JSON.stringify({
            root: 'http://192.168.1.191'
        })
    },
    production: {
        NODE_ENV: '"production"',
        buildTime: +new Date(),
        http: JSON.stringify({
            root: 'http://192.168.1.191'
        })
    }
}