const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// canvas라는 tag는 getContext라는 메소드를 갖는다.
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// 실제 캔버스의 픽셀 사이즈를 줘야한다. 여기서 픽셀 사이즈란 css에서 준 그 사이즈를 의미한다.
ctx.lineWidth = 2.5;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function handleCM(event) {
  // 마우스 우클릭 못하게 제어하는 것
  event.preventDefault();
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    console.log("moving cersor in ", x, y);
    ctx.beginPath(); // 이거 안하면 직전에 땠을 때의 위치를 기억하고 있다가 다음 클릭 때 그 위치랑 선이 이어짐
    // 클릭하지 않고 마우스를 움직였을 때는 path를 시작한다.
    // path는 선이다.
    // path를 만들면 마우스의 x y 좌표로 path를 옮긴다.
    // 그래서 마우스를 움직이는 모든 순간에 path를 만든다
    // path의 시작점은 마우스가 있는 것이다.
    // ctx.moveTo(x, y);
  } else {
    // 클릭되고 있는 경우
    console.log("create line in ", x, y);
    ctx.lineTo(x, y);
    // path의 이전 위치에서 지금 위치까지 선을 만드는 것이다.
    ctx.stroke();
    // 현재의 sub-path를 현재의 stroke style로 획을 그음

    // ctx.closePath();
    // <-- 이렇게 해버리면 path가 닫혀서 시작점은 오로지 누르기 전 값만 된다.
  }
}

function handleRangeChange(event) {
  console.log(event.srcElement.value);
  const line_weight = event.srcElement.value;
  ctx.lineWidth = line_weight;
}

function handleColorClick(event) {
  console.log(event.target.style.backgroundColor);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleModeClick(event) {
  const inner_text = event.target.innerText;
  console.log(inner_text);
  if (inner_text === "FILL") {
    event.target.innerText = "drawing";
    filling = true;
  } else {
    event.target.innerText = "fill";
    filling = false;
  }
}

function handleFilling() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 직사각형을 위치에 그려주는 것
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image; // href로 저장할 파일 넘겨줌
  link.download = "paintJS[EXPORT]"; // 파일 이름 설정
  link.click(); // 링크를 가짜로 클릭하는 것
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mousedown", handleFilling);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);
}

document.addEventListener("contextmenu", handleCM);

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
