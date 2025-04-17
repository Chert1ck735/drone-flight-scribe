
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { sectionTemplates } from '../data/sectionTemplates';
import { reportTemplates } from '../data/reportTemplates';
import { droneModels } from '../data/droneModels';
import { SectionTemplate, ReportTemplate } from '../types';

const Templates = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'sections'>('reports');
  const [reportFilter, setReportFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');

  const filteredReportTemplates = reportTemplates.filter(template => 
    template.name.toLowerCase().includes(reportFilter.toLowerCase()) ||
    template.description.toLowerCase().includes(reportFilter.toLowerCase())
  );

  const filteredSectionTemplates = sectionTemplates.filter(template => 
    template.name.toLowerCase().includes(sectionFilter.toLowerCase())
  );

  const getDroneNameById = (droneId: string) => {
    const drone = droneModels.find(d => d.id === droneId);
    return drone ? drone.name : 'Неизвестный дрон';
  };

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900">Управление шаблонами</h2>
          <p className="mt-1 text-sm text-gray-500">
            Просмотр и редактирование шаблонов отчетов и разделов
          </p>
        </div>
        
        <div>
          <div className="sm:hidden">
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as 'reports' | 'sections')}
            >
              <option value="reports">Шаблоны отчетов</option>
              <option value="sections">Шаблоны разделов</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`${
                    activeTab === 'reports'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  Шаблоны отчетов
                </button>
                <button
                  onClick={() => setActiveTab('sections')}
                  className={`${
                    activeTab === 'sections'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  Шаблоны разделов
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {activeTab === 'reports' && (
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <label htmlFor="report-filter" className="sr-only">Поиск шаблонов отчетов</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="report-filter"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Поиск шаблонов отчетов"
                  value={reportFilter}
                  onChange={(e) => setReportFilter(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredReportTemplates.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Шаблоны не найдены</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Нет доступных шаблонов отчетов или они не соответствуют критериям поиска.
                  </p>
                </div>
              ) : (
                filteredReportTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{template.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {getDroneNameById(template.droneModel)}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(template.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Редактировать
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Использовать
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* "Создать новый шаблон" карточка */}
              <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Создать новый шаблон отчета
                </span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'sections' && (
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <label htmlFor="section-filter" className="sr-only">Поиск шаблонов разделов</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="section-filter"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Поиск шаблонов разделов"
                  value={sectionFilter}
                  onChange={(e) => setSectionFilter(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSectionTemplates.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Шаблоны не найдены</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Нет доступных шаблонов разделов или они не соответствуют критериям поиска.
                  </p>
                </div>
              ) : (
                filteredSectionTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{template.name}</h3>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Тип: {template.type === 'checklist' ? 'Чек-лист' : template.type === 'text' ? 'Текст' : 'Параметры'}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {template.items.length} пунктов
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(template.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Редактировать
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Использовать
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* "Создать новый шаблон раздела" карточка */}
              <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Создать новый шаблон раздела
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Templates;
