const TITLE_MAPPINGS: Array<{ keywords: string[]; titles: string[] }> = [
  {
    keywords: ['react', 'next', 'frontend', 'ui', 'vue', 'svelte', 'css', 'tailwind', 'interface'],
    titles: [
      'THE INTERFACE ARCHITECT',
      'THE PIXEL MAESTRO',
      'THE UI ENGINEER',
      'THE DOM WHISPERER',
      'THE FRONTEND CRAFTSMAN',
    ],
  },
  {
    keywords: ['ai', 'python', 'llm', 'ml', 'model', 'gpt', 'langchain', 'claude', 'deep learning'],
    titles: [
      'THE MODEL BUILDER',
      'THE AI ARCHITECT',
      'THE PROMPT MAGICIAN',
      'THE NEURAL OPERATOR',
      'THE AGENT CRAFTSMAN',
    ],
  },
  {
    keywords: ['backend', 'node', 'express', 'go', 'golang', 'rust', 'api', 'server', 'database', 'postgres', 'sql'],
    titles: [
      'THE API ARCHITECT',
      'THE SYSTEM FORGER',
      'THE BACKEND MASTER',
      'THE INFRASTRUCTURE ENGINE',
      'THE RUNTIME CRAFTSMAN',
    ],
  },
  {
    keywords: ['solana', 'web3', 'blockchain', 'crypto', 'smart contract', 'eth', 'ethereum', 'solidity'],
    titles: [
      'THE PROTOCOL ENGINEER',
      'THE ON-CHAIN ARCHITECT',
      'THE BLOCK FORGER',
      'THE DECENTRALIZED BUILDER',
    ],
  },
  {
    keywords: ['fullstack', 'full-stack', 'full stack', 'allrounder', 'generalist'],
    titles: [
      'THE FULL-STACK BUILDER',
      'THE END-TO-END ARCHITECT',
      'THE MAINFRAME CRAFTSMAN',
      'THE PRODUCT FORGER',
    ],
  },
  {
    keywords: ['design', 'figma', 'ux', 'product design', 'creative'],
    titles: [
      'THE PRODUCT ARCHITECT',
      'THE VISUAL MAESTRO',
      'THE UX CRAFTSMAN',
      'THE DESIGN ENGINEER',
    ],
  },
  {
    keywords: ['devops', 'docker', 'cloud', 'aws', 'kubernetes', 'k8s', 'infra'],
    titles: [
      'THE CLOUD ARCHITECT',
      'THE DEPLOYMENT MASTER',
      'THE INFRASTRUCTURE ENGINE',
      'THE SITE RELIABILITY NINJA',
    ],
  },
];

const GENERAL_TITLES = [
  'THE SYSTEM ARCHITECT',
  'THE HIGH-VELOCITY BUILDER',
  'THE CODE FORGER',
  'THE SHIPPER OF THINGS',
  'THE INNOVATION ARCHITECT',
  'THE GOA HACKER',
  'THE PROTOCOL BUILDER',
  'THE DISRUPTIVE ARCHITECT',
  'THE UNSTOPPABLE BUILDER',
];

/**
 * Generate a deterministic builder title based on role/stack string
 */
export function generateBuilderTitle(roleStack: string, preferredIndex: number = 0): string {
  const normalized = roleStack.toLowerCase().trim();
  if (!normalized) {
    return GENERAL_TITLES[preferredIndex % GENERAL_TITLES.length];
  }

  // Find matching keyword pool
  for (const mapping of TITLE_MAPPINGS) {
    if (mapping.keywords.some((kw) => normalized.includes(kw))) {
      const titles = mapping.titles;
      return titles[Math.abs(preferredIndex) % titles.length];
    }
  }

  // Deterministic fallback hash based on string content
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash << 5) - hash + normalized.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash + preferredIndex) % GENERAL_TITLES.length;
  return GENERAL_TITLES[index];
}

export function getRandomTitle(): string {
  const randomIndex = Math.floor(Math.random() * GENERAL_TITLES.length);
  return GENERAL_TITLES[randomIndex];
}
