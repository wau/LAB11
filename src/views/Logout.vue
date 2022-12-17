<template>
	<div>

	</div>
</template>

<script>

export default {

	data() {
		return {
			success: false,
			user: {},
		}
	},


	methods: {


	},
   
	created: async function () {
		const sessionID = this.$store.getters['user/getUser'].session_id;
		const canLogout = await this.$store.dispatch('user/logoutUser', sessionID);
		if (canLogout) {
			this.$router.push({ path: '/message/2'});
		}		
	},

}
</script>
