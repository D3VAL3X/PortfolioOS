const bootScreen=document.getElementById("boot-screen")
const bootBar=document.getElementById("boot-progress")
const desktop=document.getElementById("desktop")

let progress=0

const bootInterval=setInterval(()=>{

progress+=5
bootBar.style.width=progress+"%"

if(progress>=100){
clearInterval(bootInterval)

bootScreen.style.display="none"
desktop.classList.remove("hidden")
}

},100)



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
<button class="min">_</button>
<button class="max">□</button>
<button class="close">X</button>
</div>

</div>

<div class="window-content">
${getAppContent(app)}
</div>
`

desktop.appendChild(win)

makeDraggable(win)

win.querySelector(".close").onclick=()=>win.remove()

win.querySelector(".min").onclick=()=>win.style.display="none"

win.querySelector(".max").onclick=()=>{

win.style.top="20px"
win.style.left="20px"
win.style.width="90%"
win.style.height="80%"

}

addTaskButton(app,win)

}



function getAppContent(app){

if(app==="about"){

return `
<h2>About Me</h2>
<p>Hello! I'm a developer passionate about building software and web apps.</p>
`
}

if(app==="projects"){

return `
<h2>Projects</h2>

<div class="file" onclick="openProject('Weather App')">Weather App</div>
<div class="file" onclick="openProject('Task Manager')">Task Manager</div>
<div class="file" onclick="openProject('AI Chatbot')">AI Chatbot</div>
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
<a href="https://github.com" target="_blank">Visit my GitHub</a>
`
}

if(app==="contact"){

return `
<h2>Contact</h2>
<p>Email: your@email.com</p>
`
}

}



function openProject(name){

const win=document.createElement("div")
win.className="window"

win.style.top="150px"
win.style.left="300px"

win.innerHTML=`
<div class="titlebar">
<span>${name}</span>

<div class="window-buttons">
<button class="close">X</button>
</div>

</div>

<div class="window-content">
<h2>${name}</h2>
<p>Project preview window</p>
</div>
`

desktop.appendChild(win)

makeDraggable(win)

win.querySelector(".close").onclick=()=>win.remove()

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
