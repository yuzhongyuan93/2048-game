const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');//解决vue-loader解析报错

const config = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js','.json','.vue'],
    },
    devServer: {
        hot: true,
        inline: true,
        contentBase: path.resolve(__dirname, 'public'),
        open:true,
        // host:''
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test:/\.(png)|(jpg)$/,
                use:{
                    loader: "file-loader",
                    options: {
                        outputPath:'images/',
                    }
                }
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new VueLoaderPlugin(),
    ],
};

module.exports = config;
