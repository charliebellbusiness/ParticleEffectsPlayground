const particles = []

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    const particlesLength = Math.floor(window.innerWidth / 10);

    for(let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(55, 100, 144)
    
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    })

}

//Define basic particle

class Particle {
    constructor() {
        // Position
        this.pos = createVector(random(width), random(height));

        //Velocity
        this.vel = createVector(random(-2, 2), random(-2, 2));

        // Size
        this.size = random(1, 10);
    }

    //Add velocity to particle
    update() { 
        this.pos.add(this.vel);
        this.edges();
    }

    //Draw single particle
    draw() { 
        noStroke()
        fill(
            // 'rgba(' + Math.floor(random(0, 255)) + ',' + Math.floor(random(0, 255)) + ',' + Math.floor(random(0,255)) + ', 0.5)' 
            // SEIZURE WARNING
            'rgba(255, 255, 255, 0.5)'
            )
        circle(this.pos.x, this.pos.y, this.size)
    }

    edges() {
        
        if(this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;

            delete particles[particles.indexOf(this)]; //Get index of this particle and delete it
        }

        if(this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
            
            delete particles[particles.indexOf(this)]; //Get index of this particle and delete it
        }
    }

    //Connect lines between particles
    checkParticles() {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)

            if(d < 120) {
                stroke('rgba(255,255,50, 0.1)')
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            }
        })
    }
}