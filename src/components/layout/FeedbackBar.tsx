import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';


interface FeedbackBarProps {
    onCheck: () => void;
    onContinue: () => void;
    onRetry: () => void;
    isChecking: boolean;
}

export function FeedbackBar({ onCheck, onContinue, onRetry, isChecking }: FeedbackBarProps) {
    const { consoleStatus, consoleOutput } = useStore();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            <AnimatePresence mode="wait">
                {consoleStatus === 'idle' && (
                    <div className="bg-card border-t border-border p-4 md:p-6 flex justify-between items-center max-w-5xl mx-auto w-full">
                        <div className="hidden md:block text-muted-foreground font-medium">
                            Drag blocks to arrange the code
                        </div>
                        <button
                            onClick={onCheck}
                            disabled={isChecking}
                            className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-[0_4px_0_0_#15803d] active:shadow-none active:translate-y-[4px] transition-all uppercase tracking-wide"
                        >
                            Check Answer
                        </button>
                    </div>
                )}

                {consoleStatus === 'success' && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="bg-green-100 dark:bg-green-950 border-t-2 border-green-500 p-6"
                    >
                        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-white dark:bg-green-900 p-2 rounded-full">
                                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-green-800 dark:text-green-300">Nicely done!</h3>
                                    <p className="text-green-700 dark:text-green-400 text-sm">{consoleOutput[0]}</p>
                                </div>
                            </div>
                            <button
                                onClick={onContinue}
                                className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-[0_4px_0_0_#15803d] active:shadow-none active:translate-y-[4px] transition-all uppercase tracking-wide flex items-center justify-center gap-2"
                            >
                                Continue <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {consoleStatus === 'error' && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="bg-red-100 dark:bg-red-950 border-t-2 border-red-500 p-6"
                    >
                        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-white dark:bg-red-900 p-2 rounded-full">
                                    <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-red-800 dark:text-red-300">Not quite right...</h3>
                                    <p className="text-red-700 dark:text-red-400 text-sm">{consoleOutput[0]}</p>
                                </div>
                            </div>
                            <button
                                onClick={onRetry}
                                className="w-full md:w-auto px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_4px_0_0_#b91c1c] active:shadow-none active:translate-y-[4px] transition-all uppercase tracking-wide flex items-center justify-center gap-2"
                            >
                                Try Again <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
