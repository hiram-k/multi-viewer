const webpack = require('webpack');

module.exports = [
    {
        entry: {
            main: "./src/main.js"
        },
        output: {
            path: `${__dirname}/webroot/js`,
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: { loader: 'babel-loader' }
                }
            ]
        },
        // plugins: [
        //     new webpack.optimize.UglifyJsPlugin({ compress: { drop_console: true } })
        // ]
    }
]
