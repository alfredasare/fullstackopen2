import {useState} from 'react';
import './App.css';

const Display = ({counter}) => <div>{counter}</div>

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
);

function App() {
    const [counter, setCounter] = useState(0);

    const increaseByOne = () => setCounter(counter + 1)

    const setToZero = () => setCounter(0)

    const decreaseByOne = () => setCounter(counter - 1);

    return (
        <div>
            <Display counter={counter} />
            <Button handleClick={increaseByOne} text='plus'/>
            <Button handleClick={setToZero} text='zero' />
            <Button handleClick={decreaseByOne} text='minus' />
        </div>
    );
}

export default App;
