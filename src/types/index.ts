
// Define types for our drone flight report application

export interface DroneModel {
  id: string;
  name: string;
  specifications: {
    weight: string;
    wingspan: string;
    flightTime: string;
    maxAltitude: string;
    maxSpeed: string;
    batteryType: string;
    cameraType?: string;
  };
}

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  windDirection: string;
  humidity: number;
  precipitation: number;
  visibility: string;
  pressure: number;
  conditions: string;
  timestamp: string;
}

export interface FormSection {
  id: string;
  title: string;
  items: FormItem[];
  type: "checklist" | "text" | "parameters";
  order: number;
}

export interface FormItem {
  id: string;
  content: string;
  type: "checkbox" | "text" | "number" | "select";
  options?: string[];
  value?: string | number | boolean;
  subItems?: FormItem[];
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: FormSection[];
  droneModel: string;
  createdAt: string;
  updatedAt: string;
}

export interface SectionTemplate {
  id: string;
  name: string;
  type: "checklist" | "text" | "parameters";
  items: FormItem[];
  createdAt: string;
}

export interface Report {
  id: string;
  name: string;
  templateId: string;
  droneModel: DroneModel;
  sections: FormSection[];
  weatherData: WeatherData;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "completed";
}
