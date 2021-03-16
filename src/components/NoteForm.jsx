const NoteForm = ({onSubmit, handleChange, value}) => {

    return (
        <>
            <h2>Create a new note</h2>
            <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={handleChange}/>
                <button type="submit">save</button>
            </form>
        </>
    );
};

export default NoteForm;