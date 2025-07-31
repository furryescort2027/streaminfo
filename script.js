function changeColor() {
  document.body.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
  const colors = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFF9C4", "#D1C4E9"];
  return colors[Math.floor(Math.random() * colors.length)];
}
