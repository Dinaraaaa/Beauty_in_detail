const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("http://localhost:3001/services/getServices", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    const table = document.getElementById("client");
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    headerRow.insertCell(0).textContent = "ID";
    headerRow.insertCell(1).textContent = "Наименование";
    headerRow.insertCell(2).textContent = "Время";
    headerRow.insertCell(3).textContent = "Стоимость";
    headerRow.insertCell(4).textContent = "Категория услуги";
    headerRow.style.fontWeight = "bold";
    
    data.forEach((service) => {
      const row = table.insertRow();
      row.insertCell(0).textContent = service.id;
      row.insertCell(1).textContent = service.name;
      row.insertCell(2).textContent = service.time;
      row.insertCell(3).textContent = service.price;
      row.insertCell(4).textContent = service.category_name;
    });
    showPage(currentPage);
    renderPaginationButtons(Math.ceil((data.length+1) / itemsPerPage));
  })
  .catch((error) => console.error(error));

  function openModal() {
    document.getElementById("addForm").style.display = "block";
}

function closeModal() {
    document.getElementById("addForm").style.display = "none";
}

function openRedModal() {
  document.getElementById("redForm").style.display = "block";
}

function closeRedModal() {
    document.getElementById("redForm").style.display = "none";
}
function openDelModal() {
  document.getElementById("delForm").style.display = "block";
}

function closeDelModal() {
    document.getElementById("delForm").style.display = "none";
}
let currentPage = 1;
const itemsPerPage = 10; // Количество элементов на странице

// Функция для отображения данных на текущей странице
function showPage(pageNumber) {
    const rows = document.getElementById('client').rows;
    
    // Определяем границы отображаемых данных
    const start = (pageNumber - 1) * itemsPerPage;
    const end = pageNumber * itemsPerPage;

    // Перебираем все строки таблицы и скрываем лишние
    for (let i = 0; i < rows.length; i++) {
        if (i >= start && i < end) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Функция для генерации кнопок пагинации
function renderPaginationButtons(totalPages) {
    const paginationContainer = document.getElementById('paginationButtons');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            showPage(currentPage);
        });
        paginationContainer.appendChild(button);
    }
}
function addRecord() {
  const name = document.getElementById("name1").value;
  const time = document.getElementById("time1").value;
  const price = document.getElementById("price1").value;
  const idcategoreservices = document.getElementById("services1").value;

  const data = { name, time, price, idcategoreservices };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch("http://localhost:3001/services/addServices", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при добавлении данных");
      }
      alert("Данные добавлены");
      window.location.reload(); // Перезагружаем страницу для отображения изменений
    })
    .catch((error) => alert(error));
}
function searchTable(){
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("client");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1]; 
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function redRecord() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const time = document.getElementById("time").value;
  const price = document.getElementById("price").value;
  const idcategoreservices = document.getElementById("services").value;
  const data = { name, time, price, idcategoreservices };

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch(`http://localhost:3001/services/updateServices/${id}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при обновлении данных");
      }
      alert("Данные обновлены");
      window.location.reload();
    })
    .catch((error) => alert(error));
}

function delRecord() {
  const id = document.getElementById("id3").value;

  const requestOptions = {
    method: "DELETE",
    redirect: "follow"
  };

  fetch(`http://localhost:3001/services/deleteServices/${id}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при удалении данных");
      }
      alert("Данные успешно удалены");
      window.location.reload();
    })
    .catch((error) => alert(error));
}
  fetch("http://localhost:3001/category/getCategory", requestOptions)
  .then(response => {
      if (!response.ok) {
          throw new Error('Ошибка');
      }
      return response.json();
  })
  .then(data => {
    const selectElement1 = document.getElementById("services1");
    const selectElement = document.getElementById("services");
    data.forEach(category => {
        const option1 = document.createElement("option");
        option1.value = category.id; // Установите значение опции на id категории
        option1.text = category.name; // Установите текст опции на имя категории

        const option2 = document.createElement("option");
        option2.value = category.id; // Установите значение опции на id категории
        option2.text = category.name; // Установите текст опции на имя категории

        selectElement.appendChild(option1);
        selectElement1.appendChild(option2);
    });
  })
  .catch(error => {
      console.log("error", error);
  });
  document.getElementById("id").addEventListener("input", function() {
    const id = this.value;
    const servicesId = parseInt(id);
    if (id) {
      fetch(`http://localhost:3001/services/getServices/${servicesId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          document.getElementById("id").value = data.id;
          document.getElementById("name").value = data.name;
          document.getElementById("time").value = data.time;
          document.getElementById("price").value = data.price;
          const selectElement = document.getElementById("services");
          const categoryId = data.idcategoreservices; 
          selectElement.value = categoryId;
        })
        .catch(error => {
          console.log("error", error);
        })
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