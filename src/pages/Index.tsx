
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [wizardStep, setWizardStep] = useState(0);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    // Check if first time user
    const hasSeenWizard = localStorage.getItem('hasSeenWizard');
    if (!hasSeenWizard) {
      setShowWizard(true);
    }
  }, []);

  const handleCloseWizard = () => {
    localStorage.setItem('hasSeenWizard', 'true');
    setShowWizard(false);
  };

  const handleNextStep = () => {
    if (wizardStep < wizardSteps.length - 1) {
      setWizardStep(wizardStep + 1);
    } else {
      handleCloseWizard();
    }
  };

  const wizardSteps = [
    {
      title: "Добро пожаловать!",
      description: "Это редактор форм для генерации отчетов о полетах БПЛА. Давайте познакомимся с основными функциями."
    },
    {
      title: "Создание отчета",
      description: "Нажмите «Создать отчет», чтобы начать заполнение новой формы для отчета о полете БПЛА."
    },
    {
      title: "Шаблоны",
      description: "В разделе «Шаблоны» вы можете создавать и редактировать шаблоны отчетов и разделов для быстрого заполнения."
    },
    {
      title: "История отчетов",
      description: "В разделе «История отчетов» вы можете просмотреть все созданные ранее отчеты, отфильтровать их и экспортировать."
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Система генерации отчетов о полетах БПЛА</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Добро пожаловать в редактор форм для генерации отчетов о полетах беспилотных летательных аппаратов.
          Эта система позволяет создавать, редактировать и экспортировать чек-листы и отчеты о полетах дронов.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Создать новый отчет</h2>
              <p className="text-gray-600 mb-4">
                Создайте новый отчет о полете дрона, используя готовые шаблоны или с нуля.
              </p>
              <Link
                to="/editor"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Начать
              </Link>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Управление шаблонами</h2>
              <p className="text-gray-600 mb-4">
                Просмотрите, отредактируйте или создайте новые шаблоны отчетов и разделов.
              </p>
              <Link
                to="/templates"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Шаблоны
              </Link>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-purple-500 text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">История отчетов</h2>
              <p className="text-gray-600 mb-4">
                Просмотрите историю созданных отчетов, отфильтруйте и экспортируйте их.
              </p>
              <Link
                to="/history"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                История
              </Link>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => setShowWizard(true)}
          variant="outline"
          className="mt-8"
        >
          Показать справку
        </Button>
      </div>

      <Dialog open={showWizard} onOpenChange={setShowWizard}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{wizardSteps[wizardStep].title}</DialogTitle>
            <DialogDescription>
              {wizardSteps[wizardStep].description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            {wizardSteps.map((_, index) => (
              <div 
                key={index}
                className={`h-2 w-2 mx-1 rounded-full ${index === wizardStep ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              onClick={handleNextStep}
            >
              {wizardStep < wizardSteps.length - 1 ? "Далее" : "Завершить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Index;
