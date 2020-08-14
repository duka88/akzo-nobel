const quiz = {
	$mainQuizConteiner: null,
	$mainImg: null,
	$questionCont: null,
	$quizStatusBar: null,
	$quizStatus: null,
	$quizImage: null,
	$quizQuestion: null,
	$quizStatement: null,
	$quizCounter: null,
	$quizIcon: null,
	$quizSlider: null,
	$quizProgresBar: null,
	$quizDots: null,
	$quizDotsSmall: null,
	$quizButton: null,
	$quizStep1: null,
	$quizStep2: null,
	$quizStep3: null,
	$quizArow: null,
	$quizScrollCont: null,
	check: 'assets/images/icons/check.png',
	checkActiv: 'assets/images/icons/check-next.png',
	questionNo: 1,
	counter: 1,
	down: false,
	stroke: 0,
	strokeConst: 0,
	strokeStep: 0,
	procide: false,
	max: 324,
	min: 36,
	step: 36,
	keyCount: 0,
	tuchPosition: 0,
	questions: [],
	currentQuestion: {},
	answers: {answers: [], results: {}, layout: null},

	init: function() {
		this.setVars();
		this.fetchQuestions();
		this.sliderEvents();
		this.scrollScreen();
	},

	setVars: function() {
		this.$mainQuizConteiner = document.querySelector('.js-quiz');
		this.$mainImg = document.querySelector('.js-main-img');
		this.$questionCont = document.querySelector('.js-main-wrap');
		this.$quizStatusBar = document.querySelector('.js-status-bar');
		this.$quizStatus = null;
		this.$quizImage = document.querySelector('.js-image');
		this.$quizQuestion = document.querySelector('.js-question');
		this.$quizStatement = document.querySelector('.js-statement');
		this.$quizCounter = document.querySelector('.js-counter');
		this.$quizIcon = document.querySelectorAll('.js-check-icon');
		this.$quizSlider = document.querySelector('.js-range-slider');
		this.$quizProgresBar = document.querySelector('.js-progres-bar');
		this.$quizDots = document.querySelectorAll('.js-dot');
		this.$quizDotsSmall = document.querySelectorAll('.js-dot-small');
		this.$quizButton = document.querySelectorAll('.js-check');
		this.$quizStep1 = document.querySelector('.js-step1');
		this.$quizStep2 = document.querySelector('.js-step2');
		this.$quizStep3 = document.querySelector('.js-step3');
		this.$quizArow = document.querySelector('.js-arrow');
		this.$quizScrollCont = document.querySelector('.js-scroll-cont');
	},

	fetchQuestions: function() {
		fetch('json/questions.json')
			.then(response => response.json())
			.then((data) => {
				this.questions = data.questions;
				this.currentQuestion = this.questions.filter(el => el.id === this.questionNo)[0];
				this.crateProgresBar();
				this.quizinit();
			});
	},

	crateProgresBar: function() {
		let html = '';
		for (let n = 0; n < this.questions.length; n++) {
			html += '<p class="quiz__status-single js-status"></p>';
		}
		this.$quizStatusBar.innerHTML = html;
		this.$quizStatus = document.querySelectorAll('.js-status');
	},

	setProgresBar: function() {
		this.stroke = this.strokeConst = Math.round(this.$quizProgresBar.getTotalLength()) * 0.8;
		this.strokeStep = this.stroke / 8;
		this.$quizProgresBar.style.strokeDasharray = this.stroke + 'px';
		this.$quizProgresBar.style.strokeDashoffset = this.stroke + 'px';
	},

	setCheckIcon: function(img) {
		this.$quizIcon.forEach((item)=>{
			item.src = img;
		});
	},

	setMainImg: function() {
		this.$mainImg.classList.remove('opacity');
		this.$questionCont.classList.add('opacity');
		this.$mainImg.style.backgroundImage = `url(${this.currentQuestion.mainImage})`;
		setTimeout(()=> {
			this.$mainImg.classList.add('opacity');
			this.$questionCont.classList.remove('opacity');
			this.resetQuestion();
			this.setQuestion();
		}, 300);
	},

	setQuestion: function() {
		this.$mainQuizConteiner.classList.add(this.currentQuestion.class);
		this.$quizStatus.forEach((item)=>{
			item.style.opacity = 0.2;
			item.innerText = '';
		});
		this.$quizCounter.innerText = this.counter;
		this.$quizStatus[this.questionNo - 1].style.opacity = 1;
		this.$quizStatus[this.questionNo - 1].innerText = this.questionNo;
		this.$quizImage.src = this.currentQuestion.image;
		this.$quizQuestion.innerText = this.currentQuestion.question;
		this.$quizStatement.innerText = this.currentQuestion.statement;
		this.$quizStep1.innerText = this.currentQuestion.steps[0];
		this.$quizStep2.innerText = this.currentQuestion.steps[1];
		this.$quizStep3.innerText = this.currentQuestion.steps[2];
	},

	nexQuestion: function() {
		if (this.questionNo < this.questions.length && this.procide) {
			this.$mainQuizConteiner.classList.remove(this.currentQuestion.class);
			this.questionNo++;
			this.currentQuestion = this.questions.filter(el => el.id === this.questionNo)[0];
			this.scoreLogic(this.counter);
			this.quizinit();
		} else if (this.questionNo === this.questions.length) {
			this.scoreLogic(this.counter);
			this.scoreSum();
			this.layoutLogic();
			this.saveResults();
		}
	},

	sliderEvents: function() {
		this.$quizSlider.addEventListener('mousedown', () => {
			this.down = true;
			this.procideCheck(false);
		});

		this.$quizSlider.addEventListener('mouseup', () => {
			this.down = false;
			this.procideCheck(true);
		});

		this.$quizSlider.addEventListener('mouseleave', () => {
			if (this.down) {
				this.down = false;
				this.procideCheck(true);
			}
		});

		this.$quizSlider.addEventListener('mousemove', (e) => {
			if (this.down) {
				this.changeCounter(e.clientX, e.clientY);
			}
		});

		this.$quizSlider.addEventListener('keydown', (e) => {
			let deg = 0;
			if (e.keyCode === 38 && this.counter < 9) {
				this.keyCount++;
			} else if (e.keyCode === 40 && this.counter > 0) {
				this.keyCount--;
			}
			deg = this.max - this.step * this.keyCount;
			this.changeCounter(0, 0, deg);
			this.procideCheck(true);
		});

		this.$quizSlider.addEventListener('touchstart', () => {
			this.down = true;
			this.procideCheck(false);
		});

		this.$quizSlider.addEventListener('touchend', () => {
			this.down = false;
			this.procideCheck(true);
		});

		this.$quizSlider.addEventListener('touchmove', (e) => {
			if (this.down) {
				this.changeCounter(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
			}
		});

		this.$quizButton.forEach((item)=>{
			item.addEventListener('click', ()=>{
				this.nexQuestion();
			});
			item.addEventListener('keydown', (e)=>{
				if (e.keyCode === 13) {
					this.nexQuestion();
				}
			});
		});
	},

	getCenter: function(element) {
		const rect = element.getBoundingClientRect();
		return [
			rect.left + (rect.width / 2),
			rect.top + (rect.height / 2),
		];
	},

	radToDeg: function(rad) {
		return rad * (180 / Math.PI);
	},

	angle: function(mx, my) {
		const center = this.getCenter(this.$quizSlider);
		const x = mx - center[0];
		const y = my - center[1];
		let deg = this.radToDeg(Math.atan2(x, y));
		if (deg < 0) {
			deg += 360;
		} else if (deg > 336) {
			deg = 336;
		} else if (deg < 30) {
			deg = 30;
		}
		return deg;
	},

	normalize: function(degree) {
		const n = Math.max(this.min, Math.min(degree, this.max));
		const high = Math.ceil(n / this.step);
		let val;
		this.counter = 10 - high;
		this.stroke = this.strokeConst - (this.strokeStep * (this.counter - 1));
		if (this.counter > 0) {
			if (this.counter === 10) {
				val = this.max;
			} else {
				val = high * this.step;
			}
		} else {
			val = this.min;
		}
		return val;
	},

	changeCounter(x, y, keyPress = false) {
		const deg = keyPress ? keyPress : this.angle(x, y);
		this.$quizSlider.style.transform = `rotate(-${this.normalize(deg)}deg)`;
		this.$quizProgresBar.style.strokeDashoffset = this.stroke + 'px';
		this.$quizCounter.innerText = this.counter;
		this.$quizDots.forEach((item, index)=>{
			item.classList.remove('guiz__dot-active');
			if (index <= this.counter - 1) {
				item.classList.add('guiz__dot-active');
			}
		});
	},

	procideCheck: function(done) {
		if (!done) {
			this.setCheckIcon(this.check);
			this.procide = false;
			this.$quizDotsSmall.forEach((item, index)=>{
				item.classList.remove('guiz__dot-active');
				if (index < 3) {
					item.classList.add('guiz__dot-active');
				}
			});
		} else {
			this.$quizDotsSmall.forEach((item)=>{
				item.classList.add('guiz__dot-active');
			});
			this.setCheckIcon(this.checkActiv);
			this.procide = true;
		}
	},

	scoreLogic: function(n) {
		switch (n) {
			case n = 1:
				this.answers['answers'].push({'warm': 100,	'open': 0, 'light': 0});
				break;
			case n = 2:
				this.answers['answers'].push({'warm': 70,	'open': 30, 'light': 0});
				break;
			case n = 3:
				this.answers['answers'].push({'warm': 60,	'open': 20, 'light': 20});
				break;
			case n = 4:
				this.answers['answers'].push({'warm': 30,	'open': 70, 'light': 0});
				break;
			case n = 5:
				this.answers['answers'].push({'warm': 0,	'open': 100, 'light': 0});
				break;
			case n = 6:
				this.answers['answers'].push({'warm': 0,	'open': 70, 'light': 30});
				break;
			case n = 7:
				this.answers['answers'].push({'warm': 20,	'open': 20, 'light': 60});
				break;
			case n = 8:
				this.answers['answers'].push({'warm': 0,	'open': 30, 'light': 70});
				break;
			case n = 9:
				this.answers['answers'].push({'warm': 0,	'open': 0, 'light': 100});
				break;
			default:
		}
	},

	scoreSum: function() {
		this.answers['results']['warm'] = this.answers['answers'].reduce((a, b)=>{
			return a + b['warm'];
		}, 0);
		this.answers['results']['open'] = this.answers['answers'].reduce((a, b)=>{
			return a + b['open'];
		}, 0);
		this.answers['results']['light'] = this.answers['answers'].reduce((a, b)=>{
			return a + b['light'];
		}, 0);
	},

	layoutLogic: function() {
		const warm = this.answers['results']['warm'];
		const open = this.answers['results']['open'];
		const light = this.answers['results']['light'];
		switch (true) {
			case light === 0 && open === 0:
				this.answers['layout'] = 1;
				break;
			case warm > open && open > light:
				this.answers['layout'] = 2;
				break;
			case warm > open && open === light:
				this.answers['layout'] = 3;
				break;
			case open > warm && warm > light:
				this.answers['layout'] = 4;
				break;
			case light === 0 && warm === 0:
				this.answers['layout'] = 5;
				break;
			case open > light && light > warm:
				this.answers['layout'] = 6;
				break;
			case light > open && open === warm:
				this.answers['layout'] = 7;
				break;
			case light > open && open > warm:
				this.answers['layout'] = 8;
				break;
			case open === 0 && warm === 0:
				this.answers['layout'] = 9;
				break;
			default:
		}
	},

	saveResults: function() {
		localStorage.setItem('answers', JSON.stringify(this.answers));
	},

	resetQuestion: function() {
		this.counter = 1;
		this.keyCount = 0;
		this.down = false;
		this.procide = false;
		this.$quizSlider.style.transform = 'rotate(-324deg)';
		this.$quizProgresBar.style.strokeDashoffset = this.stroke + 'px';
		this.setCheckIcon(this.check);
		this.$quizDotsSmall.forEach((item)=>{
			item.classList.remove('guiz__dot-active');
		});
		this.$quizDots.forEach((item)=>{
			item.classList.remove('guiz__dot-active');
		});
	},

	scrollScreen: function() {
		if (window.innerWidth < 588) {
			this.$questionCont.addEventListener('touchstart', (e)=>{
				this.tuchPosition = e.targetTouches[0].clientY;
			});
			this.$questionCont.addEventListener('touchmove', (e) => {
				if (this.tuchPosition && !this.$quizSlider.contains(e.target)) {
					if (this.tuchPosition > e.targetTouches[0].clientY) {
						this.$quizScrollCont.style.marginTop = `-${this.$quizScrollCont.offsetHeight + 27}px`;
						this.$mainQuizConteiner.classList.add('quiz--down');
						this.tuchPosition = e.targetTouches[0].clientY;
					} else {
						this.$quizScrollCont.style.marginTop = '125px';
						this.$mainQuizConteiner.classList.remove('quiz--down');
						this.tuchPosition = e.targetTouches[0].clientY;
					}
				}
			});

		}
	},

	quizinit: function() {
		this.setProgresBar();
		this.setMainImg();
	}

};

export default quiz;