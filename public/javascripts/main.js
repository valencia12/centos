tareas();

console.log(document.forms.formRegistrar.name.value);
//formulario para registrar
document.querySelector("#formRegistrar").addEventListener('submit', function (e) {
    e.preventDefault();
    let data = {
        name: document.forms.formRegistrar.name.value,
        price: document.forms.formRegistrar.price.value,
        code: document.forms.formRegistrar.code.value,
        description: document.forms.formRegistrar.description.value
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
            alert("Updated successfylly");
            tareas();
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados");
            console.log(err);
        });
});
//formulario para actualizar
document.forms.formUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
        name: document.forms.formUpdate.nameU.value,
        price: document.forms.formUpdate.priceU.value,
        code: document.forms.formUpdate.codeU.value,
        description: document.forms.formUpdate.descriptionU.value
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
            alert("Updated successfylly");
            tareas();
        })
        .catch(err => {
            alert("please check your inputs");
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
                filas = filas + `<div class="sectionItems">
                                    <div class="img1">
                                        <p>${element.code}</p>
                                        <img src="/img/products/${element.code}.jpg" width="100%" height="200px">
                                    </div>
                                    <div class="info">
                                        <p>${element.name}</p>
                                        <p>${element.description}</p>
                                        <p>$${element.price}</p>
                                    </div>
                                    <div class="btns">
                                        <a href="/products/${element._id}" class="btn btn-primary"><i class="fas fa-shopping-cart"></i></a>
                                    </div>
                                </div>`
                                
            });//<a href="/products/${element._id}" class="delete btn btn-danger">Eliminar</a>
            document.querySelector("#container").innerHTML = filas;
        })
}