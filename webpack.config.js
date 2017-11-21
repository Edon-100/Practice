var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var getHtmlConfig = function(name){
    return{
        template : './src/view/'+ name +'.html',
        filename : '/view/'+ name +'.html',
        inject : true,
        hash    : true,
        chunks : ['common',name],
    }
}
var config = {
    entry:{
      'index'       : "./src/page/index/index.js",
      'login'       : "./src/page/login.js" ,
      'common'      : ['./src/page/common/index.js'],
    }, 
    output: {
        path        : "./dist/",
        //publicPath 是根据Url上来的，这里我们的根域名就是localhost:8088，然后相对它来说再访问/dist
        publicPath  : "/dist",
        filename    : "js/[name].js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        ]
    },
    //这一步试试到底有没必要
    externals : {
        'jquery' : 'window.jQuery'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name        : 'common',
            filename    : 'js/base.js'
        }),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
    ]
};
    if('dev' === WEBPACK_ENV){
        config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
    }
module.exports = config;