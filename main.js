(() => {
  const params = new URL(location.href).searchParams;
  if (params.has('name')) {
    document.querySelector('.name').innerHTML = params.get('name');
  }
  const carKey = document.querySelector('.car-key');
  const yuiHand = document.querySelector('.yui-hand');
  let dragging = false;
  let lastCoordinateX = 100;
  let lastCoordinateY = 100;

  document.addEventListener('mousedown', ({clientX: x, clientY: y}) => {
    if (x >= lastCoordinateX && x <= lastCoordinateX + 50 &&
      y >= lastCoordinateY && y <= lastCoordinateY + 100) {
        carKey.classList.add('dragging');
        dragging = true;
        console.log('dragging');
      }
  });

  document.onmousemove = ({clientX: x, clientY: y}) => {
    if (dragging) {
      carKey.style.top = `${y}px`;
      carKey.style.left = `${x}px`;
    }
  };

  document.addEventListener('mouseup', ({clientX: x, clientY: y}) => {
    if (dragging) {
      dragging = false;
      lastCoordinateX = x;
      lastCoordinateY = y;
      console.log('stop dragging');
      isTheKeyGivenToYui(x, y);
    }
  });

  function isTheKeyGivenToYui(mouseX, mouseY) {
    // 326px/140px
    const {offsetTop, offsetLeft} = yuiHand;
    const boundaryX = [offsetLeft, offsetLeft + 150];
    const boundaryY = [offsetTop, offsetTop + 140];
    if (mouseX >= boundaryX[0] && mouseX <= boundaryX[1] &&
        mouseY + 50 >= boundaryY[0] && mouseY + 50 <= boundaryY[1]) {
          const imgNumber = Math.floor(Math.random() * 4) + 1;

          document.querySelector('.gif-container').classList.add(`given`);
          document.querySelector('.gif-container').classList.add(`crash${imgNumber}`);
        }
  }
})();
