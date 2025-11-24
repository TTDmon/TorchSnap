import { useState, useEffect } from 'react';
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
import { Play, RotateCcw, CheckCircle } from 'lucide-react';
import { SortableBlock } from './SortableBlock';
import { type CodeBlock } from '../../types';

import { useStore } from '../../store/useStore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


export function LogicWorkbench() {
    const { getCurrentLevel, setConsoleOutput, clearConsole } = useStore();
    const level = getCurrentLevel();

    const [blocks, setBlocks] = useState<CodeBlock[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    useEffect(() => {
        if (level?.type === 'parsons' && level.parsonsData) {
            setBlocks(level.parsonsData.initialBlocks);
        } else {
            setBlocks([]);
        }
        setSelectedOption(null);
        clearConsole();
    }, [level?.id]);

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

    const handleReset = () => {
        if (level?.type === 'parsons' && level.parsonsData) {
            const shuffled = [...level.parsonsData.initialBlocks].sort(() => Math.random() - 0.5);
            setBlocks(shuffled);
        }
        setSelectedOption(null);
        clearConsole();
    };

    const handleRun = () => {
        if (!level) return;

        let isSuccess = false;

        if (level.type === 'parsons' && level.parsonsData) {
            const currentOrder = blocks.map(b => b.id).join(',');
            const correctOrder = level.parsonsData.solutionIds.join(',');
            isSuccess = currentOrder === correctOrder;
        } else if (level.type === 'fill_in' && level.fillInData) {
            isSuccess = selectedOption === level.fillInData.correctOptionIndex;
        } else if (level.type === 'choice' && level.choiceData) {
            isSuccess = selectedOption === level.choiceData.correctOptionIndex;
        }

        if (isSuccess) {
            setConsoleOutput([level.successMessage], 'success');
        } else {
            setConsoleOutput([level.failureMessage], 'error');
        }
    };

    if (!level) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur">
                <span className="text-sm font-medium text-muted-foreground">Workspace</span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset
                    </button>
                    <button
                        onClick={handleRun}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-green-600 text-white hover:bg-green-700 rounded-md transition-colors shadow-sm"
                    >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Run Code
                    </button>
                </div>
            </div>

            {/* Main Workspace Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Drop Zone / Interaction Zone */}
                <div className="flex-1 p-8 bg-dot-pattern overflow-auto">
                    <div className="max-w-2xl mx-auto">

                        {/* PARSONS MODE */}
                        {level.type === 'parsons' && (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={blocks}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-2 min-h-[400px] pb-20">
                                        {blocks.map((block) => (
                                            <SortableBlock key={block.id} block={block} />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        )}

                        {/* FILL-IN MODE */}
                        {level.type === 'fill_in' && level.fillInData && (
                            <div className="space-y-8">
                                <div className="p-6 bg-[#1e1e1e] rounded-lg border border-border shadow-lg">
                                    <SyntaxHighlighter
                                        language="python"
                                        style={vscDarkPlus}
                                        customStyle={{ background: 'transparent', margin: 0 }}
                                    >
                                        {level.fillInData.codeSnippet.replace('____', '________')}
                                    </SyntaxHighlighter>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {level.fillInData.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedOption(idx)}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${selectedOption === idx
                                                ? 'border-primary bg-primary/10 text-primary'
                                                : 'border-border bg-card hover:border-primary/50'
                                                }`}
                                        >
                                            <span className="font-mono text-lg">{option}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CHOICE MODE */}
                        {level.type === 'choice' && level.choiceData && (
                            <div className="space-y-8">
                                <div className="text-xl font-medium text-center mb-8">
                                    {level.choiceData.question}
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {level.choiceData.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedOption(idx)}
                                            className={`p-6 rounded-lg border-2 text-left transition-all flex items-center justify-between ${selectedOption === idx
                                                ? 'border-primary bg-primary/10 text-primary'
                                                : 'border-border bg-card hover:border-primary/50'
                                                }`}
                                        >
                                            <span className="text-lg">{option}</span>
                                            {selectedOption === idx && <CheckCircle className="w-5 h-5" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Source Pool (Only for Parsons) */}
                {level.type === 'parsons' && (
                    <div className="w-64 border-l border-border bg-card p-4 overflow-auto hidden lg:block">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                            Available Blocks
                        </h3>
                        <div className="text-sm text-muted-foreground italic">
                            Drag blocks to reorder them in the main workspace.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
