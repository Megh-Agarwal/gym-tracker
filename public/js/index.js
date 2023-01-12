var ctx = document.getElementById('myChart').getContext('2d');
var array = [];

for(var i = 0; i < localStorage.length; i++) array.push(JSON.parse(localStorage.getItem((i + 1).toString())))

array.sort(function(x, y){
    return x.date - y.date;
})

var data = [];
var label = [];

for(var i = 0; i < array.length; i++){
    data.push(array[i].hours);
    let date = new Date(array[i].date);
    label.push(((date.getDate()).toString() + '/' + (date.getMonth() + 1).toString() + '/' + (date.getFullYear())).toString());
}

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: label,
        datasets: [{
            label: 'Number of gym hours',
            data: data,
            fill: false,
            borderColor: '#2196f3',
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        }]},
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    }
});

const form = document.getElementById('calorie-form')
const errors  = document.getElementById('form-error');
const store = document.getElementById('store');
const results = document.getElementById('results');
const formContent = document.getElementById('form-content');
const prevContent = document.getElementById('prev-content');

$("#submit").on('click', function(e) {
    let hours = parseFloat($("#hours").val());
    if(isNaN(hours) || hours < 0) {
        return showErrorMessage('Please enter a valid number of hours');
    }

    function storeResult() {
        var count = localStorage.length;
        var date = new Date();
        localStorage.setItem(((count + 1).toString()), JSON.stringify({hours: hours, date: date}));
    }
    
    function showErrorMessage(msg) {
        errors.innerHTML = msg;
        errors.style.display = '';
        return false;
    }
    
    function showResults(calories) {
        store.style.display = ''
        form.style.display = 'none'
        errors.style.display = 'none'
    }

    // Display results
    showResults(hours);
    store.addEventListener('click', storeResult);
})

$("#prev").on("click", function(e) {
    prevContent.style.display = ''
    var string = `<table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Hours</th>
        <th scope="col">Date</th>
      </tr>
    </thead>
    <tbody>`;
    formContent.style.display = 'none';
    var length = localStorage.length;
    for(var i = 0; i < length; i++) {
        var item = JSON.parse(localStorage.getItem((i + 1).toString()));
        let date = new Date(item.date);
        string += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${item.hours}</td>
        <td>${((date.getDate()).toString() + '/' + (date.getMonth() + 1).toString() + '/' + (date.getFullYear())).toString()}</td>
      </tr>`
    }
    string += `</tbody></table>`
    $("#prev-content").html(string)
})


$("#new").on("click", function(e) {
    prevContent.style.display = 'none'
    formContent.style.display = '';
})