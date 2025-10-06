//The following lines of code is inspired by flow field art by Tyler Hobbs, https://www.tylerxhobbs.com/words/flow-fields
function setup() {
  createCanvas(innerWidth, innerHeight);
  background(240);
  noFill();
  strokeWeight(1.2);

  let stepSize = 10;
  let lineLength = 150;

  let palette = [color(215, 70, 110, 50)];

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
