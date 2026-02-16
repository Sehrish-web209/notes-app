import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [noteText, setNoteText] = useState('');
  const [editIndex, setEditIndex] = useState(null); // new state for edit
  const inputRef = useRef(null);

  // Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Add or update note
  const handleAddOrUpdateNote = () => {
    if (noteText.trim() === '') return;

    if (editIndex !== null) {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = noteText;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      // Add new note
      setNotes([...notes, noteText]);
    }

    setNoteText('');
    inputRef.current.focus(); // auto focus
  };

  const handleEditNote = (index) => {
    setNoteText(notes[index]);
    setEditIndex(index);
    inputRef.current.focus(); // focus input while editing
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

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
          onKeyDown={(e) => e.key === 'Enter' && handleAddOrUpdateNote()}
        />
        <button onClick={handleAddOrUpdateNote}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
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