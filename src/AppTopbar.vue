<template>
	<div class="layout-topbar">
		<button class="p-link layout-menu-button" @click="onMenuToggle">
			<span class="pi pi-bars"></span>
			
		</button>
		<span class="p-text-bold p-ml-5 layout-topbar-title" >STREAMING PLATFORM</span>
		<div class="layout-topbar-icons">
			
			<button class="p-link">
				<span class="layout-topbar-item-text">Events</span>
				<span class="layout-topbar-icon pi pi-calendar"></span>
				<span class="layout-topbar-badge">5</span>
			</button>
			<button class="p-link">
				<span class="layout-topbar-item-text">Settings</span>
				<span class="layout-topbar-icon pi pi-cog"></span>
			</button>
			<button class="p-link" @click="onTest">
				<span class="layout-topbar-item-text">User</span>
				<span class="layout-topbar-icon pi pi-user"></span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
        return {
			connection: null
		}
	},
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTest() {
            this.connection.send("ciaoooooo");
        }
    },
	created() {
		this.connection = new WebSocket("wss://5u8ehwe34c.execute-api.eu-west-1.amazonaws.com/production")
		this.connection.onopen = function(event) {
			console.log(event)
			console.log("Successfully connected to the echo websocket server...")
		}

	}
}
</script>