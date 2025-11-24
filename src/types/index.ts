export type LevelType = 'parsons' | 'fill_in' | 'choice' | 'visual_match';

export interface CodeBlock {
    id: string;
    content: string;
    type: 'layer' | 'function' | 'variable';
    indent?: number;
}

export interface Level {
    id: string;
    title: string;
    worldId: string;
    type: LevelType;
    description: string; // Markdown content for the left panel
    visualHint?: string; // Placeholder for image/animation asset

    // Data for Parsons Problems (Puzzle)
    parsonsData?: {
        initialBlocks: CodeBlock[];
        solutionIds: string[]; // Correct order of block IDs
    };

    // Data for Fill-in-the-Blank
    fillInData?: {
        codeSnippet: string; // Code with '____' as placeholder
        options: string[];
        correctOptionIndex: number;
    };

    // Data for Multiple Choice / Judgment
    choiceData?: {
        question: string;
        options: string[];
        correctOptionIndex: number;
    };

    successMessage: string;
    failureMessage: string;

    // Post-answer content
    explanation?: string; // Detailed explanation shown after correct answer
    tips?: string[]; // Tips and tricks
    commonMistakes?: string[]; // Common mistakes to avoid
}

export interface World {
    id: string;
    title: string;
    description: string;
    levels: Level[];
}
