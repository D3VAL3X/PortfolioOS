const boot = document.getElementById("boot-screen")
const desktop = document.getElementById("desktop")

setTimeout(()=>{
boot.style.display="none"
desktop.classList.remove("hidden")
},2500)



const icons=document.querySelectorAll(".icon")

icons.forEach(icon=>{
icon.addEventListener("dblclick",()=>{
openWindow(icon.dataset.app)
})
})



const startBtn=document.getElementById("start-btn")
const startMenu=document.getElementById("start-menu")

startBtn.onclick=()=>{
startMenu.classList.toggle("hidden")
}



document.querySelectorAll(".start-item").forEach(item=>{
item.onclick=()=>{
openWindow(item.dataset.app)
startMenu.classList.add("hidden")
}
})



function openWindow(app){

const win=document.createElement("div")
win.className="window"

win.style.top=Math.random()*300+100+"px"
win.style.left=Math.random()*400+200+"px"

win.innerHTML=`
<div class="titlebar">
<span>${app}.exe</span>
<div class="window-buttons">
<button class="close">X</button>
</div>
</div>

<div class="window-content">
${getAppContent(app)}
</div>
`

document.getElementById("desktop").appendChild(win)

makeDraggable(win)

win.querySelector(".close").onclick=()=>{
win.remove()
}

addTaskButton(app,win)

}



function getAppContent(app){

if(app==="about"){
return `
<h2>About Me</h2>
<p>Welcome to my PortfolioOS.</p>
<p>I am a developer passionate about building software and web applications.</p>
`
}

if(app==="projects"){
return `
<h2>Projects</h2>
<ul>
<li>Weather App</li>
<li>Task Manager</li>
<li>AI Chatbot</li>
<li>PortfolioOS</li>
</ul>
`
}

if(app==="skills"){
return `
<h2>Skills</h2>
<ul>
<li>JavaScript</li>
<li>HTML</li>
<li>CSS</li>
<li>Python</li>
</ul>
`
}

if(app==="github"){
return `
<h2>GitHub</h2>
<p><a href="https://github.com" target="_blank">Visit my GitHub</a></p>
`
}

if(app==="contact"){
return `
<h2>Contact</h2>
<p>Email: your@email.com</p>
`
}

}



function makeDraggable(win){

const bar=win.querySelector(".titlebar")

let offsetX,offsetY

bar.onmousedown=e=>{

offsetX=e.clientX-win.offsetLeft
offsetY=e.clientY-win.offsetTop

document.onmousemove=e=>{
win.style.left=e.clientX-offsetX+"px"
win.style.top=e.clientY-offsetY+"px"
}

}

document.onmouseup=()=>{
document.onmousemove=null
}

}



function addTaskButton(app,win){

const btn=document.createElement("button")
btn.className="task-btn"
btn.innerText=app

document.getElementById("task-apps").appendChild(btn)

btn.onclick=()=>{
win.style.display=win.style.display==="none"?"block":"none"
}

}



function updateClock(){

const clock=document.getElementById("clock")
const now=new Date()

clock.textContent=
now.getHours()+":"+
now.getMinutes().toString().padStart(2,"0")

}

setInterval(updateClock,1000)
updateClock()
