import React, { useState, useEffect } from 'react';
import { Heart, Award, Flame, ChevronRight, Check, X, Trophy, Star, Zap, Code, BookOpen, Settings, Home } from 'lucide-react';

export default function LogicaMENTE() {
  // Estados para gerenciar o aplicativo
  const [currentScreen, setCurrentScreen] = useState('home');
  const [user, setUser] = useState({
    name: 'Usuário',
    level: 1,
    xp: 0,
    coins: 50,
    lives: 5,
    streak: 3,
    completedLessons: [],
  });
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Efeito para salvar o progresso do usuário
  //usei o sitebrew como testem em quanto não temos banco de dados

  useEffect(() => {
    const saveUserData = async () => {
      try {
        await fetch('https://www.sitebrew.ai/api/xgU0AO/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ document: user })
        });
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
      }
    };
    
    if (user.name !== 'Usuário') {
      saveUserData();
    }
  }, [user]);

  // Módulos de aprendizado
  const modules = [
    {
      id: 'basics',
      title: 'Fundamentos',
      icon: <BookOpen className="w-6 h-6" />,
      color: '#4A55A2',
      lessons: [
        {
          id: 'variables',
          title: 'Variáveis',
          description: 'Aprenda a armazenar e manipular dados',
          xpReward: 20,
          questions: [
            {
              type: 'multiple-choice',
              question: 'O que é uma variável em programação?',
              options: [
                'Um valor que nunca muda',
                'Um espaço na memória para armazenar dados',
                'Um tipo de função especial',
                'Um erro no código'
              ],
              correctAnswer: 1,
              explanation: 'Variáveis são espaços na memória do computador usados para armazenar dados que podem ser modificados durante a execução do programa.'
            },
            {
              type: 'fill-blank',
              question: 'Para declarar uma variável em JavaScript, usamos a palavra-chave ____.',
              answer: 'let',
              alternatives: ['var', 'const'],
              explanation: 'Em JavaScript moderno, usamos "let" para declarar variáveis que podem ter seu valor alterado.'
            },
            {
              type: 'code-completion',
              question: 'Complete o código para criar uma variável chamada "idade" com valor 25:',
              code: '__ idade = __;',
              answer: 'let idade = 25;',
              explanation: 'A sintaxe correta é "let idade = 25;" para declarar e inicializar uma variável.'
            }
          ]
        },
        {
          id: 'conditionals',
          title: 'Condicionais',
          description: 'Aprenda a tomar decisões no código',
          xpReward: 25,
          questions: [
            {
              type: 'multiple-choice',
              question: 'O que faz uma estrutura condicional if?',
              options: [
                'Repete um bloco de código várias vezes',
                'Executa um bloco de código apenas se uma condição for verdadeira',
                'Define uma função no código',
                'Cria uma variável nova'
              ],
              correctAnswer: 1,
              explanation: 'A estrutura if verifica se uma condição é verdadeira e, se for, executa o bloco de código associado.'
            }
          ]
        }
      ]
    },
    {
      id: 'loops',
      title: 'Loops',
      icon: <Zap className="w-6 h-6" />,
      color: '#7895CB',
      lessons: [
        {
          id: 'for-loops',
          title: 'Loop For',
          description: 'Aprenda a repetir ações com precisão',
          xpReward: 30,
          questions: []
        }
      ]
    },
    {
      id: 'functions',
      title: 'Funções',
      icon: <Code className="w-6 h-6" />,
      color: '#A0BFE0',
      lessons: [
        {
          id: 'basics-functions',
          title: 'Funções Básicas',
          description: 'Crie blocos de código reutilizáveis',
          xpReward: 35,
          questions: []
        }
      ]
    }
  ];

  // Função para iniciar uma lição
  const startLesson = (moduleId, lessonId) => {
    const module = modules.find(m => m.id === moduleId);
    const lesson = module.lessons.find(l => l.id === lessonId);
    setCurrentLesson(lesson);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setCurrentScreen('lesson');
  };

  // Função para verificar resposta
  const checkAnswer = () => {
    const question = currentLesson.questions[currentQuestion];
    let correct = false;
    
    if (question.type === 'multiple-choice') {
      correct = selectedAnswer === question.correctAnswer;
    } else if (question.type === 'fill-blank' || question.type === 'code-completion') {
      correct = selectedAnswer.toLowerCase() === question.answer.toLowerCase() || 
               (question.alternatives && question.alternatives.includes(selectedAnswer.toLowerCase()));
    }
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      // Atualizar XP apenas se a resposta estiver correta
      setUser(prev => ({
        ...prev,
        xp: prev.xp + 5
      }));
    } else {
      // Reduzir vidas se a resposta estiver errada
      setUser(prev => ({
        ...prev,
        lives: prev.lives - 1
      }));
    }
    
    // Aguardar feedback antes de avançar
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < currentLesson.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        // Lição concluída
        completeLesson();
      }
    }, 2000);
  };

  // Função para concluir uma lição
  const completeLesson = () => {
    if (!user.completedLessons.includes(currentLesson.id)) {
      setUser(prev => ({
        ...prev,
        xp: prev.xp + currentLesson.xpReward,
        coins: prev.coins + 10,
        completedLessons: [...prev.completedLessons, currentLesson.id]
      }));
    }
    setCurrentScreen('lessonComplete');
  };

  // Renderizar questão atual
  const renderQuestion = () => {
    if (!currentLesson || currentLesson.questions.length === 0) {
      return <div className="text-center p-4">Nenhuma questão disponível para esta lição.</div>;
    }
    
    const question = currentLesson.questions[currentQuestion];
    
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">{question.question}</h3>
        
        {question.type === 'multiple-choice' && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-3 text-left rounded-lg border ${
                  selectedAnswer === index 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        
        {question.type === 'fill-blank' && (
          <div className="mt-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Digite sua resposta"
              value={selectedAnswer || ''}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
          </div>
        )}
        
        {question.type === 'code-completion' && (
          <div className="mt-4">
            <div className="bg-gray-800 text-white p-3 rounded-lg font-mono mb-2">
              {question.code}
            </div>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg font-mono"
              placeholder="Complete o código"
              value={selectedAnswer || ''}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
          </div>
        )}
        
        {showFeedback && (
          <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="flex items-center">
              {isCorrect ? <Check className="w-5 h-5 mr-2" /> : <X className="w-5 h-5 mr-2" />}
              <span className="font-medium">{isCorrect ? 'Correto!' : 'Incorreto!'}</span>
            </div>
            <p className="mt-1">{question.explanation}</p>
          </div>
        )}
        
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Questão {currentQuestion + 1} de {currentLesson.questions.length}
          </div>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedAnswer !== null 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={checkAnswer}
            disabled={selectedAnswer === null}
          >
            Verificar
          </button>
        </div>
      </div>
    );
  };

  // Tela inicial
  const renderHomeScreen = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-gradient-to-r from-[#4A55A2] to-[#7895CB] text-white">
        <h1 className="text-2xl font-bold">LogicaMENTE</h1>
        <p className="text-sm opacity-80">Aprenda programação de forma divertida</p>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Continue aprendendo</h2>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#4A55A2]">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Variáveis</h3>
                <p className="text-sm text-gray-600">Fundamentos</p>
              </div>
              <button 
                className="bg-[#4A55A2] text-white p-2 rounded-full"
                onClick={() => startLesson('basics', 'variables')}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {modules.map((module) => (
          <div key={module.id} className="mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="mr-2" style={{ color: module.color }}>{module.icon}</span>
              {module.title}
            </h2>
            <div className="space-y-3">
              {module.lessons.map((lesson) => (
                <div 
                  key={lesson.id} 
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow"
                  onClick={() => startLesson(module.id, lesson.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{lesson.title}</h3>
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      <span>{lesson.xpReward} XP</span>
                    </div>
                  </div>
                  {user.completedLessons.includes(lesson.id) && (
                    <div className="mt-2 flex items-center text-green-600 text-sm">
                      <Check className="w-4 h-4 mr-1" />
                      <span>Concluído</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Tela de lição
  const renderLessonScreen = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#4A55A2] text-white flex justify-between items-center">
        <button 
          className="text-white"
          onClick={() => setCurrentScreen('home')}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-red-400 mr-1" fill="#f87171" />
            <span>{user.lives}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-1" fill="#fbbf24" />
            <span>{user.xp}</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">{currentLesson?.title}</h2>
        {renderQuestion()}
      </div>
    </div>
  );

  // Tela de conclusão de lição
  const renderLessonCompleteScreen = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-yellow-500" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Lição Concluída!</h2>
          <p className="text-gray-600 mb-6">Você completou a lição "{currentLesson?.title}"</p>
          
          <div className="flex justify-center space-x-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentLesson?.xpReward}</div>
              <div className="text-sm text-gray-500">XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">10</div>
              <div className="text-sm text-gray-500">Moedas</div>
            </div>
          </div>
          
          <button 
            className="w-full py-3 bg-[#4A55A2] text-white rounded-lg font-medium hover:bg-[#3A4592] transition-colors"
            onClick={() => setCurrentScreen('home')}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );

  // Barra de navegação inferior
  const renderNavBar = () => (
    <div className="bg-white border-t border-gray-200 flex justify-around py-2">
      <button 
        className={`p-2 flex flex-col items-center ${currentScreen === 'home' ? 'text-[#4A55A2]' : 'text-gray-500'}`}
        onClick={() => setCurrentScreen('home')}
      >
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Início</span>
      </button>
      <button 
        className="p-2 flex flex-col items-center text-gray-500"
        onClick={() => {}}
      >
        <Trophy className="w-6 h-6" />
        <span className="text-xs mt-1">Conquistas</span>
      </button>
      <button 
        className="p-2 flex flex-col items-center text-gray-500"
        onClick={() => {}}
      >
        <Settings className="w-6 h-6" />
        <span className="text-xs mt-1">Perfil</span>
      </button>
    </div>
  );

  // Barra superior com informações do usuário
  const renderTopBar = () => {
    if (currentScreen === 'lesson') return null;
    
    return (
      <div className="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#4A55A2] text-white flex items-center justify-center font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="ml-2">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-gray-500">Nível {user.level}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-red-500 mr-1" fill="#ef4444" />
            <span className="text-sm">{user.lives}</span>
          </div>
          <div className="flex items-center">
            <Flame className="w-5 h-5 text-orange-500 mr-1" fill="#f97316" />
            <span className="text-sm">{user.streak}</span>
          </div>
          <div className="flex items-center">
            <Award className="w-5 h-5 text-yellow-500 mr-1" fill="#eab308" />
            <span className="text-sm">{user.coins}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {renderTopBar()}
      
      <div className="flex-1 overflow-hidden">
        {currentScreen === 'home' && renderHomeScreen()}
        {currentScreen === 'lesson' && renderLessonScreen()}
        {currentScreen === 'lessonComplete' && renderLessonCompleteScreen()}
      </div>
      
      {currentScreen !== 'lesson' && renderNavBar()}
    </div>
  );
}