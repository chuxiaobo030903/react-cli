const { merge } = require('webpack-merge')
const {baseConfig,productionConfig,developmentConfig} = require('zt-webpack')
// TODO 用户自定义webapck配置
module.exports = (env) => {
  switch(true) {
    case env.development:
      return merge(baseConfig, developmentConfig)
    case env.production:
      return merge(baseConfig, productionConfig)
    defult:
      return new Error('No matching configuration was found')
  }
}
