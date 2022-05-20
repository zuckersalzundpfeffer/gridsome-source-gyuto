# Gridsome Source Plugin for Gyuto Backend

This is a small plugin to get data gyuto backend directly into your gridsome project.

## Usage
```js
plugins: [
    {
      use: "@zuckersalzundpfeffer/gridsome-source-gyuto",
      options: {
        site: "<namespace of the website>",
        accessToken: "<accessToken>",
        host: "<backend server for your website>",
        version: "rest", // rest or graphql
        revision: "v2", // revision of the api
        endpoints: [], // additional endpoints besides the default ones
      },
    },
]
```
