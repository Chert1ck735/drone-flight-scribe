import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import DroneSelector from '../components/DroneSelector';
import WeatherDisplay from '../components/WeatherDisplay';
import TemplateSelector from '../components/TemplateSelector';
import FormEditor from '../components/FormEditor';
import { droneModels } from '../data/droneModels';
import { reportTemplates } from '../data/reportTemplates';
import { sectionTemplates } from '../data/sectionTemplates';
import { DroneModel, WeatherData, Report, ReportTemplate, FormSection } from '../types';
import { saveReport, generatePDF, generateJSON } from '../utils/storage';

const Editor = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedDrone, setSelectedDrone] = useState<DroneModel | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [sections, setSections] = useState<FormSection[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Initialize sections when template is selected
  useEffect(() => {
    if (selectedTemplate) {
      // Deep copy the sections from the template to avoid modifying the original
      const templateSections = JSON.parse(JSON.stringify(selectedTemplate.sections));
      
      // If template sections are empty, initialize with empty sections array
      if (templateSections.length === 0) {
        // Check if we have any relevant section templates for this drone model
        const relevantSectionTemplates = sectionTemplates.filter(st => 
          st.name.toLowerCase().includes('предварительная') || 
          st.name.toLowerCase().includes('взлет') ||
          st.name.toLowerCase().includes('полет') ||
          st.name.toLowerCase().includes('посадка')
        );
        
        // Add them as sections to the report
        const initialSections = relevantSectionTemplates.map((template, index) => ({
          id: `section-init-${index}`,
          title: template.name,
          items: JSON.parse(JSON.stringify(template.items)),
          type: template.type,
          order: index,
        }));
        
        setSections(initialSections);
      } else {
        setSections(templateSections);
      }
    } else {
      setSections([]);
    }
  }, [selectedTemplate]);

  const handleSaveReport = () => {
    if (!name.trim()) {
      setSaveError('Пожалуйста, укажите название отчета');
      return;
    }

    if (!selectedDrone) {
      setSaveError('Пожалуйста, выберите модель дрона');
      return;
    }

    if (!weatherData) {
      setSaveError('Не удалось получить метеоданные');
      return;
    }

    if (sections.length === 0) {
      setSaveError('Необходимо добавить хотя бы один раздел');
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);

      const newReport: Report = {
        id: `report-${Date.now()}`,
        name: name.trim(),
        templateId: selectedTemplate?.id || '',
        droneModel: selectedDrone,
        sections,
        weatherData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'completed',
      };

      // Save the report to storage
      saveReport(newReport);

      // Redirect to the history page after saving
      setTimeout(() => {
        navigate('/history');
      }, 1000);
    } catch (error) {
      console.error('Error saving report:', error);
      setSaveError('Произошла ошибка при сохранении отчета');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900">Создание отчета о полете БПЛА</h2>
          <p className="mt-1 text-sm text-gray-500">
            Заполните все необходимые данные для создания отчета
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <WeatherDisplay onWeatherUpdate={setWeatherData} />

          <div className="mb-6">
            <label htmlFor="report-name" className="block text-sm font-medium text-gray-700 mb-2">
              Название отчета
            </label>
            <input
              type="text"
              id="report-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Введите название отчета"
            />
          </div>

          <DroneSelector
            drones={droneModels}
            selectedDrone={selectedDrone}
            onSelect={setSelectedDrone}
          />

          {selectedDrone && (
            <TemplateSelector
              templates={reportTemplates}
              selectedTemplate={selectedTemplate}
              onSelect={setSelectedTemplate}
              droneModelId={selectedDrone.id}
            />
          )}

          {selectedDrone && (
            <FormEditor
              sections={sections}
              onSectionsChange={setSections}
              sectionTemplates={sectionTemplates}
            />
          )}

          {saveError && (
            <div className="mt-4 p-4 bg-red-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Ошибка</h3>
                  <p className="text-sm text-red-700 mt-1">{saveError}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleSaveReport}
              disabled={isSaving}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Сохранение...
                </>
              ) : (
                'Сохранить отчет'
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Editor;
