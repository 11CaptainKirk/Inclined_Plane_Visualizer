var delta = 0;


let mass = 3; // Mass in Kg
let coefFrict = 0.43; // Coefficient of Friction
let rampLength = 600; // Length of the ramp surface in m
let angleElevDeg = 30; // Angle of Elevation in Degrees
let initVelocity = 0; // Initial Velocity in m/s
let gravity = 9.81;// Accel due to Gravity in m/s^2
console.log(gravity)
let deltaVelocity = 0;
let deltaPosition = 0;

const userInputs = (ev)=>{    // USER INPUTS FUNCTION RUNS EVERY TIME THE RUN BUTTON IS CLICKED AND CALLS OTHER FUNCTIONS

  ev.preventDefault();

mass = document.getElementById("massInput").value || 3;
coefFrict = document.getElementById("coefFrictInput").value || 0.43;
rampLength = document.getElementById("rampLengthInput").value*100 || 600;
angleElevDeg = document.getElementById("angleElevInput").value || 30;
gravity = document.getElementById("gravityInput").value || 9.81;

delta = 0;
position = 0;
velocity = 0;
deltaVelocity = 0;
deltaPosition = 0;


}

document.addEventListener('DOMContentLoaded', ()=>{     //RUNS THESE FUNCTIONS WHEN THE BUTTON IS CLICKED //add to user inputs
  document.getElementById("btn").addEventListener('click', userInputs);
  document.getElementById("btn").addEventListener('click', timerReset);
  document.getElementById("btn").addEventListener('click', timer);
  document.getElementById("btn").addEventListener('click', intervalSet);
  document.getElementById("btn").addEventListener('click', veloDisp);
  document.getElementById("btn").addEventListener('click', accelDisp);
  document.getElementById("btn").addEventListener('click', fgxDisp);
  document.getElementById("btn").addEventListener('click', fnDisp);
  document.getElementById("btn").addEventListener('click', ffDisp);
  document.getElementById("btn").addEventListener('click', netFDisp);
});

let angleElevRad = angleElevDeg*((Math.PI)/180); //CONVERTS TO RADIANS
let trigAdj = rampLength*(Math.cos(angleElevRad)); //FINDS TRIANGLE Adjacent
let trigOpp = rampLength*(Math.sin(angleElevRad)); // FINDS TRIANGLE Opposite
let adjProp = trigAdj/rampLength; //adjacent proportion
let oppProp = trigOpp/rampLength; //opposite proportion
var velocity = initVelocity; //resets velocity
var position = 0; // all of the below is setting variables at global scope
var currTime = 0;
var dispTime = 0;
var intervalSetter;
var intervalSetter2;
var intervalSetter3;
var dispVelo = 0;
var acceleration;
var dispAccel = 0;
var dispFGX = 0;
var fGravityX;
var dispFn;
var dispFf;
var dispNetF;
var fNormal;
var fFriction;
var netGravityX;

var timer = function(){  //function to allow for time display. interval of 10ms.

  currTime = currTime + 0.01
  dispTime=parseFloat(currTime.toFixed(4));
  document.getElementById("timeSet").innerHTML = `t: ${dispTime}s`;

}

function timerReset (){ //resets timer when starting a new run.
  currTime = 0;
  dispTime = 0;
}

var intervalSet = function(){  // sets interval for timer, velocity display, and integrate function.

  intervalSetter = setInterval(timer, 10);
  intervalSetter2 = setInterval(veloDisp, 10);
  intervalSetter3 = setInterval(integrate, 10);
  } 

var timerClr = function(){ // clears intervals for interval functions.
  clearInterval(intervalSetter2);
  clearInterval(intervalSetter);
  clearInterval(intervalSetter3);
}

function veloDisp(){  // displays current velocity. Updates every 10ms.
  dispVelo=parseFloat(velocity.toFixed(2));
  document.getElementById("veloDisp").innerHTML = `v: ${dispVelo}m/s`;
}

intervalSet();  // run the interval, inclined plane, and timer functions
timer();
incPlane();
integrate(); 

