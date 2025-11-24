import React from 'react';

interface LayoutProps {
    header: React.ReactNode;
    content: React.ReactNode;
    feedbackBar: React.ReactNode;
}

export function Layout({ header, content, feedbackBar }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-5xl mx-auto px-4 py-3">
                    {header}
                </div>
            </header>

            {/* Main Content - Centered Card */}
            <main className="max-w-4xl mx-auto px-4 py-8 pb-32">
                {content}
            </main>

            {/* Feedback Bar */}
            {feedbackBar}
        </div>
    );
}
