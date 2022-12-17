<template>
<div>
  
<Header />

<div v-if="!userAuth">
<h3 style="text-align: center; margin-top: 5rem; color:white;">Login first to check your orders!</h3>
</div>
<div v-else-if="orders.length===0" class="background d-flex justify-content-center align-items-center">
    <div>
        <h3 style="text-align: center; margin-top: 5rem; color:white;">Your orders are empty go order something!</h3>
        <router-link style="" to="/shop">
            <button type="button" class="btn btn-dark btn-block btn-lg"
                data-mdb-ripple-color="dark" >Order
            </button>
        </router-link>
    </div>
</div>
<div v-else-if="orders.length > 0" class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12">
        <div class="card card-registration card-registration-2" style="border-radius: 15px;">
          <div class="card-body p-0">
            <div class="row g-0">
              <div class="col-lg-8">
                <div class="p-5">
                    <!--<div class="row mb-4 d-flex justify-content-between align-items-center">Ola</div-->
                    <OrderItem v-for="order in orders" :key=order.id :order="order"/>
                
                </div>
             </div>
            </div>
          </div>
        </div>
    </div>
</div>



<Footer />

</div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import OrderItem from '@/components/OrderItem.vue'


export default {
    components: {
		Footer,
        Header,
        OrderItem
	},
	data() {
		return {
            isHidden: false,
            id: 0,
            orders: 
            [
            //{
            //"id":"11",
            //"customer_id":"20",
            //"created_at":"2021-12-03 18:20:31",
            //"status_id":"1",
            //"total":"190",
            //"order_items":[{"product_id":"2","name":"Salmon Roll","price":"18","quantity":"4"},{"product_id":"3","quantity":"3"},{"product_id":"4","quantity":"2"}]
            //}
            ],
            userAuth: false,
		}
	},
    
	created() {
        this.userAuth = this.$store.getters['user/getUser'].id != undefined;
        if (this.userAuth)
            this.fetchOrders();
    },
	methods: {
        async fetchOrders() {
            await this.$store.dispatch('orders/getMyOrdersFromDB');
            this.orders = this.$store.getters['orders/getOrders'];
            let j = this.orders.length;
            for (let i = 0; i < this.orders.length; i++) {
                this.orders[i].order_num = j;
                j--;
            }

        }
	},
    computed: {

    },
}
</script>

<style scoped>
</style>