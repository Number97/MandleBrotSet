p5.disableFriendlyErrors=true






let densitySlider
let smoothnessSlider
let iterationsSlider
let mandlebrotSet
let density = 5
let smoothness = 20
let iterations = 256

let rSlider,gSlider,bSlider,aSlider
let rangeSlider

let currentR = 0
let currentG = 0
let currentB = 0
let currentA = 0

////////buttons
let generateButton
let demoButton
let moreButtonsButton
let regenerateButton
let zoomOnClickButton
let unzoomOnClickButton
let adjustForZooming
let adjustForBeauty
let seeColorsButton
let recolor
let randomColors
let help
let resetButton
let changeMaxIterations
let infoButton
////////

let info=false

////max iterations input
let maxIInput

let pMax

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
let adaptiveStep = 0

let adaptiveSmoothness = 0

let calculstep = 0

let printStep = 0
let printing = false

let zoomX = -500
let zoomY = -500

let zoomOnClick = false
let unzoomOnClick = false
let adjustedForZooming = false
let adjustedForBeauty = false
let drawn = true

let zooming = false
let zoomsLeft = 35

let calculating = false

let zoomPoints = []
let zoomStep = 120
let zoomNumbers = 33

let regenerating = false

//////////slectors
let mode
let loadingScreen
let currentCoolPlace
let colorPreset
//////////

let seeColors = false

let buttonsLevel = 0

let coolPlaces = []

let coolColors = []

let totalSizeSlider

