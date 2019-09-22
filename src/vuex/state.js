export default {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组
  user:{},  //登录用户信息
  token:localStorage.getItem('token_key'),  //登录的token标识去local里面取最新的值
  goods:[],
  ratings:[],
  info:{}
}
