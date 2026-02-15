*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

html, body{
  height:100%;
  background:black;
  font-family:'Cinzel', serif;
  overflow:hidden;
  color:#e6d3a3;
}

.slider{
  display:flex;
  width:700vw; /* 7 chapters */
  height:100vh;
  transition:transform 1.8s ease-in-out;
}

.chapter{
  width:100vw;
  height:100vh;
  flex-shrink:0;
  display:flex;
  justify-content:center;
  align-items:center;
  text-align:center;
  padding:50px;
}

.chapter-inner{
  max-width:850px;
}

h1{
  font-size:0.9rem;
  letter-spacing:3px;
  margin-bottom:10px;
  opacity:0.7;
}

h2{
  font-size:2rem;
  margin-bottom:20px;
}

.story{
  font-family:'Playfair Display', serif;
  font-size:1.1rem;
  line-height:1.8;
}

.story span{
  opacity:0;
  transition:opacity 0.4s ease;
}

/* Background Colors */
.singularity{ background:#000; }
.expansion{ background:#111; }
.shakti{ background:#140c1c; }
.shiva{ background:#0a1020; }
.union{ background:#1a0d1d; }
.love{ background:#1c1010; }
.eternal{ background:#0f1a1a; }

@media(max-width:768px){
  h2{font-size:1.6rem;}
  .story{font-size:0.95rem;}
}
