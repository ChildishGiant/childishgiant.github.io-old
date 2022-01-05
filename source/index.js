import './styles.sass'
const Marquee3k = require('marquee3000');

const fonts = [
	"'Impact', sans-serif",
	"'Lucida Console', monospace",
	"'Comic Sans MS', cursive",
	"'Courier New', monospace",

	"'Alfa Slab One', cursive",
	"'Bebas Neue', cursive",
	"'Monoton', cursive",
	"'Press Start 2P', cursive"
]

const colours = [
	"f00",
	"0f0",
	// "00f", // Blue is too dark
	"ff0",
	"0ff",
	"f0f",
]
const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

const backgrounds = [
	"url('/ocean.jpg')",
	"url('/abstract.jpg')",
	"url('/stars.gif')",
	"#88D2FB url('/flower.gif')",
	`linear-gradient(45deg, #${randomElement(colours)} 0%, #${randomElement(colours)} 100%)`

]

const randomNumber = (min, max) => Math.random() * (max - min) + min;


window.onload = () => {

	document.body.style.background = randomElement(backgrounds)
	document.getElementById('topper').style.backgroundColor = "#"+randomElement(colours)
	document.getElementById('topper').style.fontFamily = randomElement(fonts)

	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	let toRandomise = document.getElementsByClassName('gross-box')

	for (let i = 0; i < toRandomise.length; i++) {
		let element = toRandomise[i]
		element.style.left = randomNumber(15, 85) + '%'
		element.style.top = randomNumber(15, 85) + '%'
		element.style.fontSize = randomNumber(2, 8) + 'em'
		element.style.fontFamily = randomElement(fonts)
		element.style.backgroundColor = "#"+randomElement(colours)


		// Make sure the element isn't too far offscreen
		let viewportOffset = element.getBoundingClientRect();

		// Horizontally
		if (viewportOffset.bottom > screenHeight) {
			element.style.top = 'unset'
			element.style.bottom = randomNumber(1, 15) + 'px'
		}

		// Vertically
		if (viewportOffset.right > screenWidth) {
			element.style.left = 'unset'
			element.style.right = randomNumber(1, 15) + 'px'
		}
	}

	Marquee3k.init()

}