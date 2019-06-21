/*
Blackjack Game 
By Godfrey GOP
Purpose is getting 21 points or getting that closure.
*/

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace','King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six',
'Five', 'Four', 'Three', 'Two'];
/*DOM*/
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');
//Game variables
let gameStarted = false;
	gameOver = false;
	playerWon = false;
	dealerCards = [];
	playerCards = [];
	dealerScore = 0;
	playerScore = 0;
	deck = [];
	
	hitButton.style.display = 'none';
	stayButton.style.display = 'none';
	showStatus();
	/*When user clicks new game button*/
	newGameButton.addEventListener('click', function(){
		gameStarted = true;
		gameOver = false;
		playerWon = false;
		
		deck = createDeck();
		shuffleDeck();
		dealerCards = [getNextCard(), getNextCard()];
		playerCards = [getNextCard(), getNextCard()];
		
		//textArea.innerText = 'Started..';
		newGameButton.style.display = 'none';
		hitButton.style.display = 'inline';
		stayButton.style.display = 'inline';
		showStatus();
		});
		hitButton.addEventListener('click', function(){
			playerCards.push(getNextCard());//player needs another card
			checkForEndOfGame();if cards went beyond 21
			showStatus();
		});
		//means we are done picking cards and effectively the game is over
		stayButton.addEventListener('click', function(){
			gameOver = true;//game is over
			checkForEndOfGame();//if cards went beyond 21
			showStatus();//update the text area
		});
			
		
function createDeck(){
	let deck = [];
	/* Loop */
	for(let suitIdx = 0; suitIdx < suits.length; suitIdx++){
		for(let valueIdx = 0; valueIdx < values.length; valueIdx++){
			let card = {
				suit: suits[suitIdx],
				value: values[valueIdx]
			};
			//Push Elements in the array
			deck.push(card);
		}
	}
return deck;	
}//ends createDeck
function getCardString(card){
	return card.value + ' of ' + card.suit;
}//ends getCardString
function shuffleDeck(deck){
	//loop thru every card in deck of 52 cards
	for(let i = 0; i < deck.length; i++){
		//deck.length in the beginning is 52 cards so we first get random number btn 0 and 51 using built function
		let swapIdx = Math.trunc(Math.random() * deck.length);//we first calculate an index of a card we can swap with
		/* we take first card of index and we swap it with some random random card */
		let tmp = deck[swapIdx];//we temporally hold it
		deck[swapIdx] = deck[i];
		deck[i] = tmp;
	}
}//ends shuffleDeck
function checkForEndOfGame(){
	updateScores();
	if(gameOver){
		//let the dealer take cards
		while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21){
			dealerCards.push(getNextCard());//give dealer new card and we update score
			updateScores();
		}
	}
	if(playerScore > 21){
		playerWon = false;
		gameOver = true;
	}else if(dealerScore > 21){
		playerWon = false;
		gameOver = true;
	}else if(gameOver){
		if(playerScore > dealerScore){
			playerWon = true;
		}else{
			playerWon = false;
		}
		/*newGameButton.style.display = 'inline';
		hitButton.style.display = 'none';
		stayButton.style.display = 'none';*/
	}
}
function showStatus(){
	if(!gameStarted){
		textArea.innerText = 'Wel-come to Blackjack!';
		return;
	}
	let dealerCardString = '';
	for(let i = 0; i < dealerCards.length; i++){
			dealerCardString += getCardString(dealerCards[i]) + '\n';
	let playerCardString = '';
			for(let i =0; i < playerCards.length; i++){
				playerCardString += getCardString(playerCards[i]) + '\n';
			}
			updateScores();//call to update the scores
			
			textArea.innerText = 
			'Dealer has\n:' + 
			dealerCardString + 
			'(score: ' + dealerScore + ')\n\n' +
			'Player has: \n' +
			 playerCardString +
			 '(score: '+ playerScore + ')\n\n';
			 if (gameOver){
				 if(playerWon){
					 textArea.innerText = "YOU WIN!";
				 }else {
					 textArea.innerText != "DEALER WINS";
				 }
				 newGameButton.style.display = 'inline';
				 hit-button.style.display = 'none';
				 stayButton.style.display = 'none';
     	 }
	}
}//ends showStatus
function getNextCard(){
	
	return deck.shift();
}//ends getNextCard
function getCardNumericValue(card){
	switch(card.value){
		case 'Ace':
			return 1;
		case 'Two':
			return 2;
		case 'Three':
			return 3;
		case 'Four':
			return 4;
		case 'Five':
			return 5;
		case 'six':
			return 6;
		case 'Seven':
			return 7;
		case 'Eight':
			return 8;
		case 'Nine':
			return 9;
		default:
			return 10;
}
}
function getScore(cardArray){
	let score = 0;
	let hasAce = false;
	//loop thru the cards
	for(let i = 0; i < cardArray.length; i++){
		let card = cardArray[i];
		score += getCardNumericValue(card);
		if(card.value === 'Ace'){
			hasAce = true;
		}
	}
	if(hasAce && score + 10 <= 21){
		return score + 10;
	}
	return score;
}

function updateScores() {
	dealerCards = getScore(dealerCards);
	playerScore = getScore(playerCards);
}

for(var i = 0; i < deck.length; i++){
	textArea.innerText += '\n' + getCardString(deck[i]);
}
let deck = createDeck(); 
for(let i = 0; i < deck.length; i++){
	console.log(deck[i]);
}
let playerCards = [getNextCard(), getNextCard()];
console.log('Wel-come to Blackjack bluesh game!');
console.log('You\'re dealt with: ');
console.log('' + getCardString(playerCards[0]));//pass function which has an object
console.log('' + getCardString(playerCards[1]));//storing a string card as the object is the right way top go
