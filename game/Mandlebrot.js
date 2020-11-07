let densitySlider
let smoothnessSlider
let iterationsSlider
let mandlebrotSet
let density = 5
let smoothness = 20
let iterations = 256

let rSlider,gSlider,bSlider,aSlider

let currentR = 0
let currentG = 0
let currentB = 0
let currentA = 0

let currentCoolPlace

let buton1X = 1030
let buton1Y = 250
let buton2X = 1020
let buton2Y = 360
let buton3X = 1020
let buton3Y = 420
let buton4X = 1020
let buton4Y = 620
let buton5X = 1020
let buton5Y = 655
let butonSize = 30

let xmin = -2
let size = 4
let color = 1
let ymin = -2
let smoothnessStep = 0

let calculstep = 0

let zoomX = -500
let zoomY = -500

let zoomOnClick = false
let unzoomOnClick = false
let drawn = true

let zooming = false
let zoomsLeft = 35

let calculating = false

let mode = 0

let zoomPoints = []
let zoomStep = 120
let zoomNumbers = 15

/*

modes:

0 = colors
1 = black and white
2 = only black or white
3 = 

*/

let coolPlaces = []

let coolColors = []

class CoolPlace
{
	constructor(_x,_y,_size,_mode,_i)
	{
		this.x=_x
		this.y=_y
		this.size=_size
		this.mode=_mode
		this.i=_i
	}
}

class CoolColor
{
	constructor(_r,_g,_b,_a)
	{
		this.r=_r
		this.g=_g
		this.b=_b
		this.a=_a
	}
}

let s = "For optimal zoom, bring details to 5 and smoothness to 7.\n\nFor esthetic zoom, bring details to 10 and smoothness around iterations value."

function setup()
{
	currentCoolPlace=0
	coolPlaces.push(new CoolPlace(-0.16124085247999992,-1.03744370688,0.0010485760000000005,0,568))
	coolPlaces.push(new CoolPlace(0.25781618881168233,-0.0011205330639871653,1.844674407370958e-12,9,1111))
	coolPlaces.push(new CoolPlace(0.36638068346016883,-0.5915573428030522,4.398046511104005e-8,2,830))
	coolPlaces.push(new CoolPlace(-1.0052738945797062,-0.3146896947686257,6.871947673600008e-7,1,700))
	coolPlaces.push(new CoolPlace(0.13505284580277893,-0.6717781913979461,7.036874417766409e-9,4,1667))
	coolPlaces.push(new CoolPlace(-1.7481097420799998,-0.012578979839999994,0.0010485760000000005,5,500))
	coolPlaces.push(new CoolPlace(0.26239566355040456,-0.0022263611703680773,4.398046511104005e-8,6,700))
	coolPlaces.push(new CoolPlace(0.3523967733124301,-0.5823114083676978,0.000004294967296000004,7,450))
	coolPlaces.push(new CoolPlace(-1.404231402206542,-0.0032717542931279524,0.006553600000000019,8,500))
	coolColors.push(new CoolColor(4,4,4.4,255))
	coolColors.push(new CoolColor(4,3.4,6.4,200))
	coolColors.push(new CoolColor(8,1.4,1.6,255)) //for the demo zoom
	coolColors.push(new CoolColor(6,1.2,1,255))
	coolColors.push(new CoolColor(1.1,1,1,210))
	coolColors.push(new CoolColor(10,9.5,9.1,255))
	coolColors.push(new CoolColor(7.9,9.3,5.6,183))
	coolColors.push(new CoolColor(3,9.5,8.5,150))
	coolColors.push(new CoolColor(10,10,10,255))
	coolColors.push(new CoolColor(9,3.4,1,220))
	createCanvas(1600,1000);
	background(0);
	noStroke();
	fill(255);
	rect(1000,0,300,1000);
	fill(220);
	rect(1300,0,300,1000);
	densitySlider = createSlider(1,10,5,1);
	smoothnessSlider = createSlider(7,3000,7,1);
	iterationsSlider = createSlider(256,3000,256,1);
	densitySlider.position(1025,80);
	smoothnessSlider.position(1025,160);
	iterationsSlider.position(1025,940);
	mandlebrotSet = new MandlebrotSet();
	mandlebrotSet.start(iterations);

	currentR = 12
	currentG = 2.4
	currentB = 2
	currentA = 220

	
	rSlider = createSlider(0,10,3,0.1);
	gSlider = createSlider(0,10,0.6,0.1);
	bSlider = createSlider(0,10,5.7,0.1);
	aSlider = createSlider(1,255,255,1);

	rSlider.position(1325,380)
	gSlider.position(1325,480)
	bSlider.position(1325,580)
	aSlider.position(1325,680)

	zoomPoints.push(new Point(496,332));
	zoomPoints.push(new Point(525,491));
	zoomPoints.push(new Point(678,559));
	zoomPoints.push(new Point(533,503));
	zoomPoints.push(new Point(397,262));
	zoomPoints.push(new Point(493,529));
	zoomPoints.push(new Point(516,503));
	zoomPoints.push(new Point(377,402));
	zoomPoints.push(new Point(503,475));
	zoomPoints.push(new Point(536,433));
	zoomPoints.push(new Point(532,520));
	zoomPoints.push(new Point(512,491));
	zoomPoints.push(new Point(514,517));
	zoomPoints.push(new Point(493,505));
	zoomPoints.push(new Point(646,470));
}

