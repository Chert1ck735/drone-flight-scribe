
import React from 'react';
import { DroneModel } from '../types';

interface DroneSelectorProps {
  drones: DroneModel[];
  selectedDrone: DroneModel | null;
  onSelect: (drone: DroneModel) => void;
}

const DroneSelector: React.FC<DroneSelectorProps> = ({ drones, selectedDrone, onSelect }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Выберите модель дрона
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drones.map((drone) => (
          <div
            key={drone.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedDrone?.id === drone.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => onSelect(drone)}
          >
            <h3 className="font-medium text-gray-900">{drone.name}</h3>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>Вес: {drone.specifications.weight}</p>
              <p>Размах крыльев: {drone.specifications.wingspan}</p>
              <p>Макс. время полета: {drone.specifications.flightTime}</p>
              <p>Макс. высота: {drone.specifications.maxAltitude}</p>
              <p>Макс. скорость: {drone.specifications.maxSpeed}</p>
              <p>Тип аккумулятора: {drone.specifications.batteryType}</p>
              {drone.specifications.cameraType && (
                <p>Камера: {drone.specifications.cameraType}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DroneSelector;
