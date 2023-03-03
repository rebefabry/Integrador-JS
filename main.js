// CONTENEDOR DE PRODUCTOS
const products = document.querySelector(".products-container");
// BOTON VER MAS
const showMore = document.querySelector(".button-showMore");
// CONTENEDOR DE CATEGORIAS
const categories = document.querySelector(".categories");
// HTML COLLECTION DE LAS CATEGORIAS
const categoriesList = document.querySelectorAll(".category");



// FUNCION QUE MUESTRA EL PRODUCTO
const renderProduct = (product) => {
    const { id, name, precio, cardImg } = product;
    return `
    <div class="card">
    <img src="${cardImg}" alt="${name}">
            <h4>${name}</h4>
            <p>$${precio}</p>
            <button class="button-compra" data-id="${id}" data-name="${name}" data-precio="${precio}" data-img="${cardImg}">agregar</button>
    </div>`;
}

// FUNCION PARA MOSTRAR DE A PARTES LOS PRODUCTOS
const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index].map(renderProduct).join("");
}

// FUNCION QUE MUESTRA LOS PRODUCTOS FILTRADOS POR CATEGORIA
const renderFilteredProducts = (category) => {
    const productsList = productsData.filter((product) => {
        return product.category === category;
    });
    products.innerHTML = productsList.map(renderProduct).join("");
};

// FUNCION QUE MUESTRA LOS PRODUCTOS FILTRADOS O SIN FILTRAR
const renderProducts = (index = 0, category = undefined) => {
    if (!category) {
        renderDividedProducts(index);
        return;
    }
    renderFilteredProducts(category);
};

// FUNCION QUE MUESTRA U OCULTA BTN VER MAS
const changeShowMoreBtnState = (category) => {
    if (!category) {
        showMore.classList.remove("hidden");
        return;
    }
    showMore.classList.add("hidden");
};

// FUNCION PARA CAMBIAR COLOR DE BTN DE CATEGORIA SELECCIONADA
const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        };
        categoryBtn.classList.add("active");
    });
};

// FUNCION QUE EJECUTA VER MAS Y CATEGORIAS
const changeFilterState = (e) => {
    const selectedCategory = e.target.dataset.category;
    changeShowMoreBtnState(selectedCategory);
    changeBtnActiveState(selectedCategory);
};

// FUNCION PARA APLICAR FILTRO
const applyFilter = (e) => {
    if (!e.target.classList.contains("category")) {
        return;
    } else {
        changeFilterState(e);
    }
    if (!e.target.dataset.category) {
        products.innerHTML = "";
        renderProducts();
    } else {
        renderProducts(0, e.target.dataset.category);
        productsController.nextProductsIndex = 1;
    }
};

// FUNCION QUE INDICA SI LLEGUE AL ULTIMO INDEX
const isLastIndexOf = () => {
    return (
        productsController.nextProductsIndex === productsController.productsLimit
    );
};

// FUNCION PARA QUE FUNCIONE BTN VER MAS
const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if (isLastIndexOf()) {
        showMore.classList.add("hidden");
    }
};

// FUNCION PUERTA DE ENTRADA
const init = () => {
    renderProducts();
    categories.addEventListener("click", applyFilter);
    showMore.addEventListener("click", showMoreProducts);
}

init();

// Slider
let slider = document.querySelector(".slider-container");
let sliderInd = document.querySelectorAll(".slider");
let contador = 1;
let width = sliderInd[0].clientWidth;
let intervalo = 6000;

setInterval(function tiempo(){
    slides()
}, intervalo);

function slides(){
    slider.style.transform = 'translate('+ (- width * contador) + 'px)'; 
    slider.style.transition = 'transform 1s';
    contador++;

    if(contador === sliderInd.length){
        contador = 0;
        setTimeout(function(){
            slider.style.transform = 'translate(0px)'; 
            slider.style.transition = 'transform 0s';
        }, intervalo)
    }
}

window.addEventListener("resize", function(){
	width = sliderInd[0].clientWidth;
});

// menu hamburguesa

const menu = document.querySelector("#menu-list");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener ("click", () => {
	menu.classList.add("visible")
});

cerrar.addEventListener ("click", () => {
	menu.classList.remove("visible");
})


// validacion de formulario

const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");

const checkUsername = () => {
    
    let valid = false; 

    const username = nameInput.value.trim(); 

    if (isEmpty(username)){
        showError (nameInput, "El nombre es obligatorio")
    } else {
        showSuccess(nameInput);
        valid = true;
    }
    
    return valid;

};

const checkMail = () => {
    let valid = false;

    const emailValue = emailInput.value.trim();

    if (isEmpty(emailValue)){
        showError(emailInput, "El mail es obligatorio");
     }

        else if (!isEmailValid(emailValue)) {
            showError(emailInput, "El mail no es valido.");
        }
        else {
        showSuccess(emailInput);
        valid = true
    }

    return valid; 
}

const isEmailValid = (email) => {
    const reg =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return reg.test(email);
};

const isEmpty = (value) => value === "";


const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove("success"); 
    formField.classList.add("error");
    
    const error = formField.querySelector("small");
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement; 
    formField.classList.remove("error");
    formField.classList.add("success");
    
    const error = formField.querySelector("small");
    error.textContent = "";
};

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let isUsernameValid = checkUsername();
	let isEmailValid = checkMail();

	let isFormValid =
		isUsernameValid && isEmailValid;
	if (isFormValid) {
        console.log("Enviamos el formulario");
		form.submit();
	}
});


