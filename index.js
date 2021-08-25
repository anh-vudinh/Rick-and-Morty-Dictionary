const BASE_URLG = "https://rickandmortyapi.com/api/character/"
const BASE_URLP = "http://localhost:3000/characters"
let characterResults = [];
let randomNumberArray = [];
let imageGalleryArray =[];
let click1 = true;
const topGallery = document.querySelector("#top-gallery")
const bottomGallery = document.querySelector("#bottom-gallery")
const searchForm =document.createElement("form")
const characterSearchDiv = document.querySelector("#character-search")
const searchSelect = document.createElement("select")
const searchSelectArray = ["Dead","Alive","Unknown Status","Male","Female","Unknown Gender","Human","Mythological Creature","Alien"]
const characterImg = document.querySelector("#character-img")
const characterInfo = document.querySelector("#character-info")
const searchInputText = document.createElement("input")
const updateDiv = document.querySelector("#update")
const likeDiv = document.querySelector("#like")
const dislikeDiv = document.querySelector("#dislike")
const likeCountDiv = document.querySelector("#like-counter")

let characterNameArray = []
init();
function init(){
    getAllCharacters()
    give8RandomNumbers()
    getGalleryCharacter()
  //delayDataPull();
  createSearchForm()
}
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                 Populating Image Gallery             ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
function getAllCharacters(){
  fetch(BASE_URLP)
  .then(resp => resp.json())
  .then(data => {
    characterResults = data
  }) 
}
function give8RandomNumbers(){                  // WORKS
  for(let i = 0; i < 8; i++){
      randomNumberArray.push(Math.floor(Math.random()*671))
  }
  return randomNumberArray
}

function getGalleryCharacter(){
    fetch(BASE_URLP)
    .then(resp => resp.json())
    .then(data => {
        randomNumberArray.forEach(num => imageGalleryArray.push(data[num]))
        createGalleryImg()
  })
}

// console.log(imageGalleryArray)
function createGalleryImg(){
    imageGalleryArray.forEach(image => {
        const imageG = document.createElement("img")
        imageG.src = `${image.image}`
        imageG.style = "height: 200px; width: 200px"
        imageG.id =`ig${image.id}`
        topGallery.childElementCount >= 4?  bottomGallery.append(imageG):topGallery.append(imageG)
        imageG.addEventListener("click", ()=> {
          clearGallery()
          displaySelectCharacter(image)})
    })
}

function createSearchForm(){
  characterSearchDiv.append(searchForm)
 
  
  searchInputText.type ="text"
  searchForm.append(searchSelect)
  searchForm.append(searchInputText)
  
  searchSelectArray.forEach(element => {
    const searchSelectOption = document.createElement("option")
    searchSelectOption.textContent = element
    searchSelect.append(searchSelectOption)
  })
  ///// ignore first click of the searchSelect Dropdown
  searchSelect.addEventListener("click", ()=> {
    if(click1 === true) {
       click1 = false
       } else{
      let category;
      let searchSelectValue = searchSelect.value;
      if(searchSelect.value === "Alive"||searchSelect.value === "Dead"||searchSelect.value === "Unknown Status"){
        category = "status"
        if(searchSelectValue === "Unknown Status"){
          searchSelectValue = "unknown"
        }
      }
     if(searchSelect.value === "Male"||searchSelect.value === "Female"||searchSelect.value === "Unknown Gender"){
      category = "gender"
        if(searchSelectValue === "Unknown Gender"){
         searchSelectValue = "unknown"
      }
      }
      if(searchSelect.value === "Human"||searchSelect.value === "Mythological Creature"||searchSelect.value === "Alien"){
      category = "species"
      }
      clearGallery()
      keyupSearch(searchSelectValue,category)
      
     return click1 = true

    }

  })
  //// eventlistener for the searchInputText.value
  searchInputText.addEventListener("keyup", () =>{
    clearGallery()
    keyupSearch(searchInputText.value,"name")

  })
  
}

function keyupSearch(searchInputText,category){
  const string = searchInputText.toLowerCase()
  const searchInput = characterResults.filter((element) => {
  return element[`${category}`].toLowerCase().includes(string)     
  })
  
  imageGalleryArray = searchInput.slice(0,8)
  if(topGallery.childElementCount > 0){
    topGallery.textContent = ""
    bottomGallery.textContent = ""
}
  createGalleryImg()
 
}
    
