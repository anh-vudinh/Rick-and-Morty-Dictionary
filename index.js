const BASE_URLG = "https://rickandmortyapi.com/api/character/"
const BASE_URLP = "http://localhost:3000/characters"
let characterResults = [];
let randomNumberArray = [];
let imageGalleryArray =[];
let characterNameArray = []
let click1 = true;
let category = "status";
let searchSelectValue = "-";
let counterNextIndex = 8;
let searchInput;
const mainWindow = document.querySelector(".main-window")
const secondWindow = document.querySelector(".second-window")
const episodeList = document.querySelector("#episode-list")
const topGallery = document.querySelector("#top-gallery")
const bottomGallery = document.querySelector("#bottom-gallery")
const searchForm =document.createElement("form")
const characterSearchDiv = document.querySelector("#character-search")
const searchSelect = document.createElement("select")
const searchSelectArray = ["-","Alive","Dead","Unknown Status","Male","Female","Unknown Gender","Human","Mythological Creature","Alien"]
const characterImg = document.querySelector("#character-img")
const characterInfo = document.querySelector("#character-info")
const searchInputText = document.createElement("input")
const updateDiv = document.querySelector("#update")
const likeDiv = document.querySelector("#like")
const dislikeDiv = document.querySelector("#dislike")
const likeCountDiv = document.querySelector("#like-counter")
const searchDisplay = document.querySelector("#search-result")
const userInputDiv = document.querySelector("#user-input")
const nextBtn = document.createElement("button")
const characterContainer = document.querySelector("#character-container")
const browseDiv = document.querySelector("#browseNextGallery")
const pagesCountDiv = document.createElement("DIV")
const backBtn = document.createElement("BUTTON")
init();

function init(){
    //delayDataPull();
    getAllCharacters()
    getGalleryCharacter()
    createSearchForm()
    nextBtnSearch()
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
  return characterResults;
}

function give8RandomNumbers(dataLength){
  for(let i = 0; i < 8; i++){
     randomNumberArray.push(Math.floor(Math.random()*`${dataLength}`))
  }
  return randomNumberArray
}

function getGalleryCharacter(){
    fetch(BASE_URLP)
    .then(resp => resp.json())
    .then(data => {
        imageGalleryArray =[]
        give8RandomNumbers(data.length)
        randomNumberArray.forEach(num => imageGalleryArray.push(data[num]))
        createGalleryImg()
  })
}

function createGalleryImg(){
    imageGalleryArray.forEach(image => {
        const imageGDiv = document.createElement("DIV")
        const imageG = document.createElement("img")
        const nameOverlay = document.createElement("DIV")
        imageG.src = `${image.image}`
        imageG.style = "height: 200px; width: 200px"
        imageG.id =`ig${image.id}`
        nameOverlay.textContent = image.name
        if(topGallery.childElementCount >= 4){
          bottomGallery.append(imageGDiv)
          imageGDiv.append(imageG)
          imageGDiv.append(nameOverlay)
        } else{
          topGallery.append(imageGDiv)
          imageGDiv.append(imageG)
          imageGDiv.append(nameOverlay)
        }
        imageG.addEventListener("click", ()=> {
          resetSearchBar()
          clearGallery()
          displaySelectCharacter(image)
        })
    })
}

function nextBtnSearch(){
  counterNextIndex = 8
  backBtn.id = "back-btn"
  nextBtn.id = "next-btn"
  pagesCountDiv.id = "page-count"
  backBtn.disabled = true
  backBtn.style.opacity = 0;
  nextBtn.disabled = true;
  nextBtn.style.opacity = 0;
  browseDiv.insertBefore(backBtn, browseDiv.children[0])
  browseDiv.insertBefore(pagesCountDiv, browseDiv.children[1])
  browseDiv.append(nextBtn)

  nextBtn.addEventListener("click", () => {
    topGallery.textContent = ""
    bottomGallery.textContent = ""
    counterNextIndex += 8
    if(counterNextIndex >= searchInput.length){
      nextBtn.disabled = true
      nextBtn.style.opacity = 0.3;
    }
    if(counterNextIndex > 8){
      backBtn.disabled = false
      backBtn.style.opacity = 1;
    }
    pagesCountDiv.textContent = `${Math.ceil(counterNextIndex/8)}/${Math.ceil(searchInput.length/8)}`
    imageGalleryArray = searchInput.slice(counterNextIndex-8,counterNextIndex)
    createGalleryImg()
    if(bottomGallery.childElementCount === 0){
      browseNextGallery.style.marginTop = "250px"
    }
  })

  backBtn.addEventListener("click", ()=> {
    topGallery.textContent = ""
    bottomGallery.textContent = ""
    counterNextIndex -= 8
    if(counterNextIndex <= 8){
      backBtn.disabled = true
      backBtn.style.opacity = 0.3;
    }
    if(counterNextIndex < searchInput.length){
      nextBtn.disabled = false;
      nextBtn.style.opacity = 1;
    }
    pagesCountDiv.textContent = `${Math.ceil(counterNextIndex/8)}/${Math.ceil(searchInput.length/8)}`
    imageGalleryArray = searchInput.slice(counterNextIndex-8,counterNextIndex)
    createGalleryImg()
    browseNextGallery.style.marginTop = "0px"
  })
}


