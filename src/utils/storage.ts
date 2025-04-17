
import { Report, DroneModel } from '../types';
import { format } from 'date-fns';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

// LocalStorage keys
const REPORTS_KEY = 'drone-flight-reports';

// Save a report to localStorage
export const saveReport = (report: Report): void => {
  const reports = getReports();
  reports.push(report);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};

// Get all reports from localStorage
export const getReports = (): Report[] => {
  const reportsJson = localStorage.getItem(REPORTS_KEY);
  return reportsJson ? JSON.parse(reportsJson) : [];
};

// Get a report by id
export const getReportById = (id: string): Report | undefined => {
  const reports = getReports();
  return reports.find(report => report.id === id);
};

// Delete a report by id
export const deleteReport = (id: string): void => {
  const reports = getReports();
  const updatedReports = reports.filter(report => report.id !== id);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(updatedReports));
};

// Format date to dd.mm.yyyy format
export const formatDateString = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// Filter reports by date range and drone model
export const filterReports = (
  startDate?: string,
  endDate?: string,
  droneModelId?: string
): Report[] => {
  let reports = getReports();
  
  if (startDate) {
    reports = reports.filter(report => new Date(report.createdAt) >= new Date(startDate));
  }
  
  if (endDate) {
    reports = reports.filter(report => new Date(report.createdAt) <= new Date(endDate));
  }
  
  if (droneModelId) {
    reports = reports.filter(report => report.droneModel.id === droneModelId);
  }
  
  return reports;
};

// Sort reports by creation date
export const sortReportsByDate = (reports: Report[], ascending = true): Report[] => {
  return [...reports].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

// Generate PDF data for a report
export const generatePDF = (report: Report): string => {
  try {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text(`Отчет о полете БПЛА: ${report.name}`, 14, 20);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Дата создания: ${formatDateString(report.createdAt)}`, 14, 30);
    
    // Add drone model info
    doc.text(`Модель дрона: ${report.droneModel.name}`, 14, 40);
    doc.text(`Серийный номер: ${report.droneModel.specifications.wingspan || 'Не указан'}`, 14, 50);
    
    // Add weather data
    doc.setFontSize(14);
    doc.text('Метеоданные:', 14, 60);
    doc.setFontSize(10);
    doc.text(`Температура: ${report.weatherData.temperature}°C`, 20, 70);
    doc.text(`Ветер: ${report.weatherData.windSpeed} м/с, ${report.weatherData.windDirection}`, 20, 80);
    doc.text(`Влажность: ${report.weatherData.humidity}%`, 20, 90);
    doc.text(`Давление: ${report.weatherData.pressure} гПа`, 20, 100);
    doc.text(`Состояние: ${report.weatherData.conditions}`, 20, 110);
    
    let yPosition = 130;
    
    // Add sections
    report.sections.forEach((section, index) => {
      // Add a new page if we're getting close to the bottom
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${section.title}`, 14, yPosition);
      yPosition += 10;
      
      section.items.forEach((item) => {
        // Add a new page if we're getting close to the bottom
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(10);
        
        // Different format based on the item type
        if (item.type === 'checkbox') {
          const checkStatus = item.value ? '☑' : '☐';
          doc.text(`${checkStatus} ${item.content}`, 20, yPosition);
        } else if (item.type === 'text') {
          doc.text(`${item.content}: ${item.value || 'Не заполнено'}`, 20, yPosition);
        } else if (item.type === 'number') {
          doc.text(`${item.content}: ${item.value || '0'}`, 20, yPosition);
        } else if (item.type === 'select') {
          doc.text(`${item.content}: ${item.value || 'Не выбрано'}`, 20, yPosition);
        }
        
        yPosition += 8;
      });
      
      yPosition += 10;
    });
    
    return doc.output('datauristring');
  } catch (error) {
    console.error('Error generating PDF:', error);
    return '';
  }
};

// Generate JSON data
export const generateJSON = (report: Report): string => {
  return JSON.stringify(report, null, 2);
};
