const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');

let templates = [];
let styles = [];
let stylesFolder = fs.readdirSync('src/scss');
let templatesFolder = fs.readdirSync('src/templates');

templatesFolder.forEach(file => {
    if (file.match(/\.pug$/)) {
        let filename = file.substring(0, file.length - 4);
        templates.push(
          new HtmlWebpackPlugin({
              template: `src/templates/${filename}.pug`,
              filename: `templates/${filename}.html`,
              inject: false
          })
        );
    }
});

stylesFolder.forEach(file => {
    if (file.match(/\.scss$/) && file.charAt(0) !== '_') {
        let filename = file.substring(0, file.length - 5);
        styles.push(
          new MiniCssExtractPlugin({
              template: `./src/scss/${filename}.scss`,
              filename: `style/${filename}.css`,
          }),
        );
    }
});

const config = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
    }, module: {
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
                        options: {
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
        ...styles,
        ...templates,
        new CleanWebpackPlugin(),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === "development") { }
    if (argv.mode === 'production') { }
    return config;
};
