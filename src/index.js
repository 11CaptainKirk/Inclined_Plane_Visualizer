var delta = 0;


let mass = 0.5; // Mass in Kg
let coefFrict = 0.015; // Coefficient of Friction
let rampLength = 600; // Length of the ramp surface in m
let angleElevDeg = 30; // Angle of Elevation in Degrees
let initVelocity = 0; // Initial Velocity in m/s
let gravity = 5.81;// Accel due to Gravity in m/s^2
console.log(gravity)
let deltaVelocity = 0;
let deltaPosition = 0;

const userInputs = (ev)=>{

  ev.preventDefault();

mass = document.getElementById("massInput").value || 3;
coefFrict = document.getElementById("coefFrictInput").value || 0.53;
rampLength = document.getElementById("rampLengthInput").value || 600;
angleElevDeg = document.getElementById("angleElevInput").value || 30;
initVelocity = document.getElementById("initVelocityInput").value || 0
gravity = document.getElementById("gravityInput").value || 9.81;

delta = 0;
position = 0;
velocity = 0;
deltaVelocity = 0;
deltaPosition = 0;


incPlane();

integrate();
drawObject()
}


document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById("btn").addEventListener('click', userInputs);
});



let angleElevRad = angleElevDeg*((Math.PI)/180); //CONVERTS TO RADIANS
let trigAdj = rampLength*(Math.cos(angleElevRad)); //FINDS TRIANGLE Adjacent
let trigOpp = rampLength*(Math.sin(angleElevRad));
console.log(angleElevDeg)
console.log(gravity)
let adjProp = trigAdj/rampLength;
let oppProp = trigOpp/rampLength;

 //   console.log(trigAdj, trigOpp, adjProp, oppProp);

    var velocity = initVelocity;
    var position = 0;














incPlane();

function incPlane()
{
  angleElevRad = angleElevDeg*((Math.PI)/180); //CONVERTS TO RADIANS
trigAdj = rampLength*(Math.cos(angleElevRad)); //FINDS TRIANGLE Adjacent
trigOpp = rampLength*(Math.sin(angleElevRad));
adjProp = trigAdj/rampLength;
oppProp = trigOpp/rampLength;

 //   console.log(trigAdj, trigOpp, adjProp, oppProp);

    var velocity = initVelocity;
    var position = 0;





let fNormal = (mass*gravity)*(Math.cos(angleElevRad)); // Normal Force in Newtons
let fFriction = fNormal*coefFrict; // Force of Friction in Newtons
let fGravityX = (mass*gravity)*(Math.sin(angleElevRad)); // Gravity X before friction
let netGravityX = fGravityX-fFriction; // Net Force of Gravity X
if (netGravityX < 0){
  netGravityX = 0;
}//console.log(angleElevRad);
let acceleration = netGravityX/mass; // Acceleration of the object in m/s^2
//console.log(fNormal, fFriction, netGravityX, acceleration)
return acceleration;

};

function integrate()
{

let deltaVelocity = incPlane()*0.1;
velocity = velocity + deltaVelocity;
let deltaPosition = velocity*0.1;
position = position + deltaPosition;

return(position);

}



//console.log(delta);

function drawObject(){
  var anim = requestAnimationFrame(drawObject);
    delta = integrate();
var canvas = document.getElementById('canvas');
if (canvas.getContext)
  {
    var context = canvas.getContext('2d');
    

    context.clearRect(0, 0, 10000, 10000)

    let objBRX = (50+trigAdj);
    let objBRY = (650-trigOpp);
    let objBLX = objBRX-(50*(adjProp));
    let objBLY = objBRY+(50*(oppProp));
    let objTLX = objBLX-(50*(oppProp));
    let objTLY = objBLY-(50*(adjProp));
    let objTRX = objTLX+(50*(adjProp));
    let objTRY = objTLY-(50*(oppProp));


    if (delta <= rampLength){
    context.beginPath();
    context.moveTo((objBRX-(adjProp*(delta))),(objBRY+(oppProp*(delta))));
    context.lineTo((objBLX-(adjProp*(delta))),(objBLY+(oppProp*(delta))));
    context.lineTo((objTLX-(adjProp*(delta))),(objTLY+(oppProp*(delta))));
    context.lineTo(objTRX-(adjProp*(delta)),objTRY+(oppProp*(delta)));    
    context.fill(); 
    context.fillStyle = "#00199C"
  } else {

    context.beginPath();
    context.moveTo((objBRX),(objBRY));
    context.lineTo((objBLX),(objBLY));
    context.lineTo((objTLX),(objTLY));
    context.lineTo((objTRX),(objTRY));    
    context.fill();
    delta = 0;
    cancelAnimationFrame(anim);
          }
      

/// down is trig, up is box

    context.beginPath();
    context.moveTo(50,650);
    context.lineTo((50+trigAdj),650);
    context.lineTo((50+trigAdj),(650-trigOpp));
    context.lineTo((50),(650));
    context.stroke();
    context.lineWidth = 2;
    context.strokeStyle = "#790000";


}};

drawObject();

//window.requestAnimationFrame(drawObject);
//}
//}
//19.23 vertical
//46.15 horizontal


//0.3846
//0.92307

//0.3846
//0.92307