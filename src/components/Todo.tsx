"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Custom hook for todo management
const useTodoManager = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = useCallback(() => {
    if (inputValue.trim()) {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
          createdAt: new Date(),
        },
      ]);
      setInputValue("");
    }
  }, [inputValue]);

  const toggleComplete = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      // Sort by completion status first
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then by creation time (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [todos]);

  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    return {
      total: todos.length,
      completed,
      remaining: todos.length - completed,
      isAllCompleted: todos.length > 0 && completed === todos.length,
    };
  }, [todos]);

  return {
    todos: sortedTodos,
    inputValue,
    setInputValue,
    addTodo,
    toggleComplete,
    deleteTodo,
    stats,
  };
};

// TodoItem component
const TodoItemComponent = ({
  todo,
  onToggle,
  onDelete,
}: {
  todo: TodoItem;
  onToggle: () => void;
  onDelete: () => void;
}) => (
  <motion.li
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.2 }}
    className={`flex items-center p-4 border-2 rounded-lg shadow-sm ${
      todo.completed
        ? "border-green-300 bg-green-50"
        : "border-indigo-200 bg-white"
    }`}
  >
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`w-8 h-8 mr-4 flex-shrink-0 rounded-full border-2 transition-all ${
        todo.completed ? "bg-green-400 border-green-500" : "border-indigo-400"
      }`}
      aria-label={todo.completed ? "Mark as not done" : "Mark as done"}
    >
      <AnimatePresence>
        {todo.completed && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-white flex justify-center items-center font-bold"
          >
            ✓
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>

    <span
      className={`flex-grow text-xl transition-all ${
        todo.completed ? "line-through text-gray-500" : "text-gray-800"
      }`}
    >
      {todo.text}
    </span>

    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onDelete}
      className="ml-2 text-red-500 hover:text-red-700 transition-colors font-bold text-xl"
      aria-label="Delete task"
    >
      ✕
    </motion.button>
  </motion.li>
);

// Main component
export default function Todo() {
  const {
    todos,
    inputValue,
    setInputValue,
    addTodo,
    toggleComplete,
    deleteTodo,
    stats,
  } = useTodoManager();

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold mb-6 text-center text-indigo-600"
      >
        🌟 My Fun Tasks! 🌟
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex w-full mb-6 shadow-md rounded-lg overflow-hidden"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What do you want to do today?"
          className="flex-grow p-3 text-lg border-y-2 border-l-2 border-indigo-300 rounded-l-lg focus:outline-none focus:border-indigo-500"
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addTodo}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-r-lg transition-colors"
        >
          Add
        </motion.button>
      </motion.div>

      {stats.total > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full mb-4 flex justify-between text-sm text-gray-500"
        >
          <span>{stats.total} total</span>
          <span>{stats.remaining} remaining</span>
        </motion.div>
      )}

      <AnimatePresence>
        {todos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full text-center"
          >
            <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-200">
              <p className="text-gray-500 py-4 text-lg">
                Let&apos;s add some fun tasks! 🎮 📚 🎨
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.ul layout className="w-full space-y-3">
            <AnimatePresence initial={false}>
              {todos.map((todo) => (
                <TodoItemComponent
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleComplete(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stats.isAllCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center bg-green-50 p-4 rounded-lg border-2 border-green-200 w-full"
          >
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: [0.5, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-3xl inline-block"
            >
              🎉
            </motion.span>
            <p className="text-xl font-bold text-green-600 mt-2">
              Amazing job! All tasks complete!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
