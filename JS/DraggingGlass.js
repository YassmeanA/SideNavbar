let isDragging = false;
let isVerticalScroll = false;
let startX = 0;
let startY = 0;
let startLeft = 0;

// Begin drag (mouse or touch)
function startDrag(clientX, clientY) {
  SideNavbar.style.transition = "none";
  SideNavbar.style.cursor = "grab";
  isDragging = true;
  isVerticalScroll = false;
  startX = clientX;
  startY = clientY;
  startLeft = parseInt(SideNavbar.style.left) || -1;
}

// While dragging
function dragMove(clientX, clientY) {
  if (!isDragging) return;
  SideNavbar.style.cursor = "grabbing";
  const dx = clientX - startX;
  const dy = clientY - startY;

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
  SideNavbar.style.cursor = "grab";
  
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
