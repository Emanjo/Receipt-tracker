<template>
    <div id="overview">
			<div class="square">
				<h1 class="square-title">Receipts</h1>
			</div>
			<div class="square">
				<h1 class="square-title">Top items</h1>

			</div>
			<div class="square">
				<h1 class="square-title">Top retailers</h1>

			</div>
			<div class="square">

			</div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="scss">

#overview {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: stretch;
	height: 100%;
}

.square {
	background: lightgray;
	flex-basis: calc(50% - 40px);
	padding: 20px;
	margin: 20px;
	max-height: calc(50% - 40px);
	min-height: calc(50% - 40px);
}

.square-title {
	text-align: center;
}


</style>