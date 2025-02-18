const Characters = require("../models/Characters");
const messages = require("../utils/messages");
const mongoose = require("mongoose");

// GET all characters
exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Characters.find({})
      .populate("house", "name")
      .select("-__v");

    if (!characters.length) {
      return res.status(404).json({
        success: false,
        message: messages.noCharactersFound,
      });
    }

    res.status(200).json({
      data: characters,
      success: true,
      message: `${req.method} - Retrieved all characters.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.serverError,
      error: error.message,
    });
  }
};

// GET character by ID
exports.getCharacterByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: messages.invalidCharacterId,
      });
    }

    const character = await Characters.findById(id)
      .populate("house", "name")
      .select("-__v");

    if (!character) {
      return res.status(404).json({
        success: false,
        message: messages.characterNotFound(id),
      });
    }

    res.status(200).json({
      data: character,
      success: true,
      message: `${req.method} - Retrieved specific character.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.serverError,
      error: error.message,
    });
  }
};

// POST (create character)
exports.createCharacter = async (req, res) => {
  try {
    const { name, age, house, year, bloodPurity, wand } = req.body;

    if (!name || !age || !house || !year || !bloodPurity || !wand) {
      return res.status(400).json({
        success: false,
        message: messages.missingFields,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(house)) {
      return res.status(400).json({
        success: false,
        message: messages.invalidHouseId,
      });
    }

    const existingCharacter = await Characters.findOne({ name });
    if (existingCharacter) {
      return res.status(400).json({
        success: false,
        message: messages.characterExists,
      });
    }

    const newCharacter = await Characters.create(req.body);

    res.status(201).json({
      data: newCharacter,
      success: true,
      message: messages.characterCreated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.characterCreationFailed,
      error: error.message,
    });
  }
};

// PUT/PATCH (update character)
exports.updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID param:", JSON.stringify(id), "Length:", id.length);
    console.log("Request body:", req.body);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: messages.invalidCharacterId,
      });
    }
    const character = await Characters.findByIdAndUpdate(id, req.body, {
      new: true,          
      runValidators: true 
    });
    if (!character) {
      return res.status(404).json({
        success: false,
        message: messages.characterNotFound(id),
      });
    }
    res.status(200).json({
      data: character,
      success: true,
      message: messages.characterUpdated,
    });
  } catch (error) {
    console.error("Error updating character:", error);
    res.status(500).json({
      success: false,
      message: messages.characterUpdateFailed,
      error: error.message,
    });
  }
};

// DELETE character
exports.deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: messages.invalidCharacterId,
      });
    }

    const deleted = await Characters.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: messages.characterNotFound(id),
      });
    }

    res.status(200).json({
      data: deleted,
      success: true,
      message: messages.characterDeleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.characterDeleteFailed,
      error: error.message,
    });
  }
};
