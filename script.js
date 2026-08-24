const weddingDate = new Date("2026-11-28T15:30:00+01:00").getTime();

function updateCountdown(){
  const now = Date.now();
  const distance = weddingDate - now;
  if(distance <= 0){
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent="00");
    return;
  }
  const d = Math.floor(distance/(1000*60*60*24));
  const h = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  const m = Math.floor((distance%(1000*60*60))/(1000*60));
  const s = Math.floor((distance%(1000*60))/1000);
  document.getElementById("days").textContent=String(d).padStart(2,"0");
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("minutes").textContent=String(m).padStart(2,"0");
  document.getElementById("seconds").textContent=String(s).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click", async () => {
  if(!music.src || music.readyState === 0){
    alert("Ajoute le fichier music.mp3 dans le même dossier que index.html.");
    return;
  }
  if(music.paused){
    try{ await music.play(); musicBtn.classList.add("playing"); musicBtn.textContent="❚❚"; }
    catch(e){ alert("Impossible de lancer la musique."); }
  }else{
    music.pause(); musicBtn.classList.remove("playing"); musicBtn.textContent="♪";
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.animation = "fadeUp .9s ease both";
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll(".section,.final-content").forEach(el => {
  el.style.opacity="0";
  observer.observe(el);
});
