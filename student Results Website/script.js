var API_URL = 'https://script.google.com/macros/s/AKfycbxs5DC_wQMvUYDoZsbh6iIVWqTWdQ-B8MdyIcjU32T2LW8lR7xv85Nj7UXEZfR52HpB/exec';

var students = [];

var tbody = document.getElementById('tbody');
var searchBox = document.getElementById('searchBox');
var countEl = document.getElementById('count');

function loadData() {

    fetch(API_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        students = data;
        displayStudents(students);
    })
    .catch(function(error) {
        countEl.textContent = 'Error loading student records';
        console.log(error);
    });

}

function displayStudents(list) {

    tbody.innerHTML = '';

    list.forEach(function(student) {

        var row = document.createElement('tr');

        row.innerHTML =
            '<td>' + student.srNo + '</td>' +
            '<td>' + student.rollNo + '</td>' +
            '<td>' + student.name + '</td>' +
            '<td>' + student.tenth + '</td>' +
            '<td>' + student.twelfth + '</td>' +
            '<td>' + student.sem1 + '</td>' +
            '<td>' + student.sem2 + '</td>';

        tbody.appendChild(row);

    });

    countEl.textContent =
        'Showing ' + list.length + ' students';

}

searchBox.addEventListener('input', function() {

    var value = searchBox.value.toLowerCase();

    var filtered = students.filter(function(student) {

        return student.name.toLowerCase().includes(value) ||
               student.rollNo.toLowerCase().includes(value);

    });

    displayStudents(filtered);

});

loadData();
// Sorting functionality

var headers = document.querySelectorAll('th');

var sortDirections = {};

var sortKeys = [
'srNo',
'rollNo',
'name',
'tenth',
'twelfth',
'sem1',
'sem2'
];

headers.forEach(function(header, index) {

```
header.style.cursor = 'pointer';

header.addEventListener('click', function() {

    var key = sortKeys[index];

    sortDirections[key] = !sortDirections[key];

    students.sort(function(a, b) {

        var valueA = a[key];
        var valueB = b[key];

        if (typeof valueA === 'string' &&
            typeof valueB === 'string') {

            return sortDirections[key]
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }

        return sortDirections[key]
            ? Number(valueA) - Number(valueB)
            : Number(valueB) - Number(valueA);

    });

    displayStudents(students);

});
```

});
