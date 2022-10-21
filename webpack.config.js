const path = require('path');
const { webpack } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseCSSLoader = [
    {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: '[name]__[local]-[hash:base64:5]',
            },
            sourceMap: true
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                ident: "postcss",
                plugins: loader => [
                    autoprefixer({
                        browsers: ['last 3 versions', 'iOS 9']
                    })
                ]
            }
        }
    }
];

module.exports = {
    // 模式 默认值为 product // 指定当前环境 ，启用对应优化方案
    mode: 'development',
    // 入口 （可以多入口）
    entry: './main.js',

    // 输出
    output: {
        // 输出路径
        path: path.resolve(__dirname, 'dist'),
        // 输出的文件名
        filename: '[name].js',
        chunkFilename: 'chunks/[name].chunk.js', //按需加载配置
        publicPath: '/'
    },
    //配置
    module: {
        // 配置loader
        rules: [
            // babel 编译js 将es6 转es5
            {
                oneOf: [
                    {
                        // js文件、babel配置
                        test: /\.js|jsx$/,
                        exclude: [
                            path.resolve(__dirname, 'node_modules')
                        ],
                        use: [{
                            loader: 'babel-loader',
                            options: {
                                babelrc: true,
                                presets: [
                                    require.resolve('@babel/preset-react'),
                                    [require.resolve('@babel/preset-env'), {
                                        "useBuiltIns": "usage",
                                        "corejs": 3,
                                        modules: false
                                    }]
                                ],
                                cacheDirectory: true
                            }
                        }]
                    },

                ]
            },

            //css-loader
            {
                test: /\.css$/,
                // 使用use来指定在打包前使用loader对文件进行转换,多个loader 按逆序执行
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            // scss loader
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            // {
            //     // less-loader
            //     test: /\.less$/,
            //     use: [
            //          'style-loader',
            //         ...baseCSSLoader,
            //         { loader: 'less-loader', options: { javascriptEnabled: true } }
            //     ]
            // }, 
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]-[hash:base64:5]',
                            },

                        }
                    },
                    'less-loader'
                ]
            },
            // 图片文件
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 30,// 30kb 以下的文件使用 url-loader
                            fallback: 'file-loader',// 超过limit 限制使用file-loader
                            outputPath: 'images' // 输出路径
                        }
                    }
                ]
            },
            // 图标等
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024 * 30,
                            fallback: 'file-loader',
                            outputPath: "fonts"
                        }
                    }
                ]
            }
        ],
    },
    // 配置插件
    plugins: [
        // 自动生成html 文件
        new HtmlWebpackPlugin({
            template: './public/index.html',//指定模板路径
            filename: 'index.html'// 指定文件名
        })
    ],
    devServer: {
        open: true,
        compress: true,
        port: 8080,
        hot: true,
        historyApiFallback: {
            disableDotRule: true,
        }
    },
    //
    //在开发模式下配置 tree shakeing
    optimization: {
        usedExports: true
    }
}
