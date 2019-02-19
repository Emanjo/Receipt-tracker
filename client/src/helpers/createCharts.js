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

export function barChartTopRetailers(ctx, title, receipts, retailers) {
  const retailersAndSum = [], labels = [], total = [], colors = [];

  //Creates new objects with default sum of 0 and adds it to retailersAndSum const
  retailers.forEach( retailer => retailersAndSum.push({name: retailer.name, sum: 0}));
  
  //Adds sums to each object in retailersAndSum const
  retailersAndSum.forEach( retailer => {
    receipts.forEach( receipt => {
      if(receipt.retailer === retailer.name) {
        retailer.sum += receipt.sum;
      }
    });
  });

  //Makes a dataset for the chart
  retailersAndSum.forEach(retailer => {
    labels.push(retailer.name);
    total.push(retailer.sum);
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