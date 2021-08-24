
const BASE_URL="https://rickandmortyapi.com/api/character"
const characterResults = {}
init();
function init(){
    giveARandomNumber()
    intialPull();
    displayCharacter()
}


function intialPull(){  
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => {
        getAllCharacters(data.info.pages)
    console.log(data)
    })
    
}


function getAllCharacters(pageNum){
    for (let i = 0; i < pageNum; i++){
        fetch(`${BASE_URL}?page=${i}`)
        .then(resp => resp.json())
        .then(data => {
            characterResults = {...data}
            //postToDBJSON(data.results)
        })
    }
}

// function postToDBJSON (character){
//     fetch("http://localhost:3000/results",{
//         method: "POST",
//         headers: {"Content-Type":"application/json"},
//         body: JSON.stringify(character),
//     })
//     .then(resp=>resp.json())
//     .then(data=>data)

// }
// make an randomizer to give us numbers between 1 to 671 to get ids

//with the ids we results[${idfromrandomizer}]

//create empty array tho shove in all results for that id

//array.image into a for loop to store

//then make img tags with a loop to place each url into the image.src

//give img src style so that the boxes are limited to a size




function giveARandomNumber(){
    const randomNum = Math.floor(Math.random()*671)
    displayCharacter(randomNum)
}

function displayCharacter(randomNum){
    console.log(characterResults)
    console.log(randomNum)
}