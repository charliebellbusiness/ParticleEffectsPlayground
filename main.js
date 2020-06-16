import { writeCenteredMessage, countVisibleParticles} from "./universal.module.js";

const particles = [];
const vW = window.innerWidth;
const vH = window.innerHeight;

function setup() {

    createCanvas(vW, vH);

    const particlesLength = Math.floor(vW / 10);

    for(let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());
    }

    
}



function draw() {
    
    // Draw the background over and over to prevent streaking of particle path. 
    
    //There has to be a more optimized way to do this because I am SO tired of my MacBook running like a jet engine when the particle count gets higher. Optimize the background function AND LET THE PARTICLE CHAOS BEGIN.

    background(55, 100, 144);

    // Define canvas, properties, and context\

    var canvas =  document.getElementById('defaultCanvas0');
    var ctx = canvas.getContext('2d');

    var cW = canvas.width;
    var cH = canvas.height;

    // Get amount of particles on screen. Message based on amount of particles

    if (countVisibleParticles(particles) > particles.length / 2) {
    
    writeCenteredMessage('welcome to particle effects playground', 'center', 'bottom', '5vw helvetica', ctx, cW, cH);

    } else { writeCenteredMessage('choose more physics games above', 'center', 'bottom', '5vw helvetica', ctx, cW, cH)  }

    // For each particle, reference Particle class functions listed below
    particles.forEach((p) => {
        p.update();
        p.draw();
        p.checkParticles();
    })

}

//Define basic particle

class Particle {
    constructor() {
        // Position
        this.pos = createVector(random(width), random(height));

        //Velocity
        this.vel = createVector(random(-1, 1), random(-1, 1));

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
        noStroke();
        fill(
            // 'rgba(' + Math.floor(random(0, 255)) + ',' + Math.floor(random(0, 255)) + ',' + Math.floor(random(0,255)) + ', 0.5)' 
            // SEIZURE WARNING
            'rgba(255, 255, 255, 0.5)'
            )
        circle(this.pos.x, this.pos.y, this.size)
    }

    // Detect if particle touches edge of canvas
    edges() {
        
        if(this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;

            var particleIndex = particles.indexOf(this); //Get index of this particle

            delete particles[particleIndex];

        } else if(this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
            
            var particleIndex = particles.indexOf(this);

            delete particles[particleIndex]; //Get index of this particle and delete it

        }

    }

    // Get statuses of particles such as position, amount, velocity.
    checkParticles() {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y) // Calculate distance between two particles, this and each other particle

            if(d < 120) {
                stroke('rgba(255,255,50, 0.1)')
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            }

        })
        
    }
}

window.setup = setup;
window.draw = draw;