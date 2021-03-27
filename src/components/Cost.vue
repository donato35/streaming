<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
				<h5>Empty Page</h5>
				<p>{{localVar}} aase this page to start from scratch and place your custom content.</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {

	computed: mapState({
    
    // passing the string value 'count' is same as `state => state.count`
    localVar: state => state.events.prova
  })

}
</script>

<style scoped>

</style>
