import {useState, useEffect} from 'react';
import noteService from './services/notes';
import Note from './components/Note';
import './App.css';
import Notification from "./components/Notification";
import Footer from "./components/Footer";

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        noteService.getAll()
            .then(initialNotes => setNotes(initialNotes))
    }, []);

    const addNote = e => {
        e.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        };

        noteService.create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
                setNewNote('');
            })
    };

    const handleNoteChange = e => {
        setNewNote(e.target.value);
    };

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important);

    const toggleImportanceOf = id => {
        const note = notes.find(note => note.id === id);
        const changedNote = {...note, important: !note.important};

        noteService.update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote));
            })
            .catch(error => {
                setErrorMessage(`Note '${note.content}' was already removed from server`);
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            });
    };

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important': 'all'}
                </button>
            </div>
            <ul>
                {
                    notesToShow.map(note => (
                        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
                    ))
                }
            </ul>
            <form onSubmit={addNote}>
                <input type="text" value={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    );
}

export default App;
