import Chart from 'chart.js';

function getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


export function barChart(ctx, title, data) {
  const labels = [], total = [], colors = [];

  data.forEach(element => {
    labels.push(element['retailer'])
    total.push(element['total']);
    colors.push(getRandomColor());
  });

  return new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Total sum',
            data: total,
            backgroundColor: colors,
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
          fontSize: 20
        },
        legend: { display: false} 
    }
  });
}