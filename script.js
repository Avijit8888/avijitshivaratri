document.addEventListener("DOMContentLoaded", function(){

const slider = document.querySelector(".slider");
const sections = document.querySelectorAll(".chapter");
const fadeLayer = document.querySelector(".fade-layer");
const ambient = document.getElementById("ambient");
const mantra = document.getElementById("mantra");

let current = 0;

/* AUDIO START */
document.addEventListener("click", () => {
  if(ambient && mantra){
    ambient.volume = 0.4;
    mantra.volume = 0.2;
    ambient.play().catch(()=>{});
    mantra.play().catch(()=>{});
  }
}, { once:true });

/* WORD REVEAL */
function revealText(section){
  const p = section.querySelector(".story");
  if(!p || p.dataset.revealed) return;

  p.dataset.revealed = true;

  const words = p.innerText.split(" ");
  p.innerHTML = "";

  words.forEach((word,index)=>{
    const span = document.createElement("span");
    span.textContent = word + " ";
    p.appendChild(span);

    setTimeout(()=>{
      span.style.opacity = 1;
    }, index * 120);
  });
}

function goToSlide(index){
  fadeLayer.style.opacity = 1;

  setTimeout(()=>{
    slider.style.transform = `translateX(-${index * 100}vw)`;
    revealText(sections[index]);
    fadeLayer.style.opacity = 0;
  }, 600);
}

goToSlide(0);

setInterval(()=>{
  current++;
  if(current >= sections.length){
    current = 0;
  }
  goToSlide(current);
}, 12000);

/* PARTICLE STARS */
document.querySelectorAll(".stars").forEach(canvas=>{
  const ctx = canvas.getContext("2d");

  function resize(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const stars = [];
  for(let i=0;i<100;i++){
    stars.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*1.5,
      s:Math.random()*0.4+0.1,
      o:Math.random()
    });
  }

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{
      ctx.beginPath();
      ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${star.o})`;
      ctx.fill();

      star.y+=star.s;

      if(star.y>canvas.height){
        star.y=0;
        star.x=Math.random()*canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
});

});
