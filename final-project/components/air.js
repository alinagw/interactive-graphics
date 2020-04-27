class AirBall {
    constructor(radius, centerX, rightWristY, leftWristY) {
        this.circles = [];
        this.radius = radius;
        this.rightWristY = rightWristY;
        this.leftWristY = leftWristY;
        this.centerX = centerX;
        this.colorCounter = 0;
    }

    updateInfo(radius, centerX, rightWristY, leftWristY) {
        this.radius = radius;
        this.rightWristY = rightWristY;
        this.leftWristY = leftWristY;
        this.centerX = centerX;
        for (let i = 0; i < this.circles.length; i++) {
            let rad = this.radius;
            if (i <= 8) rad = map(i, 1, 8, this.radius / 2, this.radius);
            else if (i >= 12) rad = map(i, 12, 20, this.radius, this.radius / 2);
            let y = lerp(this.rightWristY, this.leftWristY, i / 20);
            this.circles[i].updateInfo(rad, this.centerX, y);
        }
    }

    addEllipse() {
        for (let i = 1; i <= 20; i++) {
            let rad = this.radius;
            if (i <= 8) rad = map(i, 1, 8, this.radius / 2, this.radius);
            else if (i >= 12) rad = map(i, 12, 20, this.radius, this.radius / 2);
            let y = lerp(this.rightWristY, this.leftWristY, i / 20);

            this.circles.push(new AirBallEllipse(rad, this.centerX, y));
        }
    }

    display() {
        console.log("yeet");
        this.colorCounter++;
        for (let i = 0; i < this.circles.length; i++) {
            if (this.colorCounter >= 30) {
                this.circles[i].updateColor();
            }
            this.circles[i].display();
        }
        if (this.colorCounter >= 30) this.colorCounter = 0;
    }
}

class AirBallEllipse {
    constructor(rad, centerX, centerY) {
        this.rad = rad;
        this.x = centerX;
        this.y = centerY;
    }

    updateInfo(rad, centerX, centerY) {
        this.rad = rad;
        this.x = centerX;
        this.y = centerY;
    }

    updateColor() {
        this.h = round(random(185, 210));
        this.s = round(random(75, 100));
        this.l = round(random(50, 80));
    }

    display() {
        colorMode(HSL);
        // blendMode(ADD);
        fill(this.h, this.s, this.l);
        ellipse(this.x, this.y, this.rad, 30);
    }
}

// class AirParticleSystem {
//     constructor(origin) {
//         this.particles = [];
//         this.origin = origin.copy();
//     }

//     updateOrigin(origin) {
//         this.origin = origin.copy();
//     }

//     addParticle() {
//         this.particles.push(new AirParticle(this.origin.x, this.origin.y, this.img));
//     }

//     display() {
//         let len = this.particles.length;

//         for (let i = len - 1; i >= 0; i--) {
//             let particle = this.particles[i];
//             particle.run();

//             if (particle.isDead()) {
//                 this.particles.splice(i, 1);
//             }
//         }

//     }
// }

// class AirParticle {
//     constructor(center, pos, angle, radius) {
//         this.center = center.copy();
//         this.pos = pos.copy();
//         this.radius = dist;
//         this.particleColor = particleColor;
//         this.angle = angle;
//         this.dist = dist;
//         this.origin = origin.copy();
//     }

//     updateOrigin(center,) {
//         this.center = center.copy();
//     }

//     update() {

//     }

//     display() {
//         ellipse()
//     }
// }


// class Particle {

// 	constructor(color, initialAngle, initialDistFromCenter) {
// 		this.color = color;
// 		this.angle = initialAngle;
// 		this.initialDistFromCenter = this.distFromCenter = initialDistFromCenter;
// 		this.cX = mouseX;
// 		this.cY = mouseY;
// 		this.radius = 3;
// 		this.VELOCITY = random(0.5, 0.8);
		
// 	}
	
// 	update() {
// 		if (this.distFromCenter <= 0) return this;
		
// 		this.angle = this.angle + (this.VELOCITY * (this.initialDistFromCenter + 50) / (this.distFromCenter + 50));
// 		this.distFromCenter = max(0, this.distFromCenter - (this.VELOCITY * (this.initialDistFromCenter + 50) / (this.distFromCenter + 50)));
		
// 		return this;
// 	}
	
// 	draw() {
// 		noStroke();
// 		fill(this.color);
// 		let v = p5.Vector.fromAngle(radians(this.angle), this.distFromCenter);
// 		v.add(this.cX, this.cY);

// 		let size = 1 + (this.radius - 1) * this.distFromCenter / this.initialDistFromCenter;
		
// 		ellipse(v.x, v.y, size, size);
// 	}
// }