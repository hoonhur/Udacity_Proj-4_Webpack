The project is for practice using Webpack. Details are below.

- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls


NOTE:
Regenerator runtime error.
I've solve the issue to install and add plugins as below.
1. npm install --save-dev @babel/plugin-transform-runtime

2. Including this in .babelrc

{ "plugins": [ "@babel/plugin-transform-runtime" ] }
