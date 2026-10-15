
import { useState, useEffect } from 'react';
import { apiGet } from '../services/api';

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        setLoading(true);
        setError('');

        const data = await apiGet('/users');

        if (active) {
          setUser(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  return { user, loading, error };
}
