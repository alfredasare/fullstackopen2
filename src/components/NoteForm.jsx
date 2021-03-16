import {useState} from 'react';

const NoteForm = ({createNote}) => {
    const [newNote, setNewNote] = useState('');

    const handleChange = e => {
        setNewNote(e.target.value);
    };

    const addNote = e => {
        e.preventDefault();
        createNote({
            content: newNote,
            important: Math.random() > 0.5
        });

        setNewNote('');
    };

    return (
        <>
            <h2>Create a new note</h2>
            <form onSubmit={addNote}>
                <input type="text" value={newNote} onChange={handleChange}/>
                <button type="submit">save</button>
            </form>
        </>
    );
};

export default NoteForm;