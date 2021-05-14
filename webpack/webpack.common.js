const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', '/build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html')
    })
  ]
}


// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// module.exports = {
//   entry: ['@babel/polyfill', './src/index.tsx'],
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js']
//   },
//   output: {
//     path: path.join(__dirname, '/dist'),
//     filename: 'bundle.min.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader'
//       },
//       {
//         test: /\.(jpe?g|gif|png|svg)$/i,
//         use: [
//         {
//           loader: 'url-loader',
//           options: {
//             limit: 10000
//           }
//         }
//       ]
//     }
//     ]
//   },
//   devServer: {
//     historyApiFallback: true,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html'
//     })
//   ]
// }
