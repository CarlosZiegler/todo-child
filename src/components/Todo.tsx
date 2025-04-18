"use client";

import { useState } from "react";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        🌟 My Fun Tasks! 🌟
      </h1>

      <div className="flex w-full mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What do you want to do today?"
          className="flex-grow p-3 text-lg border-2 border-indigo-300 rounded-l-lg focus:outline-none focus:border-indigo-500"
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          onClick={addTodo}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-r-lg transition-colors"
        >
          Add
        </button>
      </div>

      <ul className="w-full space-y-3">
        {todos.length === 0 ? (
          <li className="text-center text-gray-500 py-4 text-lg">
            Let&apos;s add some fun tasks! 🎮 📚 🎨
          </li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center p-4 border-2 rounded-lg shadow-sm transition-colors ${
                todo.completed
                  ? "border-green-300 bg-green-50"
                  : "border-indigo-200 bg-white"
              }`}
            >
              <button
                onClick={() => toggleComplete(todo.id)}
                className={`w-8 h-8 mr-4 flex-shrink-0 rounded-full border-2 transition-colors ${
                  todo.completed
                    ? "bg-green-400 border-green-500"
                    : "border-indigo-400"
                }`}
                aria-label={
                  todo.completed ? "Mark as not done" : "Mark as done"
                }
              >
                {todo.completed && (
                  <span className="text-white flex justify-center items-center font-bold">
                    ✓
                  </span>
                )}
              </button>
              <span
                className={`flex-grow text-xl ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-2 text-red-500 hover:text-red-700 transition-colors font-bold text-xl"
                aria-label="Delete task"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>

      {todos.length > 0 &&
        todos.filter((todo) => todo.completed).length === todos.length && (
          <div className="mt-6 text-center">
            <span className="text-2xl">🎉</span>
            <p className="text-xl font-bold text-green-600 mt-2">
              Amazing job! All tasks complete!
            </p>
          </div>
        )}
    </div>
  );
}
