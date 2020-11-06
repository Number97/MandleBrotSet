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
		this.Xset = []
		this.Yset = []
		this.colorSet = []
		this.set = []
		this.finished = true
		this.calculated = true
		this.length = 0

	}

	augment(k)
	{

	}

	reduce(k)
	{

	}

	start(i)
	{
		this.finished = false
		this.calculated = false
		for(let j = 0 ; j < i ; j++ )
		{
			this.set.push([]);
		}
	}

	calculate(xmin,ymin,size,density,smoothness,smoothnessStep,iterations)
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
					this.Xset.push(x)
					this.Yset.push(y)
					this.colorSet.push(0);
					for(let k=0;k<iterations;k++)
					{
						preva=a
						prevb=b
						a=preva*preva-prevb*prevb+x
						b=2*preva*prevb+y

						if(modul(a,b)>=2)
						[
							this.colorSet[this.length]=4*k
						]
					}
					this.length++
				}
			}
		}
	}

	map(xmin,ymin,size)
	{
		let x,y;
		for(let i=0;i<this.length;i++)
		{
			x=map(this.Xset[i],xmin,xmin+size,0,1000);
			y=map(this.Yset[i],ymin,ymin+size,0,1000);
			this.Xset[i]=x;
			this.Yset[i]=y;
		}
	}
}