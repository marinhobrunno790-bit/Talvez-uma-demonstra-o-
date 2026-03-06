let state={
cons:50,
ego:50,
medo:50,
clareza:50,
step:0
}

const scenes=[
{
text:"Você recebe uma crítica dura sobre algo que criou.",
choices:[
["Reagir com raiva",{ego:+10,clareza:-5}],
["Analisar a crítica",{cons:+5,clareza:+10}],
["Ignorar completamente",{medo:+5}]
]
},
{
text:"Um amigo alcança sucesso antes de você.",
choices:[
["Sentir inveja",{ego:+10}],
["Usar como inspiração",{cons:+8}],
["Dizer que foi sorte",{clareza:-10}]
]
},
{
text:"Uma grande oportunidade aparece, mas com risco.",
choices:[
["Evitar risco",{medo:+10}],
["Aceitar e aprender",{cons:+10}],
["Esperar alguém decidir",{clareza:-5}]
]
}
]

function updateStats(){
document.getElementById("cons").innerText=state.cons
document.getElementById("ego").innerText=state.ego
document.getElementById("medo").innerText=state.medo
document.getElementById("clareza").innerText=state.clareza
}

function loadScene(){
if(state.step>=scenes.length){
endGame()
return
}

let scene=scenes[state.step]
document.getElementById("scene").innerText=scene.text

let html=""
scene.choices.forEach((c,i)=>{
html+=`<button onclick="choose(${i})">${c[0]}</button>`
})

document.getElementById("choices").innerHTML=html
updateStats()
}

function choose(i){
let effects=scenes[state.step].choices[i][1]
for(let k in effects){
state[k]+=effects[k]
}
state.step++
saveGame(state)
loadScene()
}

function endGame(){
let result=""
if(state.cons>80) result="Você despertou consciência real."
else if(state.ego>80) result="Seu ego dominou suas decisões."
else if(state.medo>80) result="O medo guiou sua vida."
else result="Você ainda está aprendendo a enxergar além das ilusões."

document.getElementById("scene").innerText=result
document.getElementById("choices").innerHTML=""
}

function startGame(){
document.getElementById("menu").style.display="none"
document.querySelector(".container").style.display="block"
state.step=0
loadScene()
}

function continueGame(){
let save=loadGame()
if(save){ state=save }
document.getElementById("menu").style.display="none"
document.querySelector(".container").style.display="block"
loadScene()
}

function resetGame(){
localStorage.removeItem("menteSave")
alert("Progresso apagado")
}
