//The following lines of code is inspired by flow field art by Tyler Hobbs, https://www.tylerxhobbs.com/words/flow-fields
function setup() {
  createCanvas(innerWidth, innerHeight);
  background(225, 235, 245);
  noFill();
  strokeWeight(3);

  let stepSize = 80;
  let lineLength = 300; // gör linjerna längre
  let palette = [
    color(101, 67, 33), // dark brown
    color(139, 69, 19), // saddle brown
    color(160, 82, 45), // sienna
    color(205, 133, 63), // peru
    color(222, 184, 135), // burlywood
  ];

  // Rita t.ex. 100 linjer från nedre mitten
  for (let j = 0; j < stepSize; j++) {
    stroke(palette[int(random(palette.length))]);

    let px = width / 2 + random(-30, 30);
    let py = height;

    beginShape();
    for (let i = 10; i < lineLength; i++) {
      vertex(px, py);

      // Perlin noise flow field
      let n = noise(px * 0.01, py * 0.01, j * 0.05); // tredje dimension för variation
      let angle = -HALF_PI + map(n, 0, 1, -PI / 6, PI / 6);
      let flowAmount = map(i, 0, lineLength, 0.3, 1.2); // increases toward top
      angle += sin(n * TWO_PI * 0.02) * 1.4 * flowAmount;

      px += cos(angle) * 2;
      py += sin(angle) * 2;

      if (px < 0 || px > width || py < 0 || py > height) break;
    }
    endShape();
  }

  noLoop();
}
