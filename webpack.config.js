var config = {
    entry: './main.js',
     
    output: {
       filename: 'index.js',
    },
     
    devServer: {
       inline: true,
       port: 9090,
       historyApiFallback: true
    },

    // devServer: {
    //     historyApiFallback: true,
    //     contentBase: './',
    //     hot: true
    //   },
     
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets: ['es2015', 'react']
             }
        },
       ]
    }
 }
 
 module.exports = config;