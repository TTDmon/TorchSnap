
import { Terminal } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export function Footer() {
    const { consoleOutput, consoleStatus } = useStore();

    return (
        <div className="flex flex-col h-full font-mono text-sm">
            <div className="flex items-center px-4 py-2 border-b border-gray-800 bg-gray-900 text-gray-400 select-none">
                <Terminal className="w-4 h-4 mr-2" />
                <span>Console Output</span>
            </div>
            <div className="flex-1 p-4 overflow-auto bg-black">
                {consoleOutput.length === 0 ? (
                    <div className="text-gray-500 italic">
                        Ready to run...
                    </div>
                ) : (
                    <div className={cn(
                        "space-y-1",
                        consoleStatus === 'error' ? "text-red-400" : "text-green-400"
                    )}>
                        {consoleOutput.map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
