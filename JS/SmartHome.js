const ItemContainer = document.querySelector(".item-container");
const ItemList = document.querySelector(".item-list");
const Items = document.querySelectorAll(".item");
const Rects = document.querySelectorAll("svg rect");
const Lamps = document.querySelectorAll(".lighting .lamp");
const Presets = document.querySelectorAll(".presets .lamp");
const Details = document.querySelector(".details");
const details = document.querySelectorAll(".details-list");
const Powers = document.querySelectorAll(".power");
const Toggles = document.querySelectorAll(".toggle");
const ControlButtons = document.querySelectorAll(".control");
const AirConditioners = document.querySelectorAll(".air-conditioner");
const Back = document.querySelector(".back");
const BACK = document.querySelector(".Back");
const Sections = document.querySelectorAll(".Section");
const SectionContainer = document.querySelector(".section-container");
const SectionList = document.querySelector(".section-list");
const Slides = document.querySelectorAll(".slide");
const States = document.querySelectorAll(".X .text2");

function state() {

if(details[0].querySelector(".tv .power").classList.contains("active")){
States[0].innerHTML="On";}else{States[0].innerHTML="Off";};

if(details[1].querySelector(".air-conditioner .power").classList.contains("active")){
States[1].innerHTML="On";}else{States[1].innerHTML="Off";};

let isAnyLampActive1 = false;
details[2].querySelectorAll(".lighting .lamp").forEach((Lamp,index) => {

if(Lamp.classList.contains("active")) {isAnyLampActive1 = true;}

});

States[2].innerHTML = isAnyLampActive1 ? "On" : "Off";

let isAnyLampActive2 = false;
details[3].querySelectorAll(".lighting .lamp").forEach((Lamp,index) => {

if(Lamp.classList.contains("active")) {isAnyLampActive2 = true;}

});

States[3].innerHTML = isAnyLampActive2 ? "On" : "Off";

if(details[4].querySelector(".microwave .power").classList.contains("active")){
States[4].innerHTML="On";}else{States[4].innerHTML="Off";};

if(details[5].querySelector(".heater .power").classList.contains("active")){
States[5].innerHTML="On";}else{States[5].innerHTML="Off";};

}

state();


setTimeout(() => {SectionList.classList.add("active");},5000);

Sections.forEach((Section,index) => {

Section.style.animation=`Show 0.5s forwards ${index*0.1}s`;

Section.addEventListener("click",() => {

Section.classList.add("active");
setTimeout(() => {SectionContainer.classList.remove("active");},300);

setTimeout(() => {
ItemContainer.classList.add("active");
if(index === 0){ItemList.classList.add("active");}else{Slides[index-1].classList.add("active");};
SectionList.classList.remove("active");
},500);

});
});


let x;
let N;


details.forEach(detail => {
detail.querySelectorAll('.section').forEach((el, i) => {
el.style.animation = `Show 1s cubic-bezier(0.5, 0.5, 0, 1) forwards ${i * 0.1}s`;
});
});


function Resize() {

document.querySelectorAll('.item').forEach((el, index) => {

if(window.innerWidth <= 700){N=2;}
else if(window.innerWidth > 700 && window.innerWidth <= 1000){N=3;}
else if(window.innerWidth > 1000){N=4;};
      
const delay = Math.floor(index / N) * 0.1;
el.style.animation = `Show 1s cubic-bezier(0.5, 0.5, 0, 1) forwards ${delay}s`;
    
});


if(window.innerWidth <= 700){x = 3000/(window.innerWidth - 60);}
else if(window.innerWidth > 700 && window.innerWidth <= 1000){x = 4500/(window.innerWidth - 80);}
else if(window.innerWidth > 1000){x = 6000/(window.innerWidth - 100);};

Rects.forEach(Rect => {
Rect.setAttribute("rx",`${x}`);
Rect.setAttribute("ry",`${x}`);
Rect.setAttribute("stroke-width",`${x/10}`);

});

}

Resize();

window.addEventListener("resize",Resize);

