import {render, screen, fireEvent} from '@testing-library/react';
import {prettyDOM} from '@testing-library/dom';
import Note from './Note';

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    };

    const component = render(
        <Note note={note} />
    );

    //  method 1
    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    );

    const li = component.container.querySelector('li');
    console.log(prettyDOM(li));

    //  method 2
    expect(screen.getByText(/Component testing is done with react-testing-library/i)).toBeDefined();

    //  method 3
    // const div = component.container.querySelector('.note');
    // expect(div).toHaveTextContent(
    //     'Component testing is done with react-testing-library'
    // );
});

test('clicking the button calls event handler once', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    };

    const mockHandler = jest.fn();

    const component = render(
        <Note note={note} toggleImportance={mockHandler} />
    );

    const button = component.getByText(/make not important/i);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    // component.debug();
});