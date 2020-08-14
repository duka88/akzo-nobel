const result = {
	$sliderCircle: null,
	$sliderLine: null,
	$resultHeading: null,
	$resultText: null,
	$imageWrap: null,
	$upArow: null,
	$downArow: null,
	down: false,
	startX: 0,
	shiftX: 0,
	step: 0,
	counter: 1,
	caruselCounter: 1,
	allImgs: null,
	caruselWidth: null,
	leyout: {},

	init: function(leyout) {
		this.setVars();
		this.getLeyout(leyout);
		this.sliderResultEvents();
	},

	setVars: function() {
		this.$sliderCircle = document.querySelector('.js-slider-dot');
		this.$sliderLine = document.querySelector('.js-line-slider');
		this.$resultHeading = document.querySelector('.js-result-heading');
		this.$resultText = document.querySelector('.js-result-text');
		this.$imageWrap = document.querySelector('.js-img-wrap');
		this.$upArow = document.querySelector('.js-up-arow');
		this.$downArow = document.querySelector('.js-down-arow');
	},

	getLeyout: function(leyout) {
		fetch('json/result.json')
			.then(response => response.json())
			.then((data) => {
				this.leyout = data.results.find(el => el.id === leyout);
				this.setLeyout();
				this.carusellInit();
			});
	},

	setLeyout: function() {
		this.$resultHeading.innerHTML = this.leyout.heading;
		this.$resultText.innerText = this.leyout.text;
		this.setImg();
	},

	setImg: function() {
		let html = `<div class="result__main-img js-slider-img" style="background-image: url('${this.leyout.images[this.leyout.images.length - 1]}');"></div>`;
		this.leyout.images.forEach((item)=>{
			html += `<div class="result__main-img js-slider-img" style="background-image: url('${item}');"></div>`;
		});
		html += `<div class="result__main-img js-slider-img" style="background-image: url('${this.leyout.images[0]}');"></div>`;
		this.$imageWrap.innerHTML = html;
		this.allImgs = document.querySelectorAll('.js-slider-img');
	},

	carusellInit: function() {
		this.caruselWidth = this.allImgs[0].clientWidth;
		this.carusellScroll(false);
		this.carusellEvents();
		console.log(this.caruselCounter);
		console.log(this.allImgs.length);
	},

	carusellScroll: function(transition = true) {
		if (!transition) {
			this.$imageWrap.classList.remove('carusell-slide');
		} else {
			this.$imageWrap.classList.add('carusell-slide');
		}
		this.$imageWrap.style.transform = `translateX(${-this.caruselWidth * this.caruselCounter}px)`;
	},

	carusellScrollLeft: function() {
		if (this.caruselCounter >= this.allImgs.length - 1) {
			return;
		} else {
			this.caruselCounter++;
			this.carusellScroll();
		}
	},

	carusellScrollRight: function() {
		if (this.caruselCounter <= 0) {
			return;
		} else {
			this.caruselCounter--;
			this.carusellScroll();
		}
	},

	carusellEvents: function() {

		this.$upArow.addEventListener('click', ()=> {
			this.carusellScrollLeft();
		});

		this.$downArow.addEventListener('click', ()=> {
			this.carusellScrollRight();
		});

		this.$imageWrap.addEventListener('transitionend', () => {
			if (this.caruselCounter === 0) {
				this.caruselCounter = this.allImgs.length - 1;
				this.carusellScroll(false);
			} else if (this.caruselCounter === this.allImgs.length) {
				this.caruselCounter = 1;
				this.carusellScroll(false);
			}
			this.allImgs[this.caruselCounter - 1].classList.add('this.caruselCounter');
			console.log(this.caruselCounter);
		});
	},

	sliderResultEvents: function() {
		this.$sliderLine.addEventListener('mousedown', (e) => {
			this.shiftX = e.clientX - this.$sliderCircle.getBoundingClientRect().left;
			this.down = true;
			this.startX = e.clientX;
		});

		this.$sliderCircle.addEventListener('mousedown', (e) => {
			this.shiftX = e.clientX - this.$sliderCircle.getBoundingClientRect().left;
			this.down = true;
			this.startX = e.clientX;
		});

		this.$sliderCircle.addEventListener('mouseup', () => {
			this.down = false;
		});

		this.$sliderLine.addEventListener('mouseup', () => {
			this.down = false;
		});

		this.$sliderLine.addEventListener('mousemove', (e) => {
			if (this.down) {
				this.moveSlider(e.clientX);
			}
		});
		this.$sliderLine.addEventListener('touchstart', (e) => {
			this.shiftX = e.targetTouches[0].clientX - this.$sliderCircle.getBoundingClientRect().left;
			this.down = true;
			this.startX = e.targetTouches[0].clientX;
		});

		this.$sliderCircle.addEventListener('touchstart', (e) => {
			this.shiftX = e.targetTouches[0].clientX - this.$sliderCircle.getBoundingClientRect().left;
			this.down = true;
			this.startX = e.targetTouches[0].clientX;
		});

		this.$sliderCircle.addEventListener('touchend', () => {
			this.down = false;
		});

		this.$sliderLine.addEventListener('touchend', () => {
			this.down = false;
		});

		this.$sliderLine.addEventListener('leave', () => {
			this.down = false;
		});

		this.$sliderCircle.addEventListener('touchmove', (e) => {
			if (this.down) {
				this.moveSlider(e.targetTouches[0].clientX);
			}
		});

		this.$sliderLine.addEventListener('touchmove', (e) => {
			if (this.down) {
				this.moveSlider(e.targetTouches[0].clientX);
			}
		});
	},

	moveSlider: function(x) {
		const calcX = Math.round(this.startX - x);
		let newLeft = x - this.shiftX - this.$sliderLine.getBoundingClientRect().left;
		if (newLeft < 0) {
			newLeft = 0;
		}
		const rightEdge = this.$sliderLine.offsetWidth - this.$sliderCircle.offsetWidth;
		if (newLeft > rightEdge) {
			newLeft = rightEdge;
		}
		if (calcX < - 30) {
			this.startX = x;
			this.counter++;
		} else if (calcX > 30) {
			this.startX = x;
			this.counter--;
		}
		if (this.counter < 1) {
			this.counter = 1;
		}
		if (this.counter > 9) {
			this.counter = 9;
		}

		this.$sliderCircle.style.left = newLeft + 'px';
	}
};

export default result;
