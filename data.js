const productsData = [
	{
		id: 1,
		name: "Crema de dia",
		precio: 2500,
		category: "cremas",
		cardImg: "./assets/products/crema-dia.jpg",
	},
	{
		id: 2,
		name: "Crema de noche",
		precio: 2500,
		category: "cremas",
		cardImg: "./assets/products/crema-noche.jpg",
	},
	{
		id: 3,
		name: "Crema para pieles maduras",
		precio: 2500,
		category: "cremas",
		cardImg: "./assets/products/crema-piel-madura.jpg",
	},
	{
		id: 4,
		name: "Exfoliante facial para pieles secas",
		precio: 890,
		category: "exfoliantes",
		cardImg: "./assets/products/exfoliante-piel-seca.jpg",
	},
	{
		id: 5,
		name: "Exfoliante facial para pieles mixtas",
		precio: 890,
		category: "exfoliantes",
		cardImg: "./assets/products/exfoliante-piel-grasa.jpg ",
	},
	{
		id: 6,
		name: "Crema para pieles secas",
		precio: 1700,
		category: "cremas",
		cardImg: "./assets/products/crema-piel-seca.jpg",
	},
	{
		id: 7,
		name: "Crema para pieles mixtas",
		precio: 1700,
		category: "cremas",
		cardImg: "./assets/products/crema-piel-grasa.jpg",
	},
    {
		id: 8,
		name: "Contorno de ojos",
		precio: 750,
		category: "cremas",
		cardImg: "./assets/products/contorno-de-ojos.jpg",
	},
    {
		id: 9,
		name: "Serum antioxidante",
		precio: 900,
		category: "serums",
		cardImg: "./assets/products/serum-antioxidante.jpg",
	},
    {
		id: 10,
		name: "Serum con vitamina E",
		precio: 900,
		category: "serums",
		cardImg: "./assets/products/serum-con-vit.jpg",
	},
    {
		id: 11,
		name: "Serum con acido hialuronico",
		precio: 900,
		category: "serums",
		cardImg: "./assets/products/serum-acido-hialu.jpg",
	},
    {
		id: 12,
		name: "Balsamo labial Frutal",
		precio: 599,
		category: "balsamos",
		cardImg: "./assets/products/balm-frutal.jpg",
	},
    {
		id: 13,
		name: "Balsamo labial",
		precio: 599,
		category: "balsamos",
		cardImg: "./assets/products/balm-none.jpg",
	},
    {
		id: 14,
		name: "Balsamo labial Coco",
		precio: 599,
		category: "balsamos",
		cardImg: "./assets/products/balm-coco.jpg",
	},
    {
		id: 15,
		name: "Balsamo labial Cherry",
		precio: 599,
		category: "balsamos",
		cardImg: "./assets/products/balm-cherry.jpg",
	},
    {
		id: 16,
		name: "Protector solar",
		precio: 2000,
		category: "cremas",
		cardImg: "./assets/products/protector-solar.png",
	},
    {
		id: 17,
		name: "Espuma de limpieza profunda",
		precio: 1800,
		category: "limpieza",
		cardImg: "./assets/products/espuma-limpieza.jpg",
	},
    {
		id: 18,
		name: "Tonico astringente para pieles mixtas",
		precio: 1500,
		category: "limpieza",
		cardImg: "./assets/products/tonico.jpg",
	},
    {
		id: 19,
		name: "Agua micelar",
		precio: 1200,
		category: "limpieza",
		cardImg: "./assets/products/agua-micelar.png",
	},
    {
		id: 20,
		name: "Esponja vegetal",
		precio: 600,
		category: "limpieza",
		cardImg: "./assets/products/esponja.png",
	},
    {
		id: 21,
		name: "Espatula de silicona",
		precio: 870,
		category: "limpieza",
		cardImg: "./assets/products/espatula.jpg",
	},
    {
		id: 22,
		name: "Toalla de microfibra para el rostro",
		precio: 600,
		category: "limpieza",
		cardImg: "./assets/products/toalla.jpg",
	},
    {
		id: 23,
		name: "Tonico astringente para pieles secas",
		precio: 1500,
		category: "limpieza",
		cardImg: "./assets/products/tonico-piel-seca.png",
	},
];

const splitProducts = (size) => {
	let dividedProducts = [];

	for (let i = 0; i < productsData.length; i += size) {
		dividedProducts.push(productsData.slice(i, i + size));
	}
	return dividedProducts;
};

const productsController = {
	dividedProducts: splitProducts(4),
	nextProductsIndex: 1,
	productsLimit: splitProducts(4).length,
};