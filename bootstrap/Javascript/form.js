function getGrade() {
    return grade = document.getElementById("grade").value;
}

function addNewUser() {
    document.getElementById("addNewUser").onclick;
    location.href = "./form.html";
}

function getUser() {
    let userList = localStorage.getItem("userList");
    let userList = localStorage.getItem("userList");
    if (userList != null) {
        users = JSON.parse(userList);
    }
    return users
}

function showTable() {
    var users = getUser();
    document.getElementById("showUserTable");
    location.href = "./table.html";
}

$(document).ready(function () {
    var users = getUser();
    $('#table').DataTable({
        'scrollX': true,
        'scrollY': "300px",
        "scrollCollapse": true,
        "paging": false,
        'data': JSON.parse(localStorage.getItem('userList')),
        'columns': [
            { 'data': 'id' },
            { 'data': 'name' },
            { 'data': 'address' },
            { 'data': 'gender' },
            { 'data': 'grade' },
            { 'data': 'hobbies' },

            { 'defaultContent': '<button class="btn btn-info btnEdit">edit</button> <button class="btn btn-danger btnDelete">Delete</button> ' }

        ],
    });

});

let users = [];

function getHobbies(checkBoxName) {
    var hobbies = document.querySelectorAll('input[type=checkbox]:checked');
    var selectedHobbies = [];
    for (var i = 0; i < hobbies.length; i++) {
        selectedHobbies.push(hobbies[i].value);

    }
    console.log(selectedHobbies)
    return selectedHobbies.length > 0 ? selectedHobbies : null;
}

function addUsers() {


    var checkBoxName = "hobbies";
    var userGrade = getGrade();
    var selectedHobbies = getHobbies(checkBoxName);

    if (document.getElementById('male').checked) {
        var selectedGender = document.getElementById('male').value;
    }
    if (document.getElementById('female').checked) {
        var selectedGender = document.getElementById('female').value;
    }
    let user = {
        id: Date.now(),
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        gender: selectedGender,
        grade: userGrade,
        hobbies: selectedHobbies,

    }

    users.push(user);
    document.forms[0].reset();
    localStorage.setItem("userList", JSON.stringify(users));
    showTable();


}


$(document).ready(function () {
    var users = getUser();

    $('button.addUser').on('click', function (e) {
        // e.preventDefault()
        $('#addUserModal').modal('show');
    });

    $('#save').click(function () {
        addUsers();

    });
});





$(document).ready(function () {
    var users = getUser();

    $('button.btnDelete').on('click', function (e) {
        e.preventDefault();
        var currentRow = $(this).closest("tr");
        var id = currentRow.find("td:eq(0)").text();
        var name = currentRow.find("td:eq(1)").text();
        var address = currentRow.find("td:eq(2)").text();
        var gender = currentRow.find("td:eq(3)").text();

        $('#deleteModal').data('id', id).data('name', name).data('address', address).data('gender', gender).modal('show');

    });

    $('#btnDeleteYes').click(function () {

        var idToDelete = $('#deleteModal').data('id');
        var name = $('#deleteModal').data('name');
        var address = $('#deleteModal').data('address');
        var gender = $('#deleteModal').data('gender');
        var index = -1;
        var toDelete = users.find(function (item, i) {
            if (item.id == idToDelete) {
                index = i;
                return i;
            }
        })
        // const index = users.findIndex(x => x.id == "$(this).id");
        console.log(index)
        if (index !== undefined) {
            users.splice(index, 1);

        }
        localStorage.setItem("userList", JSON.stringify(users));

        $('#deleteModal').modal('hide');
        showTable();

    });

});




$(document).ready(function () {
    var users = getUser();
    let elements = [];


    function editUser(idToEdit) {

        var checkBoxName = "hobbies";
        var selectedHobbies = getHobbies(checkBoxName);

        if (document.getElementById('newMale').checked) {
            var selectedGender = document.getElementById('newMale').value;
        }
        if (document.getElementById('newFemale').checked) {
            var selectedGender = document.getElementById('newFemale').value;
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == idToEdit) {
                users[i].name = document.getElementById('newName').value;
                users[i].address = document.getElementById('newAddress').value;
                users[i].gender = selectedGender;
                users[i].grade = document.getElementById('newGrade').value;
                users[i].hobbies = selectedHobbies;
                break;

            }
        }



        localStorage.setItem("userList", JSON.stringify(users));


    }

    $('button.btnEdit').on('click', function (e) {
        e.preventDefault();
        var currentRow = $(this).closest('tr');
        var id = currentRow.find("td:eq(0)").text();
        var name = currentRow.find("td:eq(1)").text();
        var address = currentRow.find("td:eq(2)").text();
        var gender = currentRow.find("td:eq(3)").text();
        var grade = currentRow.find("td:eq(4)").text();
        let hobbies = currentRow.find("td:eq(5)").text();
        elements = hobbies.split(",");
        console.log(elements);



        $('#newName').val(name);
        $('#newAddress').val(address);
        $("input[name='gender'][value=" + gender + "]").attr('checked', true)
        // $("input[name='gender'][value=" + gender + "]").attr('checked', true)
        $('#newGrade').val(grade);
        if (elements[0]) {
            if (elements[0] == null) {
                $("input[name='hobbies'][id=" + elements[0] + "]").attr('checked', false)
            }
            else {
                $("input[name='hobbies'][id=" + elements[0] + "]").attr('checked', true)

            }
        }
        if (elements[1]) {
            if (elements[1] == null) {
                $("input[name='hobbies'][id=" + elements[1] + "]").attr('checked', false)
            }
            else {
                $("input[name='hobbies'][id=" + elements[1] + "]").attr('checked', true)

            }
        }
        if (elements[2]) {
            if (elements[2] == null) {
                $("input[name='hobbies'][id=" + elements[2] + "]").attr('checked', false)
            }
            else {
                $("input[name='hobbies'][id=" + elements[2] + "]").attr('checked', true)

            }
        }
        // $("input[name='hobbies'][id=" + elements[0] + "]").attr('checked', true)
        // $("input[name='hobbies'][id=" + elements[1] + "]").attr('checked', true)
        // $("input[name='hobbies'][id=" + elements[2] + "]").attr('checked', true)
        $('#editModal').data('id', id).data('name', name).data('address', address).data('gender', gender).data('grade', grade).modal('show');

    });
    $('#btnEdit').click(function () {

        var idToEdit = $('#editModal').data('id');
        editUser(idToEdit);
        $('#editModal').modal('hide');
        showTable();


    })






});






