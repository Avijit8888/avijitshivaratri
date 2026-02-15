const introTitle = document.getElementById("introTitle");
const introSub = document.getElementById("introSub");
const intro = document.getElementById("intro");
const main = document.getElementById("mainContent");

/* ---------- INTRO TIMING ---------- */
setTimeout(() => introTitle.style.opacity = 1, 1500);
setTimeout(() => introSub.style.opacity = 1, 4500);

setTimeout(() => {
  intro.style.opacity = 0;
  document.body.style.overflow = "auto";
  main.style.opacity = 1;
}, 9000);

/* ---------- SCROLL REVEAL ---------- */
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;

    if (top < trigger) {
      sec.classList.add("active");

      /* Add heartbeat effect only to Sati section */
      if (sec.classList.contains("dark-red")) {
        sec.classList.add("heartbeat");
      }

      /* Activate snowfall only in Parvati section */
      if (sec.classList.contains("snow")) {
        startSnow();
      }
    }
  });
});

/* ---------- PARALLAX SLOW ZOOM ---------- */
const bg = document.querySelector(".parallax");
let scale = 1.1;

setInterval(() => {
  scale += 0.0004;
  bg.style.transform = `scale(${scale})`;
}, 50);

/* ---------- SNOW FUNCTION ---------- */
let snowInterval;

function startSnow() {
  if (snowInterval) return;

  snowInterval = setInterval(() => {
    const snow = document.createElement("div");
    snow.classList.add("snowflake");
    snow.innerText = "❄";
    snow.style.left = Math.random() * window.innerWidth + "px";
    snow.style.animationDuration = (Math.random() * 5 + 5) + "s";
    document.body.appendChild(snow);

    setTimeout(() => snow.remove(), 10000);
  }, 300);
}

/* ---------- MESSAGE STORAGE ---------- */
function saveMessage() {
  const msg = document.getElementById("loveMessage").value;
  if (!msg) return;

  let messages = JSON.parse(localStorage.getItem("eternalLove")) || [];
  messages.push(msg);
  localStorage.setItem("eternalLove", JSON.stringify(messages));

  document.getElementById("loveMessage").value = "";
  alert("Your message now lives in eternity.");
}

/* ---------- RESTART ---------- */
function restart() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => location.reload(), 1500);
}
