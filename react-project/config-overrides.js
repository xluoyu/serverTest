const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require("path")
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  addLessLoader({//less-loader6.x配置
    lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A'//配置主题颜色；antd提供了其它主题颜色，可根据需要进行切换
        },
    },
  }),
  addWebpackAlias({//配置路径别名
    ["@"]: path.resolve(__dirname, "src")
}),
);
