/**
 * 环境配置文件
 */

const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: '',
  },
  test: {
    baseApi: '/api',
    mockApi: '/api',
  },
  prod: {
    baseApi: '/api',
    mockApi: '',
  },
}

export default  {
  env,
  // mock的总开关
  mock: true,
  ...EnvConfig[env]
}
