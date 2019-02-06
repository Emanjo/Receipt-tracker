<template>
	<div id="main-nav" class="navbar navbar-expand-lg navbar-light bg-light">
		<router-link to="/" class="navbar-brand">Receipt Tracker</router-link>
							<router-link to="/" exact class="table-row">
								<div class="table-cell --table-cell-center"><font-awesome-icon icon="tachometer-alt" /></div>
								<div class="table-cell">Overview</div>
							</router-link>
						<router-link to="/new-receipt" class="table-row">
							<div class="table-cell --table-cell-center"><font-awesome-icon icon="receipt" /></div>
							<div class="table-cell">New receipt</div>
						</router-link>
						<router-link to="/statistics" class="table-row">
							<div class="table-cell --table-cell-center"><font-awesome-icon icon="chart-line" /></div>
							<div class="table-cell">Statistics</div>
						</router-link>
	</div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="scss">



</style>