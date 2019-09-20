<template>
   <div id="app">
      <router-view/>
      <FooterGuide v-show="$route.meta.isShowFooter"/> 
   </div>
</template>

<script type="text/ecmascript-6">
import FooterGuide from './components/FooterGuide/FooterGuide'
import {reqAddress} from './api/index'
  export default {
    name:'App',
    components:{
       FooterGuide
    },
    async mounted(){
        const result=await reqAddress('116.36867','40.10038')
        console.log(result)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>




