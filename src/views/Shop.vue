// eslint-disable-file no-use-before-define 
<template >
  <div id="app">
    <Header />
    <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        
         <ShopItem v-for="product in products" :key="product.id" :name="product.name" :id="product.id" :price="product.price" :imageSrc="product.image" />
          <!--<ShopItem name='name' id=10 price=50 imageSrc="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"/>-->
        
        </div>
        

      </div>
    </section>
    <Footer />
  </div>
</template>



<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import ShopItem from '@/components/ShopItem.vue'
//img url
//"https://dummyimage.com/450x300/dee2e6/6c757d.jpg"

export default {
  showModal: true,
  components: {
		Footer,
        Header,
		ShopItem
	},
	data() {
		return {
      /*product: {
        name: '',
        id: 0,
        i§
      }*/
		  products: [],
		}
	},
  methods: {

    async fetchProducts() {
      await this.$store.dispatch('products/getProductsFromDB');
      this.products = this.$store.getters['products/getProducts'];

      //console.log(this.products);

    }
	},

  created() {
    this.fetchProducts();
  },

	mounted() {

	},
	
  computed: {

  },
}



</script>

<style scoped>
</style>