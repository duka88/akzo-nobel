const quizHtml = `<section class="quiz js-quiz">
					<figure class="quiz__logo-wrap">
						<img class="quiz__logo" src="assets/images/logo.png" alt="logo">
					</figure>
					<div class="quiz__main-img js-main-img"></div>
					<div class="quiz__wrap js-main-wrap opacity">
						<div class="quiz__body">
							<figure class="quiz__figure js-scroll-cont">
								<img class="quiz__image js-image" src="" alt="question image">
								<div class="quiz__shadow"></div>
							</figure>
							<div class="quiz__question-wrap">
								<h2 class="quiz__statement js-statement"></h2>
								<h3 class="quiz__question js-question"></h3>
								<div class="quiz__arrow-wrap js-arrow">
									<div class="quiz__arrow-line quiz__arrow-line--left"></div>
									<div class="quiz__arrow-line quiz__arrow-line--right"></div>
								</div>
								<p class="quiz__steps js-step2"></p>
								<div class="quiz__steper">
									<button class="quiz__button quiz__button--mob js-check">
										<div class="quiz__button-icon-wrap">
											<img class="quiz__button-icon js-check-icon" src="assets/images/icons/check.png" alt="check icon">
										</div>
									</button>
									<p class="guiz__counter js-counter"></p>
									<div class="guiz__dot-wrap">
										<div class="guiz__dot guiz__dot--1 js-dot guiz__dot-active"></div>
										<div class="guiz__dot guiz__dot--2 js-dot "></div>
										<div class="guiz__dot guiz__dot--3 js-dot "></div>
										<div class="guiz__dot guiz__dot--4 js-dot "></div>
										<div class="guiz__dot guiz__dot--5 js-dot "></div>
										<div class="guiz__dot guiz__dot--6 js-dot "></div>
										<div class="guiz__dot guiz__dot--7 js-dot "></div>
										<div class="guiz__dot guiz__dot--8 js-dot "></div>
										<div class="guiz__dot guiz__dot--9 js-dot "></div>
									</div>
									<div class="guiz__outer-circle">
										<svg class="guiz__progres-bar-wrap">
											<circle class="guiz__progres-bar js-progres-bar" cx="50%" cy="50%" r="50%" fill="transparent" stroke-width="28" />
										</svg>
										<div class="guiz__outer-square"></div>
									</div>
									<div class="quiz__inner-wrap js-range-slider" tabindex="0">
										<div class="quiz__inner-circle">
											<div class="quiz__inner-circle-small">
												<div class="guiz__circle-dot-wrap">
													<div class="guiz__circle-dot guiz__circle-dot--1 js-dot-small"></div>
													<div class="guiz__circle-dot guiz__circle-dot--2 js-dot-small"></div>
													<div class="guiz__circle-dot guiz__circle-dot--3 js-dot-small"></div>
													<div class="guiz__circle-dot guiz__circle-dot--4 js-dot-small"></div>
													<div class="guiz__circle-dot guiz__circle-dot--5 js-dot-small"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="quiz__steps-wrap">
									<p class="quiz__steps js-step1"></p>
									<p class="quiz__steps js-step3"></p>
								</div>
								<button class="quiz__button js-check" tabindex="0">
									<div class="quiz__button-icon-wrap">
										<img class="quiz__button-icon js-check-icon" src="assets/images/icons/check.png" alt="check icon">
									</div>
								</button>
							</div>
						</div>
						<div class="quiz__status js-status-bar">
						</div>
					</div>
				</section>`;

export default quizHtml;