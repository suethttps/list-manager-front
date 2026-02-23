'use client';

import { CheckCircle2, Zap, Shield, Calendar } from 'lucide-react';
import { useState } from 'react';
import LoginModal from './components/LoginModal';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-green-600">
              ListManager
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#recursos" className="text-gray-700 hover:text-blue-600 transition">
              Recursos
            </a>
            <a href="#beneficios" className="text-gray-700 hover:text-blue-600 transition">
              Benefícios
            </a>
            <button onClick={() => setIsLoginOpen(true)} className="px-6 py-2 bg-green-600 text-white rounded-full hover:shadow-lg transition font-medium">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Organize suas tarefas com
            <span className="block text-green-600">
              elegância e simplicidade
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            ListManager é a ferramenta perfeita para gerenciar suas listas de tarefas. Simples, intuitiva e poderosa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105">
              Começar Agora
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition">
              Ver Demo
            </button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 rounded-2xl bg-green-100 p-8 md:p-12">
          <div className="aspect-video bg-white/40 rounded-xl backdrop-blur flex items-center justify-center">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600">Sua interface de tarefas aqui</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Section */}
      <section id="recursos" className="max-w-7xl mx-auto px-6 py-20 bg-white rounded-3xl my-12 shadow-sm">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Recursos Poderosos</h2>
          <p className="text-lg text-gray-600">Tudo que você precisa para ser produtivo</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-green-100 rounded-2xl">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Criar Listas</h3>
            <p className="text-gray-700">Organize suas tarefas em listas personalizadas</p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-green-100 rounded-2xl">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rápido & Eficiente</h3>
            <p className="text-gray-700">Interface intuitiva para máxima produtividade</p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-green-100 rounded-2xl">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Prazos</h3>
            <p className="text-gray-700">Defina datas e acompanhe o progresso</p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 bg-green-100 rounded-2xl">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Seguro</h3>
            <p className="text-gray-700">Seus dados sempre protegidos e sincronizados</p>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Por que usar ListManager?
            </h2>
            <ul className="space-y-4">
              {[
                'Aumente sua produtividade em até 50%',
                'Interface limpa e sem distrações',
                'Acesso em qualquer lugar, a qualquer hora',
                'Compartilhe listas com sua equipe',
                'Notificações inteligentes',
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-lg text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-green-100 p-8 flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-600">Imagem de benefícios aqui</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 my-12">
        <div className="bg-green-600 rounded-3xl p-12 text-center text-white shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-lg mb-8 opacity-90">
            Crie sua primeira lista e aumente sua produtividade hoje mesmo
          </p>
          <button className="px-8 py-4 bg-white text-green-600 rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105">
            Criar Conta Grátis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-600">
          <p>&copy; 2026 ListManager. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Login Modal Component */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}