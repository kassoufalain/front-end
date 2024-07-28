import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/notes.css'; // Import your notes CSS file if needed

interface Note {
  _id: string;
  description: string;
  status: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // State for theme
  const [completedCount, setCompletedCount] = useState(0); // State for completed count
  const [showFetchAll, setShowFetchAll] = useState(false); // State to control button visibility

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('unique_token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        const response = await axios.get('http://localhost:5000/api/notes/get', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setNotes(response.data);
      } catch (error) {
        setError('Failed to fetch notes');
      }
    };

    const fetchCompletedCount = async () => {
      try {
        const token = localStorage.getItem('unique_token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        const response = await axios.get('http://localhost:5000/api/notes/count-completed', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setCompletedCount(response.data.count);
      } catch (error) {
        setError('Failed to fetch completed count');
      }
    };

    fetchNotes();
    fetchCompletedCount();
  }, []);

  const fetchNotCompletedNotes = async () => {
    try {
      const token = localStorage.getItem('unique_token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await axios.get('http://localhost:5000/api/notes/get-not-completed', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setNotes(response.data);
      setShowFetchAll(true); // Show Fetch All Notes button
    } catch (error) {
      setError('Failed to fetch not completed notes');
    }
  };

  const fetchAllNotes = async () => {
    try {
      const token = localStorage.getItem('unique_token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await axios.get('http://localhost:5000/api/notes/get', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setNotes(response.data);
      setShowFetchAll(false); // Hide Fetch All Notes button and show Fetch Not Completed Notes button
    } catch (error) {
      setError('Failed to fetch all notes');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('unique_token');
    if (!token) {
      setError('Token is missing');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/notes/add',
        { description: newNote },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes([...notes, response.data.note]);
      setNewNote('');
    } catch (err) {
      setError('Failed to add note');
    }
  };

  const handleDeleteNote = async (id: string) => {
    const token = localStorage.getItem('unique_token');
    if (!token) {
      setError('Token is missing');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/notes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
      fetchCompletedCount();
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  const handleToggleComplete = async (id: string, status: string) => {
    const token = localStorage.getItem('unique_token');
    if (!token) {
      setError('Token is missing');
      return;
    }

    try {
      const newStatus = status === 'not completed' ? 'completed' : 'not completed';
      await axios.put(
        `http://localhost:5000/api/notes/update/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(notes.map((note) => (note._id === id ? { ...note, status: newStatus } : note)));
      fetchCompletedCount();
    } catch (err) {
      setError('Failed to update note');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme === 'light' ? 'light-mode' : 'dark-mode'}>
      <div className="header">
        <div className="logo">
          <h1>TO DO APP</h1>
          <p>Stop Procrastinating, Start Organizing</p>
        </div>
        <div className="icons">
          <button id="theme-toggle" className="theme-toggle" onClick={toggleTheme}>
            <img src="Untitled-1.png" alt="theme selector" />
          </button>
          <img className="icon user-profile" src="profile photo.png" alt="profile photo" />
        </div>
      </div>
      <div className="notes-container">
        <div className="top-section">
          <p className="completed-count">{completedCount} Completed</p>
          {error && <p className="error-message">{error}</p>}
          {showFetchAll ? (
            <button onClick={fetchAllNotes} className="fetch-all-notes">
              unhide completed
            </button>
          ) : (
            <button onClick={fetchNotCompletedNotes} className="fetch-not-completed">
              hide completed
            </button>
          )}
          <ul className="note-list">
            {notes.map((note) => (
              <li key={note._id} className="note-item">
                <input
                  type="checkbox"
                  checked={note.status === 'completed'}
                  onChange={() => handleToggleComplete(note._id, note.status)}
                />
                <span className={note.status === 'completed' ? 'completed' : ''}>
                  {note.description}
                </span>
                <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleAddNote} className="bottom-section">
          <input
            type="text"
            placeholder="New Note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            required
          />
          <button type="submit">Add Note</button>
        </form>
      </div>
    </div>
  );
};

export default Notes;
