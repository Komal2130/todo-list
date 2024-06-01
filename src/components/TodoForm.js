import React, { useState } from 'react';

export const TodoForm = ({ addTodo, sortTodos, filterTodos }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            addTodo(value);
            setValue('');
            setError('');
        } else {
            setError('Task cannot be empty.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="todo-input"
                placeholder='What is the task today?'
            />
            {error && <span className="error">{error}</span>}
            <div className="dropdown">
                <select onChange={(e) => {
                    const [type, value] = e.target.value.split(':');
                    if (type === 'sort') {
                        sortTodos(value);
                    } else if (type === 'filter') {
                        filterTodos(value);
                    }
                }}>
                    <option value="">Options</option>
                    <option value="sort:alphabeticalAsc">Sort A-Z</option>
                    <option value="sort:alphabeticalDesc">Sort Z-A</option>
                    {/* <option value="sort:date">Sort by Date (Asc)</option>
                    <option value="sort:dateDesc">Sort by Date (Desc)</option> */}
                    <option value="filter:completed">Show Completed</option>
                    <option value="filter:incompleted">Show Incompleted</option>
                </select>
            </div>
            <button type="submit" className='todo-btn'>Add Task</button>
        </form>
    );
};