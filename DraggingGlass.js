let isDragging = false;
let isVerticalScroll = false;
let startX = 0;
let startY = 0;
let startLeft = 0;

// Begin drag (mouse or touch)
function startDrag(clientX, clientY) {
  SideNavbar.style.transition = "none";
  isDragging = true;
  isVerticalScroll = false;
  startX = clientX;
  startY = clientY;
  startLeft = parseInt(SideNavbar.style.left) || -1;
}

// While dragging
function dragMove(clientX, clientY) {
  if (!isDragging) return;

  const dx = clientX - startX;
  const dy = clientY - startY;

  // Detect vertical scroll
  if (!isVerticalScroll && Math.abs(dy) > Math.abs(dx)) {
    isVerticalScroll = true;
  }

  if (isVerticalScroll) return; // cancel drag on vertical gesture

  const newLeft = startLeft + dx;

  // Prevent dragging to the right (positive left values)
  if (newLeft > -1) return;

  SideNavbar.style.left = `${newLeft}px`;
}

// End drag
function endDrag() {
  if (!isDragging || isVerticalScroll) return;
  isDragging = false;
  SideNavbar.style.transition = "0.4s";

  const finalLeft = parseInt(SideNavbar.style.left) || 0;

  if (finalLeft < -130) {
    SideNavbar.classList.remove("active");
    SideNavbar.style.left = "-261px";
  } else {
    SideNavbar.classList.add("active");
    SideNavbar.style.left = "-1px";
  }
}

// Mouse events
SideNavbar.addEventListener("mousedown", (e) => startDrag(e.clientX, e.clientY));
document.addEventListener("mousemove", (e) => dragMove(e.clientX, e.clientY));
document.addEventListener("mouseup", endDrag);

// Touch events
SideNavbar.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  startDrag(touch.clientX, touch.clientY);
}, { passive: true });

document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  dragMove(touch.clientX, touch.clientY);
}, { passive: true });

document.addEventListener("touchend", endDrag);
