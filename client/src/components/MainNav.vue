<template>
	<div id="main-nav">
		<div class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container">
			<router-link to="/" class="navbar-brand">Receipt Tracker</router-link>
				<div class="collapse navbar-collapse" id="navbarNavDropdown">
					<ul class="navbar-nav">
						<li class="nav-item">
							<router-link to="/" exact class="nav-link">
							<font-awesome-icon icon="tachometer-alt" /> Overview
							</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/new-receipt" class="nav-link">
								<font-awesome-icon icon="receipt" /> New receipt
							</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/statistics" class="nav-link">
								<font-awesome-icon icon="chart-line" /> Statistics
							</router-link>
						</li>
					</ul>
				</div>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="scss">


</style>