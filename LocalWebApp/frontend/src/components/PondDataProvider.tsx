import { useEffect, useState, ReactNode, Children } from 'react';
import { PondData, DEFAULT_POND_DATA, PondDataContext } from './PondDataContext';

export const PondDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PondData>(DEFAULT_POND_DATA);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5080/pond-data')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: PondData) => {
        setData(data);
        setError('');
      })
      .catch((err) => {
        setError(err.message || 'An error occured');
      });
  }, []);

  return <PondDataContext.Provider value={{ data, error }}>{children}</PondDataContext.Provider>;
}
