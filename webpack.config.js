const path = require('path')



module.exports = {
  // 入口文件，path.join(__dirname)当前目录+后面行成绝对路径
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    // 输出的文件名
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          // css代码会出现在js文件中，js负责把css写入html里面
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|gif|jpeg|png|svg)$/,
        use: [
          {
            // 写成对象，可以对url-loader进参数c配置
            loader: 'url-loader',
            options: {
              // 把图片生成Base64代码，直接生成在js代码中，不用生成一个文件
              // 以1024K为限制，小于的就转成Base64代码
              limit: 1024,
              // name是图片原来的名字，ext是扩展名
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}