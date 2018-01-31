var webpack = require("webpack");
let htmlWebpackPlugin = require("html-webpack-plugin");
let ExtractTextPlugun = require("extract-text-webpack-plugin");
let merge = require("webpack-merge");
let WebpackBaseConfig = require("./webpack.config.js");

//清空基本配置的插件
WebpackBaseConfig.plugins = [];
module.exports = merge(WebpackBaseConfig,{
    output:{
        publicPath:"/dist/",
        filename : 'js/[name].[hash].js'
    },
    plugins:[
        new ExtractTextPlugun({
            filename:'css/[name].[hash].css',
            allChunks:true
        }),
        new webpack.DefinePlugin({
            'progress.env':{
                NODE_ENV:'"production"'
            }
        }),
        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        new htmlWebpackPlugin({
            filename:"./index_prod.html",
            template:"./src/templates/index.ejs",
            inject:false
        })
    ]
});