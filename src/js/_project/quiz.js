const quiz = {
	$mainConteiner: document.querySelector('.js-quiz'),
	$mainImg: document.querySelector('.js-main-img'),
	$questionCont: document.querySelector('.js-main-wrap'),
	$quizStatusBar: document.querySelector('.js-status-bar'),
	$quizStatus: null,
	$quizImage: document.querySelector('.js-image'),
	$quizQuestion: document.querySelector('.js-question'),
	$quizStatement: document.querySelector('.js-statement'),
	$quizCounter: document.querySelector('.js-counter'),
	$quizIcon: document.querySelector('.js-check-icon'),
	$quizSlider: document.querySelector('.js-range-slider'),
	$quizProgresBar: document.querySelector('.js-progres-bar'),
	$quizDots: document.querySelectorAll('.js-dot'),
	$quizDotsSmall: document.querySelectorAll('.js-dot-small'),
	$quizButton: document.querySelector('.js-check'),
	$quizStep1: document.querySelector('.js-step1'),
	$quizStep2: document.querySelector('.js-step2'),
	$quizStep3: document.querySelector('.js-step3'),
	questionNo: 1,
	counter: 1,
	down: false,
	rotate: 45,
	stroke: 677,
	procide: false,
	mouseY: 0,
	mouseX: 0,
	questions: [],
	currentQuestion: {},
	answers: {answers: [], results: {}, layout: null},

	init: function() {
		this.fetchQuestions();
		this.sliderMouseEvents();
		this.nexQuestion();
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

	setMainImg: function() {
		this.$mainImg.classList.remove('opacity');
		this.$questionCont.classList.add('opacity');
		this.$mainImg.style.backgroundImage = `url(${this.currentQuestion.mainImage})`;
		setTimeout(()=> {
			this.$mainImg.classList.add('opacity');
			this.$questionCont.classList.remove('opacity');
			this.resetQuestion();
			this.setQuestion();
		}, 100);
	},

	setQuestion: function() {
		this.$mainConteiner.classList.add(this.currentQuestion.class);
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
		this.$quizButton.addEventListener('click', ()=>{
			if (this.questionNo < this.questions.length && this.procide) {
				this.$mainConteiner.classList.remove(this.currentQuestion.class);
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
		});
	},

	sliderMouseEvents: function() {
		this.$quizSlider.addEventListener('mousedown', (e) => {
			this.down = true;
			this.mouseY = e.clientY;
			this.mouseX = e.clientX;
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
				this.moveLogic(e.clientX, e.clientY);
			}
		});
	},

	moveLogic: function(moveX, moveY) {
		const calcY = Math.round(this.mouseY - moveY);
		const calcX = Math.round(this.mouseX - moveX);
		if (this.counter >= 1 && this.counter < 4) {
			if (calcY > 30) {
				this.mouseY = moveY;
				this.counter++;
				this.rotate += 33.75;
				this.stroke -= 80;
			} else if (calcY < -30 && this.counter > 1) {
				this.mouseY = moveY;
				this.counter--;
				this.rotate -= 33.75;
				this.stroke += 80;
			}
		} else if (this.counter >= 4 && this.counter < 7) {
			if (calcX < -30 && this.counter < 7) {
				this.mouseX = moveX;
				this.counter++;
				this.rotate += 33.75;
				this.stroke -= 80;
			} else if (calcX > 30 && this.counter >= 4) {
				this.mouseX = moveX;
				this.counter--;
				this.rotate -= 33.75;
				this.stroke += 80;
			}
		} else if (this.counter <= 9) {
			if (calcY < -30 && this.counter < 9) {
				this.mouseY = moveY;
				this.counter++;
				this.rotate += 33.75;
				this.stroke -= 80;
			} else if (calcY > 30) {
				this.mouseY = moveY;
				this.counter--;
				this.rotate -= 33.75;
				this.stroke += 80;
			}
		}
		this.changeCounter();
	},

	changeCounter() {
		this.$quizSlider.style.transform = `rotate(${this.rotate}deg)`;
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
			this.$quizIcon.src = this.$quizIcon.src.replace('-next.png', '.png');
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
			this.$quizIcon.src = this.$quizIcon.src.replace('.png', '-next.png');
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
		this.down = false;
		this.rotate = 45;
		this.stroke = 677;
		this.procide = false;
		this.mouseY = 0;
		this.mouseX = 0;
		this.$quizSlider.style.transform = `rotate(${this.rotate}deg)`;
		this.$quizProgresBar.style.strokeDashoffset = this.stroke + 'px';
		this.$quizIcon.src = this.$quizIcon.src.replace('-next.png', '.png');
		this.$quizDotsSmall.forEach((item)=>{
			item.classList.remove('guiz__dot-active');
		});
		this.$quizDots.forEach((item)=>{
			item.classList.remove('guiz__dot-active');
		});
	},

	quizinit: function() {
		this.setMainImg();
	}

};

export default quiz;