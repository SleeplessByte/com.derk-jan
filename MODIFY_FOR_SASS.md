# Preact-Bootstrap with scss
To switch from less to sass / scss take the following steps:

## 1. Install sass loader
```
npm install sass-loader node-sass --save-dev
npm uninstall less-loader --save-dev
```

## 2. Rename .less to .scss
```
mov src/style/helpers.less src/style/helpers.scss
mov src/style/index.less src/style/index.scss
mov src/style/mixins.less src/style/mixins.scss
mov src/style/variables.less src/style/variables.scss

mov src/components/header/style.less src/components/header/style.scss
mov src/components/home.style.less src/components/home/style.scss
mov src/components/profile/style.less src/components/profile/style.scss
```

## 3. Replace mixins
```
// src/style/mixins.scss
@mixin fill() {
    // [...]
}

@mixin scroll() {
    // [...]
}
```

## 4. Replace variables
```
$red: #F00;
$blue: #00F;
$white: #FFF;
$gray: #999;
$black: #000;
```

## 5. Add filename to imports
```
// in each component
import style from './style.scss';

// in index.js
import './style/index.scss';
```

## 6. Edit the webpack configuration
```
// replace the 2 lines
test: /\.(less|css)$/,

// with
test: /\.(scss|css)$/,

// replace
less-loader

// with
sass-loader

// replace
less

// with
sass
```