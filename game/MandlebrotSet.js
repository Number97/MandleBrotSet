class Point
{
	constructor(_x,_y)
	{
		this.x=_x
		this.y=_y
	}
}
class Pointy
{
	constructor(_x,_y,_i)
	{
		this.x=_x
		this.y=_y
		this.i=_i
	}
}
class MandlebrotSet
{
	constructor(_mode,_totalSize)
	{
		this.set = []
		this.finished = true
		this.calculated = true
		this.lengthh = []
		this.iterations = 0
		this.groups = []
		this.groupsLength = []
		this.mode = _mode
		this.minimumIterations = 0
		this.totalLength = 0
		this.fullSet = []
		this.underLength = 0
		this.underLengthTotal = 0
		this.totalSize = _totalSize
		this.progressiveColorsSet = []
	}

	start(i)
	{
		this.iterations = i;
		this.finished = false
		this.calculated = false
		for(let j = 0 ; j < i ; j++ )
		{
			this.progressiveColorsSet[j] = []
			this.set[j] = [];
			this.lengthh.push(0);
		}
	}

	calculate(xmin,ymin,size,density,smoothness,smoothnessStep)
	{
		let x,y,a,b,preva,prevb
		if(this.mode==1)
		{
			for(let i=xmin+size*(smoothnessStep)/smoothness;i<xmin+size*(smoothnessStep+1)/smoothness;i+=density*size/(2000*this.totalSize))
			{
				for(let j=ymin;j<ymin+size;j+=density*size/(2000*this.totalSize))
				{
					x=i
					y=j
					preva=x
					a=x
					prevb=y
					b=y


					for(let k=0;k<5;k++)
					{
						preva=a
						prevb=b
						a=preva*preva-prevb*prevb+x
						b=2*preva*prevb+y
					}
					if((a*a+b*b)<4)
					{
						for(let k=0;k<this.iterations;k++)
						{
							preva=a
							prevb=b
							a=preva*preva-prevb*prevb+x
							b=2*preva*prevb+y

							if((a*a+b*b)>=4)
							{
								this.set[k].push( new Point(x,y) )
								this.lengthh[k]=this.lengthh[k]+1
								this.totalLength++
								k=this.iterations;
							}
						}
					}
				}
			}
		}
		else if(this.mode==2)
		{
			for(let i=xmin+size*(smoothnessStep)/smoothness;i<xmin+size*(smoothnessStep+1)/smoothness;i+=density*size/(2000*this.totalSize))
			{
				for(let j=ymin;j<ymin+size;j+=density*size/(2000*this.totalSize))
				{
					x=i
					y=j
					preva=x
					a=x
					prevb=y
					b=y


					for(let k=0;k<5;k++)
					{
						preva=a
						prevb=b
						a=preva*preva-prevb*prevb+x
						b=2*preva*prevb+y
					}
					if((a*preva+b*prevb)<4)
					{
						for(let k=0;k<this.iterations;k++)
						{
							preva=a
							prevb=b
							a=preva*preva-prevb*prevb+x
							b=2*preva*prevb+y

							if((a*preva+b*prevb)>=4)
							{
								this.set[k].push( new Point(x,y) )
								this.lengthh[k]=this.lengthh[k]+1
								this.totalLength++
								k=this.iterations;
							}
						}
					}
				}
			}
		}
		else if(this.mode==3)
		{
			for(let i=xmin+size*(smoothnessStep)/smoothness;i<xmin+size*(smoothnessStep+1)/smoothness;i+=density*size/(2000*this.totalSize))
			{
				for(let j=ymin;j<ymin+size;j+=density*size/(2000*this.totalSize))
				{
					x=i
					y=j
					preva=x
					a=x
					prevb=y
					b=y


					for(let k=0;k<5;k++)
					{
						preva=a
						prevb=b
						a=preva*preva*preva-3*preva*prevb*prevb+x
						b=3*preva*preva*prevb-prevb*prevb*prevb+y
					}
					if((a*a+b*b)<4)
					{
						for(let k=0;k<this.iterations;k++)
						{
							preva=a
							prevb=b
							a=preva*preva*preva-3*preva*prevb*prevb+x
							b=3*preva*preva*prevb-prevb*prevb*prevb+y

							if((a*a+b*b)>=4)
							{
								this.set[k].push( new Point(x,y) )
								this.lengthh[k]=this.lengthh[k]+1
								this.totalLength++
								k=this.iterations;
							}
						}
					}
				}
			}
		}
		else if(this.mode==4)
		{
			for(let i=xmin+size*(smoothnessStep)/smoothness;i<xmin+size*(smoothnessStep+1)/smoothness;i+=density*size/(2000*this.totalSize))
			{
				for(let j=ymin;j<ymin+size;j+=density*size/(2000*this.totalSize))
				{
					x=i
					y=j
					preva=x
					a=x
					prevb=y
					b=y


					for(let k=0;k<5;k++)
					{
						preva=a
						prevb=b
						a=preva*preva*preva*preva-6*preva*preva*prevb*prevb+prevb*prevb*prevb*prevb+x
						b=4*preva*preva*preva*prevb-4*preva*prevb*prevb*prevb+y
					}
					if((a*a+b*b)<4)
					{
						for(let k=0;k<this.iterations;k++)
						{
							preva=a
							prevb=b
							a=preva*preva*preva*preva-6*preva*preva*prevb*prevb+prevb*prevb*prevb*prevb+x
							b=4*preva*preva*preva*prevb-4*preva*prevb*prevb*prevb+y

							if((a*a+b*b)>=4)
							{
								this.set[k].push( new Point(x,y) )
								this.lengthh[k]=this.lengthh[k]+1
								this.totalLength++
								k=this.iterations;
							}
						}
					}
				}
			}
		}
		if(this.mode==5)
		{
			for(let i=xmin;i<xmin+size;i+=density*size/(2000*this.totalSize))
			{
				for(let j=ymin;j<ymin+size;j+=density*size/(2000*this.totalSize))
				{
					x=i
					y=j
					preva=x
					a=x
					prevb=y
					b=y


					for(let k=0;k<5;k++)
					{
						preva=a
						prevb=b
						a=preva*preva-prevb*prevb+x
						b=2*preva*prevb+y
					}
					if((a*a+b*b)<4)
					{
						for(let k=0;k<this.iterations;k++)
						{
							preva=a
							prevb=b
							a=preva*preva-prevb*prevb+x
							b=2*preva*prevb+y

							if((a*a+b*b)>=4)
							{
								this.set[k].push( new Point(x,y) )
								this.lengthh[k]=this.lengthh[k]+1
								this.totalLength++
								k=this.iterations;
							}
						}
					}
				}
			}
		}
		else if(this.mode==6)
		{
			for(let i=xmin+size*(smoothnessStep)/smoothness;i<xmin+size*(smoothnessStep+1)/smoothness;i+=density*size/(2000*this.totalSize))
			{
				for(let j=ymin;j<ymin+size;j+=density*size/(2000*this.totalSize))
				{
					x=i
					y=j
					preva=x
					a=x
					prevb=y
					b=y


					for(let k=0;k<5;k++)
					{
						preva=a
						prevb=b
						a=preva*preva-prevb*prevb+x
						b=2*preva*prevb+y
					}
					if((a*a+b*b)<4)
					{
						for(let k=0;k<this.iterations;k++)
						{
							preva=a
							prevb=b
							a=preva*preva-prevb*prevb+x
							b=2*preva*prevb+y

							if((a*a+b*b)>=4)
							{
								this.set[k].push( new Point(x,y) )
								this.progressiveColorsSet[k].push(k)
								this.lengthh[k]=this.lengthh[k]+1
								this.totalLength++
								k=this.iterations;
							}
						}
					}
				}
			}
		}
	}

