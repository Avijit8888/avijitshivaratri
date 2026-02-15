document.addEventListener("DOMContentLoaded",function(){

const intro=document.getElementById("intro");
const introTitle=document.getElementById("introTitle");
const introSub=document.getElementById("introSub");
const main=document.getElementById("mainContent");
const sections=document.querySelectorAll("section");
const container=document.querySelector(".horizontal-container");

const ambient=document.getElementById("ambientSound");
const bass=document.getElementById("bassSound");
const heartbeat=document.getElementById("heartbeatSound");
const wind=document.getElementById("windSound");
const bell=document.getElementById("bellSound");
const mantra=document.getElementById("mantraSound");

const sceneFade=document.getElementById("sceneFade");

let currentScene=0;
let snowInterval=null;

/* ---------- AUDIO FADE ---------- */
function fadeIn(audio,duration=3000,volume=0.6){
  if(!audio) return;
  audio.volume=0;
  audio.play().catch(()=>{});
  let step=volume/(duration/100);
  let fade=setInterval(()=>{
    if(audio.volume<volume){
      audio.volume=Math.min(audio.volume+step,volume);
    }else clearInterval(fade);
  },100);
}

function fadeOut(audio,duration=3000){
  if(!audio) return;
  let step=audio.volume/(duration/100);
  let fade=setInterval(()=>{
    if(audio.volume>0.05){
      audio.volume-=step;
    }else{
      audio.pause();
      audio.currentTime=0;
      clearInterval(fade);
    }
  },100);
}

/* ---------- WORD REVEAL ---------- */
function revealText(element){
  const words=element.innerText.split(" ");
  element.innerHTML="";
  words.forEach((word,index)=>{
    const span=document.createElement("span");
    span.innerText=word+" ";
    element.appendChild(span);
    setTimeout(()=>{
      span.style.opacity=1;
    },index*250);
  });
}

/* ---------- INTRO ---------- */
setTimeout(()=>introTitle.style.opacity=1,1500);
setTimeout(()=>introSub.style.opacity=1,4000);

fadeIn(bass,4000,0.4);
fadeIn(ambient,5000,0.3);

setTimeout(()=>{
  intro.style.opacity=0;
  main.style.opacity=1;
  startFlow();
},9000);

/* ---------- SCENE TIMINGS ---------- */
const sceneTimings=[9000,11000,12000,10000,14000];

function startFlow(){
  playScene(currentScene);
}

function playScene(index){

  if(index>=sections.length){
    return;
  }

  sceneFade.style.opacity=1;

  setTimeout(()=>{

    sceneFade.style.opacity=0;

    container.style.transform=`translateX(-${index * 100}vw)`;

    const section=sections[index];

    section.querySelectorAll("p").forEach(p=>{
      revealText(p);
    });

    handleScene(section);

  },1500);

  setTimeout(()=>{
    currentScene++;
    playScene(currentScene);
  },sceneTimings[index]);
}

/* ---------- SCENE EFFECTS ---------- */
function handleScene(section){

  stopSnow();
  fadeOut(heartbeat);
  fadeOut(wind);

  if(section.classList.contains("dark-red")){
    section.classList.add("heartbeat");
    fadeIn(heartbeat,3000,0.6);
  }

  if(section.classList.contains("snow")){
    startSnow();
    fadeIn(wind,4000,0.5);
  }

  if(section.querySelector("h2").innerText.includes("Mahashivaratri")){
    if(bell) bell.play();
    fadeIn(mantra,5000,0.6);
  }
}

/* ---------- SNOW ---------- */
function startSnow(){
  if(snowInterval) return;

  snowInterval=setInterval(()=>{
    const snow=document.createElement("div");
    snow.classList.add("snowflake");
    snow.innerText="❄";
    snow.style.left=Math.random()*window.innerWidth+"px";
    snow.style.animationDuration=(Math.random()*5+5)+"s";
    document.body.appendChild(snow);
    setTimeout(()=>snow.remove(),10000);
  },400);
}

function stopSnow(){
  if(snowInterval){
    clearInterval(snowInterval);
    snowInterval=null;
  }
}

});
