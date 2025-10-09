function setup() {
  createCanvas(innerWidth, innerHeight);
  background(4, 12, 36);
  noFill();
  strokeWeight(0.5);

  let stepSize = 20;
  let lineLength = 150;

  let palette = [
    color(255, 255, 255, 80),
    color(157, 165, 189, 100),
    color(58, 76, 122, 100),
    color(10, 32, 90, 100),
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
