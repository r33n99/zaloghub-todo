import { useEffect, useState } from 'react';
import type { Todo } from '../types';

const STORAGE_KEY = 'zaloghub-todos';

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.completed === 'boolean' &&
    typeof item.createdAt === 'number'
  );
}

// Битые или чужие данные в localStorage не должны ронять приложение
function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isTodo) : [];
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Хранилище недоступно (приватный режим, переполнение) — работаем в памяти
    }
  }, [todos]);

  const addTodo = (title: string): boolean => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return false;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    return true;
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted };
}
