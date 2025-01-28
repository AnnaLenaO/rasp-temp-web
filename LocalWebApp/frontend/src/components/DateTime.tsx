import React from 'react';
import { usePondData } from '../hooks/usePondData';

const DateTime: React.FC = () => {
  const { data, error } = usePondData();

  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="date-time">
      <p>{new Date(data.timestamp).toLocaleString()}</p>
    </div>
  );
}

export default DateTime;
