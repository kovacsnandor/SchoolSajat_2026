import { createTableStore } from './genericStore';
import service from '@/api/sportService';

// Csak átadod a Store nevét és a hozzá tartozó Service-t
export const useSportStore = createTableStore('sports', service);