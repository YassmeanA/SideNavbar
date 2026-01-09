const Body = document.querySelector(".Body"); 
const SideNavbar = document.querySelector(".side-navbar");
const Items = document.querySelectorAll(".item.N");
const Frames = document.querySelectorAll(".frame");
const Theme = document.querySelector(".theme");
const Toggle = document.querySelector(".theme .toggle");
const Search = document.querySelector(".search");

//Check if the user uses touchscreen or not

function Resize() {

if ("ontouchstart" in document.documentElement)

{Body.classList.add("touch");Body.classList.remove("mouse");}

else {Body.classList.add("mouse");Body.classList.remove("touch");}

if(!Body.classList.contains("touch") && window.innerHeight < 670){if(SideNavbar.classList.contains("active")){SideNavbar.style.width="236px";}else{SideNavbar.style.width="66px";};
}else{
if(SideNavbar.classList.contains("active")){SideNavbar.style.width="230px";}else{SideNavbar.style.width="60px";};}

}

Resize();

window.addEventListener("resize", Resize);

Items.forEach((Item,index) => {
Item.addEventListener("click",() => {
Items.forEach(Item => {Item.classList.remove("active");});
Items[index].classList.add("active");

Frames.forEach(Frame => {Frame.classList.remove("active");});
Frames[index].classList.add("active");

setTimeout(() => {
SideNavbar.classList.remove("active");
if(Body.classList.contains("mouse") && window.innerHeight < 670){SideNavbar.style.width="66px";}else{SideNavbar.style.width="60px";};
Frames.forEach(Frame => {Frame.style.filter="brightness(100%)";});
},400);

});
});

Toggle.addEventListener("click",() => {

if(Body.classList.contains("dark")){

Body.classList.replace("dark","light");
Theme.classList.remove("active");
Theme.querySelector("span").innerHTML="Light";}

else{

Body.classList.replace("light","dark");
Theme.classList.add("active");
Theme.querySelector("span").innerHTML="Dark";};

});

Frames.forEach(Frame => {
Frame.addEventListener("click",() => {

if(SideNavbar.classList.contains("active")){
SideNavbar.classList.remove("active");
if(Body.classList.contains("mouse") && window.innerHeight < 670){SideNavbar.style.width="66px";}else{SideNavbar.style.width="60px";};
Frames.forEach(Frame => {Frame.style.filter="brightness(100%)";});

}

});
});

Search.addEventListener("click",() => {

if(!SideNavbar.classList.contains("active")){

SideNavbar.classList.add("active");
if(Body.classList.contains("mouse") && window.innerHeight < 670){SideNavbar.style.width="236px";}else{SideNavbar.style.width="230px";};
Frames.forEach(Frame => {Frame.style.filter="brightness(70%)";});

};

});

let startX = 0;
let startY = 0;
let startWidth = 0;
let isDragging = false;
let isVerticalScroll = false;

let minWidth;
let maxWidth;

if(Body.classList.contains("mouse") && window.innerHeight < 670){minWidth = 66;maxWidth = 236;}else{minWidth = 60;maxWidth = 230;};

function startDrag(clientX, clientY) {
  SideNavbar.style.transition = "none";
  SideNavbar.style.cursor="grab";
  startX = clientX;
  startY = clientY;
  startWidth = parseInt(getComputedStyle(SideNavbar).width);
  isVerticalScroll = false;
  isDragging = true;
}

function dragMove(clientX, clientY) {
  if (!isDragging) return;
  SideNavbar.style.cursor="grabbing";
  
  const dx = clientX - startX;
  const dy = clientY - startY;

  let newWidth = startWidth + dx;
  newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

  SideNavbar.style.width = `${newWidth}px`;
  
  if(Body.classList.contains("mouse") && window.innerHeight < 670){
  Frames.forEach(Frame => {
  Frame.style.filter = `brightness(${(0.7 + 0.3 * ((236 - newWidth) / 186)) * 100}%)`;});}
  else{
  Frames.forEach(Frame => {
  Frame.style.filter = `brightness(${(0.7 + 0.3 * ((230 - newWidth) / 180)) * 100}%)`;});}

}

function endDrag() {
  if (!isDragging) return;

  isDragging = false;
  SideNavbar.style.transition = "0.4s";
  SideNavbar.style.cursor="grab";
  
  const finalWidth = parseInt(SideNavbar.style.width);

  if (finalWidth > 120) {
    SideNavbar.classList.add("active");
    if(Body.classList.contains("mouse") && window.innerHeight < 670){SideNavbar.style.width="236px";}else{SideNavbar.style.width="230px";};
    Frames.forEach(Frame => Frame.style.filter = "brightness(70%)");
  } else {
    SideNavbar.classList.remove("active");
    if(Body.classList.contains("mouse") && window.innerHeight < 670){SideNavbar.style.width="66px";}else{SideNavbar.style.width="60px";};
    Frames.forEach(Frame => Frame.style.filter = "brightness(100%)");
  }
}

// ------------------ Touch Events ------------------
SideNavbar.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });

document.addEventListener("touchmove", (e) => {
  if (e.touches.length === 1) {
    dragMove(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });

document.addEventListener("touchend", () => endDrag());

// ------------------ Mouse Events ------------------
SideNavbar.addEventListener("mousedown", (e) => {
SideNavbar.style.cursor="grabbing";
  if (e.button === 0) {
    startDrag(e.clientX, e.clientY);
  }
});

document.addEventListener("mousemove", (e) => {
dragMove(e.clientX, e.clientY);
});

document.addEventListener("mouseup", () => {
SideNavbar.style.cursor="grab";
endDrag();});








