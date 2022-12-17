
<template>
<div class="card" style="width: 30rem; margin-bottom: 1.5rem; border: 1px solid #023020;">
  <div class="card-body">
    <h4 class="card-title">Order # {{order.order_num}}</h4>
    <h5 v-if="totalItems==1"class="card-subtitle mb-2 text-muted">1 Item in total</h5>
    <h5 v-else class="card-subtitle mb-2 text-muted">{{totalItems}} Items in total</h5>

    <h6>Ordered at {{order.created_at}}</h6>

    <h5>Total price: {{order.total}} €</h5>
    <br>
    <br>


    <button class="btn btn-primary" @click="showItems=!showItems" style="background-color: #5F8575; border: #5F8575;">
        <h6> Show items </h6>
        <i v-if="!showItems" class="bi bi-caret-down-fill"></i>
        <i v-else class="bi bi-caret-up-fill"></i>
    </button>

    <div v-if="showItems">
        <ul class="list-group">
             <li v-for="item in order.items" class="list-group-item d-flex justify-content-between align-items-center">
                <p>{{item.quantity}}X {{ item.name }}</p> <p style="color: #5F8575; font-size: 16px;"> {{item.quantity*item.price}}€</p>
            </li>
        </ul>
    </div>
    
  </div>
</div>
</template>
    
<script>
export default {
    props: ['order'],
    data() {
        return {
            totalItems: 0,
            showItems: false,
            userAuth: false,
        }
    },
    methods: {
        gettotalItems() {
            let res = 0;
            for (let i = 0; i < this.order.items.length; i++) {
                res += parseInt(this.order.items[i].quantity);
            }
            return res;
        }

    },
    created() {
        this.totalItems = this.gettotalItems();
    }
}

</script>  
    
    