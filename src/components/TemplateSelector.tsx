
import React from 'react';
import { ReportTemplate } from '../types';

interface TemplateSelectorProps {
  templates: ReportTemplate[];
  selectedTemplate: ReportTemplate | null;
  onSelect: (template: ReportTemplate) => void;
  droneModelId?: string;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  templates, 
  selectedTemplate, 
  onSelect,
  droneModelId
}) => {
  // Filter templates by drone model if provided
  const filteredTemplates = droneModelId
    ? templates.filter(template => template.droneModel === droneModelId)
    : templates;

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Выберите шаблон отчета
      </label>
      {filteredTemplates.length === 0 ? (
        <div className="text-gray-500 p-4 border border-dashed border-gray-300 rounded-lg">
          {droneModelId 
            ? 'Нет доступных шаблонов для выбранной модели дрона' 
            : 'Пожалуйста, сначала выберите модель дрона'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => onSelect(template)}
            >
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{template.description}</p>
              <p className="mt-2 text-xs text-gray-400">
                Создан: {new Date(template.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
