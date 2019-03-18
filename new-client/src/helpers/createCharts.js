import Chart from 'chart.js';

//Gets a random color that can be feds into a chart insted of predefining a set of colors
function getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function barChartTopRetailers(ctx, data) {
    let labels = [], total = [], colors = [];

  //Creates new objects with default sum of 0 and adds it to retailersAndSum const
  data.forEach( retailer => {
      
      labels.push(retailer._id);
      total.push(retailer.sum);
      colors.push(getRandomColor());
  });

  labels.slice(0,10);
  total.slice(0,10);

  return new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Total sum',
            data: total,
            backgroundColor: colors,
            borderWidth: 1
        }],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes: [{
                display: false
            }]
        },
        legend: { display: false},
    }
  });
}

export function barChartTopItems(ctx, data) {
    let labels = [], total = [], colors = [];

  data.forEach( retailer => {
      labels.push(retailer._id);
      total.push(retailer.count);
      colors.push(getRandomColor());
  });

  labels = labels.slice(0,10);
  total = total.slice(0,10);

  return new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Count',
            data: total,
            backgroundColor: colors,
            borderWidth: 1
        }],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes: [{
                display: false
            }]
        },
        legend: { 
            display: false
        },
    }

  });
}