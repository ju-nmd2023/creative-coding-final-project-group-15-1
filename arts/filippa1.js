function setup() {
    createCanvas(1050, 1050);
    frameRate(3);
  
    // set colors to flowers
    for (let y = 0; y < 10; y++) {
      colorGrid[y] = [];
      for (let x = 0; x < 10; x++) {
        colorGrid[y][x] = [];
        for (let i = 0; i < layers; i++) {
          let rand = Math.random();
          if (rand < 0.33) {
            colorGrid[y][x][i] = color(241, 180, 213); 
          } else if (rand < 0.66) {
            colorGrid[y][x][i] = color(205, 222, 224); 
          } else {
            colorGrid[y][x][i] = color(178, 46, 109); 
          }
        }
      }
    }
  }
  
  const size = 120;
  const layers = 3;
  
  let colorGrid = [];
  
  function drawLayers(x, y, size, layers, gridX, gridY) {
    const variance = size / 40;
    noFill();
  
    let thick = Math.random() > 0.7; 
    strokeWeight(thick ? 2.5 : 1);
  
    //following 19 lines for making proper flower-petal-shapes is inspired by discussion with ChatGPT (OpenAI, 2025)
    let petalCount = int(random(5, 9));       
    let petalAmp = random(0.2, 0.5);          
  
    for (let i = 0; i < layers; i++) {
      if (Math.random() > 0.8) continue;
      stroke(colorGrid[gridY][gridX][i]);
      let baseR = (size / layers) * i / 2;
  
      beginShape();
      let points = 100; 
      for (let a = 0; a <= TWO_PI + 0.1; a += TWO_PI / points) {
        
        let r = baseR * (1 + petalAmp * sin(petalCount * a));
  
        let rx = x + cos(a) * r + random(-variance, variance);
        let ry = y + sin(a) * r + random(-variance, variance);
        curveVertex(rx, ry);
      }
      endShape(CLOSE);
    }
  }
  
  function draw() {
    background(241, 241, 143, 25); 
  
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers, x, y);
      }
    }
  }
  