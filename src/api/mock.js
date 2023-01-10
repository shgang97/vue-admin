import Mock from 'mockjs'
import homeApi from './mockdata/home.js'
import userApi from './mockdata/user.js'

Mock.mock('/api/home/table', homeApi.getHomeData)
Mock.mock('/api/home/count', homeApi.getCountData())
Mock.mock('/api/home/echart', homeApi.getEchartData())

// 本地获取user的数据
Mock.mock('/api/user', userApi.getUserList)
