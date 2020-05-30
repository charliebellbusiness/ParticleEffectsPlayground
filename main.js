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
    var ctx = document.getElementById('defaultCanvas0').getContext('2d'); //Reference 2d context of canvas
    var canvas =  document.getElementById('defaultCanvas0') //Reference canvas

    // Canvas font styling
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.font = '5vw helvetica';
    
    // Get the Font Height of the text for future use
    var approxFontHeight = parseInt(ctx.font);

    // Use the visual width to center horizontally, then use visual height and font height to center text vertically. Font height is to negate text font offset. Message changes based on amount of particles not undefined

    function checkParticlesUndefined(particle) {
       return particle != undefined;
    }

    // Get length of particles that are not undefined.
    if (particles.filter(checkParticlesUndefined).length > particles.length / 2) {

    ctx.fillText('welcome to particle effects playground', vW / 2, (vH / 2) + approxFontHeight / 4)

    } else { ctx.fillText('choose more physics games above', vW / 2, (vH / 2) + approxFontHeight / 4) }

    console.log(particles.filter(checkParticlesUndefined).length)
    console.log(particles.length)

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
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)

            if(d < 120) {
                stroke('rgba(255,255,50, 0.1)')
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            }

        })
        
    }
}