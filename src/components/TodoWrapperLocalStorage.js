import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

uuidv4();

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
    };

    const toggleComplete = (id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(newTodos);
    };

    const deleteTodo = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    };

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);
        setTodos(newTodos);
    };

    const sortTodos = (type) => {
        let sortedTodos = [...todos];
        if (type === 'alphabetical') {
            sortedTodos.sort((a, b) => a.task.localeCompare(b.task));
        } else if (type === 'completed') {
            sortedTodos.sort((a, b) => b.completed - a.completed);
        }
        setTodos(sortedTodos);
    };

    const filterTodos = (status) => {
        setFilter(status);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') {
            return todo.completed;
        } else if (filter === 'incompleted') {
            return !todo.completed;
        }
        return true;
    });

    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} sortTodos={sortTodos} filterTodos={filterTodos} />
            {filteredTodos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
                ) : (
                    <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )
            ))}
        </div>
    );
};