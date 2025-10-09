let stepSize = 10;
let lineLength = 150;
let palette;
let move = 0; // z-offset for evolving noise

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(240);
  noFill();
  strokeWeight(1.2);

  let palette = [
    color(215, 70, 110, 40),
    color(90, 20, 200, 40),
    color(255, 100, 50, 40),
  ];

  for (let x = 0; x < width; x += stepSize) {
    for (let y = 0; y < height; y += stepSize) {
      stroke(palette[int(random(palette.length))]);

      let px = x;
      let py = y;

      beginShape();
      for (let i = 0; i < lineLength; i++) {
        vertex(px, py);

        // Add zoff to evolve the noise field over time
        let n = noise(px * 0.002, py * 0.002, move);
        let angle = TAU * n;

        px += cos(angle) * 2;
        py += sin(angle) * 2;

        if (px < 0 || px > width || py < 0 || py > height) break;
      }
      endShape();
    }
  }

  // Slowly change zoff so the field “flows”
  move += 0.009;
}
