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
	import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
	import { Hub , Auth } from "aws-amplify";
	import { mapActions } from "vuex";
	const listener = (data) => {
		switch (data.payload.event) {
			case 'signIn':
				console.log('user signed in');
				console.log(this)
				break;
			case 'signUp':
				console.log('user signed up');
				break;
			case 'signOut':
				console.log('user signed out');
				break;
			case 'signIn_failure':
				console.log('user sign in failed');
				break;
			case 'tokenRefresh':
				console.log('token refresh succeeded');
				break;
			case 'tokenRefresh_failure':
				console.log('token refresh failed');
				break;
			case 'configured':
				console.log('the Auth module is configured');
			}
	}
	Hub.listen('auth', listener);
	export default {
		name: "AppLogin",

		created() {
			onAuthUIStateChange(async (authState, authData) => {
				console.log(AuthState)
				if (authState=='signedin'){
					console.log(authData)
					var cognitoUserSession = await Auth.currentSession();
					this.storeUser({
						email: authData.attributes.email,
						sub: authData.attributes.sub,
						jwtToken: cognitoUserSession.accessToken.jwtToken,
					});
				}
			});
		},
		data() {
			return {
				user: undefined,
				authState: undefined,
			};
		},
		beforeUnmount() {
			return onAuthUIStateChange;
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