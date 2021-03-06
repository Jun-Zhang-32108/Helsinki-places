var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            },
            { 
                test: /\.css$/, 
                loader: "style-loader!css-loader" 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    devServer: {
        host: '0.0.0.0',
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://localhost:4000'
            }
        }
    }
}