//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                      Search Bar                      ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\

function createSearchForm(){
  characterSearchDiv.append(searchForm)
  searchInputText.type ="text"
  searchInputText.placeholder = "  Search by Name"
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
    } 
    else{
      counterNextIndex = 8
      nextBtn.disabled = false
      backBtn.disabled = true
      nextBtn.style.opacity = 1
      backBtn.style.opacity = 0.3
      searchSelectValue = searchSelect.value;
      if(searchSelect.value === "Alive"||searchSelect.value === "Dead"||searchSelect.value === "Unknown Status"){
        category = "status"
        if(searchSelectValue === "Unknown Status"){
          searchSelectValue = "unknown"}
      }
      if(searchSelect.value === "Male"||searchSelect.value === "Female"||searchSelect.value === "Unknown Gender"){
      category = "gender"
        if(searchSelectValue === "Unknown Gender"){
         searchSelectValue = "unknown"}
      }
      if(searchSelect.value === "Human"||searchSelect.value === "Mythological Creature"||searchSelect.value === "Alien"){
        category = "species"
      }
      clearGallery()
      keyupSearch(searchSelectValue, category, searchInputText.value)
      return click1 = true
    }
  })
  //// eventlistener for the searchInputText.value
  searchInputText.addEventListener("keyup", () =>{
    clearGallery()
    keyupSearch(searchSelectValue, category, searchInputText.value)
  })
}

function keyupSearch(searchInputText, categoryC, nameC){
  if(browseDiv.childElementCount < 3){
    browseDiv.style.marginTop = "0px";
    browseDiv.insertBefore(backBtn, browseDiv.children[0])
    browseDiv.insertBefore(pagesCountDiv, browseDiv.children[1])
    browseDiv.append(nextBtn)
  }
  searchInput = characterResults.filter((element) => {
    if(searchInputText === "-"){
      //search name in ALL categories
      return element.name.toLowerCase().includes(nameC)
    } else if(searchInputText !== "-" && nameC === ""){
      //search by category only
      return element[`${categoryC}`].includes(searchInputText)
    } else if(searchInputText !== "-" && nameC !== ""){
      //seach by category AND name
      if(element[`${categoryC}`].includes(searchInputText) && element.name.toLowerCase().includes(nameC.toLowerCase())){
        return element
      }
    }
  })
  counterNextIndex = 8
  pagesCountDiv.textContent = `${Math.ceil(counterNextIndex/8)}/${Math.ceil(searchInput.length/8)}`
  imageGalleryArray = searchInput.slice(0,8)
  if(topGallery.childElementCount > 0){
    topGallery.textContent = ""
    bottomGallery.textContent = ""
  }
  if(searchInput.length <= 4){
    backBtn.disabled = true
    nextBtn.disabled = true
    backBtn.style.opacity = 0.3;
    nextBtn.style.opacity = 0.3;
  }else{
    nextBtn.disabled = false
    backBtn.disabled = true
    nextBtn.style.opacity = 1
    backBtn.style.opacity = 0.3
  }
  createGalleryImg()
}

function resetSearchBar(){
  searchForm.reset()
}

//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                  Display Episode List                ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\

function displayEpisodeList(){
  if(episodeList.childElementCount > 0){
    episodeList.textContent = ""}
  searchInput.forEach(element => {
    singleNameDiv = document.createElement("DIV")
    singleNameDiv.textContent = element.name
    episodeList.append(singleNameDiv)
    singleNameDiv.addEventListener("click", ()=> {
      clearGallery()
      displaySelectCharacter(element)})
  })
}



//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                Display Selected Character            ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\


