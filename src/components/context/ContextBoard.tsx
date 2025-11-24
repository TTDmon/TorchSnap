import * as Tabs from '@radix-ui/react-tabs';
import { BookOpen, Code2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';
import ReactMarkdown from 'react-markdown';

export function ContextBoard() {
    const { getCurrentLevel } = useStore();
    const level = getCurrentLevel();

    if (!level) return <div className="p-6">Level not found</div>;

    return (
        <div className="flex flex-col h-full">
            <Tabs.Root defaultValue="learn" className="flex flex-col h-full">
                <Tabs.List className="flex border-b border-border bg-card px-2">
                    <Tabs.Trigger
                        value="learn"
                        className={cn(
                            "flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground border-b-2 border-transparent transition-all hover:text-foreground",
                            "data-[state=active]:text-primary data-[state=active]:border-primary"
                        )}
                    >
                        <BookOpen className="w-4 h-4" />
                        Mission Brief
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="docs"
                        className={cn(
                            "flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground border-b-2 border-transparent transition-all hover:text-foreground",
                            "data-[state=active]:text-primary data-[state=active]:border-primary"
                        )}
                    >
                        <Code2 className="w-4 h-4" />
                        Intel
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="learn" className="flex-1 overflow-auto p-6">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{level.description}</ReactMarkdown>

                        {level.visualHint && (
                            <div className="my-8 p-4 bg-card border border-border rounded-lg flex items-center justify-center min-h-[200px]">
                                <div className="text-center text-muted-foreground">
                                    [Visual Hint: {level.visualHint}]
                                </div>
                            </div>
                        )}
                    </div>
                </Tabs.Content>

                <Tabs.Content value="docs" className="flex-1 overflow-auto p-6">
                    <div className="space-y-4">
                        <div className="p-4 bg-card border border-border rounded-lg">
                            <h3 className="font-mono font-bold text-primary">nn.Linear(in_features, out_features)</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                Applies a linear transformation to the incoming data: y = xA^T + b
                            </p>
                        </div>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
}
