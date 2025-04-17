
import { Report } from '../types';

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

// Mock function to generate PDF data
export const generatePDF = (report: Report): string => {
  // In a real application, this would generate a PDF file
  // For now, we'll return a mock data URL
  return `data:application/pdf;base64,JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDM4Pj5zdHJlYW0KeJwr5HIK4TI2UzC2NFcwMlMISeFyDeEK5OICADloBTEKZW5kc3RyZWFtCmVuZG9iago0IDAgb2JqCjw8L0NvbnRlbnRzIDUgMCBSL01lZGlhQm94WzAgMCA1OTUgODQyXS9QYXJlbnQgMiAwIFIvUmVzb3VyY2VzPDwvRm9udDw8L0YxIDYgMCBSPj4+Pi9UcmltQm94WzAgMCA1OTUgODQyXS9UeXBlL1BhZ2U+PgplbmRvYmoKMSAwIG9iago8PC9QYWdlcyAyIDAgUi9UeXBlL0NhdGFsb2c+PgplbmRvYmoKMyAwIG9iago8PC9BdXRob3IoVXNlcikvQ3JlYXRpb25EYXRlKEQ6MjAyMzAyMTUxMjAwMDArMDAnMDAnKS9DcmVhdG9yKE1pY3Jvc29mdCBXb3JkKS9EZXNjcmlwdGlvbigpL0tleXdvcmRzKCkvTW9kRGF0ZShEOjIwMjMwMjE1MTIwMDAwKzAwJzAwJykvUHJvZHVjZXIoKS9TdWJqZWN0KCkvVGl0bGUoKT4+CmVuZG9iago2IDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvU3VidHlwZS9UeXBlMS9UeXBlL0ZvbnQ+PgplbmRvYmoKMiAwIG9iago8PC9Db3VudCAxL0tpZHNbNCAwIFJdL1R5cGUvUGFnZXM+PgplbmRvYmoKeHJlZgowIDcKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMjEyIDAwMDAwIG4gCjAwMDAwMDA1MDMgMDAwMDAgbiAKMDAwMDAwMDI1NyAwMDAwMCBuIAowMDAwMDAwMTE5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDQxNSAwMDAwMCBuIAp0cmFpbGVyCjw8L0luZm8gMyAwIFIvUm9vdCAxIDAgUi9TaXplIDc+PgpzdGFydHhyZWYKNTU0CiUlRU9GCg==`;
};

// Mock function to generate JSON data
export const generateJSON = (report: Report): string => {
  return JSON.stringify(report, null, 2);
};
