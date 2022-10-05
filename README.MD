# v-purify-html

![size](https://img.shields.io/github/languages/code-size/Aleksandr-JS-Developer/v-purify-html?style=flat-square)

Vue directive that uses the [purify-html](https://www.npmjs.com/package/purify-html) package to safely inject potentially dangerous HTML into a page.

---

## Install

```bash
npm install v-purify-html
```

---

## Usage

```html
<div v-purify-html="str"></div>
<div v-purify-html.preset1.preset2.presetn="str"></div>
```

When specifying presets, arrays of allowed tags are concatenated and then passed to the constructor of the Sanitize class from purify-html.

### **Vue 2.x**

**main.js**

```javascript
import Vue from 'vue';
import App from './App.vue';
import vPurifyHTML from 'v-purify-html';

Vue.use(vPurifyHTML, {
  allowedTags: [], // clear all tags by default
  presets: {
    'can-p': [{ name: 'p', attributes: ['style'] }],
    'can-h1': [{ name: 'h1' }],
    'can-h2': [{ name: 'h2' }],
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

**App.vue**

```html
<template>
  <div>
    <h2>clear all:</h2>
    <br />
    <div v-purify-html="html"></div>
    <hr />

    <h2>only p and p[style="*"]:</h2>
    <br />
    <div v-purify-html.can-p="html"></div>
    <hr />

    <h2>only h1:</h2>
    <br />
    <div v-purify-html.can-h1="html"></div>
    <hr />

    <h2>only h2:</h2>
    <br />
    <div v-purify-html.can-h2="html"></div>
    <hr />

    <h2>only h1 and h2:</h2>
    <br />
    <div v-purify-html.can-h1.can-h2="html"></div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        html: `
          <h1>h1</h1>
          <h2>h2</h2>
          <p style="color: red;">p</p>
          <div>
            <p>p in div</p>
          </div>
          <script>alert(1)</${'script'}>
        `,
      };
    },
  };
</script>
```

[Try Demo for Vue 2.x](https://codesandbox.io/s/strange-leakey-7u9ven?file=/src/App.vue)

### **Vue 3.x usage:**

**main.js**

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import vPurifyHTML from 'v-purify-html';

const app = createApp(App);

app.use(vPurifyHTML, {
  allowedTags: [], // clear all tags by default
  presets: {
    'can-p': [{ name: 'p', attributes: ['style'] }],
    'can-h1': [{ name: 'h1' }],
    'can-h2': [{ name: 'h2' }],
  },
});

app.mount('#app');
```

**App.vue**

```html
<template>
  <div>
    <h2>clear all:</h2>
    <br />
    <div v-purify-html="html"></div>
    <hr />

    <h2>only p and p[style="*"]:</h2>
    <br />
    <div v-purify-html.can-p="html"></div>
    <hr />

    <h2>only h1:</h2>
    <br />
    <div v-purify-html.can-h1="html"></div>
    <hr />

    <h2>only h2:</h2>
    <br />
    <div v-purify-html.can-h1.can-h2="html"></div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    setup() {
      const html = `
        <h1>h1</h1>
        <h2>h2</h2>
        <p style="color: red;">p</p>
        <div>
          <p>p in div</p>
        </div>
        <script>alert(1)</${'script'}>
      `;

      console.log('xss string', html);

      return { html: ref(html) };
    },
  });
</script>
```

[Try Demo for Vue 3.x](https://codesandbox.io/s/strange-leakey-7u9ven?file=/src/App.vue)

---
