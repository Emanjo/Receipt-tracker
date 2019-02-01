import Chart from 'chart.js';

export function lineChart(ctx, title) {
    let lineChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Rema", "Kiwi", "Meny"],
          datasets: [{
              label: 'Total sum in NOK',
              data: [1503, 789, 246],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgb(122, 238, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgb(122, 238, 132, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          },
          title: {
            display: true,
            text: title,
            fontSize: 25
          }
      }
    });

    return lineChart;
}