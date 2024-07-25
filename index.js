let messageEL = document.getElementById("message-el") 
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let startButton = document.getElementById("start-btn")
let standButton = document.getElementById("stand-btn")
let newButton = document.getElementById("new-btn")
let roundButton = document.getElementById("round-btn")
let dealerEl = document.getElementById("dealerimg-el")
let dealerSum = document.getElementById("dealer-sum")

let playerimages = []
let dealerimages = []

let playersum = 0
let dealersum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

let money = 200

newButton.style.display = 'none'
roundButton.style.display = 'none'



function startGame(){
  playerimages = []
  dealerimages = []
  startButton.style.display = 'none'
  roundButton.style.display = 'none'
  newButton.style.display = 'inline-block'
  standButton.style.display = 'inline-block'
  playerEl.textContent = "Money: $" + money
  isAlive = true
  newCard("player")
  renderGame()
}

function dealer(){
  newButton.style.display = 'none'
  standButton.style.display = 'none'
  while(dealersum <= playersum){
    newCard("dealer")
  }

  if(dealersum <= 21){
    message = "You lost to the dealer!"
    isAlive = false
    endGame()
  }else{
    message = "You win!"
    isAlive = true
    endGame()
  }
  messageEL.textContent = message
}

function renderGame(){
  sumEl.textContent = "Your Sum: " + playersum
  cardsEl.textContent = ""
  dealerEl.textContent = ""

  dealerSum.textContent = "Dealer Sum: " + dealersum

  for(let i = 0; i < playerimages.length; i++){
    let img = document.createElement('img')
    img.src = playerimages[i]
    img.style.width = '7.5%'
    img.style.height = 'auto'
    cardsEl.append(img)
  }

  for(let i = 0; i < dealerimages.length; i++){
    let img = document.createElement('img')
    img.src = dealerimages[i]
    img.style.width = '7.5%'
    img.style.height = 'auto'
    dealerEl.append(img)
  }

  if (playersum === 21) {
    message = "You've got Blackjack!"
    endGame()
  } else if (playersum > 21){
    message = "You're out of the game!"
    isAlive = false
    endGame()
  }

  messageEL.textContent = message
  
}

function newCard(type){
  if(isAlive && !hasBlackJack){
    let card = getRandomCard(type)

    if(type === "player"){
      playersum += card
    } else{
      dealersum += card
    }
    
    renderGame()
  }
  
}

function getRandomCard(type){
  let number = Math.ceil(Math.random()*13)

  if(type === "player"){
    playerimages.push(`images/PNG-cards-1.3/${number}.png`)
  }else{
    dealerimages.push(`images/PNG-cards-1.3/${number}.png`)
  }
  

  if(number > 10){
    number = 10
  }
  return number
}

function endGame(){
  if(isAlive){
    money += 10
  }else{
    money -= 20
  }
  
  playerEl.textContent = "Money: $" + money
  roundButton.style.display = 'inline-block'
  newButton.style.display = 'none'
  standButton.style.display = 'none'
  playersum = 0
  dealersum = 0
  message = ""

  if(money <= 0){
    lostGame()
  }
}

function lostGame(){
  cardsEl.textContent = "You have run out of money! Please start a new game"
  roundButton.style.display = 'none'
  startButton.style.display = 'inline-block'
  money = 200;
}



