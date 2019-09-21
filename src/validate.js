import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

// 声明使用vue插件
Vue.use(VeeValidate)

 VeeValidate.Validator.localize('zh_CN', {
   messages: zh_CN.messages,
   attributes: {
     phone: '手机号',
     code: '验证码',
     name: '用户名',
     pwd: "密码",
     captcha: '验证码'
   }
 })

 // 自定义验证规则
 VeeValidate.Validator.extend('mobile', {
   // 验证函数
   validate: value => {
     return /^1\d{10}$/.test(value)
   },
   getMessage: field => field + '必须是11位手机号码'
 })
  // 自定义验证规则
  VeeValidate.Validator.extend('name', {
    // 验证函数
    validate: value => {
      return /^1\d{10}$/.test(value)
    },
    getMessage: field => field + '必须是满足11位'
  })
    // 自定义验证规则
    VeeValidate.Validator.extend('pwd', {
      // 验证函数
      validate: value => {
        return /^1\d{7}$/.test(value)
      },
      getMessage: field => field + '必须是字符串或数字'
    }),
        // 自定义验证规则
    VeeValidate.Validator.extend('captcha', {
      // 验证函数
      validate: value => {
        return /^[\w_-]{4}$/.test(value)
      },
      getMessage: field => field + '字母忽略大小写'
    })