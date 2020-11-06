let densitySlider
let smoothnessSlider
let iterationsSlider
let mandlebrotSet
let density = 5
let smoothness = 20
let iterations = 256

let buton1X = 1030
let buton1Y = 250
let buton2X = 1020
let buton2Y = 360
let buton3X = 1020
let buton3Y = 420
let buton4X = 1020
let buton4Y = 620
let butonSize = 30

let xmin = -2
let size = 4
let color = 1
let ymin = -2
let smoothnessStep = 0

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

let s = "For optimal zoom, bring details to 5 and smoothness to 7.\n\nFor esthetic zoom, bring details to 10 and smoothness around 20."

function setup()
{
	createCanvas(1600,1000);
	background(0);
	noStroke();
	fill(255);
	rect(1000,0,300,1000);
	fill(220);
	rect(1300,0,300,1000);
	densitySlider = createSlider(1,10,5,1);
	smoothnessSlider = createSlider(7,100,7,1);
	iterationsSlider = createSlider(256,3000,256,1);
	densitySlider.position(1025,80);
	smoothnessSlider.position(1025,160);
	iterationsSlider.position(1025,940);
	mandlebrotSet = new MandlebrotSet();
	mandlebrotSet.start(iterations);
	alex();


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

function alex() {
	r=random(50)
	g=random(50)
	b=random(50)
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
		text("Go to cool place",1060,631,190,50);
		text("Unzoom on click",1100,431,190,50);
		text(s,1010,700,280,400);
		smoothness = smoothnessSlider.value();
		density = densitySlider.value();
		iterations = iterationsSlider.value();
		fill(0,140,140)
		rect(buton1X,buton1Y,butonSize,butonSize);
		fill(234,14,140)
		rect(buton4X,buton4Y,butonSize,butonSize);
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
		mandlebrotSet.calculate(xmin,ymin,size,11-density,smoothness,smoothnessStep,iterations);
		smoothnessStep++;
		if(zooming)
		{
			noStroke()
			fill(0,0,255,70)
			rect(zoomX+400*(smoothnessStep-1)/smoothness,zoomY,400/smoothness,400)
		}
		else
		{
			noStroke()
			fill(0,0,255,70)
			rect(1350+200*(smoothnessStep-1)/smoothness,50,200/smoothness,100)
		}
		
		if(smoothnessStep==smoothness)
		{
			smoothnessStep=0;
			mandlebrotSet.calculated=true;
			mandlebrotSet.map(xmin,ymin,size);
			if(density<10)
			{
				background(0);
			}
			noStroke();
			fill(255);
			rect(1000,0,300,1000);
			zooming=false
		}
	}
	else
	{
		strokeWeight((11-density)/2)
		for(let i=0+((int)(mandlebrotSet.length*(smoothnessStep)/smoothness));i<((int)(mandlebrotSet.length*(smoothnessStep+1)/smoothness));i++)
		{
			if(mandlebrotSet.colorSet[i]==0)
			{
				stroke(0);
			}
			else
			{
				stroke((mandlebrotSet.colorSet[i]*2)%256,(mandlebrotSet.colorSet[i]*5)%256,(mandlebrotSet.colorSet[i]*7)%256);
				//stroke((mandlebrotSet.colorSet[i]/(36-zoomsLeft))%256,(mandlebrotSet.colorSet[i]/(36-zoomsLeft))%256,(mandlebrotSet.colorSet[i])/(36-zoomsLeft)%256);
				//stroke((mandlebrotSet.colorSet[i]*a)%256,(mandlebrotSet.colorSet[i]*b)%256,(mandlebrotSet.colorSet[i]*c)%256);
				/*if((mandlebrotSet.colorSet[i])%30>15)
				{
					stroke(0,0,50);
				}
				else
				{
					stroke(255);
				}*/
				//stroke((mandlebrotSet.colorSet[i]*color)%256,(mandlebrotSet.colorSet[i]*color)%256,(mandlebrotSet.colorSet[i]*color)%256);
			}

			point(mandlebrotSet.Xset[i],mandlebrotSet.Yset[i]);
		}
		smoothnessStep++;
		if(smoothnessStep==smoothness)
		{
			smoothnessStep=0;
			mandlebrotSet.finished=true;
			if(zoomStep<zoomNumbers)
			{
				zoom(zoomPoints[zoomStep].x,zoomPoints[zoomStep].y);
				zoomStep++;
			}
			else if(zoomStep<zoomNumbers+1)
			{	
				densitySlider.value(10)
				density=10
				iterationsSlider.value(256)
				iterations=256
				smoothnessSlider.value(25)
				smoothness=25
				calculating=true;
				noStroke();
				fill(255);
				rect(1000,0,300,1000);
				fill(220);
				rect(1300,0,300,1000);
				mandlebrotSet = new MandlebrotSet();
				mandlebrotSet.start(iterations);
				zoomStep++;
			}
			else if(zoomStep<zoomNumbers+2)
			{	
				densitySlider.value(10)
				density=10
				iterationsSlider.value(256)
				iterations=264
				smoothnessSlider.value(25)
				smoothness=25
				calculating=true;
				noStroke();
				fill(255);
				rect(1000,0,300,1000);
				fill(220);
				rect(1300,0,300,1000);
				mandlebrotSet = new MandlebrotSet();
				mandlebrotSet.start(iterations);
				zoomStep++;
			}
			else if(zoomStep<zoomNumbers+4)
			{	
				densitySlider.value(10)
				density=10
				iterationsSlider.value(256)
				iterations=280
				smoothnessSlider.value(25)
				smoothness=25
				calculating=true;
				noStroke();
				fill(255);
				rect(1000,0,300,1000);
				fill(220);
				rect(1300,0,300,1000);
				mandlebrotSet = new MandlebrotSet();
				mandlebrotSet.start(iterations);
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
			densitySlider.value(5)
			iterationsSlider.value(256)
			smoothnessSlider.value(7)
			zoomStep=1
			zoom(zoomPoints[0].x,zoomPoints[0].y)
		}

		if((mouseX >=  0 ) && (mouseX <= 1000 ) && (mouseY >= 0 ) && (mouseY <= 1000 ))
        {
			if((zoomOnClick)&&(zoomsLeft>0))
			{
				print(mouseX,mouseY)
				alex();
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
	alex();
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