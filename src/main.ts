import './style.css';

window.addEventListener('DOMContentLoaded', () => {
	interface CardImg {
		imgSrc: string;
		name: string;
		isMatched: boolean;
	}

	let playGame: boolean = false;
	let minutes: number = 0;
	let seconds: number = 0;
	let point: number = 0;

	const timerContainer = document.querySelector('.timer') as HTMLElement;
	const startBtn = document.querySelector('.game-start-btn') as HTMLElement;
	const refreshBtn = document.querySelector('.refresh') as HTMLElement;
	const pointTag = document.querySelector('.point') as HTMLElement;

	const getData: CardImg[] = [
		{ imgSrc: '/public/img/gear5.jpg', name: 'gear5', isMatched: false },
		{ imgSrc: '/public/img/minato.jpg', name: 'minato', isMatched: false },
		{ imgSrc: '/public/img/murom.jpg', name: 'murom', isMatched: false },
		{ imgSrc: '/public/img/naruto.jpg', name: 'naruto', isMatched: false },
		{ imgSrc: '/public/img/zoro.jpg', name: 'zoro', isMatched: false },
		{ imgSrc: '/public/img/chopper.jpg', name: 'chopper', isMatched: false },
		{ imgSrc: '/public/img/gear5.jpg', name: 'gear5', isMatched: false },
		{ imgSrc: '/public/img/minato.jpg', name: 'minato', isMatched: false },
		{ imgSrc: '/public/img/murom.jpg', name: 'murom', isMatched: false },
		{ imgSrc: '/public/img/naruto.jpg', name: 'naruto', isMatched: false },
		{ imgSrc: '/public/img/zoro.jpg', name: 'zoro', isMatched: false },
		{ imgSrc: '/public/img/chopper.jpg', name: 'chopper', isMatched: false },
	];

	// timer
	function updateTimerDisplay() {
		timerContainer.textContent = `${minutes
			.toString()
			.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}
	function startTimer() {
		setInterval(() => {
			seconds++;
			if (seconds === 60) {
				seconds = 0;
				minutes++;
			}
			updateTimerDisplay();
		}, 1000);
	}

	// Function to stop the timer
	function resetTimer() {
		minutes = 0;
		seconds = 0;
		updateTimerDisplay();
	}

	//

	// Random
	const randomize = () => {
		const cardData = getData;
		cardData.sort(() => Math.random() - 0.5);
		return cardData;
	};

	// Card Generator
	const cardGenerator = () => {
		const cardContainer = document.querySelector('.deck') as HTMLElement;

		const cardData = randomize();
		const cardItem: string = cardData
			.map(
				({ imgSrc, name, isMatched }) => `
				<li class="card" data-name="${name}" data-isMatch="${isMatched}">
						<div class="card-container" >
							<div class="card-face front"></div>
							<img class="card-face fab back" src="${imgSrc}" />
						</div>
				</li>
		`
			)
			.join(' ');
		cardContainer.innerHTML = cardItem;
	};

	// Handle play
	const handlePlay = () => {
		const cardTags = document.querySelectorAll('.card');
		cardTags.forEach((card) => {
			card.addEventListener('click', (e) => {
				handleFlipped(e);
			});
		});
		function handleFlipped(e: any) {
			const cardContai = e.currentTarget;
			cardContai.classList.add('toggleCard');
			const toggleCards = document.querySelectorAll('.toggleCard');
			if (toggleCards.length === 2) {
				toggleCards[0].classList.remove('correct');
				toggleCards[1].classList.remove('correct');
				const card1 = toggleCards[0] as HTMLElement;
				const card2 = toggleCards[1] as HTMLElement;
				if (card1.dataset.name === card2.dataset.name) {
					cardTags.forEach((card) => {
						const cardConvert = card as HTMLElement;
						if (cardConvert.dataset.name === card1.dataset.name) {
							cardConvert.classList.add('flipped');
							cardConvert.classList.remove('toggleCard');
							setTimeout(() => {
								toggleCards[0].classList.add('correct');
								toggleCards[1].classList.add('correct');
								let newPoint = point++;
								pointTag.innerHTML = newPoint.toString();
							}, 400);
						}
					});
				} else {
					cardTags.forEach((card) => {
						setTimeout(() => {
							toggleCards[0].classList.add('wrong');
							toggleCards[1].classList.add('wrong');
						}, 1300);
						setTimeout(() => {
							toggleCards[0].classList.remove('wrong');
							toggleCards[1].classList.remove('wrong');
							card.classList.remove('toggleCard');
						}, 1500);
					});
				}
			}
		}
	};

	// Start game
	startBtn?.addEventListener('click', () => {
		handlePlay();
		if (startBtn.innerText == 'Star Game') {
			playGame = true;
			startBtn.innerText = 'pause';
			// startTimer();
		} else {
			playGame = false;
			startBtn.innerText = 'Star Game';
		}
	});

	refreshBtn.addEventListener('click', () => {
		resetTimer();
	});

	cardGenerator();
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header class="header">
        <h1>Memory game</h1>
        <div class="controls">
            <div class="star-list">
                <span class="moves-container">
									<span class="moves-selector point">0</span>
									Point
                </span>
            </div>
            <div class="time-container">
                <div class="timer">00:00</div>
            </div>
            <div class="btn-control">
							<div class="game-start-btn">Star Game</div>
							<div class="refresh"> 
									<ion-icon class="icon" name="refresh-outline"></ion-icon>
							</div>
            </div>
        </div>
    </header>
    <section class="game-container">
        <ul class="deck">
        
        </ul>
    </section>
    <div class="win">
        <h1>Congratulations!</h1>
        <h3>- You won! -</h3>
        <p>It took you about <span class="seconds">32</span> Seconds to comeplete the game <br> with <span class="moves">17</span> Moves and <span class="star">1</span> Stars.<br>Woooohoooooo!</p>
        <button class="replay">Play again!</button>
    </div>
`;