	check()
	{
		let j=0
		while(this.lengthh[j]==0 && j < this.iterations)
		{
			this.minimumIterations++;
			j++;
		}
	}

	pixelProgressiveTransform()
	{
		for(let i=this.minimumIterations;i<this.iterations;i++)
		{
			for(let j=0;j<this.lengthh[i];j++)
			{
				this.fullSet.push(new Pointy(this.set[i][j].x,this.set[i][j].y,i))
			}
		}
	}


	map(xmin,ymin,size)
	{
		let x,y;
		for(let i=0;i<this.iterations;i++)
		{
			for(let j=0;j<this.lengthh[i];j++)
			{
				x=map(this.set[i][j].x,xmin,xmin+size,0,1000*this.totalSize);
				y=map(this.set[i][j].y,ymin,ymin+size,0,1000*this.totalSize);
				this.set[i][j].x=x+500-1000*this.totalSize/2;
				this.set[i][j].y=y+500-1000*this.totalSize/2;
			}
		}
	}

	progressiveColorsCalculation()
	{
		let number;
		let min=1000,max=0;
		for(let i=0;i<this.iterations;i++)
		{
			for(let j=0;j<this.lengthh[i];j++)
			{
				number=log(this.set[i][j].x*this.set[i][j].x+this.set[i][j].y*this.set[i][j].y)/2
				number=log(number/log(2))/log(2)
				this.progressiveColorsSet[i][j]=number
				if(number>max)
				{
					max=number
				}
				if(number<min)
				{
					min=number
				}
			}
		}
		print(min,max)
	}
}