function displaySelectCharacter(image){
  const selectImage = document.createElement("img")
  selectImage.src = image.image
  searchDisplay.style.backgroundColor = "rgba(226, 226, 226, 0.5)"
  userInputDiv.style.backgroundColor = "rgba(226, 226, 226, 0.5)"
  if(characterImg.hasChildNodes() === true){
  characterImg.textContent =""}
  characterImg.append(selectImage)
  const selectImageDetails = ["name","status","species","gender","origin"]
  selectImageDetails.forEach(element => {
    const divTagInfo = document.createElement("div")
    const labelTagInfo = document.createElement("label")
    const spanTagInfo = document.createElement("span")
    labelTagInfo.textContent = element.toUpperCase()+" : "
    spanTagInfo.id = `PT${element}${image.id}`
    spanTagInfo.contentEditable = "true"
    element === "origin"? spanTagInfo.textContent = Object.values(image[`${element}`])[0] : spanTagInfo.textContent = image[`${element}`]
    divTagInfo.append(labelTagInfo)
    divTagInfo.append(spanTagInfo)
    characterInfo.append(divTagInfo)
  })
  browseDiv.textContent = ""
  saveChanges(image)
  likeDislike(image)
  displayEpisodeList()
}

function clearGallery(){
  if(topGallery.hasChildNodes()=== true){
    topGallery.textContent =""
    bottomGallery.textContent =""
  }
  else{
    getAllCharacters()
    characterImg.textContent =""
    characterInfo.textContent =""
    searchDisplay.style.backgroundColor = "transparent"
    userInputDiv.style.backgroundColor = "transparent"
    updateDiv.textContent = ""
    likeDiv.textContent = ""
    dislikeDiv.textContent = ""
    likeCountDiv.textContent = ""
  }
}

function likeDislike(image){
  const likeBtn = document.createElement("button")
  const dislikeBtn = document.createElement("button")
  const likeCount = document.createElement("p")
  likeDiv.append(likeBtn)
  dislikeDiv.append(dislikeBtn)
  likeCountDiv.append(likeCount)
  likeCount.textContent = image.likes
  likeBtn.addEventListener("click", () =>{
    let likeNum = parseInt(likeCount.textContent)
    Number.isInteger(likeNum) === true? likeNum = parseInt(likeCount.textContent) : likeNum = 0
    likeCount.textContent = ++likeNum
  })
  dislikeBtn.addEventListener("click", () =>{
    let likeNum = parseInt(likeCount.textContent)
    Number.isInteger(likeNum) === true? likeNum = parseInt(likeCount.textContent) : likeNum = 0
    likeCount.textContent = --likeNum
  })
}

//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                  Save Changes to DB                  ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\

function saveChanges(selectedCharacter){
  const saveBtn = document.createElement("button")
  saveBtn.textContent = "Save Changes"
  updateDiv.append(saveBtn)
  saveBtn.onmouseenter = function(){saveBtn.style.backgroundColor = "rgb(255, 160, 71)"}
  saveBtn.onmouseleave = function(){saveBtn.style.backgroundColor = "whitesmoke"}
  saveBtn.onmousedown = function(){saveBtn.style.backgroundColor = "rgb(219, 34, 71)"}
  saveBtn.addEventListener("click", ()=> {
    let newName = document.querySelector(`#PTname${selectedCharacter.id}`)
    let newStatus = document.querySelector(`#PTstatus${selectedCharacter.id}`)
    let newSpecies = document.querySelector(`#PTspecies${selectedCharacter.id}`)
    let newGender = document.querySelector(`#PTgender${selectedCharacter.id}`)
    let newOrigin = document.querySelector(`#PTorigin${selectedCharacter.id}`)
    let newLikeCount = document.querySelector(`#like-counter p`).textContent  
    let updateData = {
      "id": `${selectedCharacter.id}`,
      "name": `${newName.textContent}`,
      "status": `${newStatus.textContent}`,
      "species": `${newSpecies.textContent}`,
      "gender": `${newGender.textContent}`,
      "image": `${selectedCharacter.image}`,
      "origin": {
        "name": `${newOrigin.textContent}`
      },
      "likes": newLikeCount
    }
    patchToDB(updateData)
  })
}


function patchToDB(updateData) {
  fetch(`${BASE_URLP}/${updateData.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updateData)
  })
    .then((resp) => resp.json())
    .then((data) => data.votes)
  updateCharacterResultsArray(updateData)
}

function updateCharacterResultsArray(updateData){
  intUpdateDataID = parseInt(updateData.id)
  for(i=0; i < characterResults.length; i++){
    if(characterResults[i].id === intUpdateDataID){
      return characterResults.splice(i,1,updateData);
    }
  }
}

//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                Original DATAPULL FROM API            ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
// async function delayDataPull(){
//   for (let i = 1; i < 671; i++) {
//     await sleep(1000)
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