function draw()
{
	if(calculating)
	{
		if(zooming)
		{
			stroke(0,0,255)
			strokeWeight(2)
			textSize(36)
			fill(0,0,255)
			text("calculating",zoomX+25,zoomY+45)
			textSize(12)
			strokeWeight(5)
			noFill()
			rect(zoomX,zoomY,400,400)
		}
		else
		{
			stroke(255,140,0)
			strokeWeight(2)
			textSize(36)
			fill(255,140,0)
			text("calculating",1365,95)
			textSize(12)
			strokeWeight(5)
			noFill()
			rect(1350,50,200,100)
		}
		
		calculating=false;
	}
	else if(mandlebrotSet.finished)
	{
		noStroke();
		fill(255);
		rect(1000,0,300,1000);
		fill(220);
		rect(1300,0,300,1000);
		fill(0);
		strokeWeight(255);
		text("                Details : " + densitySlider.value() + "\n      (more details = slower)",1010,50);
		text("            Smoothness : " + smoothnessSlider.value() + "\n(smoother processing = slower)",1010,130);
		text("            Iterations : " + iterationsSlider.value() + "\n(more iterations = more precise but slower)",1010,910);
		text("You can't zoom infinitely, due to computer limitations.\nZooms left: " + zoomsLeft,1010,550);
		text("Generate",1070,271);
		text("Zoom on click",1100,371,190,50);
		text("Generate cool place",1060,631,190,50);
		text("Demo: zooming to a cool place",1060,666,190,50);
		text("Unzoom on click",1100,431,190,50);
		text(s,1010,750,280,400);
		smoothness = smoothnessSlider.value();
		density = densitySlider.value();
		iterations = iterationsSlider.value();
		currentR = rSlider.value();
		currentG = gSlider.value();
		currentB = bSlider.value();
		currentA = aSlider.value();
		
		text("                Red : " + rSlider.value(),1310,350);
		text("                Green : " + gSlider.value(),1310,450);
		text("               Blue : " + bSlider.value(),1310,550);
		text("            Color Amplitude : " + aSlider.value(),1310,650);

		fill(0,140,140)
		rect(buton1X,buton1Y,butonSize,butonSize);
		fill(234,14,140)
		rect(buton4X,buton4Y,butonSize,butonSize);
		fill(130,254,140)
		rect(buton5X,buton5Y,butonSize,butonSize);
		if(zoomOnClick)
		{
			fill(0,255,0)
			text("ON",1040,410);
		}
		else
		{
			fill(255,0,0)
			text("OFF",1040,410);
		}
		rect(buton2X,buton2Y,butonSize,butonSize);
		if(unzoomOnClick)
		{
			fill(0,255,0)
			text("ON",1040,470);
		}
		else
		{
			fill(255,0,0)
			text("OFF",1040,470);
		}
		rect(buton3X,buton3Y,butonSize,butonSize);
	}
	else if(!mandlebrotSet.calculated)
	{
		mandlebrotSet.calculate(xmin,ymin,size,11-density,20,calculstep,iterations);
		calculstep++;
		if(zooming)
		{
			noStroke()
			fill(0,0,255,70)
			rect(zoomX+400*(calculstep-1)/20,zoomY,20,400)
		}
		else
		{
			noStroke()
			fill(0,0,255,70)
			rect(1350+200*(calculstep-1)/20,50,10,100)
		}
		
		if(calculstep==20)
		{
			calculstep=0;
			//mandlebrotSet.check();
			mandlebrotSet.calculated=true;
			mandlebrotSet.map(xmin,ymin,size);
			background(0);
			noStroke();
			fill(255);
			rect(1000,0,300,1000);
			zooming=false
		}
	}
	else
	{
		strokeWeight((11-density)/2)

		for(let i=0+((int)(iterations*(smoothnessStep)/smoothness));(i<((int)(iterations*(smoothnessStep+1)/smoothness)));i++)
		{
			//stroke((i*2)%256,(i*3)%256,(i*5)%256)
			stroke((currentA/2)*cos(3.14*i*currentR/currentA)+127.5,(currentA/2)*cos(3.14*i*currentG/currentA)+127.5,(currentA/2)*cos(3.14*i*currentB/currentA)+127.5)
			
			for(let j=0;j<mandlebrotSet.lengthh[i];j++)
			{
				point(mandlebrotSet.set[i][j].x,mandlebrotSet.set[i][j].y)
			}
		}
		smoothnessStep++;
		if(smoothnessStep==smoothness)
		{
			smoothnessStep=0;
			mandlebrotSet.finished=true;
			if(zoomStep<zoomNumbers-1)
			{
				zoom(zoomPoints[zoomStep].x,zoomPoints[zoomStep].y);
				zoomStep++;
			}
			else if(zoomStep<zoomNumbers)
			{
				densitySlider.value(10)
				density=10
				iterationsSlider.value(600)
				iterations=600
				smoothnessSlider.value(600)
				smoothness=600
				zoom(zoomPoints[zoomStep].x,zoomPoints[zoomStep].y);
				zoomStep++;
			}
		}
	}
}

