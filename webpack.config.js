const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const config = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname,  "dist"),
        filename: "[name].bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
    },module: {
        rules: [
            {
                test: /\.pug$/,
                use: [{
                        loader: "pug-loader",
                        options: {
                            pretty: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            hmr: process.env.NODE_ENV === "development"
                        }
                    },
                'css-loader',
                'sass-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new HtmlWebpackPlugin({
            filename: "auth/email.html",
            template: "./src/templates/email.pug"
        }),
        new HtmlWebpackPlugin({
            filename: "auth/sign.html",
            template: "./src/templates/sign.pug"
        }),
        new HtmlWebpackPlugin({
            filename: "auth/ready.html",
            template: "./src/templates/almostReady.pug"
        }),
        new HtmlWebpackPlugin({
            filename: "auth/signUp.html",
            template: "./src/templates/signUp.pug"
        }),
        new HtmlWebpackPlugin({
            filename: "user1.html",
            template: "./src/templates/user1.pug"
        }),
        new HtmlWebpackPlugin({
            filename: "auth/complete.html",
            template: "./src/templates/complete.pug"
        })
    ],
};

module.exports = (env,argv) => {
    if(argv.mode === "development"){}
    if (argv.mode === 'production') {}

    return config;
}