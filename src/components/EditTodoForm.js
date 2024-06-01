import React, {useState} from 'react';

export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            editTodo(value, task.id);
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
                placeholder='Update task' 
            />
            {error && <span className="error">{error}</span>}
            <button type="submit" className='todo-btn'>Update Task</button>
        </form>
    );
};