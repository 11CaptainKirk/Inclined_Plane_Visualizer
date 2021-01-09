import logo from './logo.svg';
import './App.css';
import { geometry, Surface, Path, Group } from '@progress/kendo-drawing';

let delta = 100;


    let mass = 3; // Mass in Kg
    let coefFrict = 0.53; // Coefficient of Friction
    let rampLength = 600; // Length of the ramp surface in m
    let angleElevDeg = 35; // Angle of Elevation in Degrees
    let initVelocity = 1; // Initial Velocity in m/s
    let gravity = 9.81; // Accel due to Gravity in m/s^2
    let angleElevRad = angleElevDeg*((Math.PI)/180); //CONVERTS TO RADIANS
    let trigAdj = rampLength*(Math.cos(angleElevRad)); //FINDS TRIANGLE Adjacent
    let trigOpp = rampLength*(Math.sin(angleElevRad));

    let adjProp = trigAdj/rampLength;
    let oppProp = trigOpp/rampLength;

 //   console.log(trigAdj, trigOpp, adjProp, oppProp);

    var velocity = initVelocity;
    var position = 0;

incPlane();

function incPlane()
{
let fNormal = (mass*gravity)*(Math.cos(angleElevRad)); // Normal Force in Newtons
let fFriction = fNormal*coefFrict; // Force of Friction in Newtons
let fGravityX = (mass*gravity)*(Math.sin(angleElevRad)); // Gravity X before friction
let netGravityX = fGravityX-fFriction; // Net Force of Gravity X
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
//console.log(velocity, position);
return(position);

}

setInterval(integrate, 100); // Time in milliseconds



function testing(){
//console.log(integrate());



function draw() 
{
  const path1 = new Path({
    stroke: {
        color: "#9999b6",
        width: 2
    }
});

   
    path1.beginPath();
    path1.moveTo(50,800);
    path1.lineTo((50+trigAdj),800);
    path1.lineTo((50+trigAdj),(800-trigOpp));
    path1.fill();
}};


if (delta <= rampLength){
function drawObject(){

    let objBRX = (50+trigAdj);
    let objBRY = (800-trigOpp);
    let objBLX = objBRX-(50*(adjProp));
    let objBLY = objBRY+(50*(oppProp));
    let objTLX = objBLX-(50*(oppProp));
    let objTLY = objBLY-(50*(adjProp));
    let objTRX = objTLX+(50*(adjProp));
    let objTRY = objTLY-(50*(oppProp));


    const path2 = new Path({
      stroke: {
          color: "#9999b6",
          width: 2
      }
  });

    path2.moveTo((objBRX-(adjProp*(delta))),(objBRY+(oppProp*(delta))));
    path2.lineTo((objBLX-(adjProp*(delta))),(objBLY+(oppProp*(delta))));
    path2.lineTo((objTLX-(adjProp*(delta))),(objTLY+(oppProp*(delta))));
    path2.lineTo(objTRX-(adjProp*(delta)),objTRY+(oppProp*(delta)));    
    path2.fill();
}} else {
    function drawObject(){
            
      const path3 = new Path({
        stroke: {
            color: "#9999b6",
            width: 2
        }
    });

            let objBRX = (50+trigAdj);
            let objBRY = (800-trigOpp);
            let objBLX = objBRX-(50*(adjProp));
            let objBLY = objBRY+(50*(oppProp));
            let objTLX = objBLX-(50*(oppProp));
            let objTLY = objBLY-(50*(adjProp));
            let objTRX = objTLX+(50*(adjProp));
            let objTRY = objTLY-(50*(oppProp));
        
            path3.moveTo((objBRX),(objBRY));
            path3.lineTo((objBLX),(objBLY));
            path3.lineTo((objTLX),(objTLY));
            path3.lineTo((objTRX),(objTRY));    
            path3.fill();
        };

};
setInterval(testing, 100);
//}
//}
//19.23 vertical
//46.15 horizontal


//0.3846
//0.92307

//0.3846
//0.92307


const group = new Group();
group.append(path1, path2, path3);

const element = this.surfaceElement.nativeElement;
this.surface = Surface.create(element);

surface.draw(group);



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body onload="testing();">
      <canvas id="canvas" width="1050" height="850"></canvas>
      </body>
    </div>
  );
}

export default App;
