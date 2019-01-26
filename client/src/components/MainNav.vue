<template>
	<div id="main-nav">
			<nav>
					<div class="table">
							<a class="table-row" href="#">
								<div class="table-cell"><font-awesome-icon icon="tachometer-alt" /></div>
								<div class="table-cell">Overview</div>
							</a>
						<a class="table-row" href="#">
							<div class="table-cell"><font-awesome-icon icon="receipt" /></div>
							<div class="table-cell">Reciept</div>
						</a>
						<a class="table-row" href="#">
							<div class="table-cell"><font-awesome-icon icon="chart-line" /></div>
							<div class="table-cell">Statistics</div>
						</a>
					</div>
			</nav>
		</div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="scss">

#main-nav {
	text-align: left;
	width: 100%;
	word-break: break-all;
}

.logo {
	background: #565695;
}

nav {
	a {
		color: #8080B3;
		display: flex;
		align-items: center;
		text-decoration: none;
		&:hover {
			color: white;
		}
	}
}

.table {
	display: table;
	.table-row {
		display: table-row;
		.table-cell {
			display: table-cell;
			padding: 5px;
		}
	}
}

</style>