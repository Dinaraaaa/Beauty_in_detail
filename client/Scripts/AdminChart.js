  document.addEventListener('DOMContentLoaded', () => {
  fetch(`${window.API_URL}/record/revenueByMonth`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка при получении данных о прибыли');
          }
          return response.json();
      })
      .then(data => {
          if (!Array.isArray(data)) {
              throw new Error('Данные о прибыли не являются массивом');
          }

          const months = data.map(entry => getMonthName(entry.month));
          const revenues = data.map(entry => entry.total_revenue);

          const ctxRevenue = document.getElementById('revenue-chart').getContext('2d');
          new Chart(ctxRevenue, {
              type: 'bar',
              data: {
                  labels: months,
                  datasets: [{
                      label: 'Прибыль',
                      data: revenues,
                      backgroundColor: 'rgba(54, 162, 235, 0.6)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1
                  }]
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });

          // После успешной загрузки прибыли, загрузим данные о посещаемости
          loadVisitsChartData();
      })
      .catch(error => console.error(error));

      function loadVisitsChartData() {
        fetch(`${window.API_URL}/record/recordCompleteness`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных о посещаемости');
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    data = [data]; // Преобразовать полученный объект в массив
                }
    
                const completenessData = data.map(entry => {
                    const filledRecords = parseInt(entry.filled_records);
                    const emptyRecords = parseInt(entry.empty_records);
                    const totalRecords = filledRecords + emptyRecords;
                    const filledPercentage = (filledRecords / totalRecords) * 100;
                    const emptyPercentage = (emptyRecords / totalRecords) * 100;
                    return [filledPercentage, emptyPercentage];
                });
    
                const ctxVisits = document.getElementById('visits-chart').getContext('2d');
                new Chart(ctxVisits, {
                    type: 'doughnut',
                    data: {
                        labels: ['Заполненные окна', 'Пустые окна'],
                        datasets: [{
                            label: 'Процент посещаемости',
                            data: completenessData[0], // Изменено на completenessData[0] и completenessData[1]
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(255, 99, 132, 0.6)'
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: 80,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom'
                            },
                            title: {
                                display: true,
                                text: 'Процент посещаемости'
                            }
                        }
                    }
                });
            })
            .catch(error => console.error(error));
    }

  function getMonthName(monthNumber) {
      const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      return monthNames[monthNumber - 1];
  }
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("buttoncategory").addEventListener("click", function() {
      window.location.href = "Admin_categoryservice.html";
    });
    document.getElementById("buttonservice").addEventListener("click", function() {
      window.location.href = "Admin_service.html";
    });
    document.getElementById("buttonclient").addEventListener("click", function() {
      window.location.href = "Admin_clients.html";
    });
    document.getElementById("buttonmaster").addEventListener("click", function() {
      window.location.href = "Admin_masters.html";
    });
    document.getElementById("buttonrecord").addEventListener("click", function() {
      window.location.href = "Admin_record.html";
    });
    document.getElementById("buttondiagramma").addEventListener("click", function() {
      window.location.href = "Chart.html";
    });
  });
    document.addEventListener('DOMContentLoaded', function() {
      const hamburgerIcon = document.querySelector('.hamburger-icon');
      const hamburgerContent = document.querySelector('.hamburger-content');
    
      hamburgerIcon.addEventListener('click', function() {
        hamburgerContent.classList.toggle('active');
      });
    document.getElementById("buttoncategory2").addEventListener("click", function() {
      window.location.href = "Admin_categoryservice.html";
    });
    document.getElementById("buttonservice2").addEventListener("click", function() {
      window.location.href = "Admin_service.html";
    });
    document.getElementById("buttonclient2").addEventListener("click", function() {
      window.location.href = "Admin_clients.html";
    });
    document.getElementById("buttonmaster2").addEventListener("click", function() {
      window.location.href = "Admin_masters.html";
    });
    document.getElementById("buttonrecord2").addEventListener("click", function() {
      window.location.href = "Admin_record.html";
    });
    document.getElementById("buttondiagramma2").addEventListener("click", function() {
      window.location.href = "Chart.html";
    });
  });