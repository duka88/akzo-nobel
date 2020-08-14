import quiz from '../_project/quiz';
import result from '../_project/result';

const starter = {
	$mainConteiner: document.querySelector('.js-main'),
	$resultLeyout: null,

	init: function() {
		this.fetchStorage();
	},

	fetchStorage: function() {
		const results = JSON.parse(localStorage.getItem('answers'));
		this.$resultLeyout = results.layout;
		if (results) {
			this.fetchPage('/dist/results.html', true);
		} else {
			this.fetchPage('/dist/quiz.html', false);
		}
	},
	fetchPage: function(page, fn) {
		fetch(page)
			.then(response => response.text())
			.then((data) => {
				this.$mainConteiner.innerHTML = data;
				if (fn) {
					result.init(this.$resultLeyout);
				} else {
					quiz.init();
				}
			});

	},

};

export default starter;