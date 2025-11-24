import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CheckCircle } from 'lucide-react';
import { SortableBlock } from '../workspace/SortableBlock';
import { type CodeBlock } from '../../types';
import { useStore } from '../../store/useStore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface InteractionCardProps {
    onStateChange?: (state: { blocks: CodeBlock[]; selectedOption: number | null }) => void;
}

export function InteractionCard({ onStateChange }: InteractionCardProps) {
    const { getCurrentLevel } = useStore();
    const level = getCurrentLevel();

    const [blocks, setBlocks] = useState<CodeBlock[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    useEffect(() => {
        if (level?.type === 'parsons' && level.parsonsData) {
            const shuffled = [...level.parsonsData.initialBlocks].sort(() => Math.random() - 0.5);
            setBlocks(shuffled);
        } else {
            setBlocks([]);
        }
        setSelectedOption(null);
    }, [level?.id]);

    // Notify parent of state changes
    useEffect(() => {
        if (onStateChange) {
            onStateChange({ blocks, selectedOption });
        }
    }, [blocks, selectedOption, onStateChange]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setBlocks((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    if (!level) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 mt-6"
        >
            {/* PARSONS MODE */}
            {level.type === 'parsons' && (
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Arrange the code blocks in the correct order
                    </h3>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={blocks}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-3">
                                {blocks.map((block) => (
                                    <SortableBlock key={block.id} block={block} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>
            )}

            {/* FILL-IN MODE */}
            {level.type === 'fill_in' && level.fillInData && (
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Fill in the blank
                    </h3>

                    <div className="mb-8 p-6 bg-gray-900 rounded-2xl border-2 border-gray-700 shadow-lg">
                        <SyntaxHighlighter
                            language="python"
                            style={vscDarkPlus}
                            customStyle={{
                                background: 'transparent',
                                margin: 0,
                                fontSize: '1.1rem',
                                lineHeight: '1.8'
                            }}
                        >
                            {level.fillInData.codeSnippet.replace('____', '________')}
                        </SyntaxHighlighter>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {level.fillInData.options.map((option, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedOption(idx)}
                                className={`
                  relative p-6 rounded-2xl border-4 text-left transition-all font-mono text-xl font-bold
                  ${selectedOption === idx
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 shadow-lg'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
                                    }
                `}
                            >
                                {option}
                                {selectedOption === idx && (
                                    <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-blue-600 dark:text-blue-400" />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            {/* CHOICE MODE */}
            {level.type === 'choice' && level.choiceData && (
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        {level.choiceData.question}
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        {level.choiceData.options.map((option, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setSelectedOption(idx)}
                                className={`
                  relative p-6 md:p-8 rounded-2xl border-4 text-left transition-all flex items-center justify-between text-lg
                  ${selectedOption === idx
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 shadow-xl'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
                                    }
                `}
                            >
                                <span className="font-medium">{option}</span>
                                {selectedOption === idx && (
                                    <CheckCircle className="w-7 h-7 text-blue-600 dark:text-blue-400 flex-shrink-0 ml-4" />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
