<template>
   <div id="app">
     <keep-alive>
             <router-view/>
     </keep-alive>
      <FooterGuide v-show="$route.meta.isShowFooter"/> 
   </div>
</template>

<script type="text/ecmascript-6">
import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    name:'App',
    components:{
       FooterGuide
    },
    mounted(){
        this.$store.dispatch('getAddress')
        this.$store.dispatch('getShops')
        this.$store.dispatch('autoLogin')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>




