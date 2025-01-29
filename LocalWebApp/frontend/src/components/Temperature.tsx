import React from 'react';
import { usePondData } from '../hooks/usePondData';

const Temperature: React.FC = () => {
  const { data, error } = usePondData();

  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="temperature">
      <p>{data.temperature}</p>
    </div>
  );
}

export default Temperature;
