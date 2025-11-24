
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { cn } from '../../lib/utils';
import { type CodeBlock } from '../../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SortableBlockProps {
    block: CodeBlock;
}

export function SortableBlock({ block }: SortableBlockProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginLeft: block.indent ? `${block.indent * 20}px` : '0px',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group relative flex items-center gap-2 mb-3",
                isDragging && "opacity-50 z-50"
            )}
        >
            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <GripVertical className="w-5 h-5" />
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-900 shadow-md group-hover:border-blue-400 dark:group-hover:border-blue-600 transition-all group-hover:shadow-lg">
                <SyntaxHighlighter
                    language="python"
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: '1rem 1.25rem',
                        background: 'transparent',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                    }}
                >
                    {block.content}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
