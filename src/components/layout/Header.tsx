import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { worlds } from '../../data/worlds';

export function Header() {
    const { currentWorldId, currentLevelId } = useStore();

    const currentWorld = worlds.find(w => w.id === currentWorldId);

    // Calculate progress
    const currentIndex = currentWorld?.levels.findIndex(l => l.id === currentLevelId) ?? 0;
    const totalLevels = currentWorld?.levels.length ?? 1;
    const progress = ((currentIndex + 1) / totalLevels) * 100;

    return (
        <div className="flex items-center justify-between">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="flex-1 mx-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="text-sm font-bold text-gray-600 dark:text-gray-400">
                {currentIndex + 1}/{totalLevels}
            </div>
        </div>
    );
}
