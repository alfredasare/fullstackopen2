import {useState, useEffect} from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import Note from './components/Note';
import './App.css';
import Notification from "./components/Notification";
import Footer from "./components/Footer";

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        noteService.getAll()
            .then(initialNotes => setNotes(initialNotes))
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
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

    const handleLogin = async e => {
        e.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            });
            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
            noteService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setErrorMessage('Wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const handleLogOut = () => {
        setUser(null);
        noteService.setToken(null);
        window.localStorage.removeItem('loggedNoteAppUser');
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

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input type="text" value={newNote} onChange={handleNoteChange}/>
            <button type="submit">save</button>
        </form>
    );

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>

            {/*{user === null && loginForm()}*/}
            {/*{user !== null && noteForm()}*/}

            {
                user === null
                    ? loginForm()
                    : <>
                        <p style={{'display': 'inline-block'}}>{user.name} logged in</p>
                        <button onClick={() => handleLogOut()}>logout</button>
                        {noteForm()}
                    </>
            }

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

            <Footer />
        </div>
    );
}

export default App;
