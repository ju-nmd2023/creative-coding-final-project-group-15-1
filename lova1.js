//The following lines of code is inspired by Tyler Hobbs code for his art of flow fields
function setup() {
    createCanvas(innerWidth, innerHeight);
    background(240);
    noFill();
    strokeWeight(1.2);
  
    let stepSize = 20;
    let lineLength = 150;
  
    // Softer palette with transparency
    let palette = [
      color(215, 70, 110, 50),
      color(90, 20, 200, 50),
      color(255, 150, 50, 50),
      color(20, 120, 150, 50),
    ];
  
    for (let x = 0; x < width; x += stepSize) {
      for (let y = 0; y < height; y += stepSize) {
        stroke(palette[int(random(palette.length))]);
  
        let px = x;
        let py = y;
  
        beginShape();
        for (let i = 0; i < lineLength; i++) {
          vertex(px, py);
  
          // Perlin noise flow field
          let n = noise(px * 0.002, py * 0.002); 
          let angle = TAU * n; 
  
          px += cos(angle) * 2; 
          py += sin(angle) * 2;
  
          if (px < 0 || px > width || py < 0 || py > height) break;
        }
        endShape();
      }
    }
  
    noLoop();
  }
