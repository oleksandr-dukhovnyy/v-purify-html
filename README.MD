# v-purify-html

![size](https://img.shields.io/github/languages/code-size/Aleksandr-JS-Developer/v-purify-html?style=flat-square)

Vue directive that uses the [purify-html](https://github.com/Aleksandr-JS-Developer/purify-html) package to safely inject potentially dangerous HTML into a page.

## Install

```bash
npm install v-purify-html
```

## Usage

```html
<div v-purify-html="str"></div>
<div v-purify-html.preset1.preset2.presetn="str"></div>
```

When specifying presets, arrays of allowed tags are concatenated and then passed to the constructor of the Sanitize class from purify-html.

### Vue 2.x

**main.js**

```javascript
import Vue from 'vue';
import App from './App.vue';
import vPurifyHTML from 'v-purify-html';

Vue.use(vPurifyHTML, {
  allowedTags: [{ name: 'h1' }],
  presets: {
    'can-i': [{ name: 'i' }],
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

**App.vue**

```html
<template>
  <div id="app">
    <div v-html="str"></div>
    <hr />

    <div v-purify-html="str"></div>
    <hr />

    <div v-purify-html.default="str"></div>
    <!-- "v-purify-html.default" same "v-purify-html"  -->
    <hr />

    <div v-purify-html.can-i="str"></div>
    <hr />

    <div v-purify-html.default.can-i="str"></div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        str: '<h1>h1 tag</h1> <i>italic</i>',
      };
    },
  };
</script>
```
