<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
				<h5>Empty Page</h5>
				<p>{{localVar}} aase this page to start from scratch and place your custom content.</p>
				<Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined p-mb-2" @click="test()"/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'monitoring',
	computed: mapState({
		localVar: state => state.events.prova
	}),
	methods: {
		test(){
			//this.$store.state.events.prova="cambiooo"
			this.$store.commit('events/increment',"arrivato")

		}
	}

}
</script>

<style scoped>

</style>
