import Mock from 'mockjs'
import homeApi from './mockdata/home.js'

Mock.mock('/api/home/table', homeApi.getHomeData)
Mock.mock('/api/home/count', homeApi.getCountData())
