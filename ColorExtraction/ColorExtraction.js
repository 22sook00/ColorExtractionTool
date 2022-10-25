const COLOR = {
  canvas: null,
  ctx: null,
  data: [],
  img: null,
  init() {
    COLOR.canvas = document.querySelector('main canvas');
    COLOR.ctx = COLOR.canvas.getContext('2d');
    COLOR.img = document.createElement('img');
    COLOR.img.src = COLOR.canvas.getAttribute('data-src');
    //once the image is loaded, add it to the canvas
    // console.log('cancna ctx',ctx)
    COLOR.img.onload = (ev) => {
      COLOR.ctx.drawImage(COLOR.img, 0, 0);
      //call the context.getImageData method to get the array of [r,g,b,a] values
      let imgDataObj = COLOR.ctx.getImageData(
        0,
        0,
        COLOR.canvas.width,
        COLOR.canvas.height
      );
      COLOR.data = imgDataObj.data; //data prop is an array
      // // console.log(COLOR.data.length, 900 * 600 * 4); //  has 2,160,000 elements
      // console.log('img data?',COLOR.data)
      COLOR.canvas.addEventListener('mousemove', COLOR.getPixel);
      COLOR.canvas.addEventListener('click', COLOR.addBox);
    };
  },
  getPixel(ev) {
    let cols = COLOR.canvas.width;
    // let rows = canvas.height;
    let { offsetX, offsetY } = ev;
    //call the method to get the r,g,b,a values for current pixel
    let c = COLOR.getPixelColor(cols, offsetY, offsetX);
    let clr = `rgb(${c.red}, ${c.green}, ${c.blue})`; //${c.alpha / 255}
    document.getElementById('pixelColor').style.backgroundColor = clr;
    COLOR.pixel = clr;
  },

  getPixelColor(cols, x, y) {
    let pixel = cols * x + y;
    let arrayPos = pixel * 4;
    return {
      red: COLOR.data[arrayPos],
      green: COLOR.data[arrayPos + 1],
      blue: COLOR.data[arrayPos + 2],
      alpha: COLOR.data[arrayPos + 3],
    };
  },
  addBox() {
    let selectBox = document.querySelector('.selected-color');
    selectBox.style.backgroundColor = COLOR.pixel;
    selectBox.setAttribute('data-label', 'Exact pixel');
    selectBox.setAttribute('data-color', COLOR.pixel);
  },
};

document.addEventListener('DOMContentLoaded', COLOR.init);