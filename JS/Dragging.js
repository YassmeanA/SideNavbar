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
  SideNavbar.style.cursor = "grab";
}

// While dragging
function dragMove(clientX, clientY) {
  if (!isDragging) return;
  SideNavbar.style.cursor = "grabbing";
  
  const dx = clientX - startX;
  const dy = clientY - startY;

  const newLeft = startLeft + dx;

  if (newLeft > 0) return;

  SideNavbar.style.left = `${newLeft}px`;

  Frames.forEach(Frame => {
    Frame.style.filter = `brightness(${(0.7 + 0.3 * (Math.abs(newLeft) / 220)) * 100}%)`;
  });
}

// End drag
function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  SideNavbar.style.cursor = "grab";
  SideNavbar.style.transition = "0.4s";

  const finalLeft = parseInt(SideNavbar.style.left) || 0;

  if (finalLeft < -110) {
    deactivate();
  } else {
    SideNavbar.classList.add("active");
    if(!Body.classList.contains("touch") && window.innerHeight < 670){SideNavbar.style.width="226px";if(SideNavbar.classList.contains("active")){SideNavbar.style.left="0px";}else{SideNavbar.style.left="-226px";};
    }else{
    SideNavbar.style.width="220px";if(SideNavbar.classList.contains("active")){SideNavbar.style.left="0px";}else{SideNavbar.style.left="-220px";};}

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
