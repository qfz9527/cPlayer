const path = require('path');
const webpack = require('webpack');
const { version } = require("./package.json");

let plugins = [];
plugins.push(new webpack.DefinePlugin({
    __CPLAYER_VERSION__: JSON.stringify(version)
}),new webpack.HotModuleReplacementPlugin())
if (process.env.NODE_ENV === "production")
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false
    }));
module.exports = {
    entry: './src/js/cplayer.ts',
    output: {
        filename: 'cplayer.js',
        path: path.resolve(__dirname, process.env.NODE_ENV === "production" ? 'dist' : 'demo'),
        library: "",
        libraryTarget: "umd"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { sourceMap: false } },
                    { loader: "sass-loader", options: { sourceMap: false } }
                ]
            },
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader",
                    options:process.env.NODE_ENV === "production"?{
                        configFile:"tsconfig.product.json"
                    }:{
                        configFile:"tsconfig.json"
                    }
                },
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, "src/js"),
                    path.resolve(__dirname, "src/js/modules")
                ],
            }
        ]
    },
    resolve: {
        extensions: [".json", ".ts", ".js"],
        modules: [path.resolve(__dirname, "src/js"), "node_modules"]
    },
    devServer: {
        contentBase: path.join(__dirname, "demo"),
        compress: true,
        hot: true,
        port: 16384
    },
    plugins
};