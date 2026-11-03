import { useState, type FormEvent } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => boolean;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const isEmpty = title.trim() === '';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onAdd(title)) setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-form__input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Что нужно сделать?"
        aria-label="Название задачи"
        maxLength={200}
        autoFocus
      />
      <button className="todo-form__button" type="submit" disabled={isEmpty}>
        Добавить
      </button>
    </form>
  );
}
