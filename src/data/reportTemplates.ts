
import { ReportTemplate } from '../types';

export const reportTemplates: ReportTemplate[] = [
  {
    id: 'template-001',
    name: 'Стандартный чек-лист для miniSIGMA',
    description: 'Полный чек-лист для проведения полетов на дроне miniSIGMA',
    sections: [],
    droneModel: 'drone-001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'template-003',
    name: 'Чек-лист для SurveyDrone X1',
    description: 'Стандартный чек-лист для проведения полетов на дроне SurveyDrone X1',
    sections: [],
    droneModel: 'drone-002',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
