let stepSize = 10;
let lineLength = 150;
let palette;
let move = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noFill();
  strokeWeight(2);

  palette = [
    color(215, 70, 110, 40),
    color(90, 20, 200, 40),
  ];
}

function draw() {
  background(240, 25);

  for (let y = 0; y < height; y += stepSize) {
    stroke(palette[int(random(palette.length))]);
    beginShape();
    for (let x = 0; x < width; x += stepSize) {
      let wave = sin((x * 0.02) + move + y * 0.05) * 10;
      vertex(x, y + wave);
    }
    endShape();
  }

  move += 0.009; // wave speed
}
