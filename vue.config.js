const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: 
  {
    proxy: 
    {
        '/api': 
        {
            target: 'https://tutorino.ddns.net:888',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }
    }
  },
  pluginOptions: {
    vite: {
      // Define feature flags for Vite
      define: {
        // Define the missing feature flag
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(true),
      }
    }
  },
})
