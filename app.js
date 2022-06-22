const selectionButtons = document.querySelectorAll('[data-selection]')
const finalCol = document.querySelector('[data-final-column]')
const playerScoreSpan = document.querySelector('[data-player-score]')
const compScoreSpan = document.querySelector('[data-comp-score]')
const resetButton = document.querySelector('[data-reset-game]')
const OPTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection 
        const selection = OPTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})
resetButton.addEventListener('click',e => {
    resetGame()
})

function makeSelection(selection){
    const computerSelection = computerPlay()
    const playerWinner = isWinner(selection, computerSelection)
    const compWinner = isWinner(computerSelection, selection)
    showResult(computerSelection, compWinner)
    showResult(selection, playerWinner)
    if(playerWinner) incScore(playerScoreSpan)
    if(compWinner) incScore(compScoreSpan)
}
function showResult(selection, winner){
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    div.setAttribute('id', 'result')
    if(winner) div.classList.add('winner')
    finalCol.after(div)
}
function isWinner(selection, oppSelection){
    return selection.beats === oppSelection.name
}
function computerPlay(){
    let val = [~~(Math.random() * OPTIONS.length)]
    return(OPTIONS[val])
}

function incScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function resetGame(){
    playerScoreSpan.innerText = '0'
    compScoreSpan.innerText= '0'
    
    const divs = document.querySelectorAll('.result-selection');

    divs.forEach(div => {
    div.remove();
    });
}
