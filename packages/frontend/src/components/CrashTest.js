import { useEffect } from 'react';
import api from '../utils/api';

export function CrashTest() {
  useEffect(() => {
    api.crash()
  }, []);

  return null
};
