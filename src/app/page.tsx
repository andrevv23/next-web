'use client';

import { useEffect, useState } from 'react';

type Todo = { id: number; title: string; createdAt: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch(`${API_URL}/todos`);
      if (!res.ok) throw new Error('Erro ao carregar tarefas');
      const data = await res.json();
      setTodos(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado');
      }
    }
  }

  async function add() {
    if (!newTitle.trim()) return;
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) throw new Error('Erro ao adicionar tarefa');
      setNewTitle('');
      load();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado');
      }
    }
  }

  async function remove(id: number) {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao remover tarefa');
      load();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado');
      }
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To‑Do List</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2 rounded"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button
          onClick={add}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((t) => (
          <li key={t.id} className="flex justify-between items-center">
            <span>{t.title}</span>
            <button
              onClick={() => remove(t.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}