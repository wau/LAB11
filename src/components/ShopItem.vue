<template>
<div class="col mb-5">
    <div class="card h-100">
        <img class="card-img-top" :src="'images/'+imageSrc" alt="..." width="250" height="320" />
        <div class="card-body p-4">
        <div class="text-center">
            <!-- Product name-->
            <h5 class="fw-bolder">{{name}}</h5>
            <!-- Product price-->
            {{price}} €
            
        </div>
        </div>
        <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
                <button @click="addToBasket()" class="btn btn-outline-dark mt-auto">Order</button>
            </div>
        </div>
    </div>
</div>  
</template>
    
<script>
export default {
    props: ['name', 'price', 'imageSrc', 'id'],
    methods: {	
        addToBasket() {
            //console.log(this.price);
            this.$store.commit('basket/incrementProduct', this.id);
            
        }
    },
    computed: {

    },
    data() {
        return {
            
        }
    }
}

</script>  
    
    