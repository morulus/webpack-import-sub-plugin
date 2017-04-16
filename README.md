webpack-import-sub-plugin
--

Use [Import sub](https://github.com/morulus/import-sub) with [https://webpack.js.org/](Webpack).

Usage
----

```shell
npm i webpack-import-sub-plugin --D
```

In the configuration file:

```js
const WebpackImportSubPlugin = 'webpack-import-sub-plugin';

const config = {
  ...,
  plugins: [
    new WebpackImportSubPlugin([
      {
        match: {
          request: /some\.js/,
          base: /app/,
        },
        use: {
          request: "./to.js"
        }
      }
    ])
  ]
}
```

Author
----

Vladimir Kalmykov <vladimirmorulus@gmail.com>

License
----
MIT
