 const loaders=[
    {
　　     test: /\.html$/,
　　     loader: 'text-loader'// path.resolve(__dirname,'loader/html.js'),
     },
     {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: './path/to/resources.scss',
   
              // Or array of paths
             // /resources: ['./path/to/vars.scss', './path/to/mixins.scss']
            },
          }]
     }
]

module.exports = loaders;