document.addEventListener("DOMContentLoaded", function () {

  /* -------- WORD REVEAL ON SCROLL -------- */

  function revealText(element) {
    if (element.dataset.revealed) return;
    element.dataset.revealed = true;

    const words = element.innerText.trim().split(" ");
    element.innerHTML = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      element.appendChild(span);

      setTimeout(() => {
        span.style.opacity = 1;
      }, index * 180);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealText(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll(".story").forEach(p => {
    observer.observe(p);
  });


  /* -------- PARTICLE STARS -------- */

  document.querySelectorAll(".stars").forEach(canvas => {

    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const starCount = window.innerWidth < 768 ? 60 : 120;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random()
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  });

});
