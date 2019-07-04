const fs = require("fs");
const chalk = require("chalk");

// Add command handler
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
  
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

// Remove command handler
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

// List command handler
const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse("Your notes"));

  notes.forEach(note => {
    console.log(note.title);
  });
};

// Read command handler
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

// Svae note at notes.json
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// Load notes from notes.json neither return empty array
const loadNotes = () => {
  try {
      const dataBuffer = fs.readFileSync("notes.json");
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
  } catch (e) {
      return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};