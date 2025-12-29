import { createTableStore } from './genericStore';
import sportService from '@/api/sportService';

// Csak átadod a Store nevét és a hozzá tartozó Service-t
export const useSportStore = createTableStore('sports', sportService);