Items.forEach((Item,index) => {
Item.querySelector(".content").addEventListener("click",() => {

Item.classList.add("active");
Items.forEach(Item => {Item.querySelector(".content").style.pointerEvents="none";});

setTimeout(() => {
ItemContainer.classList.remove("active");
Item.classList.remove("active");
Details.classList.add("active");
details[index].classList.add("active");
setTimeout(() => {ItemList.classList.remove("active");Items.forEach(Item => {Item.querySelector(".content").style.pointerEvents="auto";});},300);
},900);

});});

BACK.addEventListener("click",() => {

Slides.forEach(Slide => {Slide.classList.remove("active");});

ItemContainer.classList.remove("active");

Sections.forEach(Section => {Section.classList.remove("active");});
SectionContainer.classList.add("active");
SectionList.classList.add("active");
  
setTimeout(() => {ItemList.classList.remove("active");},300);

});


Back.addEventListener("click",() => {
state();
setTimeout(() => {
ItemContainer.classList.add("active");
ItemList.classList.add("active");
Details.classList.remove("active");
details.forEach(detail => {detail.classList.remove("active");});
},300);

});

Lamps.forEach(Lamp => {
Lamp.querySelector(".stroke").addEventListener("click",() => {

if(Lamp.classList.contains("active")){
Lamp.classList.remove("active");}
else{Lamp.classList.add("active");};

});});


Presets.forEach(Preset => {
Preset.addEventListener("click",() => {

Presets.forEach(Preset => {
Preset.classList.remove("active");});

Preset.classList.add("active");

});});

Powers.forEach(Power => {
Power.addEventListener("click",() => {

if(Power.classList.contains("active")){
Power.classList.remove("active");}
else{Power.classList.add("active");};

});});

Toggles.forEach(Toggle => {
Toggle.addEventListener("click",() => {

if(Toggle.classList.contains("active")){
Toggle.classList.remove("active");}
else{Toggle.classList.add("active");};

});});


// Control Button
ControlButtons.forEach(ControlButton => {

let isDraggingSpeed = false;
let rotation = 0;
let lastAngle = 0;

const minRotation = -50;
const maxRotation = 150;


function getAngle(e, center) {
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - center.x;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - center.y;
  return Math.atan2(y, x) * (180 / Math.PI);
}

function normalizeAngle(angle) {
  // Normalize angle between -180 and 180
  while (angle > 180) angle -= 360;
  while (angle < -180) angle += 360;
  return angle;
}

function onStart(e) {
  const rect = ControlButton.getBoundingClientRect();
  const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  lastAngle = getAngle(e, center);
  isDraggingSpeed = true;
  e.preventDefault();
}

function onMove(e) {
  if (!isDraggingSpeed) return;

  const rect = ControlButton.getBoundingClientRect();
  const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  const currentAngle = getAngle(e, center);
  let delta = normalizeAngle(currentAngle - lastAngle);
  lastAngle = currentAngle;

  rotation += delta;
  rotation = Math.max(minRotation, Math.min(maxRotation, rotation));
  ControlButton.style.transform = `rotate(${rotation}deg)`;
}

function onEnd() {
  isDraggingSpeed = false;
}

// Mouse events
ControlButton.addEventListener("mousedown", onStart);
document.addEventListener("mousemove", onMove);
document.addEventListener("mouseup", onEnd);

// Touch events
ControlButton.addEventListener("touchstart", onStart);
document.addEventListener("touchmove", onMove);
document.addEventListener("touchend", onEnd);


});

// Temperature Control
AirConditioners.forEach(AirConditioner => {

let count = 22;

AirConditioner.querySelector(".plus").addEventListener("click", () => {
  if (count >= 30) return;
  count++;
  AirConditioner.querySelector(".digital").innerHTML = count;
});

AirConditioner.querySelector(".minus").addEventListener("click", () => {
  if (count <= 16) return;
  count--;
  AirConditioner.querySelector(".digital").innerHTML = count;
});

});




