const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

//export
module.exports = {
  entry: './js/main.js', //파일을 읽어들이는 진입점 설정
  output: { //결과물(번들)을 반환하는 설정
    path: path.resolve(__dirname, 'dist'), //nodejs에서 필요로 하는 '절대 경로' 
    //__dirname: 현재 파일(webpack.config.js)의 경로를 지정해주는 nodejs 전역변수
    filename: 'app.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.s?css$/, //*.css find
        use: [ //역순으로 불러옴(stack)
          'style-loader', //불러온 css의 style을 입힘
          'css-loader', //css를 불러옴
          'postcss-loader', //공급업체 접두사 제공 및 plugin 사용
          'sass-loader'
        ]
      }
    ]
  },
  //bundling 후 결과물의 처리 방식 등 다양한 플러그인 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({ //copyplugin을 통해 from 내부 데이터 dist에 복사
      patterns: [ //배열이므로 여러개 명시 가능
        { from: 'static' } //static dir
      ]
    })
  ],
  devServer: {
    host: 'localhost'
  }
}