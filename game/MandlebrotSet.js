function modul(x,y)
{
	let m=sqrt(x*x+y*y)
	return m
}

class Point
{
	constructor(_x,_y)
	{
		this.x=_x
		this.y=_y
	}
}

class MandlebrotSet
{
	constructor()
	{
		this.set = []
		this.finished = true
		this.calculated = true
		this.lengthh = []
		this.iterations = 0
		this.notZero = []
		this.notZeroLength = 0
	}

	start(i)
	{
		this.iterations = i;
		this.finished = false
		this.calculated = false
		for(let j = 0 ; j < i ; j++ )
		{
			this.set[j] = [];
			this.lengthh.push(0);
		}
	}

	calculate(xmin,ymin,size,density,smoothness,smoothnessStep)
	{
		let x,y,a,b,preva,prevb
		
		for(let i=xmin+size*(smoothnessStep)/smoothness;i<xmin+size*(smoothnessStep+1)/smoothness;i+=density*size/2000)
		{
			for(let j=ymin;j<ymin+size;j+=density*size/2000)
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
				if(modul(a,b)<2)
				{
					for(let k=0;k<this.iterations;k++)
					{
						preva=a
						prevb=b
						a=preva*preva-prevb*prevb+x
						b=2*preva*prevb+y

						if(modul(a,b)>=2)
						{
							this.set[k].push( new Point(x,y) )
							this.lengthh[k]=this.lengthh[k]+1
							k=this.iterations;
						}
					}
				}
			}
		}
	}

	check()
	{
		for(let j = 0 ; j < this.iterations ; j++ )
		{
			if(this.lengthh[j]>0)
			{
				this.notZeroLength++;
				this.notZero.push(this.lengthh[j]);
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
				x=map(this.set[i][j].x,xmin,xmin+size,0,1000);
				y=map(this.set[i][j].y,ymin,ymin+size,0,1000);
				this.set[i][j].x=x;
				this.set[i][j].y=y;
			}
		}
	}
}