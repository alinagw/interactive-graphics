class Tree {
    constructor(height) {
        this.theta = 40;
        this.hue = 130;
        this.branches = 0;
    }

    startBranch(h) {
        this.branches = h;
        this.branch(h);
    }

    branch(h) {
        
        h *= 0.66;

  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (h > 2) {
    
    
    push();    // Save the current state of transformation (i.e. where are we now)
    rotate(this.theta);   // Rotate by theta
    strokeWeight(map(h, 3, this.branches, 2, 10));
    stroke(this.hue, 100, map(h, 3, this.branches, 20, 50));
    line(0, 0, 0, -h);  // Draw the branch
    translate(0, -h); // Move to the end of the branch
    this.branch(h);       // Ok, now call myself to draw two new branches!!
    pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state

    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-this.theta);
    strokeWeight(map(h, 3, this.branches, 1, 5));
    stroke(this.hue, 100, map(h, 3, this.branches, 20, 50));
    line(0, 0, 0, -h);
    translate(0, -h);
    this.branch(h);
    pop();
  }

    }
}