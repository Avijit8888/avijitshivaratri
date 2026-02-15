document.addEventListener("DOMContentLoaded",function(){

const intro=document.getElementById("intro");
const introTitle=document.getElementById("introTitle");
const introSub=document.getElementById("introSub");
const main=document.getElementById("mainContent");
const sections=document.querySelectorAll("section");
const container=document.querySelector(".horizontal-container");
const fade=document.getElementById("sceneFade");

let currentScene=0;

/* Intro reveal */
setTimeout(()=>introTitle.style.opacity=1,1500);
setTimeout(()=>introSub.style.opacity=1,3500);

setTimeout(()=>{
  intro.style.opacity=0;
  main.style.opacity=1;
  startFlow();
},7000);

/* Word reveal */
function revealText(element){
  const words=element.innerText.split(" ");
  element.innerHTML="";
  words.forEach((word,index)=>{
    const span=document.createElement("span");
    span.innerText=word+" ";
    element.appendChild(span);
    setTimeout(()=>span.style.opacity=1,index*250);
  });
}

/* Cinematic flow */
const sceneDurations=[10000,10000,12000];

function startFlow(){
  playScene(currentScene);
}

function playScene(index){

  if(index>=sections.length) return;

  fade.style.opacity=1;

  setTimeout(()=>{
    fade.style.opacity=0;

    container.style.transform=`translateX(-${index*100}vw)`;

    const section=sections[index];
    const paragraph=section.querySelector(".story");

    revealText(paragraph);

  },1500);

  setTimeout(()=>{
    currentScene++;
    playScene(currentScene);
  },sceneDurations[index]);
}

});
