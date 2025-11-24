import { motion } from 'framer-motion';
import { Lightbulb, AlertCircle, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useStore } from '../../store/useStore';

export function ExplanationCard() {
    const { getCurrentLevel } = useStore();
    const level = getCurrentLevel();

    if (!level || !level.explanation) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-3xl shadow-2xl p-8 md:p-12 mt-6 border-2 border-green-200 dark:border-green-800"
        >
            {/* Explanation Section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500 rounded-full">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Great job! Here's what you learned
                    </h3>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown>{level.explanation}</ReactMarkdown>
                </div>
            </div>

            {/* Tips Section */}
            {level.tips && level.tips.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500 rounded-full">
                            <Lightbulb className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Pro Tips
                        </h4>
                    </div>
                    <ul className="space-y-3">
                        {level.tips.map((tip, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800"
                            >
                                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">💡</span>
                                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Common Mistakes Section */}
            {level.commonMistakes && level.commonMistakes.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-500 rounded-full">
                            <AlertCircle className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Common Mistakes to Avoid
                        </h4>
                    </div>
                    <ul className="space-y-3">
                        {level.commonMistakes.map((mistake, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 + 0.2 }}
                                className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800"
                            >
                                <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">⚠️</span>
                                <span className="text-gray-700 dark:text-gray-300">{mistake}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.div>
    );
}
