<template>

<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #5F8575;">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand">Mips Plants</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><router-link class="nav-link active" to="/">Home</router-link></li>
                        <li class="nav-item"><router-link class="nav-link" to="/shop">Shop</router-link></li>
                    </ul>

                    <form class="d-flex">
                        <!--<router-link class="nav-item nav-link active" style="position: absolute; right:5rem;" to="/">Home</router-link>-->
                        <router-link v-if="!userAuth" style="padding: 0.5rem 0.8rem; color: black; text-decoration: none;" to="/login">Login</router-link>
                        <router-link v-else style="padding: 0.5rem 0.8rem; color: black; text-decoration: none;" to="/myorders">My Orders</router-link>


                        <router-link v-if="!userAuth" style="padding: 0.5rem 0rem; color: black; text-decoration: none; margin-right:1rem;" to="/register">Register</router-link>
                        <router-link v-else style="padding: 0.5rem 0rem; color: black; text-decoration: none; margin-right:1rem;" to="/logout">Logout</router-link>


                        <router-link to="/basket">
                                
                        <button class="btn btn-outline-dark" type="submit">
                            <i class="bi-cart-fill me-1"></i>
                            Cart
                            <span class="badge bg-dark text-white ms-1 rounded-pill">{{this.getBasketNumber()}}</span>
                        </button>
                        </router-link>
                    </form>
                </div>
            </div>
</nav>
</template>


<script>
export default {
    
    data() {
		return {
			userAuth: false,
		}
	},
    methods: {	
        getBasketNumber() {
            const products = this.$store.getters['basket/getProducts'];
            //console.log(products.length);
            return products.length;
        },
        initUserAuth() {
            this.userAuth = this.$store.getters['user/getUser'].id != undefined;
        }
    },
    computed: {
        
    },
    created() {
        this.initUserAuth();
    },
}

</script>  

