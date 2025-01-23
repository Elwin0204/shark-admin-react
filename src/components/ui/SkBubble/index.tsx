import { rand, ease, friction, bubbleNum } from "./shared";

interface VelocityVector {
  x: number;
  y: number;
}

const SkBubble: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let canvasH = window.innerHeight;
  let canvasW = window.innerWidth;
  let mouseX = null;
  let mouseY = null;
  
  let bubbles: Bubble[] = [];
  let shapes: Shape[] = [];

  window.requestAnimationFrame = window.requestAnimationFrame ||
  function(cb) {
    setTimeout(cb, 17);
  };

  class Shape {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    v: VelocityVector;
    r: number;
  
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.v = {
        x: rand(-5, 5) * Math.random(),
        y: rand(-5, -10) * Math.random()
      };
      this.r = rand(1, 10);
    }
  
    draw() {
      const ctx = this.ctx;
      ctx.save();
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.restore();
    }
  
    updatePositon() {
      this.v.y += 0.1;
      this.x += this.v.x;
      this.y += this.v.y;
    }
  
    removeShape(i: number) {
      if (this.y > canvasH + this.r) {
        shapes.splice(i, 1);
      }
    }
  
    render(i: number) {
      this.updatePositon();
      this.removeShape(i);
      this.draw();
    }
  }
  
  class Bubble {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    v: VelocityVector;
    c: string;
    r: number;
    b: number;
    a: number;
    rad: number;
    d: number;
  
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.v = {
        x: rand(-1, 1),
        y: rand(-1, 1),
      };
      this.c = "white";
      this.r = 20;
      this.b = 3;
      this.a = rand(0, 360);
      this.rad = this.a * Math.PI / 180;
      this.d = canvasH / 2;
    }
  
    draw() {
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.fillStyle = this.c;
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fill();
    }
  
    coll(i: number) {
      let j = i;
      for(let i = 0; i < bubbles.length; i++) {
        if(j !== i) {
          const sumRadius = this.r + bubbles[i].r;
          const a = this.x - bubbles[i].x;
          const b = this.y - bubbles[i].y;
          const c = a * a + b * b;
          if(c < sumRadius * sumRadius) {
            this.v.x = - this.v.x;
            this.v.y = - this.v.y;
            const colAngle = Math.atan2(this.y - bubbles[i].y, this.x - bubbles[i].x);
            this.v.x = Math.cos(colAngle) * this.b;
            this.v.y = Math.sin(colAngle) * this.b;
            const s = new Shape(this.ctx, this.x, this.y);
            shapes.push(s);
          }
        }
      }
    }
  
    targetPositon() {
      const x = canvasW / 2 - this.x;
      const y = canvasH / 2 - this.y;
      const d = x * x + y * y;
      const dist = Math.sqrt(d);
      if(dist > this.d) {
        this.v.x = (canvasW / 2 - this.x) * ease;
        this.v.y = (canvasH / 2 - this.y) * ease;
        this.v.x *= friction;
        this.v.y *= friction;
      }
    }
  
    updatePosition() {
      this.v.x *= 1.05;
      this.v.y *= 1.05;
      this.x += this.v.x;
      this.y += this.v.y;
    }
  
    wrapPosition() {
      if(this.x - this.r < 0) {
        this.v.x *= -2;
      }
      if(this.x + this.r > canvasW) {
        this.v.x *= -2;
      }
      if(this.y - this.r < 0) {
        this.v.y *= -2;
      }
      if(this.y + this.r > canvasH) {
        this.v.y *= -2;
      }
    }
  
    updateParams() {
      this.a += 10;
      this.rad = this.a * Math.PI / 180;
    }
  
    render(i: number) {
      this.updateParams();
      this.targetPositon();
      this.coll(i);
      this,this.updatePosition();
      this.draw();
    }
  }

  const createRender = (ctx: CanvasRenderingContext2D) => {
    return () => {
      ctx.clearRect(0, 0, canvasW, canvasH);
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].render(i);
      }
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].render(i);
      }
      requestAnimationFrame(createRender(ctx));
    };
  };

  useEffect(() => {
    if (canvasRef.current) {
      // 设置画布大小为窗口大小
      canvasRef.current.height = canvasH;
      canvasRef.current.width = canvasW;
      const ctx = canvasRef.current.getContext("2d")!;
      const render = createRender(ctx);
      // 初始化气泡
      for (let i = 0; i < bubbleNum; i++) {
        // const b = new Bubble(ctx, canvasW / 2 + rand(-100, 100), canvasH / 2 + rand(-100, 100));
        const x = rand(0, canvasW);
        const y = rand(0, canvasH);
        const b = new Bubble(ctx, x, y);
        bubbles.push(b);
      }

      // 开始动画循环
      render();

      // 添加点击事件监听器
      const handleCanvasClick = (e: MouseEvent) => {
        mouseX = e.clientX - canvasRef.current!.getBoundingClientRect().left;
        mouseY = e.clientY - canvasRef.current!.getBoundingClientRect().top;
        const b = new Bubble(ctx, mouseX, mouseY);
        bubbles.push(b);
      };

      const onResize = () => {
        canvasW = canvasRef.current!.width = window.innerWidth;
        canvasH = canvasRef.current!.height = window.innerHeight;
      }
      
      window.addEventListener('resize', onResize);
      canvasRef.current.addEventListener('click', handleCanvasClick, false);

      // 清理函数：移除事件监听器
      return () => {
        window.removeEventListener('resize', onResize);
        if (canvasRef.current) {
          canvasRef.current.removeEventListener('click', handleCanvasClick, false);
        }
      };
    }
  }, []);
  
  return (
    <canvas ref={canvasRef}></canvas>
  );
};

export default SkBubble;