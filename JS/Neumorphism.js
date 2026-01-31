const Body = document.querySelector(".Body");
const Power = document.querySelector(".power button");
const ControlPanel = document.querySelector(".control-panel");
const Temp = document.querySelector(".screen .temp");
const Plus = document.querySelector(".plus");
const Minus = document.querySelector(".minus");
const Reset = document.querySelector(".reset");
const Toggle = document.querySelector(".Toggle");
const ranges = document.querySelectorAll('.range');
const Beeps = document.querySelectorAll('.beep');
const speedButton = document.querySelector(".speed-button");
const Audio = document.querySelector(".Audio");
const Theme = document.querySelector(".theme");

let count = 22;
let savedRangeValues = Array.from(ranges) // Store each level's bottom value

savedRangeValues[0] = "-100px";
savedRangeValues[1] = "-50px";
savedRangeValues[2] = "-80px";
savedRangeValues[3] = "-100px";

// Play beep sound
Beeps.forEach(Beep => {
  Beep.addEventListener("click", () => {
    Audio.currentTime = 0;
    Audio.play();
  });
});

// Power button toggle
Power.addEventListener("click", () => {
  ControlPanel.classList.remove("Reset");

  if (ControlPanel.classList.contains("active")) {
    ControlPanel.classList.remove("active");
    ranges.forEach(range => {
      range.querySelector(".level").style.bottom = "-140px";
    });
  } else {
    ControlPanel.classList.add("active");

    // Restore saved level values
    ranges.forEach((range, i) => {
      const level = range.querySelector(".level");
      level.style.bottom = savedRangeValues[i] || "-140px";
    });
  }
});

// Toggle swing
Toggle.addEventListener("click", () => {
  Toggle.classList.toggle("active");
});

// Temperature controls
Plus.addEventListener("click", () => {
  if (count >= 30) return;
  count++;
  Temp.innerHTML = count;
});

Minus.addEventListener("click", () => {
  if (count <= 16) return;
  count--;
  Temp.innerHTML = count;
});

// Reset all controls
Reset.addEventListener("click", () => {
  ControlPanel.classList.add("Reset");
  Toggle.classList.remove("active");

  count = 22;
  Temp.innerHTML = count;

  const resetValues = ["-100px", "-50px", "-80px", "-100px"];
  ranges.forEach((range, i) => {
    const level = range.querySelector(".level");
    level.style.bottom = resetValues[i];
    savedRangeValues[i] = resetValues[i];
  });

  rotation = 0;
  speedButton.style.transform = `rotate(0deg)`;
});



// Fan speed control
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
  const rect = speedButton.getBoundingClientRect();
  const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  lastAngle = getAngle(e, center);
  isDraggingSpeed = true;
  e.preventDefault();
  speedButton.style.cursor="grabbing";
}

function onMove(e) {
  if (!isDraggingSpeed) return;

  const rect = speedButton.getBoundingClientRect();
  const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  const currentAngle = getAngle(e, center);
  let delta = normalizeAngle(currentAngle - lastAngle);
  lastAngle = currentAngle;

  rotation += delta;
  rotation = Math.max(minRotation, Math.min(maxRotation, rotation));
  speedButton.style.transform = `rotate(${rotation}deg)`;
}

function onEnd() {
  isDraggingSpeed = false;
  speedButton.style.cursor="grab";
}

// Mouse events
speedButton.addEventListener("mousedown", onStart);
document.addEventListener("mousemove", onMove);
document.addEventListener("mouseup", onEnd);

// Touch events
speedButton.addEventListener("touchstart", onStart);
document.addEventListener("touchmove", onMove);
document.addEventListener("touchend", onEnd);

// Reset on ControlPanel class change
const observer = new MutationObserver(() => {
  if (ControlPanel.classList.contains("Reset")) {
    rotation = 0;
    speedButton.style.transform = `rotate(0deg)`;
  }
});
observer.observe(ControlPanel, { attributes: true, attributeFilter: ['class'] });




// Range drag behavior
ranges.forEach(range => {
  let isDraggingRange = false;

  range.addEventListener('mousedown', (e) => {
    isDraggingRange = true;
    range.style.cursor="grabbing";
    updateLevel(e, range);
  });

  document.addEventListener('mousemove', (e) => {
    if (isDraggingRange) updateLevel(e, range);
  });

  document.addEventListener('mouseup', () => {
    if (!isDraggingRange) return;
    range.style.cursor="grab";
    isDraggingRange = false;
    const index = Array.from(ranges).indexOf(range);
    const level = range.querySelector(".level");
    savedRangeValues[index] = level.style.bottom;
  });

  range.addEventListener('touchstart', (e) => {
    isDraggingRange = true;
    updateLevel(e.touches[0], range);
  });

  document.addEventListener('touchmove', (e) => {
    if (isDraggingRange) updateLevel(e.touches[0], range);
  });

  document.addEventListener('touchend', () => {
    if (!isDraggingRange) return;
    isDraggingRange = false;
    const index = Array.from(ranges).indexOf(range);
    const level = range.querySelector(".level");
    savedRangeValues[index] = level.style.bottom;
  });

  function updateLevel(e, rangeElement) {
    const rect = rangeElement.getBoundingClientRect();
    const level = rangeElement.querySelector('.level');
    const offset = e.clientY - rect.top;
    let percent = 1 - (offset / rect.height); // Top = 1, Bottom = 0
    percent = Math.max(0, Math.min(1, percent));
    const minBottom = -135;
    const maxBottom = 0;
    const bottomOffset = minBottom + percent * (maxBottom - minBottom);
    level.style.bottom = `${bottomOffset}px`;
  }
});


Theme.addEventListener("click",() => {

if(Body.classList.contains("dark")){Body.classList.replace("dark","light");Theme.querySelector("span").innerHTML="Light";}else{Body.classList.replace("light","dark");Theme.querySelector("span").innerHTML="Dark";}

});
