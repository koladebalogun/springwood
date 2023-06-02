import React, { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import { auth } from "../firebaseConfig";
// import { debounce } from "lodash";
import { debouncedDrawPath, drawPath } from "../utils/canvasUtils";

const Canvas = () => {
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const isDrawing = useRef(false);
  const [drawingData, setDrawingData] = useState(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushWidth, setBrushWidth] = useState(5);
  const [selectedTool, setSelectedTool] = useState("brush");
  const [selectedShape, setSelectedShape] = useState("");
  const [isEraserEnabled, setIsEraserEnabled] = useState(false);
  const canvasContextRef = useRef(null);

  const getCurrentUserId = () => {
    if (auth?.currentUser) {
      return auth.currentUser.uid;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvasContextRef.current = context;

    context.strokeStyle = brushColor;
    context.lineWidth = brushWidth;
    context.lineCap = "round";

    socketRef.current = io("http://localhost:4000");

    socketRef.current.on("draw", (data) => {
      const pathData = JSON.parse(data);
      debouncedDrawPath(context, pathData);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [brushColor, brushWidth, debouncedDrawPath]);


  const handleMouseDown = useCallback(
    (event) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      isDrawing.current = true;

      if (
        selectedTool === "brush" ||
        (selectedTool === "eraser" && isEraserEnabled)
      ) {
        const pathData = {
          startX: x,
          startY: y,
          points: [{ x, y }],
        };
        setDrawingData(pathData);
      }
    },
    [isEraserEnabled, selectedTool]
  );

  const handleMouseMove = useCallback(
    (event) => {
      if (!isDrawing.current) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (
        selectedTool === "brush" ||
        (selectedTool === "eraser" && isEraserEnabled)
      ) {
        const updatedDrawingData = { ...drawingData };
        updatedDrawingData.points.push({ x, y });
        setDrawingData(updatedDrawingData);
        drawPath(canvasContextRef.current, updatedDrawingData);

        if (selectedTool === "brush") {
          socketRef.current.emit("draw", JSON.stringify(updatedDrawingData));
        }
      }
    },
    [drawingData, drawPath, isEraserEnabled, selectedTool]
  );

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const handleColorChange = useCallback((event) => {
    setBrushColor(event.target.value);
  }, []);

  const handleBrushSizeChange = useCallback((event) => {
    setBrushWidth(Number(event.target.value));
  }, []);

  const handleToolChange = useCallback((event) => {
    setSelectedTool(event.target.value);
    setIsEraserEnabled(event.target.value === "eraser");
  }, []);

  const handleShapeChange = useCallback((event) => {
    setSelectedShape(event.target.value);
  }, []);

  const handleCanvasClick = useCallback(
    (event) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (selectedTool === "eraser" && !isEraserEnabled) return;

      if (selectedTool === "shape") {
        if (selectedShape === "rectangle") {
          canvasContextRef.current.fillStyle = brushColor;
          canvasContextRef.current.fillRect(x, y, 100, 100);
        } else if (selectedShape === "circle") {
          canvasContextRef.current.fillStyle = brushColor;
          canvasContextRef.current.beginPath();
          canvasContextRef.current.arc(x, y, 50, 0, 2 * Math.PI);
          canvasContextRef.current.fill();
        }
      }
    },
    [brushColor, isEraserEnabled, selectedShape, selectedTool]
  );

  const handleSaveDrawing = useCallback(async () => {
    try {
      const userId = getCurrentUserId();

      if (userId && drawingData) {
        const response = await fetch("http://localhost:4000/api/canvas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ drawingData, userId }),
        });

        if (response.ok) {
          console.log("Drawing saved successfully.");
        } else {
          console.error("Failed to save drawing.");
        }
      } else {
        console.error("User not logged in or no drawing data available.");
      }
    } catch (error) {
      console.error("Failed to save drawing:", error);
    }
  }, [drawingData, getCurrentUserId]);

  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }} className="canvasWrapper">
        <h1>Real-time Collaborative Drawing</h1>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleCanvasClick}
          className="canvas"
        />

        <div className="tools">
          <div className="tools-inner">
            <label htmlFor="brushColor">Brush Color:</label>
            <input
              type="color"
              id="brushColor"
              value={brushColor}
              onChange={handleColorChange}
            />
          </div>
          <div className="tools-inner">
            <label htmlFor="brushSize">Brush Size:</label>
            <input
              type="number"
              id="brushSize"
              value={brushWidth}
              onChange={handleBrushSizeChange}
            />
          </div>
          <div className="tools-inner">
            <label htmlFor="tool">Tool:</label>
            <select id="tool" value={selectedTool} onChange={handleToolChange}>
              <option value="brush">Brush</option>
              <option value="eraser">Eraser</option>
              <option value="shape">Shape</option>
            </select>
          </div>
        </div>

        {selectedTool === "shape" && (
          <div>
            <label htmlFor="shape">Shape:</label>
            <select
              id="shape"
              value={selectedShape}
              onChange={handleShapeChange}
            >
              <option value="">Select Shape</option>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
            </select>
          </div>
        )}


        <button onClick={handleSaveDrawing} className="saveBtn">Save Drawing</button>
      </div>
    </div>
  );
};

export default Canvas;
