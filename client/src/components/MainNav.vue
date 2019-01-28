<template>
	<div id="main-nav">
			<nav>
					<div class="table">
							<router-link to="/" exact class="table-row">
								<div class="table-cell --table-cell-center"><font-awesome-icon icon="tachometer-alt" /></div>
								<div class="table-cell">Overview</div>
							</router-link>
						<router-link to="/new-receipt" class="table-row">
							<div class="table-cell --table-cell-center"><font-awesome-icon icon="receipt" /></div>
							<div class="table-cell">New reciept</div>
						</router-link>
						<router-link to="/statistics" class="table-row">
							<div class="table-cell --table-cell-center"><font-awesome-icon icon="chart-line" /></div>
							<div class="table-cell">Statistics</div>
						</router-link>
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
	word-break: break-word;
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

.router-link-active {
	color: #b38082;
	font-weight: bold;
}

.table {
	display: table;
	.table-row {
		display: table-row;
		.table-cell {
			display: table-cell;
			padding: 5px;
			&.table-cell.--table-cell-center {
				text-align: center;
			}
		}
	}
}

</style>