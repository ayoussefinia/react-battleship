import React, { useRef, useEffect } from 'react'

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {draw: (context: CanvasRenderingContext2D) => void, clicked: (x: number, y: number) => void};

const Canvas: React.FC<CanvasProps> = ({draw, clicked, ...props}) => {
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    context && draw(context);
  }, [draw]);
  
  const onClicked = (e: any) => {
    clicked(e.clientX, e.clientY);
  }

  return <canvas onClick={onClicked} width={props.width} height={props.height} ref={canvasRef}/>;
}

export default Canvas;