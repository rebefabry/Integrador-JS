const products = document.querySelector(".products-container");
const showMore = document.querySelector(".button-showMore");
const categories = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const cartIcon = document.getElementById("cart-icon")

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList))
};


const prepareButtons = () => {
    const buttonList = document.querySelectorAll(".button-compra");
    buttonList.forEach(addEvent)
}

// carrito PONELE
let cartList = [];

const addProductCart = (dataset) => {
    console.log(dataset)
    cartList.push(dataset);
    saveLocalStorage(cartList)
}

const addEvent = (button) => {
    const dataSet = button.dataset
    button.addEventListener("click", function(){
        addProductCart(dataSet)
    })
}

const renderBubbleCart = () => {
    return `
        <div class="cart-bubble">${cart.length}</div>
    `
}

cartIcon.innerHTML = renderBubbleCart();

// Mostrar productos, boton ver mas y filtrar por categorias
const renderProduct = (product) => {
    const { id, name, precio, cardImg, texto } = product;
    return `
    <div class="card">
    <img src="${cardImg}" alt="${name}">
            <h4>${name}</h4>
			<p class="texto">${texto}</p>
            <p>$${precio}</p>
            <button class="button-compra" data-id="${id}" data-name="${name}" data-precio="${precio}" data-img="${cardImg}">agregar</button>
    </div>`;
}


const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index].map(renderProduct).join("");
}

const renderFilteredProducts = (category) => {
    const productsList = productsData.filter((product) => {
        return product.category === category;
    });
    products.innerHTML = productsList.map(renderProduct).join("");
};


const renderProducts = (index = 0, category = undefined) => {
    if (!category) {
        renderDividedProducts(index);
        prepareButtons()
        return;
    }
    renderFilteredProducts(category);
    prepareButtons()
};

const changeShowMoreBtnState = (category) => {
    if (!category) {
        showMore.classList.remove("hidden");
        return;
    }
    showMore.classList.add("hidden");
};

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

const changeFilterState = (e) => {
    const selectedCategory = e.target.dataset.category;
    changeShowMoreBtnState(selectedCategory);
    changeBtnActiveState(selectedCategory);
};

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

const isLastIndexOf = () => {
    return (
        productsController.nextProductsIndex === productsController.productsLimit
    );
};

const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if (isLastIndexOf()) {
        showMore.classList.add("hidden");
        console.log(showMore.classList)
    }
};


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

// Menu hamburguesa

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

    const min = 3;
    const max = 12;

    const username = nameInput.value.trim();

    if (isEmpty(username)){
        showError (nameInput, "El nombre es obligatorio.")
    } else if (!isBetween(username.length, min, max)) {
        showError(nameInput, `El nombre debe tener entre ${min} y ${max} caracteres.`)
    } else {
        showSuccess(nameInput);
        valid = true;
    }
    
    return valid;

};

const isBetween = (length, min, max) => {
    return  length < min || length > max ? false : true;
 }

const checkMail = () => {
    let valid = false;

    const emailValue = emailInput.value.trim();

    if (isEmpty(emailValue)){
        showError(emailInput, "El mail es obligatorio.");
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
