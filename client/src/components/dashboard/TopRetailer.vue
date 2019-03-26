<template>
	<v-card>
		<v-card-title primary-title>
			<v-layout row wrap>
				<v-flex xs12>
					<div class="text-xs-center">
						<h2 class="font-weight-thin">Top Retailers</h2>
					</div>
				</v-flex>
				<v-flex xs12>
					<v-text-field
						label="Last ... days"
						hint="For example last 30 days"
						box
						class="pt-2"
						v-model="days"
						type="number"
						@change="updateChart"
					></v-text-field>
				</v-flex>
			</v-layout>
		</v-card-title>
		<div class="loader text-xs-center">
			<img v-if="notLoaded" src="../../assets/loader.gif" alt="Loading icon">
		</div>
		<div class="pr-3 pb-3 pt-0">
			<canvas px-2 ref="chartRef"></canvas>
		</div>
	</v-card>
</template>

<script>
import { barChartTopRetailers } from '../../helpers/createCharts';
import axios from 'axios';

    export default {
        data() {
            return {
                chartData: null,
								notLoaded: true,
								error: false,
								days: 7
            }
				},
				methods: {
					async updateChart() {
						if(this.chartData) { this.chartData.destroy() }

            this.notLoaded = true;
        
            const chart = this.$refs.chartRef, 
            chartCtx = chart.getContext("2d");

            axios.get(`/api/retailers/sum/${this.days}`)
            .then( response => {
    
						this.chartData = barChartTopRetailers(chartCtx, response.data.data);

						this.notLoaded = false;
						this.error = false;

            })
            .catch( () => {
            this.notLoaded = false;
            this.error = true;
            });

					}

				},
				mounted() {
					this.updateChart();
				}
    }
</script>

<style scoped>

</style>