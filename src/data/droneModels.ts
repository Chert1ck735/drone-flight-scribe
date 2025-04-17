
import { DroneModel } from '../types';

export const droneModels: DroneModel[] = [
  {
    id: 'drone-001',
    name: 'miniSIGMA',
    specifications: {
      weight: '5.2 kg',
      wingspan: '2.5 m',
      flightTime: '120 min',
      maxAltitude: '3000 m',
      maxSpeed: '90 km/h',
      batteryType: 'LiPo 14.8V 10000mAh',
      cameraType: 'HD 20MP',
    },
  },
  {
    id: 'drone-002',
    name: 'SurveyDrone X1',
    specifications: {
      weight: '3.8 kg',
      wingspan: '1.8 m',
      flightTime: '90 min',
      maxAltitude: '2500 m',
      maxSpeed: '75 km/h',
      batteryType: 'LiPo 12.6V 8000mAh',
      cameraType: 'Full HD 24MP',
    },
  },
  {
    id: 'drone-003',
    name: 'InspectorPro',
    specifications: {
      weight: '4.5 kg',
      wingspan: '2.2 m',
      flightTime: '110 min',
      maxAltitude: '2800 m',
      maxSpeed: '85 km/h',
      batteryType: 'LiPo 14.8V 9500mAh',
      cameraType: '4K 32MP',
    },
  },
];
