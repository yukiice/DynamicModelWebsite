// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  webpack5: {
    // lazyCompilation: {},
  },
  //  proxy:{
  //   "/api":{
  //     target:`https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd`,
  //     changeOrigin:true,
  //     // pathRewrite:{'^/api':''}
  //   }
  // }
});
