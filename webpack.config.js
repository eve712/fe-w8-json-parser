const path = require('path');
module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname + "public"),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ["@babel/preset-env"],
                    }
                }
            },
            {
                test:/\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'), 
        compress: true,
        port: 9000,
    },
}