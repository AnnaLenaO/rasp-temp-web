import { createContext } from 'react';

export interface PondData {
  temperature: string;
  timestamp: string;
}

export interface PondDataContextProps {
  data: PondData;
  error: string;
}

export const DEFAULT_POND_DATA: PondData = {
  temperature: 'N/A',
  timestamp: new Date(0).toISOString(),
}

export const PondDataContext = createContext<PondDataContextProps | undefined>(undefined);
