import Mock from 'mockjs'
import homeApi from './mockdata/home.js'
import userApi from './mockdata/user.js'
import permissionApi from './mockdata/permission'

Mock.mock('/api/home/table', homeApi.getHomeData)
Mock.mock('/api/home/count', homeApi.getCountData)
Mock.mock('/api/home/echart', 'get', homeApi.getEchartData)

// 本地获取user的数据
Mock.mock(/api\/user/, 'get', userApi.getUserList)
Mock.mock(/api\/user/, 'post', userApi.createUser)
Mock.mock(/api\/user/, 'put', userApi.updateUser)

// permission模拟数据
Mock.mock(/api\/permission\/menu/, 'post', permissionApi.getMenu)
