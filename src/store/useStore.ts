import { create } from 'zustand';
import { worlds } from '../data/worlds';
import { type Level } from '../types';

interface AppState {
    currentWorldId: string;
    currentLevelId: string;

    // Console State
    consoleOutput: string[];
    consoleStatus: 'idle' | 'success' | 'error';
    setConsoleOutput: (output: string[], status: 'success' | 'error') => void;
    clearConsole: () => void;

    // Navigation
    setCurrentLevel: (worldId: string, levelId: string) => void;
    getCurrentLevel: () => Level | undefined;
}

export const useStore = create<AppState>((set, get) => ({
    currentWorldId: 'world-1',
    currentLevelId: '1-1',

    consoleOutput: [],
    consoleStatus: 'idle',
    setConsoleOutput: (output, status) => set({ consoleOutput: output, consoleStatus: status }),
    clearConsole: () => set({ consoleOutput: [], consoleStatus: 'idle' }),

    setCurrentLevel: (worldId, levelId) => set({ currentWorldId: worldId, currentLevelId: levelId }),
    getCurrentLevel: () => {
        const { currentWorldId, currentLevelId } = get();
        const world = worlds.find(w => w.id === currentWorldId);
        return world?.levels.find(l => l.id === currentLevelId);
    }
}));
