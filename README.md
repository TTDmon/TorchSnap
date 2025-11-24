# 🔥 TorchSnap

**Learn PyTorch through interactive, bite-sized challenges!**

TorchSnap is a Duolingo-style learning platform for mastering PyTorch. Instead of reading documentation, you'll learn by doing — solving short, interactive coding challenges that build your deep learning skills step by step.

![TorchSnap Banner](https://img.shields.io/badge/PyTorch-Learning-orange?style=for-the-badge&logo=pytorch)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

---

## 🎯 What is TorchSnap?

TorchSnap transforms PyTorch learning into an engaging, game-like experience:

- **🎮 Game Map Structure**: Progress through themed "Worlds" (Tensor Mines, Autograd Engine, etc.)
- **⚡ Micro-Lessons**: Each level takes 30-90 seconds to complete
- **🎨 Interactive Challenges**: Drag-and-drop code blocks, fill-in-the-blank, and multiple choice
- **🎊 Instant Feedback**: Get immediate validation with confetti celebrations for correct answers
- **📚 Deep Explanations**: Learn why your answer is correct with detailed explanations, tips, and common mistakes
- **🏆 Progressive Difficulty**: Start with basics and gradually tackle advanced concepts

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.19.1 or higher (v20.19+ recommended)
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TTDmon/TorchSnap.git
   cd TorchSnap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:5173/](http://localhost:5173/)

---

## 📖 How to Use TorchSnap

### 🎓 Learning Flow

1. **Start a Level**
   - Each level begins with a **Mission Brief** card explaining the concept
   - Read the description to understand what you'll learn

2. **Solve the Challenge**
   - Depending on the level type, you'll either:
     - **Parsons Problem**: Drag and drop code blocks into the correct order
     - **Fill-in-the-Blank**: Select the correct code to complete the snippet
     - **Multiple Choice**: Choose the right answer to a conceptual question

3. **Check Your Answer**
   - Click the green **"Check Answer"** button at the bottom
   - If correct: 🎉 Confetti animation + success message
   - If incorrect: ❌ Error message with a hint

4. **Learn from Explanations** (After Success)
   - A beautiful **Explanation Card** appears with:
     - 📚 **Detailed explanation** of the concept
     - 💡 **Pro tips** for real-world usage
     - ⚠️ **Common mistakes** to avoid

5. **Continue to Next Level**
   - Click **"Continue"** to move to the next challenge
   - Track your progress with the progress bar at the top

### 🗺️ World Structure

#### **World 1: The Tensor Mines**
Learn the fundamentals of PyTorch tensors:
- **Level 1-1**: Tensor Creation (`torch.zeros`, `torch.ones`, etc.)
- **Level 1-2**: Understanding Shapes
- **Level 1-3**: View and Reshape operations
- **Level 1-4**: Permute and transpose
- **Level 1-5**: Broadcasting rules
- **BOSS**: Comprehensive tensor manipulation challenge

*(More worlds coming soon: Autograd Engine, Neural Networks, Training Loops, etc.)*

### 🎮 Interaction Types

#### 1. **Parsons Problems** (Drag & Drop)
- Reorder shuffled code blocks into the correct sequence
- Hover over blocks to see the drag handle
- Perfect for learning syntax and code structure

#### 2. **Fill-in-the-Blank**
- View a code snippet with a missing piece
- Select the correct option from 3 choices
- Great for memorizing function names and parameters

#### 3. **Multiple Choice**
- Answer conceptual questions about PyTorch
- Understand the "why" behind the code
- Build theoretical knowledge

---

## 🎨 Features

### ✨ Modern UI/UX
- **Card-based Design**: Clean, Duolingo-inspired interface
- **Gradient Backgrounds**: Beautiful blue-purple-pink gradients
- **Smooth Animations**: Framer Motion powered transitions
- **Dark Mode Support**: Easy on the eyes for late-night learning
- **Responsive**: Works on desktop, tablet, and mobile

### 🧠 Smart Learning
- **Immediate Feedback**: Know instantly if you're right or wrong
- **Contextual Hints**: Error messages guide you toward the solution
- **Progressive Disclosure**: Learn one concept at a time
- **Spaced Repetition**: Boss battles review previous concepts

### 🛠️ Developer-Friendly
- **TypeScript**: Fully typed for better DX
- **Modular Architecture**: Easy to add new levels and worlds
- **Data-Driven**: Curriculum defined in simple JSON-like structures
- **Hot Reload**: Changes reflect instantly during development

---

## 📂 Project Structure

```
TorchSnap/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Header, Footer, FeedbackBar)
│   │   ├── level/           # Level components (LevelCard, InteractionCard)
│   │   ├── explanation/     # Post-answer explanation components
│   │   └── workspace/       # Interactive workspace (SortableBlock, etc.)
│   ├── data/
│   │   └── worlds.ts        # Curriculum data (all levels and worlds)
│   ├── store/
│   │   └── useStore.ts      # Zustand state management
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── README.md               # This file!
```

---

## 🔧 Development

### Available Scripts

- **`npm run dev`**: Start development server with hot reload
- **`npm run build`**: Build for production
- **`npm run preview`**: Preview production build locally
- **`npm run lint`**: Run ESLint

### Adding New Levels

1. Open `src/data/worlds.ts`
2. Add a new level object to the `levels` array:

```typescript
{
  id: '1-7',
  title: 'Your Level Title',
  type: 'fill_in', // or 'parsons' or 'choice'
  description: 'Your mission brief in Markdown',
  fillInData: {
    codeSnippet: 'x = torch.____(5)',
    options: ['zeros', 'ones', 'randn'],
    correctOptionIndex: 0
  },
  successMessage: 'Great job!',
  failureMessage: 'Try again!',
  explanation: '## Why this works\n\nDetailed explanation...',
  tips: ['Tip 1', 'Tip 2'],
  commonMistakes: ['Mistake 1', 'Mistake 2']
}
```

3. Save and the new level will appear automatically!

### Tech Stack

- **Framework**: React 18 + Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4.1
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **Code Highlighting**: react-syntax-highlighter
- **Markdown**: react-markdown
- **Confetti**: canvas-confetti

---

## 🎯 Learning Philosophy

TorchSnap is built on proven learning principles:

1. **Active Learning**: You learn by doing, not just reading
2. **Immediate Feedback**: Know right away if you're on the right track
3. **Scaffolding**: Start simple, gradually increase complexity
4. **Contextual Learning**: See code in realistic scenarios
5. **Spaced Repetition**: Boss battles reinforce previous concepts
6. **Gamification**: Progress bars, celebrations, and achievements keep you motivated

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Add New Levels**: Create challenges for advanced PyTorch topics
2. **Improve Explanations**: Make learning content clearer and more helpful
3. **Fix Bugs**: Report issues or submit pull requests
4. **Suggest Features**: Share ideas for new interaction types or features

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by [Duolingo](https://www.duolingo.com/)'s gamified learning approach
- Built with ❤️ for the PyTorch community
- Special thanks to all contributors and learners

---

## 📧 Contact

- **GitHub**: [@TTDmon](https://github.com/TTDmon)
- **Project Link**: [https://github.com/TTDmon/TorchSnap](https://github.com/TTDmon/TorchSnap)

---

## 🚀 Roadmap

- [ ] World 2: Autograd Engine
- [ ] World 3: Neural Network Basics
- [ ] World 4: Training Loops
- [ ] World 5: CNNs and Computer Vision
- [ ] World 6: RNNs and NLP
- [ ] User accounts and progress tracking
- [ ] Leaderboards and achievements
- [ ] Mobile app (React Native)
- [ ] Community-created challenges

---

**Happy Learning! 🎓🔥**

Start your PyTorch journey today with TorchSnap!
