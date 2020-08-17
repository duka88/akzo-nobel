const result = {
	$sliderCircle: null,
	$sliderLine: null,
	$resultHeading: null,
	$resultText: null,
	$imageWrap: null,
	$upArow: null,
	$downArow: null,
	$resultW: null,
	$resultO: null,
	$resultL: null,
	down: false,
	startX: 0,
	strokeConst: null,
	step: 0,
	counter: 0,
	caruselCounter: 1,
	allImgs: null,
	caruselWidth: null,
	questionsLength: 0,
	results: {},
	leyout: {},

	init: function(leyout, lang) {
		this.setVars();
		this.getLeyout(leyout, lang);
		this.sliderResultEvents();
		this.setResults(leyout);
	},

	setVars: function() {
		this.$sliderCircle = document.querySelector('.js-slider-dot');
		this.$sliderLine = document.querySelector('.js-line-slider');
		this.$resultHeading = document.querySelector('.js-result-heading');
		this.$resultText = document.querySelector('.js-result-text');
		this.$imageWrap = document.querySelector('.js-img-wrap');
		this.$upArow = document.querySelector('.js-up-arow');
		this.$downArow = document.querySelector('.js-down-arow');
		this.$resultW = document.querySelector('.js-resut-w');
		this.$resultO = document.querySelector('.js-resut-o');
		this.$resultL = document.querySelector('.js-resut-l');
		this.strokeConst = Math.round(this.$resultW.getTotalLength());
	},

	getLeyout: function(leyout, lang) {
		fetch(`json/${lang}/result.json`)
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
	},

	carusellScroll: function(transition = true) {
		if (!transition) {
			this.$imageWrap.classList.remove('carusell-slide');
		} else {
			this.$imageWrap.classList.add('carusell-slide');
		}
		this.$imageWrap.style.transform = `translateX(-${this.caruselWidth * this.caruselCounter}px)`;
	},

	carusellScrollLeft: function() {
		if (this.caruselCounter > this.allImgs.length - 1) {
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
			this.carusellScrollRight();
		});

		this.$downArow.addEventListener('click', ()=> {
			this.carusellScrollLeft();
		});

		this.$imageWrap.addEventListener('transitionend', () => {
			if (this.caruselCounter === 0) {
				this.caruselCounter = this.allImgs.length - 2;
				this.carusellScroll(false);
			} else if (this.caruselCounter === this.allImgs.length - 1) {
				this.caruselCounter = this.allImgs.length - this.caruselCounter;
				this.carusellScroll(false);
			}
			this.allImgs[this.caruselCounter - 1].classList.add('this.caruselCounter');
		});
	},

	sliderResultEvents: function() {
		this.$sliderLine.addEventListener('mousedown', (e) => {
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
			this.down = true;
			this.startX = e.targetTouches[0].clientX;
		});

		this.$sliderCircle.addEventListener('touchstart', (e) => {
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

		if (calcX < - ((this.$sliderLine.offsetWidth / 7) - this.$sliderCircle.offsetWidth / 2)) {
			this.startX = x;
			this.counter++;
		} else if (calcX > ((this.$sliderLine.offsetWidth / 7) - this.$sliderCircle.offsetWidth / 2)) {
			this.startX = x;
			this.counter--;
		}
		if (this.counter < 0) {
			this.counter = 0;
		}
		if (this.counter > 8) {
			this.counter = 8;
		}
		this.$sliderCircle.style.left = 100 / 9 * this.counter + '%';
		this.resultCalc(this.counter + 1);
		this.strokeCircls();
	},

	setResults: function(leyout) {
		const results = JSON.parse(localStorage.getItem('answers'));
		this.results = results.results;
		this.questionsLength = results.answers.length;
		this.results['warmProcent'] = 1 - this.results.warm / (this.questionsLength * 100);
		this.results['openProcent'] = 1 - this.results.open / (this.questionsLength * 100);
		this.results['lightProcent'] = 1 - this.results.light / (this.questionsLength * 100);
		this.counter = leyout - 1;
		this.resultCalc(leyout);
		this.calculateResult();
		this.strokeCircls();
		this.$sliderCircle.style.left = 100 / 9 * this.counter + '%';
	},

	calculateResult: function() {
		this.$resultW.style.strokeDasharray = this.strokeConst + 'px';
		this.$resultO.style.strokeDasharray = this.strokeConst + 'px';
		this.$resultL.style.strokeDasharray = this.strokeConst + 'px';
	},

	strokeCircls: function() {
		this.$resultL.style.strokeDashoffset = - this.strokeConst * this.results['lightProcent'] + 'px';
		this.$resultO.style.strokeDashoffset = - this.strokeConst * this.results['openProcent'] + 'px';
		this.$resultW.style.strokeDashoffset = - this.strokeConst * this.results['warmProcent'] + 'px';
	},

	resultCalc: function(n) {
		console.log(n);
		switch (n) {
			case n = 1:
				this.results['warmProcent'] = 0;
				this.results['openProcent'] = 1;
				this.results['lightProcent'] = 1;
				break;
			case n = 2:
				this.results['warmProcent'] = 0.3;
				this.results['openProcent'] = 0.7;
				this.results['lightProcent'] = 1;
				break;
			case n = 3:
				this.results['warmProcent'] = 0.4;
				this.results['openProcent'] = 0.8;
				this.results['lightProcent'] = 0.8;
				break;
			case n = 4:
				this.results['warmProcent'] = 0.7;
				this.results['openProcent'] = 0.3;
				this.results['lightProcent'] = 1;
				break;
			case n = 5:
				this.results['warmProcent'] = 1;
				this.results['openProcent'] = 0;
				this.results['lightProcent'] = 1;
				break;
			case n = 6:
				this.results['warmProcent'] = 1;
				this.results['openProcent'] = 0.3;
				this.results['lightProcent'] = 0.7;
				break;
			case n = 7:
				this.results['warmProcent'] = 0.8;
				this.results['openProcent'] = 0.8;
				this.results['lightProcent'] = 0.4;
				break;
			case n = 8:
				this.results['warmProcent'] = 1;
				this.results['openProcent'] = 0.7;
				this.results['lightProcent'] = 0.3;
				break;
			case n = 9:
				this.results['warmProcent'] = 1;
				this.results['openProcent'] = 1;
				this.results['lightProcent'] = 0;
				break;
			default:
		}
	}
};

export default result;
