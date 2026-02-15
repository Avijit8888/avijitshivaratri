function revealText(section){
  const p = section.querySelector(".story");

  if(p.dataset.revealed) return;
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

const slider = document.querySelector(".slider");
const sections = document.querySelectorAll(".chapter");

let current = 0;

function goToSlide(index){
  slider.style.transform = `translateX(-${index * 100}vw)`;
  revealText(sections[index]);
}

goToSlide(0);

setInterval(()=>{
  current++;
  if(current >= sections.length){
    current = 0;
  }
  goToSlide(current);
}, 10000);
