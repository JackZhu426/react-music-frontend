// 1) craco.config.js里：
// 引入 NodeJS 自带的 path
const path = require('path');

// 通过function(dir) 拼接路径
// __dirname: 当前模块的目录名 ; path.dirname();
const resolve = (dir) => path.resolve(__dirname, dir);

console.log('name:', __dirname);

// 这里的配置会和脚手架默认的配置做合并
module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
    },
  },
};
