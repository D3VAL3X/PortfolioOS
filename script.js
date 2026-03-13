// Z-INDEX SYSTEM

let highestZ = 10



// BOOT SYSTEM

const bootScreen = document.getElementById("boot-screen")
const bootBar = document.getElementById("boot-progress")
const desktop = document.getElementById("desktop")

let progress = 0

const bootInterval = setInterval(() => {

progress += 5
bootBar.style.width = progress + "%"

if (progress >= 100) {

clearInterval(bootInterval)

bootScreen.style.display = "none"
desktop.classList.remove("hidden")

}

}, 100)



// DESKTOP ICONS

const icons = document.querySelectorAll(".icon")

icons.forEach(icon => {

icon.addEventListener("dblclick", () => {

openWindow(icon.dataset.app)

})

})



// START MENU

const startBtn = document.getElementById("start-btn")
const startMenu = document.getElementById("start-menu")

startBtn.onclick = () => {

startMenu.classList.toggle("hidden")

}



// START MENU APPS

document.querySelectorAll(".start-item").forEach(item => {

item.onclick = () => {

const app = item.dataset.app

if(app){
openWindow(app)
}

startMenu.classList.add("hidden")

}

})



// SHUTDOWN / RESTART

const shutdownBtn = document.getElementById("shutdown")
const restartBtn = document.getElementById("restart")
const shutdownScreen = document.getElementById("shutdown-screen")

if(shutdownBtn){

shutdownBtn.onclick = () => {

shutdownScreen.classList.remove("hidden")

}

}

if(restartBtn){

restartBtn.onclick = () => {

location.reload()

}

}



// WINDOW CREATION

function openWindow(app){

const win = document.createElement("div")
win.className = "window"

win.style.top = Math.random()*300 + 100 + "px"
win.style.left = Math.random()*400 + 200 + "px"

win.style.zIndex = ++highestZ

win.innerHTML = `
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

win.addEventListener("mousedown", () => {
win.style.zIndex = ++highestZ
})


// CLOSE

win.querySelector(".close").onclick = () => {

win.remove()

}


// MINIMIZE

win.querySelector(".min").onclick = () => {

win.style.display = "none"

}


// MAXIMIZE

win.querySelector(".max").onclick = () => {

win.style.top = "20px"
win.style.left = "20px"
win.style.width = "90%"
win.style.height = "80%"

}


addTaskButton(app, win)

}



// WINDOW CONTENT

function getAppContent(app){

if(app==="about"){

return `
<h2>About Me</h2>

<p>I’m an aspiring <b>Indie Game Developer</b> and <b>Software Developer</b> with a passion for building interactive games, 3D assets, and immersive digital experiences.</p>

<p>My main focus is game development using <b>Unity</b> and <b>Unreal Engine</b>, where I combine programming and creative design to develop engaging gameplay systems and interactive environments.</p>

<p>I also work with <b>Blender</b> to create 3D models and visual assets, bringing ideas to life through both code and visual design.</p>

<p>I contributed to a <b>360° immersive recording project</b> with Staffordshire County Council, gaining hands-on experience working with emerging media technology and immersive digital content.</p>

<p>I also gained practical industry experience at <b>DigiFest</b>, where I helped support interviews, register attendees, and network with professionals including the Learnwise team. This helped strengthen my communication, teamwork, and professional networking skills.</p>

<p>I’m passionate about learning new technologies, improving my development workflow, and building creative projects that combine software engineering with interactive design.</p>

<p>I’m always interested in connecting with developers, studios, and creative technologists working in game development, immersive media, and software development.</p>
`
}



if(app==="skills"){

return `
<h2>Skills</h2>

<h3>Game Development</h3>
<ul>
<li>Unity Engine</li>
<li>Unreal Engine</li>
<li>Gameplay Systems</li>
<li>Interactive Environments</li>
</ul>

<h3>Programming</h3>
<ul>
<li>C++</li>
<li>C#</li>
<li>Python</li>
<li>JavaScript</li>
</ul>

<h3>3D & Creative Tools</h3>
<ul>
<li>Blender (3D Modelling)</li>
<li>Asset Creation</li>
<li>Environment Design</li>
</ul>

<h3>Interactive Media</h3>
<ul>
<li>360° Video Production</li>
<li>Immersive Media Technologies</li>
</ul>

<h3>Software Development</h3>
<ul>
<li>Application Development</li>
<li>Tool Development</li>
<li>Game Mechanics Programming</li>
</ul>

<h3>Professional Skills</h3>
<ul>
<li>Communication</li>
<li>Teamwork</li>
<li>Industry Networking</li>
<li>Event Support</li>
</ul>
`
}



if(app==="projects"){

return `
<h2>Projects</h2>

<div class="file" onclick="openProject('Unity Game Prototype')">Unity Game Prototype</div>

<div class="file" onclick="openProject('Unreal Engine Environment')">Unreal Engine Environment</div>

<div class="file" onclick="openProject('360° Immersive Media Project')">360° Immersive Media Project</div>

<div class="file" onclick="openProject('Developer Portfolio OS')">Developer Portfolio OS</div>
`
}



if(app==="github"){

return `
<h2>GitHub</h2>

<p>View my development projects and repositories.</p>

<a href="https://github.com" target="_blank">
Open GitHub Profile
</a>
`
}



if(app==="contact"){

return `
<h2>Contact</h2>

<p>Email: your@email.com</p>

<p>LinkedIn: add-your-linkedin</p>

<p>GitHub: add-your-github</p>
`
}

}



// PROJECT WINDOWS

function openProject(name){

const win = document.createElement("div")
win.className = "window"

win.style.top = "150px"
win.style.left = "300px"
win.style.zIndex = ++highestZ

win.innerHTML = `
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

win.addEventListener("mousedown", () => {
win.style.zIndex = ++highestZ
})

win.querySelector(".close").onclick = () => win.remove()

}



// DRAG WINDOWS

function makeDraggable(win){

const bar = win.querySelector(".titlebar")

let offsetX
let offsetY

bar.onmousedown = e => {

offsetX = e.clientX - win.offsetLeft
offsetY = e.clientY - win.offsetTop

document.onmousemove = e => {

win.style.left = e.clientX - offsetX + "px"
win.style.top = e.clientY - offsetY + "px"

}

}

document.onmouseup = () => {

document.onmousemove = null

}

}



// TASKBAR BUTTONS

function addTaskButton(app, win){

const btn = document.createElement("button")

btn.className = "task-btn"
btn.innerText = app

document.getElementById("task-apps").appendChild(btn)

btn.onclick = () => {

win.style.display =
win.style.display === "none" ? "block" : "none"

}

}



// CLOCK

function updateClock(){

const clock = document.getElementById("clock")
const now = new Date()

clock.textContent =
now.getHours() + ":" +
now.getMinutes().toString().padStart(2,"0")

}

setInterval(updateClock,1000)

updateClock()
