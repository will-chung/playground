import { Handle } from "./handle.js";
import { Slice } from "./slice.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

initCanvas();

const RADIUS = 100;
const FULL = 360;
  
const slices = [];
const handles = [];

initDefault();

const colors = ['red', 'green', 'blue'];
let currColor = 0;

const addBtn = document.getElementById('add');
const removeBtn = document.getElementById('remove');

addBtn.addEventListener('click', addSlice);
removeBtn.addEventListener('click', removeSlice);

/**
 * Initialize the canvas by transforming into Cartesian plane.
 */
function initCanvas() {
  // initialize canvas to standard Cartesian plane
  const height = canvas.height;
  const width = canvas.width;

  ctx.translate(width / 2, height / 2);
  ctx.scale(1, -1);
}

/**
 * Initialize default roulette wheel.
 */
function initDefault() {
  slices.push(new Slice(0, 120, 'red'));
  slices.push(new Slice(120, 240, 'green'));
  slices.push(new Slice(240, 360, 'blue'));

  handles.push(new Handle(slices[0], slices[2]));
  handles.push(new Handle(slices[1], slices[0]));
  handles.push(new Handle(slices[2], slices[1]));

  const handle1 = document.getElementById('handle1');
  const handle2 = document.getElementById('handle2');
  const handle3 = document.getElementById('handle3');

  handle1.addEventListener('input', update);
  handle2.addEventListener('input', update);
  handle3.addEventListener('input', update);
}

/**
 * Clear the canvas.
 */
function clearCanvas() {
  const height = canvas.height;
  const width = canvas.width;

  ctx.clearRect(-width / 2, -height / 2, width, height)
}

/**
 * Update roulette wheel based on handle movement. 
 * @param {*} event - The triggered event. 
 */
function update(event) {
  const strLength = event.target.id.length;
  const handleIndex = parseInt(event.target.id.charAt(strLength - 1)) - 1;
  handles[handleIndex].update(event);
}

/**
 * Draw slices of the roulette wheel.
 */
function drawSlices() {
  if (slices.length === 0) clearCanvas();
  slices.forEach(s => s.draw());
}

/**
 * Add a slice to the roulette wheel next to selected slice.
 */
function addSlice() {
  // get selected slice number
  const sliceNum = parseInt(document.getElementById('slice').value);
  const newSlice = new Slice(0, 0, slices[sliceNum].color);

  slices.splice(sliceNum + 1, 0, newSlice);
  addHandle(sliceNum + 1, newSlice);
  fitSlices();
  updateHandles();
  drawSlices();
}

/**
 * Remove selected slice from roulette wheel.
 */
function removeSlice() {
  // get selected slice number
  const sliceNum = parseInt(document.getElementById('slice').value);

  slices.splice(sliceNum, 1);
  removeHandle(sliceNum);
  fitSlices();
  updateHandles();
  drawSlices();
}

/**
 * Add a handle to specified slice.
 */
function addHandle(sliceNum, newSlice) {
  const adjSlice = slices[sliceNum - 1];
  handles.splice(sliceNum, 0, new Handle(newSlice, adjSlice));

  // update newly adjacent slices
  if (sliceNum === slices.length - 1) 
    handles[0].adjSlice = newSlice;
  else
    handles[sliceNum + 1].adjSlice = newSlice;

  addHandleInput(sliceNum);
}

/**
 * Add elements to DOM to represent a handle.
 */
function addHandleInput(sliceNum) {
  const newLabel = document.createElement('label');

  const newText = document.createTextNode(``); 
  newLabel.appendChild(newText);

  const newInput = document.createElement('input');
  newInput.type = 'number';
  newLabel.appendChild(newInput);

  // register event listener
  newInput.addEventListener('input', update);

  const parent = document.getElementById('handles');
  const labels = parent.getElementsByTagName('label');
  if (sliceNum === slices.length - 1) {
    const prevElement = labels[sliceNum - 1];
    prevElement.after(newLabel);
    prevElement.after(document.createElement('br'));
  } else {
    const nextElement = labels[sliceNum];
    parent.insertBefore(newLabel, nextElement);
    parent.insertBefore(document.createElement('br'), nextElement);
  }
}

/**
 * Remove handle from specified slice.
 */
function removeHandle(sliceNum) {
  handles.splice(sliceNum, 1);

  // update newly adjacent slices
  if (sliceNum === 0 || sliceNum === slices.length) 
    handles[0].adjSlice = slices[slices.length - 1];
  else
    handles[sliceNum].adjSlice = slices[sliceNum - 1]; 

  removeHandleInput(sliceNum);
}

/**
 * Remove elements from DOM which represented a handle.
 */
function removeHandleInput(sliceNum) {
  const parent = document.getElementById('handles');
  const labels = parent.getElementsByTagName('label');

  labels[sliceNum].remove();
}

/**
 * Update handles according to roulette wheel state. 
 */
function updateHandles() {
  const parent = document.getElementById('handles');
  const labels = parent.getElementsByTagName('label');

  for (let i = 0; i < handles.length; i++) {
    const children = labels[i].childNodes;
    // label text
    children[0].textContent = `Handle ${i + 1}: `;
    // input
    children[1].id = `handle${i + 1}`;
    children[1].value = slices[i].startAngle;
  }
}

/**
 * Fit slices inside roulette wheel.
 */
function fitSlices() {
  const newBase = FULL / slices.length;
  let newSize = 0;
  let startAngle = 0;
  let endAngle = 0;

  for (let i = 0; i < slices.length; i++) {
    const currSlice = slices[i];
    newSize = newBase * currSlice.ratio; 
    endAngle = startAngle + newSize;

    currSlice.startAngle = startAngle;
    currSlice.endAngle = endAngle;
    currSlice.size = newSize;

    startAngle = endAngle;
  }
}

/**
 * Get the next color from global color array. 
 * @returns The next color.
 */
function getNextColor() {
  const color = colors[currColor];
  currColor += 1;
  currColor %= colors.length;
  return color;
}

drawSlices();

export { ctx, RADIUS, slices, FULL };
