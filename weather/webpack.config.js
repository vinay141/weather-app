var path = require('path');
module.exports = {
    entry: './src/js/app.jsx',
    output: {
        filename: './dist/bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    
    devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000
}
};