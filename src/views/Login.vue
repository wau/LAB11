<template>
	<div>
		<Header />
		<!-- {if isset($loginMessage)}
			<div class="card bg-danger text-white tex" style="top: 5rem;">
				<div class="card-body text-center border">
					<h3>{$loginMessage}</h3> 
				</div>
			</div>
		{/if} -->

		<div v-if="error">
			<Error :errorMsg="errorMsg" />
		</div>


		<div v-if="userAuth">
		<h3 style="text-align: center; margin-top: 5rem; color:white;">Already Logged in!</h3>
		</div>

		<div v-else class="card position-absolute translate-middle shadow-lg p-4  bg-body"
			style=" display: block; width: 30rem; height: 22rem; color: blue; left:50%; top:45%; border-radius: 10px;">
			<div class="position.position-relative start-0 top-50 text-center fs-4"> Login</div>
			<form @submit.prevent="login">
				<div class="form-floating mb-2 mx-auto" style="width: 85%; margin: 1.5rem;">
					<input v-model="user.email" name="email" type="email" class="form-control"
						id="exampleFormControlInput1" placeholder="Email address" style="border-radius:9px;">
					<label for="exampleFormControlInput1">Email address</label>
				</div>
				<div class="form-floating mb-3 mx-auto" style="width: 85%; margin: 1.5rem;">
					<input v-model="user.password" name="password" type="password" class="form-control"
						id="floatingPassword" placeholder="Password" style="border-radius:9px;">
					<label for="floatingPassword">Password</label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
						style="margin-left: 1rem;">
					<label name="rememberMe" class="form-check-label" for="flexCheckDefault"
						style="margin-left: 0.8rem;">
						Remember Me?
					</label>
				</div>
				<button class="position-absolute btn btn-primary translate-middle-x p-2"
					style="left: 50%; font-size: 18px;" type="submit">Sign In</button>

			</form>
		</div>

		<Footer />

	</div>
</template>
	
<script>

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Error from '@/components/Error.vue'

export default {
	components: {
		Footer,
		Header,
		Error,
	},
	data() {
		return {

			user: {
				email: '',
				password: '',
			},
			submitting: false,
			error: false,
			errorMsg: '',
			userAuth: false,
		}
	},

	methods: {
		async login() {
			console.log(this.user);

			const canLogin = await this.$store.dispatch('user/loginUser', this.user);
			if (canLogin) {
				//console.log(this.$store.getters('user/getUser'));
				//this.$store.commit
				//console.log(this.$store.getters.loginUser);
				console.log(this.$store.getters['user/getUser']);
				this.$router.push({ path: '/message/1' });
			}
		},
	},

	computed: {

	},
	directives: {

	},
	created() {
		this.userAuth = this.$store.getters['user/getUser'].id != undefined;
	}
}
</script>
