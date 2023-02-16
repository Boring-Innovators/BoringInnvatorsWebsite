let animationId;
let currentPagePos = window.pageYOffset;
let targetPagePos = 0;
let direction;
let currentImgIndex = 0;

const images = [  {    element: document.getElementById("BIimage"),    strength: 1.5,    speed: 0.01,    min: 0,    max: 3,    yPosition: 0,    currentImgPos: 0,    targetImgPos: 0},
{element: document.getElementById("caliber-image"),    strength: 1.5,    speed: 0.01,    min: 0,    max: 2,    yPosition: 0,    currentImgPos: 0,    targetImgPos: 0},
{element: document.getElementById("chess-image"),    strength: 1.5,    speed: 0.005,    min: 0,    max: 15,    yPosition: -20,    currentImgPos: 0,    targetImgPos: 0},

]

setInterval(updateImgPos, 1);
window.addEventListener("wheel", move);
move();
updateImgPos();
animateImg();

function move(event) {
  
  direction = event.deltaY > 0 ? 1 : -1;
  targetPagePos = window.pageYOffset + direction * 200;
  window.cancelAnimationFrame(animationId);
  animationId = window.requestAnimationFrame(animate);
  updateImgPos();
}

function animate() {
  currentPagePos += (targetPagePos - currentPagePos) * 0.003;
  window.scrollTo(0, currentPagePos);
  if (Math.abs(currentPagePos - targetPagePos) > 0.00001) {
    animationId = window.requestAnimationFrame(animate);
  } else {
    window.cancelAnimationFrame(animationId);
  }
}

function updateImgPos() {
  images.forEach(function(img, i) {
    img.targetImgPos = window.pageYOffset / img.strength;
    if(img.targetImgPos > img.max) {
      img.targetImgPos = img.max;
    }
    if(img.targetImgPos < img.min) {
      img.targetImgPos = img.min;
    }
  });
  animationId = window.requestAnimationFrame(animateImg);
}

function animateImg() {
  images.forEach(function(img, i) {
    img.currentImgPos += (img.targetImgPos - img.currentImgPos) * img.speed;
    img.element.style.transform = `translate3d(0, ${img.currentImgPos + img.yPosition}vw, 0)`;
  });
  if (Math.abs(img.currentImgPos - img.targetImgPos) > 0.00001) {
    animationId = window.requestAnimationFrame(animateImg);
  }
}


