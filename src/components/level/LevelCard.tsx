import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import ReactMarkdown from 'react-markdown';

export function LevelCard() {
    const { getCurrentLevel } = useStore();
    const level = getCurrentLevel();

    if (!level) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12"
        >
            {/* Level Title */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {level.title}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>

            {/* Mission Brief */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <ReactMarkdown>{level.description}</ReactMarkdown>
            </div>

            {/* Visual Hint */}
            {level.visualHint && (
                <div className="my-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-700">
                    <div className="text-center text-gray-600 dark:text-gray-300">
                        <div className="text-6xl mb-4">🎯</div>
                        <p className="font-medium">[Visual Hint: {level.visualHint}]</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
