import Chart from 'chart.js';

export function barChart(ctx, title, data) {
  let labels = [], total = [];

  data.forEach(element => {
    labels.push(element['retailer'])
    total.push(element['total']);
  });

  return new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Total sum',
            data: total,
            backgroundColor: [],
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
}