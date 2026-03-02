'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Trash2, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import api from '../config/axios';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'alta' | 'média' | 'baixa';
  dueDate: string;
}

interface ApiList {
  id?: number | string;
  uuid?: string;
  title?: string;
  name?: string;
  nome?: string;
  description?: string;
  descricao?: string;
  completed?: boolean;
  concluida?: boolean;
  priority?: string;
  prioridade?: string;
  dueDate?: string;
  due_date?: string;
  dataLimite?: string;
}

const today = new Date().toISOString().split('T')[0];

const normalizePriority = (value: unknown): Task['priority'] => {
  if (typeof value !== 'string') return 'média';
  const priority = value.trim().toLowerCase();

  if (priority === 'alta') return 'alta';
  if (priority === 'baixa') return 'baixa';
  return 'média';
};

const extractListsPayload = (payload: unknown): ApiList[] => {
  if (Array.isArray(payload)) return payload as ApiList[];
  if (payload && typeof payload === 'object') {
    const response = payload as Record<string, unknown>;

    if (Array.isArray(response.lists)) return response.lists as ApiList[];
    if (Array.isArray(response.data)) return response.data as ApiList[];
    if (response.data && typeof response.data === 'object') {
      const nestedData = response.data as Record<string, unknown>;
      if (Array.isArray(nestedData.lists)) return nestedData.lists as ApiList[];
    }
  }

  return [];
};

const extractCreatedListPayload = (payload: unknown): ApiList | null => {
  if (payload && typeof payload === 'object') {
    const response = payload as Record<string, unknown>;

    if (response.list && typeof response.list === 'object') return response.list as ApiList;
    if (response.data && typeof response.data === 'object') return response.data as ApiList;
    return response as ApiList;
  }

  return null;
};

const mapApiListToTask = (item: ApiList, index: number): Task => {
  const id = String(item.id ?? item.uuid ?? `temp-${index + 1}`);
  const title = item.title || item.name || item.nome || `Lista ${index + 1}`;

  return {
    id,
    title,
    description: item.description || item.descricao || '',
    completed: Boolean(item.completed ?? item.concluida),
    priority: normalizePriority(item.priority ?? item.prioridade),
    dueDate: item.dueDate || item.due_date || item.dataLimite || today,
  };
};

export default function ListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingTaskIds, setDeletingTaskIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await api.get('/lists');

        const parsedLists = extractListsPayload(response.data);
        setTasks(parsedLists.map(mapApiListToTask));
      } catch {
        setErrorMessage('Não foi possível carregar as listas do backend.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLists();
  }, []);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = async (id: string) => {
    if (deletingTaskIds.includes(id)) return;

    try {
      setErrorMessage(null);
      setDeletingTaskIds((previousIds) => [...previousIds, id]);

      await api.delete(`/lists/${id}`);
      setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
    } catch {
      console.error(`Erro ao deletar a lista com id ${id}`);
      setErrorMessage('Não foi possível deletar a lista no backend.');
    } finally {
      setDeletingTaskIds((previousIds) => previousIds.filter((taskId) => taskId !== id));
    }
  };

  const addTask = async () => {
    const title = newTask.trim();
    if (!title) return;

    try {
      setIsCreating(true);
      setErrorMessage(null);

      const response = await api.post('/lists', { title });
      const createdItem = extractCreatedListPayload(response.data);

      if (createdItem) {
        setTasks((previousTasks) => [
          ...previousTasks,
          mapApiListToTask(createdItem, previousTasks.length),
        ]);
      } else {
        setTasks((previousTasks) => [
          ...previousTasks,
          {
            id: `temp-${Date.now()}`,
            title,
            description: '',
            completed: false,
            priority: 'média',
            dueDate: today,
          },
        ]);
      }

      setNewTask('');
    } catch {
      setErrorMessage('Não foi possível criar a lista no backend.');
    } finally {
      setIsCreating(false);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const completedPercentage = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'bg-red-100 text-red-700';
      case 'média':
        return 'bg-yellow-100 text-yellow-700';
      case 'baixa':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-green-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-green-600 hover:text-green-700 transition">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Minhas Tarefas</h1>
              <p className="text-sm text-gray-600">Acompanhe seu progresso</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Progresso</p>
            <p className="text-2xl font-bold text-green-600">{completedPercentage}%</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
            <p className="text-gray-600 text-sm mb-2">Total de Tarefas</p>
            <p className="text-4xl font-bold text-green-600">{tasks.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
            <p className="text-gray-600 text-sm mb-2">Concluídas</p>
            <p className="text-4xl font-bold text-green-600">{completedCount}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
            <p className="text-gray-600 text-sm mb-2">Pendentes</p>
            <p className="text-4xl font-bold text-green-600">{tasks.length - completedCount}</p>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              disabled={isCreating}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Adicione uma nova tarefa..."
              className="flex-1 px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-400 focus:outline-none bg-green-50 text-gray-900 placeholder-gray-500 transition"
            />
            <button
              onClick={addTask}
              disabled={isCreating}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              {isCreating ? 'Adicionando...' : 'Adicionar'}
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Carregando listas...</p>
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{errorMessage}</p>
            </div>
          )}

          {!isLoading && !errorMessage && tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Nenhuma tarefa ainda. Crie uma para começar!</p>
            </div>
          ) : !isLoading && !errorMessage ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-2xl p-6 shadow-sm border border-green-100 transition ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-1 text-green-600 hover:text-green-700 transition flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className={`text-lg font-semibold ${
                          task.completed
                            ? 'line-through text-gray-500'
                            : 'text-gray-900'
                        }`}
                      >
                        {task.title}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                    )}

                    <p className="text-xs text-gray-500">
                      Data limite: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    disabled={deletingTaskIds.includes(task.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : null}
        </div>
      </main>
    </div>
  );
}
