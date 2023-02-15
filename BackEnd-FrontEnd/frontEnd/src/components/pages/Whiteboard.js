import React, { useState, useRef, useEffect } from "react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [currentTool, setCurrentTool] = useState("line");
  const [isDrawing, setIsDrawing] = useState(false);
  const [undoHistory, setUndoHistory] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [shapeSize, setShapeSize] = useState(50);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
  }, []);

  const startDrawing = (event) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = event.nativeEvent;
    if (currentTool === "line") {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    } else {
      setShapes([
        ...shapes,
        {
          tool: currentTool,
          startX: offsetX,
          startY: offsetY,
          size: shapeSize,
        },
      ]);
    }
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    for (let i = 0; i < shapes.length; i++) {
      drawShape(shapes[i]);
    }
    if (currentTool === "line") {
      context.lineTo(offsetX, offsetY);
      context.stroke();
    } else {
      drawShape({
        tool: currentTool,
        startX: shapes[shapes.length - 1].startX,
        startY: shapes[shapes.length - 1].startY,
        endX: offsetX,
        endY: offsetY,
        size: shapeSize,
      });
    }
  };

  const drawShape = (shape) => {
    switch (shape.tool) {
      case "line":
        context.beginPath();
        context.moveTo(shape.startX, shape.startY);
        context.lineTo(shape.endX, shape.endY);
        context.stroke();
        break;
      case "rectangle":
        context.strokeRect(shape.startX, shape.startY, shape.size, shape.size);
        break;
      case "circle":
        context.beginPath();
        context.arc(shape.startX, shape.startY, shape.size / 2, 0, Math.PI * 2);
        context.stroke();
        break;
      case "triangle":
        const height = (shape.size * Math.sqrt(3)) / 2;
        context.beginPath();
        context.moveTo(shape.startX, shape.startY);
        context.lineTo(shape.endX, shape.endY);
        context.lineTo(shape.startX, shape.endY);
        context.closePath();
        context.stroke();
        break;
      // add more shapes here
      default:
        break;
    }
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    setUndoHistory([
      ...undoHistory,
      context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      ),
    ]);
  };

  const clear = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setShapes([]);
    setUndoHistory([]);
  };

  const undo = () => {
    if (undoHistory.length > 0) {
      const lastState = undoHistory[undoHistory.length - 1];
      setUndoHistory(undoHistory.slice(0, undoHistory.length - 1));
      context.putImageData(lastState, 0, 0);
    }
  };

  const resizeShape = (index, size) => {
    const updatedShapes = [...shapes];
    updatedShapes[index] = { ...updatedShapes[index], size };
    setShapes(updatedShapes);
    drawShapes(updatedShapes);
  };

  const drawShapes = (shapesToDraw) => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    for (let i = 0; i < shapesToDraw.length; i++) {
      drawShape(shapesToDraw[i]);
    }
  };

  const deleteShape = (index) => {
    const updatedShapes = shapes.filter((shape, i) => i !== index);
    setShapes(updatedShapes);
    drawShapes(updatedShapes);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={(event) => startDrawing(event)}
        onMouseMove={(event) => draw(event)}
        onMouseUp={finishDrawing}
      />
      <div>
        <button onClick={() => setCurrentTool("line")}>Line</button>
        <button onClick={() => setCurrentTool("rectangle")}>Rectangle</button>
        <button onClick={() => setCurrentTool("circle")}>Circle</button>
        <button onClick={() => setCurrentTool("triangle")}>Triangle</button>
        <button onClick={undo}>Undo</button>
        <button onClick={clear}>Clear</button>
        <input
          type="range"
          min="10"
          max="100"
          value={shapeSize}
          onChange={(event) => setShapeSize(parseInt(event.target.value))}
        />
        {/* add more shape buttons here */}
      </div>
      <div>
        {shapes.map((shape, index) => (
          <div key={index}>
            <button
              onClick={() => setCurrentTool(shape.tool)}
              disabled={isDrawing}
            >
              {shape.tool}
            </button>
            <input
              type="range"
              min="10"
              max="100"
              value={shape.size}
              onChange={(event) =>
                resizeShape(index, parseInt(event.target.value))
              }
            />
            <button onClick={() => deleteShape(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Whiteboard;