function incPlane()     // recalculates values based on user setting
{
  angleElevRad = angleElevDeg*((Math.PI)/180); //CONVERTS TO RADIANS
  trigAdj = rampLength*(Math.cos(angleElevRad)); //FINDS TRIANGLE Adjacent
  trigOpp = rampLength*(Math.sin(angleElevRad)); // triangle opposite
  adjProp = trigAdj/rampLength; // proportions
  oppProp = trigOpp/rampLength;
  fNormal = (mass*gravity)*(Math.cos(angleElevRad)); // Normal Force in Newtons
  fFriction = fNormal*coefFrict; // Force of Friction in Newtons
  fGravityX = (mass*gravity)*(Math.sin(angleElevRad)); // Gravity X before friction
  netGravityX = fGravityX-fFriction; // Net Force of Gravity X
    if (netGravityX < 0){  // if the friction force is greater than the gravity force, set the net force to zero because the object doesn't move. 
      netGravityX = 0;
    }
  acceleration = netGravityX/mass; // Acceleration of the object in m/s^2
return acceleration; // output the acceleration from the function
}
function accelDisp(){ // display acceleration value with 2 decimals
  dispAccel=parseFloat(acceleration.toFixed(2));
  document.getElementById("accelDisp").innerHTML = `a: ${dispAccel}m/s<sup>2</sup>`;
}
function fgxDisp(){ // display force of gravity in the X direction with 2 decimals
  dispFGX=parseFloat(fGravityX.toFixed(2));
  document.getElementById("fgxDisp").innerHTML = `Fgx: ${dispFGX}N`;
}
function fnDisp(){ // display normal force with 2 decimals (equivalent to FGY)
  dispFn=parseFloat(fNormal.toFixed(2));
  document.getElementById("fnDisp").innerHTML = `Fn: ${dispFn}N`;
}
function ffDisp(){ // display force of friction
  dispFf=parseFloat(fFriction.toFixed(2));
  document.getElementById("ffDisp").innerHTML = `Ff: ${dispFf}N`;
}
function netFDisp(){ // display net force on the object
  dispNetF=parseFloat(netGravityX.toFixed(2));
  document.getElementById("netFDisp").innerHTML = `ΣF: ${dispNetF}N`;
}

function integrate()  // Determine position of object based on acceleration through time. Performs psudo-double-integration. Acceleration is integrated to get velocity and then velocity is integrated to get position. 
{
  let deltaVelocity = incPlane()*0.1;
  velocity = velocity + deltaVelocity;
  let deltaPosition = velocity*0.1;
  position = position + deltaPosition;
  delta = position;
return(position); // position is outputted
}

accelDisp(); // Display functions are run here
fgxDisp();
fnDisp();
ffDisp();
netFDisp();

function drawObject(){  // Object is drawn on canvas
  var anim = requestAnimationFrame(drawObject); //Animation frame is requested to update drawing
var canvas = document.getElementById('canvas'); //Define canvas from html
if (canvas.getContext)
  {
    var context = canvas.getContext('2d'); // setting up 2D canvas
    context.clearRect(0, 0, 10000, 10000)  // clearing anything previously on the canvas. Important to avoid "streak" of object.

    let objBRX = (50+trigAdj); // Setting position of points of the object using proportion to create object angle. Constants are added to get coordinates (origin is top left)
    let objBRY = (650-trigOpp); // Bottom right Y
    let objBLX = objBRX-(50*(adjProp)); // Bottom Left X
    let objBLY = objBRY+(50*(oppProp)); // Bottom Left Y
    let objTLX = objBLX-(50*(oppProp)); // Top Left X
    let objTLY = objBLY-(50*(adjProp)); // Top Left Y
    let objTRX = objTLX+(50*(adjProp)); // Top Right X
    let objTRY = objTLY-(50*(oppProp)); // Top Right Y

    if (delta <= rampLength){ // If statement checks if object has reached the bottom, and if not moves it's position along.
    context.beginPath();
    context.moveTo((objBRX-(adjProp*(delta))),(objBRY+(oppProp*(delta)))); // Moves object based on delta (from integrate function position) multiplied by opp and adj proportions to create angled movement
    context.lineTo((objBLX-(adjProp*(delta))),(objBLY+(oppProp*(delta))));
    context.lineTo((objTLX-(adjProp*(delta))),(objTLY+(oppProp*(delta))));
    context.lineTo(objTRX-(adjProp*(delta)),objTRY+(oppProp*(delta)));    
    context.fill(); 
    context.fillStyle = "#00199C" // fill color for object
  } else { // if the object has reached the end, this runs:
    context.beginPath();
    context.moveTo((objBRX),(objBRY)); // sets object to the initial position
    context.lineTo((objBLX),(objBLY));
    context.lineTo((objTLX),(objTLY));
    context.lineTo((objTRX),(objTRY));    
    context.fill();
    delta = 0; // resets delta
    cancelAnimationFrame(anim); // stops animation frames from being rendered
    timerClr();  // runs the clear timer function that stops the intervals.
          }
    context.beginPath(); // Triangle is drawn on canvas
    context.moveTo(50,650);
    context.lineTo((50+trigAdj),650);
    context.lineTo((50+trigAdj),(650-trigOpp)); // Triangle side lengths are added to constants to get point coordinates. (origin top left)
    context.lineTo((50),(650));
    context.stroke();
    context.lineWidth = 2;
    context.strokeStyle = "#790000"; // setting stroke for triangle.
}};
drawObject(); // draw object is run so that triangle will appear on page load. 
