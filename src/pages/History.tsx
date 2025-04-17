
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Report, DroneModel } from '../types';
import { 
  getReports, 
  filterReports, 
  sortReportsByDate, 
  deleteReport,
  generatePDF,
  generateJSON 
} from '../utils/storage';
import { droneModels } from '../data/droneModels';

const History = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDroneId, setSelectedDroneId] = useState('');
  const [sortAsc, setSortAsc] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load reports from storage
    const loadedReports = getReports();
    setReports(loadedReports);
    setFilteredReports(sortReportsByDate(loadedReports, sortAsc));
    setIsLoading(false);
  }, [sortAsc]);

  const handleFilter = () => {
    const filtered = filterReports(startDate, endDate, selectedDroneId);
    setFilteredReports(sortReportsByDate(filtered, sortAsc));
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSelectedDroneId('');
    setFilteredReports(sortReportsByDate(reports, sortAsc));
  };

  const handleDelete = (reportId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отчет?')) {
      deleteReport(reportId);
      const updatedReports = reports.filter(report => report.id !== reportId);
      setReports(updatedReports);
      setFilteredReports(sortReportsByDate(
        updatedReports.filter(report => 
          (!startDate || new Date(report.createdAt) >= new Date(startDate)) &&
          (!endDate || new Date(report.createdAt) <= new Date(endDate)) &&
          (!selectedDroneId || report.droneModel.id === selectedDroneId)
        ),
        sortAsc
      ));
    }
  };

  const handleExportPDF = (report: Report) => {
    const pdfDataUrl = generatePDF(report);
    const link = document.createElement('a');
    link.href = pdfDataUrl;
    link.download = `${report.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = (report: Report) => {
    const jsonData = generateJSON(report);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900">История отчетов</h2>
          <p className="mt-1 text-sm text-gray-500">
            Просмотр и управление ранее созданными отчетами
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-6">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                Дата начала
              </label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                Дата окончания
              </label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="drone-model" className="block text-sm font-medium text-gray-700 mb-1">
                Модель дрона
              </label>
              <select
                id="drone-model"
                value={selectedDroneId}
                onChange={(e) => setSelectedDroneId(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Все модели</option>
                {droneModels.map((drone) => (
                  <option key={drone.id} value={drone.id}>
                    {drone.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end space-x-2">
              <button
                type="button"
                onClick={handleFilter}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Применить
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Сбросить
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Найдено отчетов: {filteredReports.length}
            </h3>
            <button
              type="button"
              onClick={() => setSortAsc(!sortAsc)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {sortAsc ? (
                <>
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  По возрастанию даты
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  По убыванию даты
                </>
              )}
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-700">Загрузка отчетов...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Нет отчетов</h3>
              <p className="mt-1 text-sm text-gray-500">
                Отчеты не найдены. Создайте новый отчет или измените параметры фильтрации.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Модель дрона
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата создания
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{report.droneModel.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDateTime(report.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status === 'completed' ? 'Завершен' : 'Черновик'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleExportPDF(report)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Экспорт в PDF"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleExportJSON(report)}
                            className="text-green-600 hover:text-green-900"
                            title="Экспорт в JSON"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(report.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Удалить"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default History;