function displaySelectCharacter(image){
  // console.log(image)
  const selectImage = document.createElement("img")
  selectImage.src = image.image
  if(characterImg.hasChildNodes() === true){
  characterImg.textContent =""}
  characterImg.append(selectImage)
  const selectImageDetails = ["name","status","species","gender","origin"]
  selectImageDetails.forEach(element => {
  
  const divTagInfo = document.createElement("div")
  const labelTagInfo = document.createElement("label")
  const pTagInfo = document.createElement("p")
  labelTagInfo.textContent = element.toUpperCase()+" : "
  pTagInfo.id = `PT${element}${image.id}`
  pTagInfo.contentEditable = "true"
  element === "origin"? pTagInfo.textContent = Object.values(image[`${element}`])[0] : pTagInfo.textContent = image[`${element}`]
  divTagInfo.append(labelTagInfo)
  divTagInfo.append(pTagInfo)
  characterInfo.append(divTagInfo)

  })
  saveChanges()
  likeDislike()
}
function saveChanges(){
  const saveBtn = document.createElement("button")
  saveBtn.textContent = "Save Changes"
  updateDiv.append(saveBtn)

}

function clearGallery(){
  if(topGallery.hasChildNodes()=== true){
  topGallery.textContent =""
  bottomGallery.textContent =""
  }else{
    characterImg.textContent =""
    characterInfo.textContent =""
    updateDiv.textContent = ""
    likeDiv.textContent = ""
    dislikeDiv.textContent = ""
    likeCountDiv.textContent = ""
  }
}

function likeDislike(){
  const likeBtn = document.createElement("button")
  const dislikeBtn = document.createElement("button")
  const likeCount = document.createElement("p")
  likeDiv.append(likeBtn)
  dislikeDiv.append(dislikeBtn)
  likeCountDiv.append(likeCount)
  likeBtn.textContent = "Like"
  dislikeBtn.textContent = "Dislike"
  likeCount.textContent = 0
  likeBtn.addEventListener("click", () =>{
  let likeNum = parseInt(likeCount.textContent)
  likeCount.textContent = ++likeNum
})
  dislikeBtn.addEventListener("click", () =>{
    let likeNum = parseInt(likeCount.textContent)
    likeCount.textContent = --likeNum
  })
}



//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                Original DATAPULL FROM API            ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
// async function delayDataPull(){
//   for (let i = 1; i < 671; i++) {
//     await sleep(2000)
//     getData(i)
//   }
// }
// function sleep(milliseconds){
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }
// function getData(characterNum) {
//   fetch(`${BASE_URLG}${characterNum}`)
//     .then((resp) => resp.json())
//     .then((data) => {
//       postToDBJSON(data)
//   });
// }
// function postToDBJSON (character){    
//     fetch(BASE_URLP,{                         
//         method: "POST",
//         headers: {"Content-Type":"application/json"},
//         body: JSON.stringify(character),
//     })
//     .then(resp=>resp.json())
//     .then(data=>data)
// }
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
// function displayCharacter(randomNum){
//     console.log(characterResult[0])
//     console.log(randomNum)
// }
    // give8RandomNumbers()                      // WORKS
    //getAllCharacters()                        // WORKS
    // displayCharacter()
    // intialNumPagePull()
    // getMissingCharacters()
// // make an randomizer to give us numbers between 1 to 671 to get ids
// //with the ids we results[${idfromrandomizer}]
// //create empty array tho shove in all results for that id
// //array.image into a for loop to store
// //then make img tags with a loop to place each url into the image.src
// //give img src style so that the boxes are limited to a size
//look into our database and pull all ids and put in array
// function addToDB(addData) {
//     fetch(BASE_URLP, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(addData)
//     })
//       .then(resp => resp.json())
//       .then(data => data)
//   }
// function getAllCharacters(){                   // WORKS
//     fetch(BASE_URLP)
//     .then(resp => resp.json())
//     .then(data => {
//         console.log(randomNumberArray)
//         randomNumberArray.forEach(element => imgIDCharacterImageGallery.push(data[element]))
//         console.log(data)
//         console.log(imgIDCharacterImageGallery)
//     })
// }
// function getMissingCharacters() {
//   fetch(BASE_URLP)
//     .then((resp) => resp.json())
//     .then((data) => {
//         forLoop(data)
//     });
// }
// function forLoop(data){
//   let num = data.length
//   for (let i = 0; i < num; i++){  
//       characterResults.push(data[i].id)
//   }
//   newGetRequstforMissingChars(characterResults)
// }
// let saveIDsToGet = []
// function newGetRequstforMissingChars(characterResults){
//   characterResults.forEach(element => { 
//    for(let i = 1; i < 671; i++){
//     if(i !== element){
//       saveIDsToGet.push(i)
//     }}
//   })
// }

///// Replece by powerful keyup/////

// function displaySearchResult (searchInputText){
//     console.log(searchInputText)
//     for(let i=0;i<671;i++){
//       characterNameArray.push(characterResults[0][i].name)
//     }
//     console.log(characterNameArray)

 
//   characterNameArray.filter(name => {
//     if(name === searchInputText){
//       // console.log(characterNameArray.includes(searchInputText))
//       console.log(characterNameArray.indexOf(searchInputText))
//     }
  
//   })

  //   characterNameArray.filter(name => {

  //     if(searchInputText.value === name){
  //       console.log("true")
  //       const indexFoundAt = characterNameArray.indexOf(element => console.log())
  //       console.log(indexFoundAt)
  //     }
  //  })