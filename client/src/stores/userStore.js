import { createTableStore } from './genericStore';
import service from '@/api/userService';

// Csak átadod a Store nevét és a hozzá tartozó Service-t
export const useSportStore = createTableStore('users', service);