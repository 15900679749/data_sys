module.exports = {
    development: {
        NODE_ENV: '"development"',
        buildTime: +new Date(),
        http: JSON.stringify({
            root: 'http://218.81.97.41:58080'
        })
    },
    production: {
        NODE_ENV: '"production"',
        buildTime: +new Date(),
        http: JSON.stringify({
            root: 'http://218.81.97.41:58080'
        })
    }
}