class CoolPlace
{
	constructor(_x,_y,_size,_mode,_color,_i,_zooms,_calculIterations)
	{
		this.x=_x
		this.y=_y
		this.size=_size
		this.mode=_mode
		this.i=_i
		this.color=_color
		this.zooms=_zooms
		this.calculIterations=_calculIterations
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
	resetButton = createButton('Reset')
	resetButton.position(-1250,430)
	resetButton.size(100,50)
	resetButton.mousePressed(resetButtonPressed)
	resetButton.style('background-color','purple')
	//pixelDensity(1)

	infoButton = createButton("Toggle info")
	infoButton.position(20,1025)
	infoButton.size(200,50)
	infoButton.mousePressed(toggleInfo)

	totalSizeSlider = createSlider(0.1,1,1,0.1)
	totalSizeSlider.position(-1050,450)

	coolPlaces.push(new CoolPlace(-0.16124085247999992,-1.03744370688,0.0010485760000000005,1,0,568,26,514))
	coolPlaces.push(new CoolPlace(0.25781618881168233,-0.0011205330639871653,1.844674407370958e-12,2,9,1111,4,411))
	coolPlaces.push(new CoolPlace(0.36638068346016883,-0.5915573428030522,4.398046511104005e-8,1,2,830,15,701))
	coolPlaces.push(new CoolPlace(0.35068558767982577,-0.5821468557108024,4.5035996273705024e-10,1,11,1140,10,585))
	coolPlaces.push(new CoolPlace(0.13505284580277893,-0.6717781913979461,7.036874417766409e-9,1,4,1667,13,1067))

	coolPlaces.push(new CoolPlace(-1.7481097420799998,-0.012578979839999994,0.0010485760000000005,1,5,500,26,486))
	coolPlaces.push(new CoolPlace(0.3583576364837247,-0.6463177872150849,7.036874417766409e-9,1,12,5300,13,735))
	coolPlaces.push(new CoolPlace(0.26239566355040456,-0.0022263611703680773,4.398046511104005e-8,1,6,700,15,477))
	coolPlaces.push(new CoolPlace(0.3523967733124301,-0.5823114083676978,0.000004294967296000004,1,7,450,20,284))
	coolPlaces.push(new CoolPlace(0.257816188813093,-0.0011205330637472839,1.1805916207174135e-13,1,9,1111,1,324))

	coolPlaces.push(new CoolPlace(-1.404231402206542,-0.0032717542931279524,0.006553600000000019,1,8,500,28,470))
	coolPlaces.push(new CoolPlace(0.35068557912678644,-0.5821468638569697,1.759218604441602e-8,1,10,1000,14,620))
	coolPlaces.push(new CoolPlace(-1.0052738945797062,-0.3146896947686257,6.871947673600008e-7,1,1,700,18,522))
	coolPlaces.push(new CoolPlace(-1.748591645137059,-0.012632690674303488,1.0995116277760012e-7,1,11,1224,16,1000))
	coolPlaces.push(new CoolPlace(-1.7498021827265853,5.4909098323827284e-8,7.378697629483833e-13,1,5,2284,3,724))


	coolColors.push(new CoolColor(4,4,4.4,255))
	coolColors.push(new CoolColor(4,3.4,6.4,200))
	coolColors.push(new CoolColor(8,1.4,1.6,255)) //for the demo zoom
	coolColors.push(new CoolColor(6,1.2,1,255))
	coolColors.push(new CoolColor(1.1,1,1,210))

	coolColors.push(new CoolColor(10,9.5,9.1,255))
	coolColors.push(new CoolColor(7.9,9.3,5.6,183))
	coolColors.push(new CoolColor(3,9.5,8.5,150))
	coolColors.push(new CoolColor(10,10,10,255))
	coolColors.push(new CoolColor(9.1,9,10,220))

	coolColors.push(new CoolColor(4.15,4,4.57,220))
	coolColors.push(new CoolColor(3.69,3.8,0.12,220))
	coolColors.push(new CoolColor(2.42,5.97,4,255))


	/*
	//print(xmin + "," + ymin + "," + size + "," + mode + ",," + iterations + "," + zoomsLeft)
	*/

	createCanvas(1600,1300);
	background(0);
	stroke(150,0,255);
	strokeWeight(4);
	noFill()
	rect(500-1000*totalSizeSlider.value()/2,500-1000*totalSizeSlider.value()/2,1000*totalSizeSlider.value(),1000*totalSizeSlider.value())


	noStroke();
	fill(255);
	rect(1000,0,600,1000);
	
	mode=createSelect()
	
	mode.position(-1050,400)
	mode.option(1)
	mode.option(2)
	mode.option(3)
	mode.option(4)
	mode.option(5)
	mode.selected(1)
	
	loadingScreen=createSelect()
	
	loadingScreen.position(-1050,400)
	loadingScreen.option('Adaptive')
	loadingScreen.option('Color progressive')
	loadingScreen.option('Pixel progressive')
	loadingScreen.selected('Adaptive')

	colorPreset=createSelect()
	colorPreset.option(1)
	colorPreset.option(2)
	colorPreset.option(3)
	colorPreset.option(4)
	colorPreset.option(5)
	colorPreset.option(6)
	colorPreset.option(7)
	colorPreset.option(8)
	colorPreset.option(9)
	colorPreset.option(10)
	colorPreset.option(11)
	colorPreset.option(12)
	colorPreset.option(13)
	colorPreset.option(14)
	colorPreset.selected(14)
	colorPreset.changed(colorPresetChanged)
	colorPreset.position(-333,-234)

	densitySlider = createSlider(1,10,5,1);
	smoothnessSlider = createSlider(7,3000,7,1);
	iterationsSlider = createSlider(256,7000,500,1);
	densitySlider.position(-500,180);
	smoothnessSlider.position(-500,260);
	iterationsSlider.position(-500,940);
	
	rSlider = createSlider(0,10,3,0.01);
	gSlider = createSlider(0,10,0.6,0.01);
	bSlider = createSlider(0,10,5.7,0.01);
	aSlider = createSlider(1,255,255,1);

	rangeSlider = createSlider(125,2000,125,5);
	rangeSlider.size(500)
	rangeSlider.position(-600)

	currentCoolPlace=createSelect()
	
	currentCoolPlace.position(1210,10)
	currentCoolPlace.size(40,40)
	currentCoolPlace.option(1)
	currentCoolPlace.option(2)
	currentCoolPlace.option(3)
	currentCoolPlace.option(4)
	currentCoolPlace.option(5)
	currentCoolPlace.option(6)
	currentCoolPlace.option(7)
	currentCoolPlace.option(8)
	currentCoolPlace.option(9)
	currentCoolPlace.option(10)
	currentCoolPlace.option(11)
	currentCoolPlace.option(12)
	currentCoolPlace.option(13)
	currentCoolPlace.option(14)
	currentCoolPlace.option(15)
	currentCoolPlace.selected(1)

	mandlebrotSet = new MandlebrotSet(mode.selected(),1);
	mandlebrotSet.start(iterations);

	currentR = 3
	currentG = 0.6
	currentB = 5.7
	currentA = 220
	coolColors.push(new CoolColor(currentR,currentG,currentB,currentA))

	rSlider.position(-1325,780)
	gSlider.position(-1325,480)
	bSlider.position(-1325,580)
	aSlider.position(-1325,680)

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
	
	zoomPoints.push(new Point(670,296));
	zoomPoints.push(new Point(756,323));
	zoomPoints.push(new Point(554,500));
	zoomPoints.push(new Point(508,503));
	zoomPoints.push(new Point(503,478));
	zoomPoints.push(new Point(524,534));
	zoomPoints.push(new Point(529,503));
	zoomPoints.push(new Point(525,444));
	zoomPoints.push(new Point(547,451));
	zoomPoints.push(new Point(305,502));
	zoomPoints.push(new Point(496,521));
	zoomPoints.push(new Point(410,457));
	zoomPoints.push(new Point(506,489));
	zoomPoints.push(new Point(659,48));
	zoomPoints.push(new Point(497,494));
	zoomPoints.push(new Point(507,501));
	zoomPoints.push(new Point(500,500));
	zoomPoints.push(new Point(500,500));

	generateButton = createButton('Generate cool place number:')
	generateButton.position(1010,10)
	generateButton.size(200,40)
	generateButton.mousePressed(generateCoolPlace)

	generateButton = createButton('Demo: zooming to a cool place')
	generateButton.position(1010,60)
	generateButton.size(240,40)
	generateButton.mousePressed(zoomToCoolPlace)

	moreButtonsButton = createButton('More options')
	moreButtonsButton.position(1010,110)
	moreButtonsButton.size(100,50)
	moreButtonsButton.mousePressed(moreOptions)
	moreButtonsButton.style('background-color','lightblue')
}

function draw()
{
	if(calculating)
	{
		if(zooming)
		{
			stroke(0,0,255)
			strokeWeight(2)
			textSize(36*totalSizeSlider.value())
			fill(0,0,255)
			text("calculating",zoomX+25*totalSizeSlider.value(),zoomY+45*totalSizeSlider.value())
			textSize(12)
			strokeWeight(5)
			noFill()
			rect(zoomX,zoomY,400*totalSizeSlider.value(),400*totalSizeSlider.value())
		}
		else
		{
			stroke(255,140,0)
			strokeWeight(2)
			textSize(36)
			fill(255,140,0)
			text("calculating",1325,75)
			textSize(12)
			strokeWeight(5)
			noFill()
			rect(1310,30,200,100)
		}
		
		calculating=false;
	}
	else if(printing)
	{
		stroke(0,140,255)
		strokeWeight(2)
		textSize(36)
		fill(0,140,255)
		text("Printing",1325,75)
		textSize(12)
		strokeWeight(5)
		noFill()
		rect(1310,30,200,100)
		
		printing=false;
	}
	else if(mandlebrotSet.finished)
	{
		if(mode.selected()==5)
		{
			loadingScreen.attribute('disabled',true)
		}
		else
		{
			loadingScreen.removeAttribute('disabled')
		}
		////////////////////////////////////

		noStroke();
		fill(0)
		rect(0,1000,1600,300)
		fill(255);
		rect(1000,0,600,1000);
		
		if(info)
		{
			fill(255,200,200)
			text('"Generate cool place number" loads a specific scene. Select the one you want to generate,then press the button.\n\nPress "Demo: zooming to a cool place" to preview a zooming demo.\n\nPress "More options" to activate more settings. There are 3 levels of settings',25,1100,200,500)
			fill(200,255,200)
			text('Press on "Zoom on click" or "Unzoom on click" to toggle between modes.\n\nZooming is finite, but different depending on your computer. So the numbers of zooms left might not be exact.\n\nGenerating modes:\n1: Normal\n2: Interesting bugged type\n3: Mandlebrot with z^3\n4: Mandlebrot with z^4\n5: Instant (also brings instant printing)\n\nPress "Regenerate to regenerate the same scene with the new settings.',250,1025,205,500)
			fill(200,200,255)
			text('Printing styles define the way the scene is printed.\n\nChange the details to change the quality of the result, and the smoothness to increase or adjust the smoothness or processing/printing the scene. Increasing either option increase the time it takes to generate a scene.\n\nPress "Adjust for zooming" or "Adjust for beauty" to automatically adjust the settings for whatever you want.\n\nPress "Reset" to go back to the original scene.',475,1025,205,500)
			fill(255,200,255)
			text('Iterations should be increased to augment the precision of the Mandlebrot Set. \n\nThis also lowers the processing/printing speed.\n\nChange the max iterations on the right if 7000 is not enough.\n\nChange the total size of the result window to lower it and thus increase the processing/printing speed.\n\nSmoothness is auto-adjusted with the Adaptive printing style.',700,1025,205,500)
			fill(255,255,200)
			text('Press "Toggle Colors Visualisation" to see a live visualisation of the r/g/b/a combination that is selected.\n\nChange the Red Green Blue and the Amplitude (r/g/b/a) to change the colors of the scene.\n\nPress "Random" to generate a random combination or select one of our presets.\n\nYou can increase the range of the color palette.\n\nRecolor with a color amplitude of 255 and a density of 10 to recolor over the previous coloring.',925,1025,205,500)
			fill(200,255,255)
			text('The "Redraw" button only re-prints the already generated scene. (changing the r/g/b/a, the smoothness or the printing style)\n\nPressing the "Regenerate" button regenerates the scene as well as it re-prints it. (so changing whatever setting is taken into account)\n\nThe RGB coloring system is used, with the amount of Red (r), the Amplitude (a),the max number of iterations (i) for each point, put into the following formula (same for Green and Blue):\n\n(a/2)*cos(PI*i*r/a)+127.5',1150,1025,205,500)
			fill(255)
			text('Simply, just press adjust for zoom to zoom to a cool place, then adjust for beauty and regenerate. Change the colors, then regenerate. Adaptive si globally the best printing style.\n\n\nDev comments/bugs:\n\n- 6th mode with smooth coloring can be added.\n- GPU processing can be added.\n- When changing the total size, particles sizes do not yet adjust.\n- Estimate of iterations to calculate depending on zoom can be implemented. (maybe remove the last -5% on totalLength?)',1375,1025,200,500)
		}
		

		if(buttonsLevel<2){text('Press    { More Options }    \nto activate more settings.',1320,80)}
		//////////////////////////////////////
		if(buttonsLevel>0)
		{
			strokeWeight(2)
			stroke(160,130,70,150)
			line(1005,180,1260,180)
			line(1005,180,1005,260)
			line(1260,205,1260,180)
			line(1260,205,1580,205)
			line(1580,205,1580,260)
			line(1580,260,1005,260)

			stroke(10,130,250,150)
			line(1005,270,1260,270)
			line(1005,270,1005,350)
			line(1260,287,1260,270)
			line(1260,287,1597,287)
			line(1597,287,1597,350)
			line(1597,350,1005,350)

			noStroke();
			fill(0)
			text("Size : " + totalSizeSlider.value(),1005,450);
			text("Max iterations:",1460,425)
			text("You can't zoom infinitely, due to computer limitations.\nZooms left: " + zoomsLeft,1290,225);
			text("Generating mode:",1300,190);
			text("Printing style:",1448,190);
			text("                Details : " + densitySlider.value() + "\n      (more details = slower)",1267,303);
			text("            Smoothness : " + smoothnessSlider.value() + "\n(smoother processing = slower)",1425,303);
			text("Click to toggle zooming modes",1044,195)
			text("    Click to toggle auto-adjust",1044,285)
			if(zoomOnClick)
			{
				textSize(10)
				text("ACTIVATED",1037,255)
				textSize(12)
			}
			else if(unzoomOnClick)
			{
				textSize(10)
				text("ACTIVATED",1168,255)
				textSize(12)
			}

			if(adjustedForZooming)
			{
				textSize(10)
				text("ADJUSTED",1038,345)
				textSize(12)
				if((density!=1)||(mode.selected()!=5))
				{
					adjustedForZooming=false
					adjustForZooming.position(1010,290)
					adjustForZooming.size(110,50)
					adjustForZooming.style('background-color','red')
				}
			}
			else
			{
				if((density==1)&&(mode.selected()==5))
				{
					adjustedForZooming=true
					adjustForZooming.position(1015,295)
					adjustForZooming.size(100,40)
					adjustForZooming.style('background-color','green')
				}
			}

			if(adjustedForBeauty)
			{
				textSize(10)
				text("ADJUSTED",1170,345)
				textSize(12)

				if(iterations<500)
				{
					if((density!=10)||(mode.selected()==5)||(loadingScreen.selected()!='Color progressive'))
					{
						adjustedForBeauty=false
						adjustForBeauty.position(1140,290)
						adjustForBeauty.size(110,50)
						adjustForBeauty.style('background-color','red')
					}
				}
				else
				{
					if((density!=10)||(mode.selected()==5)||(loadingScreen.selected()!='Adaptive'))
					{
						adjustedForBeauty=false
						adjustForBeauty.position(1140,290)
						adjustForBeauty.size(110,50)
						adjustForBeauty.style('background-color','red')
					}
				}
			}
			else
			{
				if(iterations<500)
				{
					if((density==10)&&(mode.selected()!=5)&&(loadingScreen.selected()=='Color progressive'))
					{
						adjustedForBeauty=true
						adjustForBeauty.position(1145,295)
						adjustForBeauty.size(100,40)
						adjustForBeauty.style('background-color','green')
						mode.selected(1)
					}
				}
				else
				{
					if((density==10)&&(mode.selected()!=5)&&(loadingScreen.selected()=='Adaptive'))
					{
						adjustedForBeauty=true
						adjustForBeauty.position(1145,295)
						adjustForBeauty.size(100,40)
						adjustForBeauty.style('background-color','green')
						mode.selected(1)
					}
				}
			}
			text("Iterations : " + iterationsSlider.value() + "      (increase iterations for deeper zooming but slower loading)",1100,390);
		}
		if(buttonsLevel>1)
		{
			stroke(120,230,50,150)
			line(1025,500,1575,500)
			line(1025,800,1575,800)
			line(1025,800,1025,500)
			line(1575,500,1575,800)

			noStroke()
			text("Red : " + rSlider.value(),1060,555);
			text("Green : " + gSlider.value(),1060,610);
			text("Blue : " + bSlider.value(),1060,665);
			text("Color Amplitude : " + aSlider.value(),1060,720);

			
			text("Chosse color preset : ",1300,600);

			if(seeColors)
			{
				
				for(let i=mandlebrotSet.minimumIterations;i<mandlebrotSet.minimumIterations+rangeSlider.value();i+=1/(500/rangeSlider.value()))
				{
					stroke((currentA/2)*cos(3.14*i*currentR/currentA)+127.5,(currentA/2)*cos(3.14*i*currentG/currentA)+127.5,(currentA/2)*cos(3.14*i*currentB/currentA)+127.5)
					strokeWeight(1)
					line(1050+(500/rangeSlider.value())*(i-mandlebrotSet.minimumIterations),850,1050+(500/rangeSlider.value())*(i-mandlebrotSet.minimumIterations),950)
				}
				stroke(0)
				strokeWeight(3)
				noFill()
				rect(1050,850,500,100)
				noStroke()
				fill(0)
				text("Range : " + rangeSlider.value(),1080,825)
			}
			
		}
		smoothness = smoothnessSlider.value();
		density = densitySlider.value();
		iterations = iterationsSlider.value();
		currentR = rSlider.value();
		currentG = gSlider.value();
		currentB = bSlider.value();
		currentA = aSlider.value();
		
		
	}
	else if(!mandlebrotSet.calculated)
	{
		if(mode.selected()==5)
		{
			mandlebrotSet.calculate(xmin,ymin,size,11-density);
			mandlebrotSet.check();
			mandlebrotSet.map(xmin,ymin,size);
			mandlebrotSet.pixelProgressiveTransform();
			mandlebrotSet.calculated=true;
			
			printing=true
			
			noStroke();
			fill(255);
			rect(1000,0,600,1000);
			zooming=false
		}
		else
		{
			mandlebrotSet.calculate(xmin,ymin,size,11-density,20,calculstep);
			calculstep++;
			if(zooming)
			{
				noStroke()
				fill(0,0,255,70)
				rect(zoomX+400*(calculstep-1)/20*totalSizeSlider.value(),zoomY,20*totalSizeSlider.value(),400*totalSizeSlider.value())
			}
			else
			{
				noStroke()
				fill(255,140,0,70)
				rect(1310+200*(calculstep-1)/20,30,10,100)
				fill(255)
				rect(1360,140,100,100)
				fill(255,140,0)
				text(floor(((calculstep)/20)*100) + " %",1390,150)
			}
			
			if(calculstep==20)
			{
				calculstep=0;
				mandlebrotSet.check();
				mandlebrotSet.map(xmin,ymin,size);
				mandlebrotSet.pixelProgressiveTransform();
				if(mode.selected()==6)
				{
					mandlebrotSet.progressiveColorsCalculation()
				}
				mandlebrotSet.calculated=true;

				if(loadingScreen.selected()=='Adaptive')
				{
					adaptiveSmoothness=(mandlebrotSet.fullSet[floor(mandlebrotSet.totalLength*0.8)].i-mandlebrotSet.minimumIterations)
					smoothness=floor(adaptiveSmoothness/4)
					smoothnessSlider.value(smoothness)
				}
				
				printing=true
				
				if(!regenerating){ 
					background(0)
					stroke(150,0,255);
					strokeWeight(4);
					noFill()
					rect(500-1000*totalSizeSlider.value()/2,500-1000*totalSizeSlider.value()/2,1000*totalSizeSlider.value(),1000*totalSizeSlider.value())
				}
				regenerating=false
				noStroke();
				fill(255);
				rect(1000,0,600,1000);
				zooming=false
			}
		}
	}
	else
	{
		if(smoothness>20)
		{
			pMax=20
		}
		else
		{
			pMax=smoothness
		}
		strokeWeight(((11-density)/2))
		if(mode.selected()==5)
		{
			if(!regenerating){ 
				background(0)
				stroke(150,0,255);
				strokeWeight(4);
				noFill()
				rect(500-1000*totalSizeSlider.value()/2,500-1000*totalSizeSlider.value()/2,1000*totalSizeSlider.value(),1000*totalSizeSlider.value())
			}
			regenerating=false
			for(let i=0;i<(mandlebrotSet.totalLength);i++)
			{
				stroke((currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentR/currentA)+127.5,(currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentG/currentA)+127.5,(currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentB/currentA)+127.5)
				point(mandlebrotSet.fullSet[i].x,mandlebrotSet.fullSet[i].y)
			}
			smoothnessStep=smoothness;
		}
		else if(mode.selected()==6)
		{
			for(let i=mandlebrotSet.minimumIterations+((int)((iterations-mandlebrotSet.minimumIterations)*(smoothnessStep)/smoothness));(i<mandlebrotSet.minimumIterations+((int)((iterations-mandlebrotSet.minimumIterations)*(smoothnessStep+1)/smoothness)));i++)
			{
				for(let j=0;j<mandlebrotSet.lengthh[i];j++)
				{
					stroke((currentA/2)*cos(3.14*mandlebrotSet.progressiveColorsSet[i][j]*currentR/currentA)+127.5,(currentA/2)*cos(3.14*mandlebrotSet.progressiveColorsSet[i][j]*currentG/currentA)+127.5,(currentA/2)*cos(3.14*mandlebrotSet.progressiveColorsSet[i][j]*currentB/currentA)+127.5)
					point(mandlebrotSet.set[i][j].x,mandlebrotSet.set[i][j].y)
				}
			}
			smoothnessStep++;
		
			printStep++;
			noStroke()
			fill(0,140,255,70)
			rect(1310+200*(printStep-1)/smoothness,30,200/smoothness,100)
	
			fill(255)
			rect(1360,140,100,100)
			fill(0,0,255)
			text(floor(((printStep)/smoothness)*100) + " %",1390,150)
		}
		else if(loadingScreen.selected()=='Color progressive')
		{
			for(let i=mandlebrotSet.minimumIterations+((int)((iterations-mandlebrotSet.minimumIterations)*(smoothnessStep)/smoothness));(i<mandlebrotSet.minimumIterations+((int)((iterations-mandlebrotSet.minimumIterations)*(smoothnessStep+1)/smoothness)));i++)
			{
				stroke((currentA/2)*cos(3.14*i*currentR/currentA)+127.5,(currentA/2)*cos(3.14*i*currentG/currentA)+127.5,(currentA/2)*cos(3.14*i*currentB/currentA)+127.5)
				for(let j=0;j<mandlebrotSet.lengthh[i];j++)
				{
					point(mandlebrotSet.set[i][j].x,mandlebrotSet.set[i][j].y)
				}
			}
			smoothnessStep++;
		
			printStep++;
			noStroke()
			fill(0,140,255,70)
			rect(1310+200*(printStep-1)/smoothness,30,200/smoothness,100)
	
			fill(255)
			rect(1360,140,100,100)
			fill(0,0,255)
			text(floor(((printStep)/smoothness)*100) + " %",1390,150)
		}
		else if(loadingScreen.selected()=='Pixel progressive')
		{
			for(let i=0+((int)((mandlebrotSet.totalLength)*(smoothnessStep)/smoothness));(i<((int)((mandlebrotSet.totalLength)*(smoothnessStep+1)/smoothness)));i++)
			{
				stroke((currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentR/currentA)+127.5,(currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentG/currentA)+127.5,(currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentB/currentA)+127.5)
				point(mandlebrotSet.fullSet[i].x,mandlebrotSet.fullSet[i].y)
			}
			smoothnessStep++;
		
			printStep++;
			noStroke()
			fill(0,140,255,70)
			rect(1310+200*(printStep-1)/smoothness,30,200/smoothness,100)
	
			fill(255)
			rect(1360,140,100,100)
			fill(0,0,255)
			text(floor(((printStep)/smoothness)*100) + " %",1390,150)
		}
		else if(loadingScreen.selected()=='Adaptive')
		{
			if(adaptiveStep<=adaptiveSmoothness)
			{
				let i=(mandlebrotSet.minimumIterations+adaptiveStep)
				stroke((currentA/2)*cos(3.14*i*currentR/currentA)+127.5,(currentA/2)*cos(3.14*i*currentG/currentA)+127.5,(currentA/2)*cos(3.14*i*currentB/currentA)+127.5)
				for(let j=0;j<mandlebrotSet.lengthh[i];j++)
				{
					point(mandlebrotSet.set[i][j].x,mandlebrotSet.set[i][j].y)
				}
				adaptiveStep++
			}
			else
			{
				//print(smoothness,smoothnessStep,floor(mandlebrotSet.totalLength/2,)
				//background(0)
				for(let i=floor(mandlebrotSet.totalLength*0.8)+((int)((mandlebrotSet.totalLength*0.2)*(smoothnessStep)/(smoothness)));(i<floor(mandlebrotSet.totalLength*0.8)+((int)((mandlebrotSet.totalLength*0.2)*(smoothnessStep+1)/(smoothness))));i++)
				{
					stroke((currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentR/currentA)+127.5,(currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentG/currentA)+127.5,(currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentB/currentA)+127.5)
					point(mandlebrotSet.fullSet[i].x,mandlebrotSet.fullSet[i].y)
				}
				smoothnessStep++;
				/*
				for(let i=floor(mandlebrotSet.totalLength/2)+((int)((mandlebrotSet.totalLength)*((smoothnessStep)/smoothness)-1/2));(i<((int)((mandlebrotSet.totalLength)*((smoothnessStep+1)/smoothness)-1/2)));i++)
				{
					stroke((currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentR/currentA)+127.5,(currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentG/currentA)+127.5,(currentA/2)*cos(3.14*mandlebrotSet.fullSet[i].i*currentB/currentA)+127.5)
					point(mandlebrotSet.fullSet[i].x,mandlebrotSet.fullSet[i].y)
				}*/
			}
			
			printStep++;
			noStroke()
			fill(0,140,255,70)
			rect(1310+200*(printStep-1)/(smoothness+adaptiveSmoothness),30,200/(smoothness+adaptiveSmoothness),100)

			fill(255)
			rect(1360,140,100,100)
			fill(0,0,255)
			text(floor(((printStep)/(smoothness+adaptiveSmoothness))*100) + " %",1390,150)
		}
		if(smoothnessStep==smoothness)
		{
			smoothnessStep=0;
			adaptiveStep=0
			mandlebrotSet.finished=true;
			printStep=0
			if(zoomStep<zoomNumbers-1)
			{
				zoom(zoomPoints[zoomStep].x,zoomPoints[zoomStep].y);
				zoomStep++;
			}
			else if(zoomStep<zoomNumbers)
			{
				densitySlider.value(10)
				density=10
				mode.selected(1)
				iterationsSlider.value(4000)
				iterations=4000
				smoothnessSlider.value(386)
				smoothness=386
				zoom(zoomPoints[zoomStep].x,zoomPoints[zoomStep].y);
				zoomStep++;
				colorPreset.selected(3)
			}
		}
	}
}

function toggleInfo()
{
	info=!info
}

function generateCoolPlace()
{
	if(mandlebrotSet.finished)
	{
		let p=currentCoolPlace.selected()-1

		zoomsLeft = coolPlaces[p].zooms
		mode.selected(coolPlaces[p].mode)

		xmin=coolPlaces[p].x
		ymin=coolPlaces[p].y
		size=coolPlaces[p].size

		colorPreset.selected(coolPlaces[p].color+1)

		currentR = coolColors[coolPlaces[p].color].r;
		currentG = coolColors[coolPlaces[p].color].g;
		currentB = coolColors[coolPlaces[p].color].b;
		currentA = coolColors[coolPlaces[p].color].a;

		rSlider.value(currentR)
		gSlider.value(currentG)
		bSlider.value(currentB)
		aSlider.value(currentA)

		densitySlider.value(10)
		density=10
		iterationsSlider.value(coolPlaces[p].i)
		iterations=coolPlaces[p].i
		smoothnessSlider.value(coolPlaces[p].calculIterations)
		smoothness=coolPlaces[p].calculIterations
		calculating=true;
		noStroke();
		fill(255);
		rect(1000,0,600,1000);
		
		
		mandlebrotSet = new MandlebrotSet(mode.selected(),totalSizeSlider.value());
		mandlebrotSet.start(iterations);
	}	
}

function zoomToCoolPlace()
{
	if(mandlebrotSet.finished)
	{
		xmin=-2
		ymin=-2
		size=4
		calculating=true;
		noStroke();
		fill(255);
		rect(1000,0,600,1000);
		
		
		mandlebrotSet = new MandlebrotSet(mode.selected(),totalSizeSlider.value());
		mandlebrotSet.start(iterations);
		
		densitySlider.value(5)
		density=1
		mode.selected(5)
		iterationsSlider.value(2000)
		iterations=2000
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
}

function moreOptions()
{
	if(mandlebrotSet.finished)
	{
		if(buttonsLevel==0)
		{
			resetButton.position(1250,430)

			totalSizeSlider.position(1050,450)


			densitySlider.position(1280,323);
			smoothnessSlider.position(1440,323);
			densitySlider.size(140);
			smoothnessSlider.size(140);
			iterationsSlider.size(550);
			iterationsSlider.position(1025,395);

			regenerateButton = createButton('Regenerate')
			regenerateButton.position(1120,115)
			regenerateButton.size(120,40)
			regenerateButton.mousePressed(regenerate)
			regenerateButton.style('background-color','grey')

			zoomOnClickButton = createButton('Zoom on click')
			zoomOnClickButton.position(1010,200)
			zoomOnClickButton.size(110,50)
			zoomOnClickButton.style('background-color','red')
			zoomOnClickButton.mousePressed(zoomOnClickPressed)

			unzoomOnClickButton = createButton('Unzoom on click')
			unzoomOnClickButton.position(1140,200)
			unzoomOnClickButton.size(110,50)
			unzoomOnClickButton.style('background-color','red')
			unzoomOnClickButton.mousePressed(unzoomOnClickPressed)

			adjustForZooming = createButton('Adjust for zooming')
			adjustForZooming.position(1010,290)
			adjustForZooming.size(110,50)
			adjustForZooming.style('background-color','red')
			adjustForZooming.mousePressed(adjustForZoomingPressed)

			adjustForBeauty = createButton('Adjust for beauty')
			adjustForBeauty.position(1140,290)
			adjustForBeauty.size(110,50)
			adjustForBeauty.style('background-color','red')
			adjustForBeauty.mousePressed(adjustForBeautyPressed)

			changeMaxIterations = createButton('Change')
			changeMaxIterations.position(1460,456)
			changeMaxIterations.size(108,30)
			changeMaxIterations.mousePressed(changeMaxIterationsPressed)

			maxIInput = createInput(7000)
			maxIInput.position(1460,430)
			maxIInput.size(100,21)

			mode.position(1400,175)

			loadingScreen.position(1530,175)

			buttonsLevel++
		}
		else if(buttonsLevel==1)
		{
			seeColorsButton = createButton('Toggle Colors Visualisation')
			seeColorsButton.position(1350,700)
			seeColorsButton.size(120,70)
			seeColorsButton.style('background-color','red')
			seeColorsButton.mousePressed(seeColorsPressed)

			randomColors = createButton('Random')
			randomColors.position(1225,635)
			randomColors.size(80,50)
			randomColors.style('background-color','yellow')
			randomColors.mousePressed(randomColorsPressed)
			
			recolor = createButton('Redraw')
			recolor.position(1430,525)
			recolor.size(120,50)
			recolor.style('background-color','lightblue')
			recolor.mousePressed(recolorPressed)

			rSlider.position(1050,560)
			gSlider.position(1050,615)
			bSlider.position(1050,670)
			aSlider.position(1050,725)

			moreButtonsButton.position(-200,-200)

			colorPreset.position(1430,588)

			buttonsLevel++
		}
	}	
}

function regenerate()
{
	if(mandlebrotSet.finished)
	{
		calculating=true;
		noStroke();
		fill(255);
		rect(1000,0,600,1000);

		mandlebrotSet = new MandlebrotSet(mode.selected(),totalSizeSlider.value());
		mandlebrotSet.start(iterations);
		if((density==10)&&(currentA==255)){regenerating=true}
	}	
}

function zoomOnClickPressed()
{
	if(mandlebrotSet.finished)
	{
		if(!zoomOnClick)
		{
			zoomOnClick=true

			zoomOnClickButton.position(1015,205)
			zoomOnClickButton.size(100,40)
			zoomOnClickButton.style('background-color','green')

			if(unzoomOnClick)
			{
				unzoomOnClick = false
				unzoomOnClickButton.position(1140,200)
				unzoomOnClickButton.size(110,50)
				unzoomOnClickButton.style('background-color','red')
			}
		}
		else
		{
			zoomOnClick = false
			
			zoomOnClickButton.position(1010,200)
			zoomOnClickButton.size(110,50)
			zoomOnClickButton.style('background-color','red')
		}
	}	
}

function unzoomOnClickPressed()
{
	if(mandlebrotSet.finished)
	{
		if(!unzoomOnClick)
		{
			unzoomOnClick=true

			unzoomOnClickButton.position(1145,205)
			unzoomOnClickButton.size(100,40)
			unzoomOnClickButton.style('background-color','green')

			if(zoomOnClick)
			{
				zoomOnClick = false
				zoomOnClickButton.position(1010,200)
				zoomOnClickButton.size(110,50)
				zoomOnClickButton.style('background-color','red')
			}
		}
		else
		{
			unzoomOnClick = false
			
			unzoomOnClickButton.position(1140,200)
			unzoomOnClickButton.size(110,50)
			unzoomOnClickButton.style('background-color','red')
		}
	}	
}

function adjustForZoomingPressed()
{
	if(mandlebrotSet.finished)
	{
		if(!adjustedForZooming)
		{
			adjustedForZooming=true

			adjustForZooming.position(1015,295)
			adjustForZooming.size(100,40)
			adjustForZooming.style('background-color','green')
			
			density=1
			densitySlider.value(1)
			smoothness=7
			smoothnessSlider.value(7)
			mode.selected(5)
		}
	}
}

function changeMaxIterationsPressed()
{
	if(mandlebrotSet.finished)
	{
		iterationsSlider.elt.max=maxIInput.value()
	}
}

function adjustForBeautyPressed()
{
	if(mandlebrotSet.finished)
	{
		if(!adjustedForBeauty)
		{
			adjustedForBeauty=true

			adjustForBeauty.position(1145,295)
			adjustForBeauty.size(100,40)
			adjustForBeauty.style('background-color','green')
			
			density=10
			densitySlider.value(10)

			if(iterations<500)
			{
				loadingScreen.selected('Color progressive')
			}
			else
			{
				loadingScreen.selected('Adaptive')
			}
			smoothness=iterations-mandlebrotSet.minimumIterations;
			smoothnessSlider.value(smoothness)
			mode.selected(1)
		}
	}
}

function seeColorsPressed()
{
	if(!seeColors)
	{
		seeColorsButton.position(1355,705)
		seeColorsButton.size(110,60)
		seeColorsButton.style('background-color','green')
		rangeSlider.position(1050,830)
	}
	else
	{
		seeColorsButton.position(1350,700)
		seeColorsButton.size(120,70)
		seeColorsButton.style('background-color','red')
		rangeSlider.position(-1050,830)
	}
	seeColors=!seeColors
}

function colorPresetChanged()
{
	let c=colorPreset.selected()-1;

	currentR=coolColors[c].r
	currentG=coolColors[c].g
	currentB=coolColors[c].b
	currentA=coolColors[c].a

	rSlider.value(currentR)
	gSlider.value(currentG)
	bSlider.value(currentB)
	aSlider.value(currentA)
}

function recolorPressed()
{
	if(mandlebrotSet.finished)
	{
		printing=true;
		if((density!=10)||(currentA!=255)){
			background(0)
			stroke(150,0,255);
			strokeWeight(4);
			noFill()
			rect(500-1000*totalSizeSlider.value()/2,500-1000*totalSizeSlider.value()/2,1000*totalSizeSlider.value(),1000*totalSizeSlider.value())
		}

		noStroke();
		fill(255);
		rect(1000,0,600,1000);

		mandlebrotSet.finished=false;
		if(loadingScreen.selected()=='Adaptive')
		{
			adaptiveSmoothness=(mandlebrotSet.fullSet[floor(mandlebrotSet.totalLength*0.8)].i-mandlebrotSet.minimumIterations)
			smoothness=floor(adaptiveSmoothness/4)
			smoothnessSlider.value(smoothness)
		}
	}
}

function randomColorsPressed()
{
	currentR=random(0,10)
	currentG=random(0,10)
	currentB=random(0,10)
	currentA=random(0,255)

	rSlider.value(currentR)
	gSlider.value(currentG)
	bSlider.value(currentB)
	aSlider.value(currentA)
}

function mousePressed()
{
	if(mandlebrotSet.finished)
	{
		if((mouseX >=  0 ) && (mouseX <= 1000*totalSizeSlider.value()+500-1000*totalSizeSlider.value()/2 ) && (mouseY >= 0 ) && (mouseY <= 1000*totalSizeSlider.value()+500-1000*totalSizeSlider.value()/2 ))
        {
			if((zoomOnClick)&&(zoomsLeft>0))
			{
				//print(mouseX,mouseY)
				calculating=true;
				zoomX=mouseX-200*totalSizeSlider.value();
				zoomY=mouseY-200*totalSizeSlider.value();

				let newSize = size * 0.4;

				color = color * 0.9


				let newXmin = map(mouseX-200*totalSizeSlider.value()-500+1000*totalSizeSlider.value()/2,0,1000*totalSizeSlider.value(),xmin,xmin+size);
				let newYmin = map(mouseY-200*totalSizeSlider.value()-500+1000*totalSizeSlider.value()/2,0,1000*totalSizeSlider.value(),ymin,ymin+size);

				zooming=true

				size=newSize;
				xmin=newXmin;
				ymin=newYmin;

				noStroke();
				fill(255);
				rect(1000,0,600,1000);
				
				
				mandlebrotSet = new MandlebrotSet(mode.selected(),totalSizeSlider.value());
				mandlebrotSet.start(iterations)
				zoomsLeft--;
			}
			else if((unzoomOnClick)&&(size<4))
			{
				calculating=true;
				zoomsLeft++;
				let newSize = size * 2.5;
				let newXmin = map(mouseX-1250*totalSizeSlider.value()-500+1000*totalSizeSlider.value()/2,0,1000*totalSizeSlider.value(),xmin,xmin+size);
				let newYmin = map(mouseY-1250*totalSizeSlider.value()-500+1000*totalSizeSlider.value()/2,0,1000*totalSizeSlider.value(),ymin,ymin+size);

				size=newSize;
				xmin=newXmin;
				ymin=newYmin;

				noStroke();
				fill(255);
				rect(1000,0,600,1000);
				mandlebrotSet = new MandlebrotSet(mode.selected(),totalSizeSlider.value());
				mandlebrotSet.start(iterations)
			}
		}
	}
}

function keyPressed()
{
	if(key == 'q')
	{
		loop()
	}
	if(key == 's')
	{
		print(mouseX,mouseY,mouseX-200*totalSizeSlider.value()-500+1000*totalSizeSlider.value()/2,mouseY-200*totalSizeSlider.value()-500+1000*totalSizeSlider.value()/2)
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
	rect(1000,0,600,1000);
	
	
	mandlebrotSet = new MandlebrotSet(mode.selected()),totalSizeSlider.value();
	mandlebrotSet.start(iterations)
	zoomsLeft--;
}

function resetButtonPressed()
{
	if(mandlebrotSet.finished)
	{
		let p=currentCoolPlace.selected()-1

		zoomsLeft = coolPlaces[p].zooms
		mode.selected(1)

		xmin=-2
		ymin=-2
		size=4

		colorPreset.selected(14)

		currentR = coolColors[13].r;
		currentG = coolColors[13].g;
		currentB = coolColors[13].b;
		currentA = coolColors[13].a;

		rSlider.value(currentR)
		gSlider.value(currentG)
		bSlider.value(currentB)
		aSlider.value(currentA)

		densitySlider.value(5)
		density=5
		iterationsSlider.value(500)
		iterations=500
		smoothnessSlider.value(7)
		smoothness=7
		calculating=true;
		noStroke();
		fill(255);
		rect(1000,0,600,1000);
		
		
		mandlebrotSet = new MandlebrotSet(mode.selected(),totalSizeSlider.value());
		mandlebrotSet.start(iterations);
	}	
}


/*
function draw() {
  background(0);
  red=redSlider.value()
  noStroke()
  text("r: "+red,30,150)
  green=greenSlider.value()
  noStroke()
  text("g: "+green,230,150)
  blue=blueSlider.value()
  noStroke()
  text("b: "+blue,430,150)
  amplitude=amplitudeSlider.value()
  noStroke()
  text("a: "+amplitude,630,150)
  calculate(red,green,blue,amplitude);
}
function calculate(r,g,b,a)
{
  for(let i=0;i<1000;i++)
    {
        stroke((a/2)*sin(3.14*i*r/a)+127.5,(a/2)*sin(3.14*i*g/a)+127.5,(a/2)*sin(3.14*i*b/a)+127.5)
      	line(i,1,i,100);
    }
}

function changeBG()
{
  redSlider.value(random(0.5,4))
  greenSlider.value(random(0.5,4))
  blueSlider.value(random(0.5,4))
}*/

