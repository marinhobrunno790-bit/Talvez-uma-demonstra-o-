function saveGame(data){
localStorage.setItem("menteSave",JSON.stringify(data))
}

function loadGame(){
let data=localStorage.getItem("menteSave")
if(data){ return JSON.parse(data) }
return null
}
