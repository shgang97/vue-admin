import request from "./request";

export default {
  // home 组件左侧表格数据获取
  getTableData(params) {
    return request({
      url: '/api/home/table',
      method: 'get',
      data: params,
      mock: true
    })
  },
  getCountData() {
    return request({
      url: '/api/home/count',
      method: 'get',
      mock: true
    })
  },
  getEchartData() {
    return request({
      url: '/api/home/echart',
      method: 'get',
      mock: true
    })
  },
  getUserData(params) {
    return request({
      url: '/api/user',
      method: 'get',
      mock: true,
      data: params
    })
  },
  addUser(params) {
    return request({
      url: '/api/user',
      method: 'post',
      mock: true,
      data: params
    })
  },
  editUser(params) {
    return request({
      url: '/api/user',
      method: 'put',
      mock: true,
      data: params
    })
  },
}
