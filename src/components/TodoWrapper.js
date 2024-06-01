import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
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
        setTodos([
            ...todos,
            { id: uuidv4(), task: todo, completed: false, isEditing: false },
        ]);
    };

    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const toggleComplete = (id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    const editTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    const editTask = (task, id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
            )
        );
    };

    const sortTodos = (type) => {
        let sortedTodos = [...todos];
        if (type === 'alphabeticalAsc') {
            sortedTodos.sort((a, b) => a.task.localeCompare(b.task));
        } else if (type === 'alphabeticalDesc') {
            sortedTodos.sort((a, b) => b.task.localeCompare(a.task));
        }
        // } else if (type === 'dateAsc') {
        //     sortedTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        // } else if (type === 'dateDesc') {
        //     sortedTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // }
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
        <div className="TodoWrapper">
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} sortTodos={sortTodos} filterTodos={filterTodos} />
            {/* <button onClick={() => setFilter('completed')}>Completed</button> */}
            
            {filteredTodos.map((todo) =>
                todo.isEditing ? (
                    <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
                ) : (
                    <Todo
                        key={todo.id}
                        task={todo}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        toggleComplete={toggleComplete}
                    />
                )
            )}
        </div>
    );
};