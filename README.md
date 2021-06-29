# Webpack
최신 프론트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러

> 모듈 번들러(Module Bundler): 웹 앱을 구성하는 자원을 각 모듈로 판단해 이를 조합하여 하나의 결과물로 만듦

<br>

## Module

특정 기능을 갖는 작은 코드 단위

```js
function sum(x, y) {
  return x + y;
}

const number = 1;

export { sum, number }
```

위와 같이 성격이 비슷한 기능들을 하나의 의미 있는 파일로 관리하는 것이 모듈
<br><br>
## Module Bundling

웹 앱을 구성하는 수많은 자원들을 하나의 파일로 병합 및 압축하는 것
> 빌드 == 번들링 == 변환

![bundling_img](./mdsource/bundle-img.png)
<br><br>
## Webpack의 등장 이유
* 파일 단위 js module 관리의 필요성
* 웹 개발 자동화 도구(Web Task Manager)
* 웹 앱의 빠른 로딩 속도와 높은 성능
<br><br>

## Webpack의 의의

필요한 자원을 필요할 때에만 요청하자!
<br><br>

## Webpack의 4가지 주요 속성

* entry
* output
* loader
* plugin

> `webpack.config.js`에 작성함

### entry

* 웹 자원을 변환하기 위해 필요한 최초 진입점, js 파일 경로
  ```js
    module.exports = {
      entry: './js/main.js'
    }
  ```

* 웹팩 실행시 `js` 폴더 안의 `main.js`를 대상으로 빌드 수행

* 엔트리 포인트는 **복수**로 등록이 가능함

#### entry에 담는 내용

* 웹 앱의 전반적인 구조와 내용
* 앱을 동작시킬 수 있는 내용
  - 해당 파일을 통해 사용되는 모듈들의 연관 관계를 이해, 분석함

`main.js`에 작성 -> main.js가 entry point이므로

```js
import '../scss/main.scss';
```

### output

> 객체 형태로 옵션 추가

웹팩 수행 후 결과물의 파일 경로

```js
const path = require('path');

module.exports = {
  output: {
    filename: 'app.js', //웹팩으로 빌드한 파일의 이름
    path: path.resolve(__dirname, 'dist'), //nodejs에서 필요로 하는 '절대 경로' 
    //__dirname: 현재 파일(webpack.config.js)의 경로를 지정해주는 Node.js API
    clean: true
  }
};
```

#### output `file name` options
1. 결과 파일 이름에 `entry` 속성 포함
  ```js
  module.exports = {
    output: {
      filename: '[name].app.js'
    }
  };
  ```

2. 결과 파일 이름에 웹팩 내부적으로 사용하는 모듈 ID를 포함
  ```js
  module.exports = {
    output: {
      filename: '[id].app.js'
    }
  };
  ```
3. 빌드할 때 마다 고유 해시 값을 붙임
  ```js
  module.exports = {
    output: {
      filename: '[name].[hash].app.js'
    }
  };
  ```

4. 웹팩의 각 모듈 내용을 기준으로 생성된 해시 값을 붙임
  ```js
  module.exports = {
    output: {
      filename: '[chunkhash].app.js'
    }
  };
  ```

### Loader == `module`

웹팩이 앱 해석 시 js가 아닌 웹 자원(HTML, CSS, img, fonts)를 변환할 수 있도록 도와줌

#### Loader 적용 방법

1. `npm`으로 사용할 로더 설치

2. `webpack.config.js` 파일 변경
  ```js
  module.exports = {
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
        },
        {
          test: /\.js$/,
          use: [
            'babel-loader'
          ]
          }
      ]
    }
  }
  ```
  * `test`: loader를 적용할 파일 유형(일반적으로 정규 표현식 사용)
  * `use`: 해당 파일에 적용할 loader의 이름 > *역순 적용(stack)*



### Plugin

* 웹팩의 동작에 기능을 추가하는 속성
* 생성자 함수로 생성한 객체 인스턴스만 추가될 수 있음

```js
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
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
  ]
}
```

<br>

## 종합
![webpackEl](./mdsource/webpackEl.png)

`entry`: 웹팩을 실행할 대상 파일/진입점
`output`: 웹팩의 결과물에 대한 정보를 입력, `filename`, `path` 설정
`loader`: js외 파일을 웹팩이 인식하게 함, 역순으로 적용
`plugin`: 웹팩이 변환한 파일에 추가적인 기능 제공, 웹팩 변환 과정에 대한 제어권 소유

<br>

# npx degit

> git 저장소의 최신 커밋 복사본 생성

```zsh
npx degit Parkchangun/webpack-basic test-degit
```

degit을 통해 `githubname/reponame (mk)dirname`

git의 기록을 가져오지 않으므로 template으로 사용하기에 적합함

