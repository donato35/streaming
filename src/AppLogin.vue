<template>
	<div >
		<amplify-authenticator>
			<slot name="secondary-footer-content">
			<amplify-sign-in :hide-sign-up="true"></amplify-sign-in>
			</slot>
		</amplify-authenticator>
	</div>
	<Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined p-mb-2" @click="test()"/>
</template>

<script>
	
	import { Auth } from "aws-amplify";
	import { mapActions } from "vuex";

	export default {
		name: "AppLogin",

		created() {
			
		},
		data() {
			return {
				user: undefined,
				authState: undefined,
			};
		},
		
		methods: {
			...mapActions('general',['storeUser']),
			test() {
				console.log(Auth.currentAuthenticatedUser())
			}
		}
	}
</script>

<style scoped>

</style>