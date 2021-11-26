
tareas();
console.log(document.forms.formRegister.name.value);
//formulario para registrar
document.querySelector("#formRegister").addEventListener('submit', function (e) {
    e.preventDefault();
    if(document.forms.formRegister.admin.checked){
        var data = {
            fullname: document.forms.formRegister.name.value +" "+document.forms.formRegister.surname.value,
            name: document.forms.formRegister.name.value,
            surname: document.forms.formRegister.surname.value,
            pass: document.forms.formRegister.pass.value,
            email: document.forms.formRegister.email.value,
            address: document.forms.formRegister.address.value,
            birth: document.forms.formRegister.birth.value,
            admin: 1
        }
        console.log("admin");
    }else{
        var data = {
            fullname: document.forms.formRegister.name.value +" "+document.forms.formRegister.surname.value,
            name: document.forms.formRegister.name.value,
            surname: document.forms.formRegister.surname.value,
            pass: document.forms.formRegister.pass.value,
            email: document.forms.formRegister.email.value,
            address: document.forms.formRegister.address.value,
            birth: document.forms.formRegister.birth.value,
            admin: 0
        }
        console.log("NO admin")
    }
    
    console.log(data);
    //console.log(document.forms.formRegister.admin.checked);
    fetch('/users', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Usuario creado con exito");
            tareas();
        })
        .catch(err => {
            alert("Revisar datos");
            console.log(err);
        });
});
//formulario para actualizar
document.forms.formUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    if(document.forms.formUpdate.adminU.checked){
        var data = {
            fullname: document.forms.formUpdate.nameU.value +" "+document.forms.formUpdate.surnameU.value,
            name: document.forms.formUpdate.nameU.value,
            surname: document.forms.formUpdate.surnameU.value,
            pass: document.forms.formUpdate.passU.value,
            email: document.forms.formUpdate.emailU.value,
            address: document.forms.formUpdate.addressU.value,
            birth: document.forms.formUpdate.birthU.value,
            admin: 1
        }
        console.log("admin");
    }else{
        var data = {
            fullname: document.forms.formUpdate.nameU.value +" "+document.forms.formUpdate.surnameU.value,
            name: document.forms.formUpdate.nameU.value,
            surname: document.forms.formUpdate.surnameU.value,
            pass: document.forms.formUpdate.passU.value,
            email: document.forms.formUpdate.emailU.value,
            address: document.forms.formUpdate.addressU.value,
            birth: document.forms.formUpdate.birthU.value,
            admin: 0
        }
        console.log("NO admin")
    }
    //peticion
    fetch('/users/' + document.forms.formUpdate._id.value, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Usuario actualiado con exito");
            tareas();
        })
        .catch(err => {
            alert("Revisar datos");
            console.log(err);
        });
});
//crear tareas
function tareas() {
    fetch('/users',
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
                                    <td>${element.email}</td>
                                    <td>${element.address}</td>
                                    <td>${element.birth}</td>
                                    <td>${element.admin}</td>
                                    <td>
                                        <a href="/users/${element._id}" class="update btn btn-warning" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></a>
                                        <a href="/users/${element._id}" class="delete btn btn-danger"><i class="fas fa-trash-alt"></i></a>
                                    </td>
                                </tr>`
                                
            });//<a href="/users/${element._id}" class="delete btn btn-danger">Eliminar</a>
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
                            document.forms.formUpdate.nameU.value = response.name;
                            document.forms.formUpdate.surnameU.value = response.surname;
                            document.forms.formUpdate.passU.value = response.pass;
                            document.forms.formUpdate.emailU.value = response.email;
                            document.forms.formUpdate.addressU.value = response.address;
                            document.forms.formUpdate.birthU.value = response.birth;
                            document.forms.formUpdate.adminU.value = response.admin;
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
                            alert("Usuario borrado con exito");
                            tareas();
                        })
                        .catch(err => {
                            alert("Error al tratar de borrar usuario");
                            console.log(err);
                        });
                });
            })
        })
}