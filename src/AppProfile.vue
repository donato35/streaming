<template>
	<div class="layout-profile">
		<div>
			<img src="assets/layout/images/profile_m.png" alt="" />
		</div>
		<button class="p-link layout-profile-link" @click="onClick">
			<span class="username">{{username}}</span>
			<i class="pi pi-fw pi-cog"></i>
		</button>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li><button class="p-link"  @click="logOut"><i class="pi pi-fw pi-power-off"></i><span>Logout</span></button></li>
            </ul>
        </transition>
	</div>
</template>

<script>
	import { Auth } from "aws-amplify";
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				expanded: false
			}
		},
		methods: {
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
			},
			logOut(){
				Auth.signOut();
			},
		},
		computed: {
			...mapState('general', {
				username: state => state.username
			}),
		}
	}
</script>
