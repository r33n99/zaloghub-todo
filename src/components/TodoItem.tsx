import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item${todo.completed ? ' todo-item--completed' : ''}`}>
      <label className="todo-item__label">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-item__title">{todo.title}</span>
      </label>
      <button
        className="todo-item__delete"
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Удалить задачу «${todo.title}»`}
        title="Удалить"
      >
        ×
      </button>
    </li>
  );
}
