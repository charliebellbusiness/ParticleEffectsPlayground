//////////////////////////////////////////////////////////////////////////

// Define basic variables for use in all files. For copy + paste use only. Do not uncomment.

// const particles = [];

// const vW = window.innerWidth;
// const vH = window.innerHeight;

// var canvas =  document.getElementById('defaultCanvas0'); //Reference canvas

// var ctx = canvas.getContext('2d'); // Reference canvas element context

// var cW = canvas.width;
// var cH = canvas.height;

//////////////////////////////////////////////////////////////////////////

// Add a message to the center of the canvas.
export function writeCenteredMessage(message, textAlign, textBase, textFont, canvasContext, cW, cH) {

    // Set message style
    canvasContext.textAlign = textAlign;
    canvasContext.textBaseline = textBase;
    canvasContext.font = textFont;

    // Find approx height of Font
    var approxFontHeight = parseInt(textFont);

    // Add message
    canvasContext.fillText(message, cW / 2, (cH / 2) + approxFontHeight / 4);

}

// Does what it says
export function countVisibleParticles(particleArray) {

    // Function definition to use array filter method
    function checkParticlesUndefined(particle) {
        return particle != undefined;
    }

    return particleArray.filter(checkParticlesUndefined).length;

}