function mousePressed()
{
    if(mandlebrotSet.finished)
    {
        if((mouseX >=  buton1X ) && (mouseX <= buton1X + butonSize ) && (mouseY >= buton1Y ) && (mouseY <= buton1Y + butonSize ))
        {
			calculating=true;
			noStroke();
			fill(255);
			rect(1000,0,300,1000);
			fill(220);
			rect(1300,0,300,1000);
			mandlebrotSet = new MandlebrotSet();
            mandlebrotSet.start(iterations);
		}

        if((mouseX >=  buton2X ) && (mouseX <= buton2X + butonSize ) && (mouseY >= buton2Y ) && (mouseY <= buton2Y + butonSize ))
        {
			if(!zoomOnClick)
			{
				zoomOnClick=true

				buton2X = buton2X + 40

				if(unzoomOnClick)
				{
					unzoomOnClick = false
					buton3X = buton3X - 40
				}
			}
			else
			{
				zoomOnClick = false
				buton2X = buton2X - 40
			}
		}

        if((mouseX >=  buton3X ) && (mouseX <= buton3X + butonSize ) && (mouseY >= buton3Y ) && (mouseY <= buton3Y + butonSize ))
        {
			if(!unzoomOnClick)
			{
				unzoomOnClick = true

				buton3X = buton3X + 40

				if(zoomOnClick)
				{
					zoomOnClick = false
					buton2X = buton2X - 40
				}
			}
			else
			{
				unzoomOnClick = false
				buton3X = buton3X - 40
			}
		}

		if((mouseX >=  buton4X ) && (mouseX <= buton4X + butonSize ) && (mouseY >= buton4Y ) && (mouseY <= buton4Y + butonSize ))
        {
			let p=currentCoolPlace

			currentCoolPlace++
			if(currentCoolPlace==9){currentCoolPlace=0}

			xmin=coolPlaces[p].x
			ymin=coolPlaces[p].y
			size=coolPlaces[p].size

			currentR = coolColors[coolPlaces[p].mode].r;
			currentG = coolColors[coolPlaces[p].mode].g;
			currentB = coolColors[coolPlaces[p].mode].b;
			currentA = coolColors[coolPlaces[p].mode].a;

			rSlider.value(currentR)
			gSlider.value(currentG)
			bSlider.value(currentB)
			aSlider.value(currentA)

			densitySlider.value(10)
			density=10
			iterationsSlider.value(coolPlaces[p].i)
			iterations=coolPlaces[p].i
			smoothnessSlider.value(coolPlaces[p].i)
			smoothness=coolPlaces[p].i
			calculating=true;
			noStroke();
			fill(255);
			rect(1000,0,300,1000);
			fill(220);
			rect(1300,0,300,1000);
			mandlebrotSet = new MandlebrotSet();
			mandlebrotSet.start(iterations);
		}

		if((mouseX >=  buton5X ) && (mouseX <= buton5X + butonSize ) && (mouseY >= buton5Y ) && (mouseY <= buton5Y + butonSize ))
        {
			xmin=-2
			ymin=-2
			size=4
			calculating=true;
			noStroke();
			fill(255);
			rect(1000,0,300,1000);
			fill(220);
			rect(1300,0,300,1000);
			mandlebrotSet = new MandlebrotSet();
			mandlebrotSet.start(iterations);
			
			densitySlider.value(5)
			density=5
			iterationsSlider.value(256)
			iterations=256
			smoothnessSlider.value(7)
			smoothness=7
			currentR = coolColors[2].r;
			currentG = coolColors[2].g;
			currentB = coolColors[2].b;
			currentA = coolColors[2].a;

			rSlider.value(currentR)
			gSlider.value(currentG)
			bSlider.value(currentB)
			aSlider.value(currentA)
			zoomStep=0
		}


		if((mouseX >=  0 ) && (mouseX <= 1000 ) && (mouseY >= 0 ) && (mouseY <= 1000 ))
        {
			if((zoomOnClick)&&(zoomsLeft>0))
			{
				//print(mouseX,mouseY)
				calculating=true;
				zoomX=mouseX-200;
				zoomY=mouseY-200;

				let newSize = size * 0.4;

				color = color * 0.9


				let newXmin = map(mouseX-200,0,1000,xmin,xmin+size);
				let newYmin = map(mouseY-200,0,1000,ymin,ymin+size);

				zooming=true

				size=newSize;
				xmin=newXmin;
				ymin=newYmin;

				noStroke();
				fill(255);
				rect(1000,0,300,1000);
				fill(220);
				rect(1300,0,300,1000);
				mandlebrotSet = new MandlebrotSet();
				mandlebrotSet.start(iterations)
				zoomsLeft--;
			}
			else if((unzoomOnClick)&&(size<4))
			{
				calculating=true;
				zoomsLeft++;
				let newSize = size * 2.5;
				let newXmin = map(mouseX-1250,0,1000,xmin,xmin+size);
				let newYmin = map(mouseY-1250,0,1000,ymin,ymin+size);

				size=newSize;
				xmin=newXmin;
				ymin=newYmin;

				noStroke();
				fill(255);
				rect(1000,0,300,1000);
				mandlebrotSet = new MandlebrotSet();
				mandlebrotSet.start(iterations)
			}
			
		}
	}
}

function keyPressed()
{
	if(key == 'q')
	{
		noLoop()
	}
	if(key == 's')
	{
		loop()
	}
}

function zoom(xZoom,yZoom)
{
	calculating=true;
	zoomX=xZoom-200;
	zoomY=yZoom-200;

	let newSize = size * 0.4;

	color = color * 0.9


	let newXmin = map(xZoom-200,0,1000,xmin,xmin+size);
	let newYmin = map(yZoom-200,0,1000,ymin,ymin+size);

	zooming=true

	size=newSize;
	xmin=newXmin;
	ymin=newYmin;

	noStroke();
	fill(255);
	rect(1000,0,300,1000);
	fill(220);
	rect(1300,0,300,1000);
	mandlebrotSet = new MandlebrotSet();
	mandlebrotSet.start(iterations)
	zoomsLeft--;
}