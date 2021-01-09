




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


const group = new Group();
group.append(path2);

const element = this.surfaceElement.nativeElement;
this.surface = Surface.create(element);

surface.draw(group);
