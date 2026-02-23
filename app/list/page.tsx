'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'alta' | 'média' | 'baixa';
  dueDate: string;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Implementar autenticação',
    description: 'Adicionar sistema de login e registro de usuários',
    completed: true,
    priority: 'alta',
    dueDate: '2026-02-25',
  },
  {
    id: 2,
    title: 'Criar página de dashboard',
    description: 'Desenvolver interface principal do aplicativo',
    completed: false,
    priority: 'alta',
    dueDate: '2026-02-26',
  },
  {
    id: 3,
    title: 'Integrar API de tarefas',
    description: 'Conectar backend com o frontend',
    completed: false,
    priority: 'média',
    dueDate: '2026-02-28',
  },
  {
    id: 4,
    title: 'Adicionar testes unitários',
    description: 'Criar testes para os componentes principais',
    completed: true,
    priority: 'média',
    dueDate: '2026-03-01',
  },
  {
    id: 5,
    title: 'Documentar API',
    description: 'Escrever documentação das endpoints da API',
    completed: false,
    priority: 'baixa',
    dueDate: '2026-03-05',
  },
];

export default function ListPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTask, setNewTask] = useState('');

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Math.max(...tasks.map(t => t.id), 0) + 1,
        title: newTask,
        description: '',
        completed: false,
        priority: 'média',
        dueDate: new Date().toISOString().split('T')[0],
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const completedPercentage = Math.round((completedCount / tasks.length) * 100);

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
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Adicione uma nova tarefa..."
              className="flex-1 px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-400 focus:outline-none bg-green-50 text-gray-900 placeholder-gray-500 transition"
            />
            <button
              onClick={addTask}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Adicionar
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Nenhuma tarefa ainda. Crie uma para começar!</p>
            </div>
          ) : (
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
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
