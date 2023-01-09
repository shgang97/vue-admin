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
  }
}
