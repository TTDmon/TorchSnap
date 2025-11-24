import { type World } from '../types';

export const worlds: World[] = [
    {
        id: 'world-1',
        title: 'World 1: The Tensor Mines',
        description: 'Master multidimensional arrays, shapes, and broadcasting.',
        levels: [
            {
                id: '1-1',
                title: 'Level 1-1: Creation',
                worldId: 'world-1',
                type: 'fill_in',
                description: `
# Tensor Creation

In PyTorch, everything starts with a **Tensor**. It's just a multi-dimensional matrix containing elements of a single data type.

Common ways to create tensors:
- \`torch.tensor([1, 2])\`: Create from data.
- \`torch.randn(3, 3)\`: Random numbers from normal distribution.
- \`torch.zeros(3, 3)\`: All zeros.
- \`torch.ones(3, 3)\`: All ones.

**Mission:** Create a 3x3 tensor filled with zeros to initialize our canvas.
        `,
                fillInData: {
                    codeSnippet: "canvas = torch.____(3, 3)",
                    options: ["empty", "zeros", "nans"],
                    correctOptionIndex: 1
                },
                successMessage: "Perfect! You've created a blank slate.",
                failureMessage: "Not quite. We need a tensor filled with *zeros*.",
                explanation: `
## Why \`torch.zeros()\`?

In deep learning, we often need to initialize tensors with specific values. \`torch.zeros()\` creates a tensor filled with zeros, which is useful for:

- **Initializing weights**: Some layers start with zero weights
- **Creating masks**: Binary masks often start as zeros
- **Placeholder tensors**: When you need a tensor of a specific shape but values don't matter yet

**Syntax**: \`torch.zeros(shape)\` where shape can be a single integer or a tuple like \`(3, 3)\`.
        `,
                tips: [
                    "Use `torch.zeros_like(other_tensor)` to create zeros with the same shape as another tensor",
                    "`torch.zeros()` returns float32 by default. Use `dtype=torch.int` for integers",
                    "For GPU tensors, add `.cuda()` or use `device='cuda'` parameter"
                ],
                commonMistakes: [
                    "Confusing `torch.zeros(3, 3)` with `torch.zeros([3, 3])` - both work, but the first is more common",
                    "Forgetting that zeros are float by default, not int"
                ]
            },
            {
                id: '1-2',
                title: 'Level 1-2: Shapes',
                worldId: 'world-1',
                type: 'choice',
                description: `
# Understanding Shapes

Deep Learning is mostly about managing shapes. A typical image batch tensor has 4 dimensions:
\`(Batch_Size, Channels, Height, Width)\`

For example: \`[32, 3, 64, 64]\` means:
- **32** images per batch
- **3** color channels (RGB)
- **64** pixels height
- **64** pixels width

**Mission:** Identify the dimension representing the **Color Channels** in \`[32, 3, 64, 64]\`.
        `,
                choiceData: {
                    question: "Which dimension index represents the Channels?",
                    options: ["Dim 0 (32)", "Dim 1 (3)", "Dim 2 (64)", "Dim 3 (64)"],
                    correctOptionIndex: 1
                },
                successMessage: "Correct! Dim 1 is usually channels (C) in PyTorch (N, C, H, W).",
                failureMessage: "Incorrect. Remember NCHW format."
            },
            {
                id: '1-3',
                title: 'Level 1-3: View vs Reshape',
                worldId: 'world-1',
                type: 'fill_in',
                description: `
# Flattening Tensors

Before passing an image to a fully connected layer (Linear), we must **flatten** it into a 1D vector.

We use \`.view()\` or \`.reshape()\`.
A special trick is using \`-1\`, which tells PyTorch: *"Infer this dimension size from the others."*

**Mission:** Flatten a (32, 1, 28, 28) batch of MNIST images into (32, 784).
        `,
                fillInData: {
                    codeSnippet: "x = torch.randn(32, 1, 28, 28)\n# We want (32, 784)\nx_flat = x.view(x.size(0), ____)",
                    options: ["-1", "0", "28"],
                    correctOptionIndex: 0
                },
                successMessage: "Bingo! -1 tells PyTorch: 'Calculate the remaining size for me'.",
                failureMessage: "Try again. Which value means 'infer automatically'?"
            },
            {
                id: '1-4',
                title: 'Level 1-4: Permute',
                worldId: 'world-1',
                type: 'parsons',
                description: `
# Dimension Permutation

Sometimes data comes in the wrong order.
- OpenCV images: \`(H, W, C)\`
- PyTorch models: \`(C, H, W)\`

We use \`.permute()\` to rearrange dimensions.

**Mission:** Convert an image from HWC to CHW format.
        `,
                parsonsData: {
                    initialBlocks: [
                        { id: '1', content: 'img_pytorch = img_cv2.permute(', type: 'function', indent: 0 },
                        { id: '2', content: '2,  # Channel was at dim 2', type: 'variable', indent: 1 },
                        { id: '3', content: '0,  # Height was at dim 0', type: 'variable', indent: 1 },
                        { id: '4', content: '1   # Width was at dim 1', type: 'variable', indent: 1 },
                        { id: '5', content: ')', type: 'function', indent: 0 },
                    ],
                    solutionIds: ['1', '2', '3', '4', '5']
                },
                successMessage: "Nice move! Dimensions rearranged successfully.",
                failureMessage: "Check the order. We need (2, 0, 1) to go from (0, 1, 2) -> (2, 0, 1)."
            },
            {
                id: '1-5',
                title: 'Level 1-5: Broadcasting',
                worldId: 'world-1',
                type: 'choice',
                description: `
# Broadcasting Magic

PyTorch allows arithmetic operations on tensors of different shapes if they are compatible.

Two dimensions are compatible when:
1. They are equal, OR
2. One of them is 1.

**Mission:** Can we add tensor A \`(32, 10)\` and tensor B \`(10)\`?
        `,
                choiceData: {
                    question: "Is `torch.randn(32, 10) + torch.randn(10)` valid?",
                    options: ["Yes, it broadcasts", "No, shapes mismatch"],
                    correctOptionIndex: 0
                },
                successMessage: "Yes! The (10) becomes (1, 10) and then broadcasts to (32, 10).",
                failureMessage: "It actually works! Review the broadcasting rules."
            },
            {
                id: '1-BOSS',
                title: 'BOSS: Preprocessing Pipeline',
                worldId: 'world-1',
                type: 'parsons',
                description: `
# BOSS BATTLE: Data Pipeline

Combine everything you've learned!
You have a batch of raw RGB images: \`raw_imgs\` shape \`(N, H, W, C)\`.

**Objective:**
1. Convert to Float tensor.
2. Permute to \`(N, C, H, W)\`.
3. Normalize by dividing by 255.
4. Flatten to \`(N, C*H*W)\`.
        `,
                parsonsData: {
                    initialBlocks: [
                        { id: '1', content: 'def preprocess(raw_imgs):', type: 'function', indent: 0 },
                        { id: '2', content: 'x = torch.tensor(raw_imgs).float()', type: 'layer', indent: 1 },
                        { id: '3', content: 'x = x.permute(0, 3, 1, 2)', type: 'layer', indent: 1 },
                        { id: '4', content: 'x = x / 255.0', type: 'layer', indent: 1 },
                        { id: '5', content: 'return x.view(x.size(0), -1)', type: 'layer', indent: 1 },
                    ],
                    solutionIds: ['1', '2', '3', '4', '5']
                },
                successMessage: "PIPELINE OPERATIONAL! You've mastered the Tensor Mines.",
                failureMessage: "Pipeline broken. Check your order of operations."
            }
        ]
    }
];
