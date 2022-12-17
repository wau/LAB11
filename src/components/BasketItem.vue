<template>
<div>

<div class="row mb-4 d-flex justify-content-between align-items-center">
    <div class="col-md-2 col-lg-2 col-xl-2">
        <img
        :src="'images/'+basketProduct.image" 
        class="img-fluid rounded-3" alt="Cotton T-shirt">
    </div>
    <div class="col-md-3 col-lg-3 col-xl-3">
        <h6 class="text-muted">Plant</h6>
        <h6 class="text-black mb-0">{{basketProduct.name}}</h6>
    </div>
    <div class="col-md-3 col-lg-3 col-xl-3 d-flex">
        <button class="btn btn-link px-2"
        @click="decrement()">
        <i class="bi bi-dash-circle-fill fa-2x" style="color: black; font-size:19px;"></i>
        </button>

        <div>
            {{quantity}}
        </div>

        <button class="btn btn-link px-2"
        @click="increment()">
        <i class="bi bi-plus-circle-fill fa-2x" style="color: black; font-size:19px;"></i>
        </button>
    </div>
    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 class="mb-0">{{basketProduct.price}} €</h6>
    </div>
    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
        <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
    </div>
</div>
<hr class="my-4">
</div>
</template>
    
<script>
export default {
    //props: ['name', 'price', 'imageSrc', 'id', 'quantity'],
    props: ['basketProduct'],
    methods: {	
        increment() {
            //console.log(quantity)
            console.log("quantity before" + this.$store.getters['products/getProduct'](this.basketProduct.id).quantity);
            this.$store.commit('basket/incrementProduct', this.basketProduct.id);
            console.log("quantity after" + this.$store.getters['products/getProduct'](this.basketProduct.id).quantity);
            this.$emit('callbackfn');
            this.quantity++;
        },
        decrement() {
            console.log("test");
            this.$store.commit('basket/decrementProduct', this.basketProduct.id);
            this.quantity--;
            this.$emit('callbackfn');
        },
    },
    computed: {
        
    },


    created() {
        this.quantity = this.basketProduct.quantity;
        //console.log(this.basketProduct);
	},
    data() {
        return {
            quantity: 0,
        }
    }
}

</script>  
    
    