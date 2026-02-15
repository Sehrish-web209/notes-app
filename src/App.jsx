import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  // State for notes and input
  const [notes, setNotes] = useState(() => {
    // Get notes from localStorage if available
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [noteText, setNoteText] = useState('');
  const inputRef = useRef(null);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const handleAddNote = () => {
    if (noteText.trim() === '') return; // Prevent empty note
    setNotes([...notes, noteText]);
    setNoteText('');
    inputRef.current.focus(); // focus input after adding
  };

  // Edit a note
  const handleEditNote = (index) => {
    const newText = prompt('Edit your note:', notes[index]);
    if (newText !== null && newText.trim() !== '') {
      const updatedNotes = [...notes];
      updatedNotes[index] = newText;
      setNotes(updatedNotes);
    }
  };

  // Delete a note
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Clear all notes
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notes?')) {
      setNotes([]);
    }
  };

  return (
    <div className="container">
      <h1>My Notes App</h1>

      <div className="input-section">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter note"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
        />
        <button onClick={handleAddNote}>Add</button>
      </div>

      {notes.length > 0 && (
        <div className="extra">
          <span>Total Notes: {notes.length}</span>
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      )}

      <ul className="notes-list">
        {notes.map((note, index) => (
          <li key={index}>
            <span>{note}</span>
            <div className="actions">
              <button onClick={() => handleEditNote(index)}>Edit</button>
              <button onClick={() => handleDeleteNote(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;