const Body = document.querySelector(".Body");
const Ham = document.querySelector(".Ham");
const Cross = document.querySelector(".Cross");
const SideNavbar = document.querySelector(".side-navbar");
const Items = document.querySelectorAll(".item.N");
const Frames = document.querySelectorAll(".frame");
const Theme = document.querySelector(".theme");
const Toggle = document.querySelector(".theme .toggle");
const Search = document.querySelector(".search");

//Check if the user uses touchscreen or not
if ("ontouchstart" in document.documentElement)

{Body.classList.add("touch");Body.classList.remove("mouse");}

else {Body.classList.add("mouse");Body.classList.remove("touch");}

Items.forEach((Item,index) => {
Item.addEventListener("click",() => {
Items.forEach(Item => {Item.classList.remove("active");});
Items[index].classList.add("active");

Frames.forEach(Frame => {Frame.classList.remove("active");});
Frames[index].classList.add("active");

setTimeout(() => {deactivate();},400);

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
if(Body.classList.contains("mouse")){SideNavbar.style.left="-236px";}else{SideNavbar.style.left="-230px";};
Frames.forEach(Frame => {Frame.style.filter="brightness(100%)";});

}

});
});

Search.addEventListener("click",() => {

if(!SideNavbar.classList.contains("active")){

SideNavbar.classList.add("active");
SideNavbar.style.left="0";
Frames.forEach(Frame => {Frame.style.filter="brightness(70%)";});

};

});

Ham.addEventListener("click",() => {

SideNavbar.classList.add("active");
SideNavbar.style.left="0";

Frames.forEach(Frame => {
Frame.style.filter="brightness(70%)";});

});

Cross.addEventListener("click",deactivate);


function deactivate() {

SideNavbar.classList.remove("active")
if(Body.classList.contains("mouse")){SideNavbar.style.left="-236px";}else{SideNavbar.style.left="-230px";};

Frames.forEach(Frame => {
Frame.style.filter="brightness(100%)";});

}


let isDragging = false;
let startX = 0;
let startY = 0;
let startLeft = 0;
let isVerticalScroll = false;

// Begin drag (mouse or touch)
function startDrag(clientX, clientY) {
  SideNavbar.style.transition = "none";
  isDragging = true;
  isVerticalScroll = false;
  startX = clientX;
  startY = clientY;
  startLeft = parseInt(SideNavbar.style.left) || 0;
}

// While dragging
function dragMove(clientX, clientY) {
  if (!isDragging) return;

  const dx = clientX - startX;
  const dy = clientY - startY;

  const newLeft = startLeft + dx;

  if (newLeft > 0) return;

  SideNavbar.style.left = `${newLeft}px`;

  Frames.forEach(Frame => {
  Frame.style.filter = `brightness(${(0.7 + 0.3 * (Math.abs(newLeft) / 230)) * 100}%)`;
  });
}

// End drag
function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  SideNavbar.style.transition = "0.4s";

  const finalLeft = parseInt(SideNavbar.style.left) || 0;

  if (finalLeft < -110) {
    deactivate();
  } else {
    SideNavbar.classList.add("active");
    SideNavbar.style.left = "0";

    Frames.forEach(Frame => {
    Frame.style.filter = "brightness(70%)";
    });
  }
}

// Mouse events
SideNavbar.addEventListener("mousedown", (e) => startDrag(e.clientX, e.clientY));
document.addEventListener("mousemove", (e) => dragMove(e.clientX, e.clientY));
document.addEventListener("mouseup", endDrag);

// Touch events
SideNavbar.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
document.addEventListener("touchmove", (e) => dragMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
document.addEventListener("touchend", endDrag);

