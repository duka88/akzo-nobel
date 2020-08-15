import quiz from '../_project/quiz';
import result from '../_project/result';

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
		//this.fetchStorage();
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
					this.$mainConteiner.innerHTML = data;
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
};

export default starter;