import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './todo-list';


test('adds a new todo',  () => {
    render(<TodoList />);
   
    const input = screen.getByRole('textbox', { hidden: true });
    const button = screen.getByText('Добавить');
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.click(button);
    expect(screen.getByText('New todo')).toBeInTheDocument();
});
test('marks a todo as complete', () => {
    render(<TodoList />);
    const input = screen.getByRole('textbox', { hidden: true });
    const button = screen.getByText('Добавить');
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.click(button);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
});

test('filters todos', () => {
    render(<TodoList />);
    const input = screen.getByRole('textbox', { hidden: true });
    const button = screen.getByText('Добавить');
    fireEvent.change(input, { target: { value: 'Todo 1' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: 'Todo 2' } });
    fireEvent.click(button);
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);
    const activeFilterButton = screen.getByText('Незавершенные');
    fireEvent.click(activeFilterButton);
    expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
});