module.exports = {
    development: {
        NODE_ENV: '"development"',
        buildTime: +new Date(),
        http: JSON.stringify({
         root: 'https://ffcmc.cn/index.php'
//root:'http://180.159.59.104:58080'
        })
    },
    production: {
        NODE_ENV: '"production"',
        buildTime: +new Date(),
        http: JSON.stringify({
          root: 'https://ffcmc.cn/index.php'
//root:'http://180.159.59.104:58080'
        })
    }
}