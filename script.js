document.addEventListener("DOMContentLoaded", function () {

  const container = document.querySelector(".horizontal-container");
  const sections = document.querySelectorAll("section");

  let current = 0;
  const total = sections.length;

  /* -------- WORD REVEAL -------- */

  function revealText(section){
    const paragraphs = section.querySelectorAll("p");

    paragraphs.forEach(p => {
      if (p.dataset.revealed) return;
      p.dataset.revealed = true;

      const words = p.innerText.trim().split(" ");
      p.innerHTML = "";

      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        p.appendChild(span);

        setTimeout(() => {
          span.style.opacity = 1;
        }, index * 180);
      });
    });
  }

  /* -------- AUTO SLIDE -------- */

  function slideTo(index){
    container.style.transform = `translateX(-${index * 100}vw)`;
    revealText(sections[index]);
  }

  function startAuto(){
    slideTo(current);

    setInterval(() => {
      current++;
      if(current >= total){
        current = 0;
      }
      slideTo(current);
    }, 10000); // 10 seconds per chapter
  }

  startAuto();


  /* -------- PARTICLE STARS -------- */

  sections.forEach(section => {

    const canvas = document.createElement("canvas");
    canvas.classList.add("stars");
    section.prepend(canvas);

    const ctx = canvas.getContext("2d");

    function resize(){
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const starCount = window.innerWidth < 768 ? 60 : 120;
    const stars = [];

    for(let i=0;i<starCount;i++){
      stars.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        radius:Math.random()*1.5,
        speed:Math.random()*0.3+0.1,
        opacity:Math.random()
      });
    }

    function animate(){
      ctx.clearRect(0,0,canvas.width,canvas.height);

      stars.forEach(star=>{
        ctx.beginPath();
        ctx.arc(star.x,star.y,star.radius,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${star.opacity})`;
        ctx.fill();

        star.y+=star.speed;

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
