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

    background(55, 100, 144)

    // Setting constants for referencing element context and element more easily
    var ctx = document.getElementById('defaultCanvas0').getContext('2d'); //Reference 2d context
    var canvas =  document.getElementById('defaultCanvas0') //Reference canvas

    // Canvas font styling
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.font = '5vw helvetica';
    
    // Get the Font Height of the text for future use
    var approxFontHeight = parseInt(ctx.font);

    // Use the visual width to center horizontally, then use visual height and font height to center text vertically. Font height is to negate text font offset.
    ctx.fillText('particle effects playground', vW / 2, (vH / 2) + approxFontHeight / 4)

    // For each particle, reference Particle class functions listed below
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
        noStroke();
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

    //Connect lines between particles by checking distance
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