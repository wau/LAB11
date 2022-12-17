<template >

  <!--<img src= "../assets/images/jungleai2.webp" width="100%" height="80%">-->
  <div id="teste" class="background d-flex justify-content-center align-items-center">
    <div >
    
    <router-link to="/shop">
    <button type="button" class="btn btn-success btn-block btn-lg" data-mdb-ripple-color="dark">
      Go to Shop
    </button>
    </router-link>
    
      
    </div>
  </div>
  
</template>

<script>
//import Footer from '@/components/Footer.vue'
//import Header from '@/components/Header.vue'


export default {
  components: {
    //Footer,
    //Header
  },
}
</script>


<style scoped>
#teste {
  height: 100vh; 
  background-image: url(../assets/images/jungle.jpeg);
}
</style>