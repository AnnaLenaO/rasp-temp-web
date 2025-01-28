import { useContext } from 'react';
import { PondDataContextProps, PondDataContext } from '../components/PondDataContext';

export const usePondData = (): PondDataContextProps => {
    const context = useContext(PondDataContext);
    if (context === undefined) {
        throw new Error('usePondData must be used within a PondDataProvider');
    }
    return context;
}
