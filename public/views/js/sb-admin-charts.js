// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// -- Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: ["Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6", "Oct 7", "Oct 8", "Oct 9", "Oct 10", "Oct 11", "Oct 12", "Oct 13", "Oct 14", "Oct 15"],
    datasets: [{
      label: "Actions",
      lineTension: 0.5,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: [15, 12, 20, 10, 18, 22, 30, 27, 23, 14, 45, 40, 38, 32, 25],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 15
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 50,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
// -- Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["May", "June", "July", "August", "September", "October"],
    datasets: [{
      label: "Open",
      backgroundColor: "rgba(40, 167, 69, 1)",
      borderColor: "rgba(40, 167, 69, 1)",
      data: [25,75, 20, 30, 85, 15],
    },
    {
        label: "Closed",
        backgroundColor: "rgba(220, 53, 69, 1)",
        borderColor: "rgba(220, 53, 69, 1)",
        data: [15, 50, 10, 25, 70, 10],
    },
    {
        label: "Pending",
        backgroundColor: "rgba(255, 196, 7, 1)",
        borderColor: "rgba(255, 196, 7, 1)",
        data: [10, 25, 10, 5, 15, 5],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          maxTicksLimit: 3
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: true
    }
  }
});
// -- Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
      labels: ["Closed", "Pending"],
    datasets: [{
      data: [180, 70],
      backgroundColor: ['#dc3545', '#ffc107'],
    }],
  },
});
