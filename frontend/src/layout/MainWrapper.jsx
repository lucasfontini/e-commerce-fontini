import { useEffect, useState } from 'react';
import { setUser } from '../utils/auth';

const MainWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handler = async () => {
            setLoading(true);
            try {
                await setUser();
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        handler();
    }, []);

    if (loading) return null;
    if (error) return <div>Error: {error}</div>;

    return <>{children}</>;
};

export default MainWrapper;
