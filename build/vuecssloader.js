
var
    NODE_ENV = process.env.NODE_ENV,
    ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    /**
     * @desc css loaders for vue-loader
     * @param {object} options - expect extract-text-webpack-plugin options
     * @param {string} options.publicPath
     * */
    cssLoaders: function (options) {
        var
            cssLoaders = {
                css: 'css-loader!postcss-loader',
                scss: 'css-loader!sass-loader!postcss-loader'
            };
        options = options || {};
        for (var key in cssLoaders) {
            cssLoaders[key] = cssLoaders[key] + '?sourceMap=' + (NODE_ENV !== 'production');
            if (NODE_ENV === 'development') {
                cssLoaders[key] = 'vue-style-loader!' + cssLoaders[key];
            }
            else {
                cssLoaders[key] = ExtractTextPlugin.extract({
                    use: cssLoaders[key],
                    fallback: 'vue-style-loader',
                    publicPath: options.publicPath
                });
            }
        }
        return cssLoaders;
    },
    /**
     * @desc extract in .js files css
     * @param {object} options - pass on to cssLoaders options
     * */
    styleLoaders: function (options) {
        var output = [];
        var loaders = module.exports.cssLoaders(options);
        for (var extension in loaders) {
            var loader = loaders[extension];
            output.push({
                test: new RegExp('\\.' + extension + '$'),
                loader: loader
            })
        }
        return output
    }
};
