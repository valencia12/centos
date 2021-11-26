
tareas();

console.log(document.forms.formRegister.name.value);
//formulario para registrar
document.querySelector("#formRegister").addEventListener('submit', function (e) {
    e.preventDefault();
    let data = {
        socialsec: document.forms.formRegister.socialsec.value,
        fullname: document.forms.formRegister.name.value+" "+document.forms.formRegister.surname.value,
        name: document.forms.formRegister.name.value,
        surname: document.forms.formRegister.surname.value,
        salary: document.forms.formRegister.salary.value,
        date: document.forms.formRegister.date.value
    }
    console.log(data);
    fetch('/products', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Expediente creado con exito");
            tareas();
        })
        .catch(err => {
            alert("Revise los datos ingresados");
            console.log(err);
        });
});
//formulario para actualizar
document.forms.formUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
        socialsec: document.forms.formUpdate.socialsecU.value,
        name: document.forms.formUpdate.nameU.value,
        surname: document.forms.formUpdate.surnameU.value,
        fullname: document.forms.formUpdate.nameU.value+" "+document.forms.formUpdate.surnameU.value,
        salary: document.forms.formUpdate.salaryU.value,
        date: document.forms.formUpdate.dateU.value
    }
    //peticion
    fetch('/products/' + document.forms.formUpdate._id.value, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Expediente se actualizo con exito");
            tareas();
        })
        .catch(err => {
            alert("Revise los datos ingresados");
            console.log(err);
        });
});
//crear tareas
function tareas() {
    fetch('/products',
        {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(element => {
                //console.log(element);
                filas = filas + 
                                `<tr>
                                    <td>${element.fullname}</td>
                                    <td>${element.socialsec}</td>
                                    <td>$${element.salary}</td>
                                    <td>${element.date}</td>
                                    <td>
                                        <a href="/products/${element._id}" class="update btn btn-warning" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></a>
                                        <a href="/products/${element._id}" class="delete btn btn-danger"><i class="fas fa-trash-alt"></i></a>
                                    </td>
                                </tr>`
                                
            });//<a href="/products/${element._id}" class="delete btn btn-danger">Eliminar</a>
            document.querySelector("#container").innerHTML = filas;
            //agregando los eventos para actualizar 
            let btn_update = document.querySelectorAll('.update');
            btn_update.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    console.log(url);
                    fetch(url, {
                        method: "GET"
                    }).then(res => res.json())
                        .catch(err => console.error(err))
                        .then(response => {
                            document.forms.formUpdate._id.value = response._id;
                            document.forms.formUpdate.socialsecU.value = response.socialsec;
                            document.forms.formUpdate.nameU.value = response.name;
                            document.forms.formUpdate.surnameU.value = response.surname;
                            document.forms.formUpdate.salaryU.value = response.salary;
                            document.forms.formUpdate.dateU.value = response.date;
                        });
                });
            });
            let btn_delete = document.querySelectorAll('.delete');
            btn_delete.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    //peticion para eliminar
                    fetch(url, {
                        method: "DELETE",
                    }).then(res => res.json())
                        .then(response => {
                            alert("Expediente eliminado con exito");
                            tareas();
                        })
                        .catch(err => {
                            alert("Ocurrio un error al tratar de eliminar expediente");
                            console.log(err);
                        });
                });
            })
        })
}

$("#searchForm").submit(function(e) {
    e.preventDefault();//prevent the form from actually submitting
    let val = $("#search").val();
    //console.log(val);
    if(val == ""){
        tareas();
    }else{
        tareasParam(val)
    }
});
function tareasParam(search) {
    fetch('/products',
        {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(element => {
                //console.log(element);
                if(element.fullname == search || element.name == search || element.surname == search){
                filas = filas + 
                                `<tr>
                                    <td>${element.fullname}</td>
                                    <td>${element.socialsec}</td>
                                    <td>$${element.salary}</td>
                                    <td>${element.date}</td>
                                    <td>
                                        <a href="/products/${element._id}" class="update btn btn-warning" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></a>
                                        <a href="/products/${element._id}" class="delete btn btn-danger"><i class="fas fa-trash-alt"></i></a>
                                    </td>
                                </tr>`
                }else{}                
            });//<a href="/products/${element._id}" class="delete btn btn-danger">Eliminar</a>
            document.querySelector("#container").innerHTML = filas;
            //agregando los eventos para actualizar 
            let btn_update = document.querySelectorAll('.update');
            btn_update.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    console.log(url);
                    fetch(url, {
                        method: "GET"
                    }).then(res => res.json())
                        .catch(err => console.error(err))
                        .then(response => {
                            document.forms.formUpdate._id.value = response._id;
                            document.forms.formUpdate.socialsecU.value = response.socialsec;
                            document.forms.formUpdate.nameU.value = response.name;
                            document.forms.formUpdate.surnameU.value = response.surname;
                            document.forms.formUpdate.salaryU.value = response.salary;
                            document.forms.formUpdate.dateU.value = response.date;
                        });
                });
            });
            let btn_delete = document.querySelectorAll('.delete');
            btn_delete.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    //peticion para eliminar
                    fetch(url, {
                        method: "DELETE",
                    }).then(res => res.json())
                        .then(response => {
                            alert("Expediente eliminado con exito");
                            tareas();
                        })
                        .catch(err => {
                            alert("Ocurrio un error al tratar de eliminar expediente");
                            console.log(err);
                        });
                });
            })
        })
}