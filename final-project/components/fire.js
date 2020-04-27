/**
 * PARTICLE SYSTEM
 */
class FireParticleSystem {
    constructor(origin, img) {
        this.particles = [];
        this.origin = origin.copy();
        this.img = img;
    }

    updateOrigin(origin) {
        this.origin = origin.copy();
    }

    addParticle() {
        this.particles.push(new FireParticle(this.origin.x, this.origin.y, this.img));
    }

    display() {
        let len = this.particles.length;

        for (let i = len - 1; i >= 0; i--) {
            let particle = this.particles[i];
            particle.run();

            if (particle.isDead()) {
                this.particles.splice(i, 1);
            }
        }

    }
}

class FireParticle {
    // decrease size, alpha
    // move y upward 
    // x side to side but decreasing towards center
    // pos between two points
    // random hue/sat/bright



    constructor(x, y, img) {
        this.pos = createVector(random(x - 20, x + 20), y);
        let vx = randomGaussian() * 0.3;
        let vy = randomGaussian() * 0.5 - 1;
        this.vel = createVector(vx, vy);
        // this.acc = createVector(0.1, this.);

        this.life = round(random(50, 150));
        this.size = random(30, 50);
        this.alpha = 255;
        
        // let xDiff = abs(x - this.pos.x);
        let xDiff = log(map(abs(x - this.pos.x), 0, 20, 0.1, 10)) + 1;
        this.h = round(map(xDiff, 0, 2, 50, 0));
        this.s = floor(random(90, 100));
        this.l = round(map(xDiff, 0, 1, 70, 50));
        // this.flameColor = color('hsl(' + h + ', ' + s + '%, ' + l + '%)');
        
        this.texture = img;

        if (random(100) > 95) {
            this.life += 10;
            this.spark = true;
        }

    }

    update() {
        // this.vel.x += (random(0, 200) - 100) / 2000;
        this.vel.y -= 1/this.life;
        // this.vel.y = -2*noise(this.pos.x/10, this.pos.y/10);
	    this.vel.x = 5*noise(this.pos.x/2, sin(this.pos.y/10), 100*this.vel.x)-2.35;
        this.pos.add(this.vel);
        this.alpha *= 0.96;
        // this.flameColor.setAlpha(this.alpha);
        
        this.life *= 0.96;
        this.size -= 0.5;
        
        // this.life = this.life * 0.95 - 0.3;
        // this.size -= 2;
        // this.alpha *= 0.95;
        // let vy = -2*noise(this.pos.x/50, this.pos.y/50);
        // let vx = 5*noise(this.pos.x/2, sin(this.pos.y/10), 100*this.vel.vx)-2.35;
        // this.vel = createVector(vx, vy);
    }

    isDead() {
        return this.life <= 5 || this.alpha <= 1 || this.size <= 1;
    }

    render() {
        if (this.spark) {
            push();
            strokeWeight(2);
            stroke(255, 255, 0);
            point(this.pos);
            pop();
        } else {
            push();
            colorMode(HSL);
            blendMode(ADD);
            noStroke();
            fill(this.h, 100, this.l, this.alpha);
            ellipse(this.pos.x, this.pos.y, this.size);
            // imageMode(CENTER);
            // tint(this.h, 100, this.l, this.alpha);
            // image(this.texture, this.pos.x, this.pos.y, this.size, this.size);
            pop();
        }
        
    }

    run() {
        this.update();
        this.render();
    }

}