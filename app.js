const colorOptions = document.getElementsByClassName("color-option");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("Reset");
const eraser = document.getElementById("eraser");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveButton = document.getElementById("save");
const imgSelect = document.querySelectorAll("img");

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;


canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let isPainting = false;
let isFilling = false;
ctx.lineWidth = lineWidth.value;
ctx.lineCap ="round";

canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
    if (!isPainting) {
        ctx.moveTo(offsetX, offsetY);
        return;
    }
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
});

canvas.addEventListener("mousedown", () => isPainting = true);
document.addEventListener("mouseup", () => {
    isPainting = false;
    ctx.beginPath();
});



lineWidth.addEventListener("change", ({ target }) => ctx.lineWidth = target.value);
color.addEventListener("change", ({ target }) => {
    ctx.strokeStyle = target.value;
    ctx.fillStyle = target.value;
});

Array.from(colorOptions).forEach(option => option.addEventListener("click", ({ target }) => {
    const colorValue = target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}));

function onModeClick() {
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "색칠하기";
    } else {
        isFilling = true
        modeBtn.innerText = "그리기";
    }
    
}

function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onResetClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);  
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "색칠하기";
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download="myDrawing.png";
    a.click();
}

function onImgClick(event) {
    const url = event.target.src;
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
}


modeBtn.addEventListener("click", onModeClick);
canvas.addEventListener("click", onCanvasClick);
resetBtn.addEventListener("click", onResetClick);
eraser.addEventListener("click", onEraserClick);
saveButton.addEventListener("click", onSaveClick);
imgSelect.forEach((img) => img.addEventListener("click", onImgClick));
