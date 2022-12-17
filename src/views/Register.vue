<template>
	<div>
		<Header />
		
		<Error v-if="error"  :errorMsg="errorMsg" style="top: 0rem;" />
	

		<div v-if="userAuth">
		<h3 style="text-align: center; margin-top: 5rem; color:white;">Already Logged in!</h3>
		</div>

		<div v-else class="card position-absolute translate-middle shadow-lg p-3  bg-body"
			style=" display: block; width: 28rem; height: 28rem; color: blue; left:50%; top:45%; margin-top: 3rem; margin-bottom: auto; border-radius: 10px;">
			<div class="position.position-relative start-0 top-50 text-center fs-4"> Register</div>
			<form @submit.prevent="register">
				<div class="form-floating mb-2 mx-auto" style="width: 85%; margin: 1.5rem;">
					<input v-model="user.name" name="name" type="text" class="form-control" id="nameControl"
						placeholder="Name" style="border-radius:9px;">
					<label for="nameControl" class="form-label">Name</label>
				</div>
				<div class="form-floating mb-2 mx-auto" style="width: 85%; margin: 1.5rem;">
					<input v-model="user.email" name="email" type="email" class="form-control"
						id="exampleFormControlInput1" placeholder="Email address" style="border-radius:9px;">
					<label for="exampleFormControlInput1">Email address</label>
				</div>
				<div class="form-floating mb-2 mx-auto" style="width: 85%; margin: 1.5rem;">
					<input v-model="user.password" name="password" type="password" class="form-control"
						id="floatingPassword" placeholder="Password" style="border-radius:9px;">
					<label for="floatingPassword">Password</label>
				</div>
				<div class="form-floating mb-3 mx-auto" style="width: 85%; margin: 1.5rem;">
					<input v-model="passwordConfirmation" type="password" class="form-control" id="floatingPassword2"
						placeholder="Confirm password" style="border-radius:9px;">
					<label for="floatingPassword2">Confirm password</label>
				</div>
				<button class="position-absolute btn btn-primary translate-middle-x p-2"
					style="left: 50%; font-size: 18px;" type="submit">Sign Up</button>
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
		Error
	},
	data() {
		return {
			user: {
				name: '',
				email: '',
				password: '',
			},
			passwordConfirmation: '',
			submitting: true,
			error: false,
			errorMsg: '',
			userAuth: false,
		}
	},

	methods: {

		validateForm() {
			var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			console.log(this.user.password + " " + this.passwordConfirmation);

			if (!this.user.email.match(validRegex)) {
				this.error = true;
				this.errorMsg = 'Invalid email format';
				return false;
			}
			else if (this.user.password !== this.passwordConfirmation) {

				this.error = true;
				this.errorMsg = 'Passwords dont match!';
				return false;
			}
			else if (this.user.password.length < 6) {
				this.error = true;
				this.errorMsg = 'Passwords must be at least 6 characters long';
				return false;
			}

			this.error = false;
			this.errorMsg = '';
			return true;
		},

		async register() {
			if (!this.validateForm()) {
				return;
			}
			const exists = await this.$store.dispatch('user/userExists', this.user);
			if (exists) {
				console.log("existe na BD");
			}
			else { //add user to database
				console.log("teste aq");
				const addedUser = await this.$store.dispatch('user/addUser');
				this.$router.push({ path: '/message/0' });
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
	
<style scoped>

</style>