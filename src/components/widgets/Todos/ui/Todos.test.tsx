import {render} from '@testing-library/react';
import {fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Todos from './Todos';

describe('Todos', () => {
  test('should render', () => {
    render(<Todos/>);

    expect(screen.getByTestId('emptyTodos')).toBeInTheDocument();
  });

  test('should created todo', () => {
    render(<Todos/>);

    const inputElement = screen.getByTestId('input');
    const value = 'TODO';

    fireEvent.change(inputElement, { target: { value: value } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    const label = screen.getByTestId('checkbox-label');

    expect(label).toBeInTheDocument();
    expect(label.textContent).toBe(value);
  });

  test('should cleared completed todos', () => {
    render(<Todos/>);

    const inputElement = screen.getByTestId('input');
    const value = 'TODO';

    fireEvent.change(inputElement, { target: { value: value } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    const label = screen.getByTestId('checkbox-label');

    const checkbox = screen.getByTestId(`checkbox-${value}`);
    fireEvent.click(checkbox);

    const clear = screen.getByTestId('clear');
    fireEvent.click(clear);

    expect(label).not.toBeInTheDocument();
  });

  test('check selectors', () => {
    render(<Todos/>);

    const inputElement = screen.getByTestId('input');
    const value = "Todo";

    fireEvent.change(inputElement, { target: { value: value } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    const todo = screen.getByText(value);

    expect(todo).toBeInTheDocument();

    const checkbox = screen.getByTestId(`checkbox-${value}`);
    fireEvent.click(checkbox);

    const activeSelector = screen.getByTestId('Active');
    fireEvent.click(activeSelector);

    expect(todo).not.toBeInTheDocument();
  });
});