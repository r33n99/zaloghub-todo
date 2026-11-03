import { useState } from 'react';
import { FilterBar } from './components/FilterBar';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './hooks/useTodos';
import type { Filter } from './types';

const EMPTY_MESSAGES: Record<Filter, string> = {
  all: 'Задач пока нет — добавьте первую.',
  active: 'Активных задач нет.',
  completed: 'Выполненных задач нет.',
};

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <main className="app">
      <h1 className="app__title">Список задач</h1>

      <TodoForm onAdd={addTodo} />
      <FilterBar current={filter} onChange={setFilter} />

      {visibleTodos.length > 0 ? (
        <ul className="todo-list">
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      ) : (
        <p className="empty">{EMPTY_MESSAGES[filter]}</p>
      )}

      {todos.length > 0 && (
        <footer className="app__footer">
          <span>Осталось: {activeCount}</span>
          {completedCount > 0 && (
            <button type="button" className="link-button" onClick={clearCompleted}>
              Очистить выполненные
            </button>
          )}
        </footer>
      )}
    </main>
  );
}
