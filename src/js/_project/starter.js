import quiz from '../_project/quiz';
import result from '../_project/result';
import resulthtml from '../_project/resultHtml';

const starter = {
	$mainConteiner: document.querySelector('.js-main'),
	$homeContainer: document.querySelector('.js-home-page'),
	$langDropdown: document.querySelector('.js-lang-dropdown'),
	$langList: document.querySelector('.js-lang-list'),
	$langs: document.querySelectorAll('.js-leng-switch'),
	$langCurrent: document.querySelector('.js-leng-current'),
	$homeTitle: document.querySelector('.js-home-title'),
	$homeText: document.querySelector('.js-home-text'),
	$startQuiz: document.querySelector('.js-start-quiz'),
	$resultLeyout: null,
	lang: 'EN',
	text: {},

	init: function() {
		this.setLang();
		this.langSelect();
		this.startQuiz();
		this.changeLang();
		this.fetchStorage();
	},

	fetchStorage: function() {
		const results = JSON.parse(localStorage.getItem('answers'));
		if (results) {
			this.$resultLeyout = results.layout;
			this.fetchPage('/dist/results.html', true);
		} else {
			//this.fetchPage('/dist/quiz.html', false);
		}
	},

	fetchPage: function(page, res) {
		fetch(page)
			.then(response => response.text())
			.then((data) => {
				if (res) {
					this.$mainConteiner.innerHTML = resulthtml;
					result.init(this.$resultLeyout, this.lang);
				} else {
					const height = this.$mainConteiner.clientHeight;
					this.$mainConteiner.innerHTML += data;
					quiz.init(this.lang);
					this.$mainConteiner.style.transform = `translateY(-${height}px)`;
				}
			});

	},

	homeTranslate: function() {
		this.$homeTitle.innerText = this.text.heading;
		this.$homeText.innerText = this.text.text;
	},

	setLang: function() {
		const lang = localStorage.getItem('lang');
		this.lang = lang ? lang : 'EN';
	},

	changeLang: function() {
		fetch(`json/${this.lang}/home.json`)
			.then(response => response.json())
			.then((data) => {
				this.text = data;
				this.homeTranslate();
			});
	},

	langSelect: function() {
		this.$langDropdown.addEventListener('click', ()=>{
			this.$langList.classList.toggle('d-none');
		});
		this.$langCurrent.innerText = this.lang;
		this.$langs.forEach((item) =>{
			item.addEventListener('click', ()=>{
				const selected = item.getAttribute('data-lang');
				this.$langCurrent.innerText = selected;
				localStorage.setItem('lang', selected);
				this.lang = selected;
				this.changeLang();
			});
		});
	},

	startQuiz: function() {
		this.$startQuiz.addEventListener('click', ()=>{
			this.fetchPage('/dist/quiz.html', false);
		});
	},

	resultHtml: function() {
		return `<section class="result">
		<figure class="quiz__logo-wrap quiz__logo-wrap--results">
			<img class="quiz__logo" src="assets/images/logo.png" alt="logo">
		</figure>
		<div class="result__header-wrap result__text-wrap">
			<div class="result__explore-wrap">
				<div class="explore">
					<figure class="explore__icon">
						<img src="assets/images/icons/combined-shape.png" alt="icon">
					</figure>
					<div class="explore__explore-text js-explore-text">
						<strong>EXPLORE</strong>
						<p>ColourFutures 2018</p>
					</div>
				</div>
			</div>
			<div class="result__range-slider-wrap ">
				<div class="result__range-slider ">
					<div class="result__line-bar">
						<div class="result__line-wrap js-line-slider">
							<div class="result__line"></div>
							<div class="result__line"></div>
							<div class="result__line"></div>
							<div class="result__line"></div>
							<div class="result__line"></div>
							<div class="result__line"></div>
							<div class="result__line"></div>
							<div class="result__line"></div>
							<div class="result__line"></div>
						</div>
					</div>
					<div class="result__circle js-slider-dot">
						<div class="result__circle-inner"></div>
					</div>
				</div>
				<div class="result__range-slider-info">
					<figure class="result__range-slider-icon">
						<img src="assets/images/icons/duble-arow.png" alt="icon">
					</figure>
					<span class="result__range-slider-text">Drag to discover more</span>
				</div>
			</div>
		</div>
		<div class="result__text-wrap result__text-wrap--mob1">
			<div class="result__main-text-wrap ">
				<div class="result__side-icons-wrap mobile-hide">
					<div class="result__side-icon">
						<div class="result__side-figure">
							<svg class="result__progres-bar-wrap ">
								<circle class="result__progres-bar js-resut-w" cx="50%" cy="50%" r="50%" fill="transparent" stroke-width="2" />
							</svg>
						</div>
						<p class="result__letter">W</p>
					</div>
					<div class="result__side-icon">
						<div class="result__side-figure">
							<svg class="result__progres-bar-wrap ">
								<circle class="result__progres-bar js-resut-o" cx="50%" cy="50%" r="50%" fill="transparent" stroke-width="2" />
							</svg>
						</div>
						<p class="result__letter">O</p>
					</div>
					<div class="result__side-icon ">
						<div class="result__side-figure">
							<svg class="result__progres-bar-wrap ">
								<circle class="result__progres-bar js-resut-l" cx="50%" cy="50%" r="50%" fill="transparent" stroke-width="2" />
							</svg>
						</div>
						<p class="result__letter">L</p>
					</div>
				</div>
				<div class="result__text js-result-heading">
				</div>
			</div>
		</div>
		<div class="result__text-wrap result__text-wrap--mob2">
			<p class="result__paragraph js-result-text">
			</p>
		</div>
		<div class="result__text-wrap result__text-wrap--mob3">
			<div class="result__social-wrap">
				<div class="result__socials result__socials--left">
					<div class="result__social">
						<a href="">
							<figure class="result__social-icon">
								<img src="assets/images/icons/facebook.png" alt="facebook icon">
							</figure>
						</a>
					</div>
					<div class="result__social">
						<a href="">
							<figure class="result__social-icon">
								<img src="assets/images/icons/tweeter.png" alt="tweeter icon">
							</figure>
						</a>
					</div>
					<div class="result__social mobile-hide">
						<a href="">
							<figure class="result__social-icon">
								<img src="assets/images/icons/download.png" alt="download icon">
							</figure>
						</a>
					</div>
				</div>
				<div class="result__socials result__socials--right">
					<div class="result__social-text js-social-text">
						<strong>TRY OUR</strong>
						<p>Visualiser App</p>
					</div>
					<div class="result__social">
						<a href="">
							<figure class="result__social-icon">
								<img src="assets/images/icons/iphone.png" alt="iphone icon">
							</figure>
						</a>
					</div>
					<div class="result__social">
						<a href="">
							<figure class="result__social-icon">
								<img src="assets/images/icons/google-play.png" alt="google-play icon">
							</figure>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="result__text-wrap result__text-wrap--mob4">
			<div class="result__logo-wrap ">
				<p class="result__logo-text js-logo-text">powered by</p>
				<figure class="result__logo">
					<img src="assets/images/logo-2.png" alt="logo">
				</figure>
			</div>
		</div>
		<div class="result__slider">
			<div class="result__slider-wrap">
				<div class="result__main-img-wrap ">
					<div class="result__main-img-inner-wrap js-img-wrap">
					</div>
				</div>
				<div class="result__nav-img-wrap  mobile-hide">
					<div class="result__nav-img result__nav-img--1">
					</div>
					<div class="result__nav-img result__nav-img--2">
					</div>
				</div>
				<div class="result__slider-nav-wrap  mobile-hide">
					<figure class="result__nav-arow js-up-arow">
						<img src="assets/images/icons/arow-up.png" alt="navigation arow">
					</figure>
					<figure class="result__nav-arow  js-down-arow">
						<img src="assets/images/icons/arow-down.png" alt="navigation arow">
					</figure>
				</div>
			</div>
			<div class="result__color-wrap">
				<div class="result__single-color result__single-color--1"></div>
				<div class="result__single-color result__single-color--2"></div>
				<div class="result__single-color result__single-color--3"></div>
				<div class="result__single-color result__single-color--4"></div>
				<div class="result__single-color result__single-color--5"></div>
				<div class="result__single-color result__single-color--6"></div>
			</div>
		</div>
	</section>
		`;
	}
};

export default starter;