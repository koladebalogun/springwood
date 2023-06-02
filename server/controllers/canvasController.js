const Canvas = require("../models/canvasModel");
const mongoose = require("mongoose");

const saveDrawing = async (req, res) => {
  try {
    const { drawingData, userId } = req.body;

    if (!drawingData || !userId) {
      return res.status(400).json({ error: "Invalid request payload." });
    }

    const drawing = new Canvas({ drawingData: JSON.stringify(drawingData), userId });
    await drawing.save();
    res.status(201).json({ message: "Drawing saved successfully." });
  } catch (error) {
    console.error("Failed to save drawing:", error);
    res.status(500).json({ error: "Failed to save drawing." });
  }
};



const getDrawing = async (req, res) => {
  try {
    const userId = req.params.userId;
    const drawing = await Canvas.findOne({ userId });
    if (!drawing) {
      res.status(404).json({ message: "Drawing not found." });
    } else {
      res.status(200).json({ drawing });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve drawing." });
  }
};

module.exports={
    saveDrawing,
    getDrawing
}
