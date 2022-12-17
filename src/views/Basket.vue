<template>
<div>
  
<Header />

<section class="h-100 h-custom" style="background-color: #5F8575;">

  
  
  <div class="container py-5 h-100">
    <div v-if="totalItems==0">
      <p>Empty cart, go order something :) !!</p>
      <router-link to="/shop">
        <button type="button" class="btn btn-dark btn-block btn-lg"
            data-mdb-ripple-color="dark">Order
        </button>
      </router-link>
    </div>

    <div v-else class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12">
        <div class="card card-registration card-registration-2" style="border-radius: 15px;">
          <div class="card-body p-0">
            <div class="row g-0">
              <div class="col-lg-8">
                <div class="p-5">
                  <div class="d-flex justify-content-between align-items-center mb-5">
                    <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>

                    <h6  v-if="totalItems==0"class="mb-0 text-muted"> items</h6>
                  </div>

                  <hr class="my-4">
                  <BasketItem v-for="product in basketProducts"  :key="product.id"
                    :basketProduct= product
                    @callbackfn="redo"
                  />

                  <div class="pt-5">
                  
                    <h6 class="mb-0"><router-link to="/shop" class="text-body"><i
                          class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</router-link></h6>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 bg-grey">
                <div class="p-5">
                  <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                  <hr class="my-4">

                  <div class="d-flex justify-content-between mb-5">
                    <h5 class="text-uppercase">Total price</h5>
                    <h5>{{totalPrice}} €</h5>
                  </div>

                  
                  <button v-if="userAuth == true" type="button" class="btn btn-dark btn-block btn-lg"
                  @click="makeOrder()"
                    data-mdb-ripple-color="dark">Order</button>
                    
                  <router-link v-else to="/login">
                  <button type="button" class="btn btn-dark btn-block btn-lg"
                    data-mdb-ripple-color="dark">Login to order</button>
                  </router-link>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



<Footer />

</div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import BasketItem from '@/components/BasketItem.vue'

export default {
	name: 'products',
    components: {
		Footer,
    Header,
    BasketItem,
	},
	data() {
		return {
      basketProducts: [],
      totalPrice: 0,
      totalItems: 0,
      userAuth: false,
      order: {
        user_id: 0,
        totalAmount: -1,
        status_id: 0,
        items: [],
        //items: [{"id":"1","quantity":1}]
      }
		}
	},
  methods: {
    initBasketProducts() {
      const products = this.$store.getters['basket/getProducts'];
      this.basketProducts = [];
      for (let i = 0; i < products.length; i++) {
        //console.log(this.$store.getters['products/getProduct'](products[i].id.toString()));
        if (products[i].quantity > 0) {
          this.basketProducts[i] = this.$store.getters['products/getProduct'](products[i].id.toString());
          this.basketProducts[i].quantity = products[i].quantity;        
        }      
      }
    },
    calcTotalPrice() {
      let res = 0;      
      for (let i = 0; i <  this.basketProducts.length; i++) {
        res += parseInt(this.basketProducts[i].price) * this.basketProducts[i].quantity; 
      }
      this.totalPrice = res;      
    },
    redo() {
      //basketProducts:
      this.initBasketProducts();
      this.calcTotalPrice();
      this.totalItems = this.basketProducts.length;
      this.emptyBasket = this.totalItems > 0;
     // console.log(this.$store.getters['user/getUser'].id);
      this.userAuth = this.$store.getters['user/getUser'].id != undefined;
    },

    
    convertItems() {
      let items = [];
      for (let i = 0; i < this.basketProducts.length; i++) {
        items[i] = {
          id: this.basketProducts[i].id.toString(),
          quantity: this.basketProducts[i].quantity,
        };
      }
      return items;
    },

    async getLastOrderID() {
      const orders = await this.$store.dispatch('orders/getMyOrdersFromDB');
      
      console.log("orders");
      console.log(orders);

      if (orders == undefined)
        return 0;
    
      let maxID = 0;
      
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].status_id > maxID) maxID = orders[i].status_id;
      }
      return maxID;
    },

    async makeOrder() {
      //{"user_id":"19","totalAmount":"102","status_id":"1","items":[{"id":"1","quantity":1},{"id":"2","quantity":2}]}
      this.order.user_id = this.$store.getters['user/getUser'].id.toString();
      this.order.totalAmount = this.totalPrice.toString();
      this.getLastOrderID()
      
      this.order.status_id = 1;
      
      
      this.order.items = this.convertItems();

      console.log(this.order);
      const orderPlaced = await this.$store.dispatch('orders/addOrder', this.order);
      if (orderPlaced) {
        this.$store.commit('basket/clearBasket');
        this.$router.push({ path: '/message/3' });
      }
    }
	},
  created()  {
    //console.log("called created");
    this.redo();
  },

	mounted() {

	},

	

  computed: {

  },
}
</script>

<style scoped>
</style>