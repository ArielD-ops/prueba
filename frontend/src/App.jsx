// Note-Taking App
// A small interface for creating, editing, archiving, and tagging notes.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // Main statuses
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [tags, setTags] = useState([]);
  // — Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [newTag, setNewTag] = useState('');
  // Current view and note being edited
  const [view, setView] = useState('active');
  const [editingNote, setEditingNote] = useState(null);

  const API_URL = 'http://localhost:3000/notes';
  
  // When mounting the component, we load notes and labels.
  useEffect(() => {
    fetchNotes();
    fetchTags();
  }, []);

  // Get lists of active and archived notes from the server.
  const fetchNotes = async () => {
    const active = await axios.get(`${API_URL}`);
    const archived = await axios.get(`${API_URL}/archived`);
    setNotes(active.data);
    setArchivedNotes(archived.data);
  };

  // Retrieves all available tags.
  const fetchTags = async () => {
    const response = await axios.get(`${API_URL}/tags`);
    setTags(response.data);
  };

  // If editingNote exists, update; if not, create a new note.
  const createOrUpdateNote = async () => {
    if (editingNote) {
      await axios.put(`${API_URL}/${editingNote.id}`, { title, content, isArchived: editingNote.isArchived });
      setEditingNote(null);
    } else {
      await axios.post(API_URL, { title, content });
    }
    // Reset form fields after creating or updating a note.
    setTitle('');
    setContent('');
    fetchNotes();
  };

  const editNote = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchNotes();
  };

  const toggleArchive = async (note) => {
    await axios.put(`${API_URL}/${note.id}`, { title: note.title, content: note.content, isArchived: !note.isArchived });
    fetchNotes();
  };

  // Add a new tag to a specific note.
  const addTag = async (noteId) => {
    if (newTag) {
      await axios.post(`${API_URL}/${noteId}/tags`, { tagName: newTag });
      setNewTag('');
      fetchNotes();
      fetchTags();
    }
  };
  // Remove a tag from a specific note.
  // This function will call the API to delete the tag from the note.
  const removeTag = async (noteId, tagId) => {
    await axios.delete(`${API_URL}/${noteId}/tags/${tagId}`);
    fetchNotes();
  };

  // Filter notes showing only those with the selected tag.
  const filterByTag = async (tagId) => {
    setView(tagId);
    const response = await axios.get(`${API_URL}/tags/${tagId}`);
    setNotes(response.data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Note-Taking App</h1>
      {/* Form to create or update a note */}
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
        />
        <textarea
          className="border p-2 w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note Content"
        />
        <button
          className="bg-blue-500 text-white p-2 mt-2"
          onClick={createOrUpdateNote}
        >
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
      </div>

      {/* Controls to switch views: active, archived, or by label */}
      <div className="mb-4">
        <button
          className={`mr-2 p-2 ${view === 'active' ? 'bg-gray-200' : ''}`}
          onClick={() => { setView('active'); fetchNotes(); }}
        >
          Active Notes
        </button>
        <button
          className={`mr-2 p-2 ${view === 'archived' ? 'bg-gray-200' : ''}`}
          onClick={() => { setView('archived'); fetchNotes(); }}
        >
          Archived Notes
        </button>
        {tags.map(tag => (
          <button
            key={tag.id}
            className={`mr-2 p-2 ${view === tag.id ? 'bg-gray-200' : ''}`}
            onClick={() => filterByTag(tag.id)}
          >
            {tag.name}
          </button>
        ))}
      </div>

        {/* List of notes according to the active view */}
      <div>
        <h2 className="text-xl font-bold mb-2">
          {view === 'active' ? 'Active Notes' : view === 'archived' ? 'Archived Notes' : 'Filtered Notes'}
        </h2>
        {(view === 'archived' ? archivedNotes : notes).map(note => (
          <div key={note.id} className="border p-4 mb-2">
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <div>
              Tags: {note.tags?.map(tag => (
                <span key={tag.id} className="mr-2">
                  {tag.name}
                  <button
                    className="text-red-500 ml-1"
                    onClick={() => removeTag(note.id, tag.id)}
                  >
                    x
                  </button>
                </span>
              ))}
              <input
                className="border p-1"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add Tag"
              />
              <button
                className="bg-green-500 text-white p-1 ml-2"
                onClick={() => addTag(note.id)}
              >
                Add
              </button>
            </div>
            <button
              className="bg-yellow-500 text-white p-2 mr-2"
              onClick={() => editNote(note)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 mr-2"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
            <button
              className="bg-gray-500 text-white p-2"
              onClick={() => toggleArchive(note)}
            >
              {note.isArchived ? 'Unarchive' : 'Archive'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;