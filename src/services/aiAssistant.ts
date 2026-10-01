import { useApp } from '@/context/AppContext';
import type { Resource } from '@/types';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/\b\w+\b/g) ?? [];
}

function categoryMatch(tokens: string[]): string | null {
  const categoryKeywords: Record<string, string[]> = {
    'Books': ['book', 'textbook', 'notes', 'reading', 'study', 'exam', 'dsa', 'algorithm', 'python', 'math', 'physics', 'database', 'os', 'operating system'],
    'Electronics': ['calculator', 'laptop', 'charger', 'arduino', 'electronic', 'device', 'phone', 'usb', 'graphing', 'multimeter', 'ti-84'],
    'Clothing': ['jacket', 'shirt', 'cloth', 'coat', 'wear', 'formal', 'winter'],
    'Furniture': ['table', 'chair', 'desk', 'shelf', 'bookshelf', 'lamp', 'furniture'],
    'Sports': ['cricket', 'badminton', 'sport', 'bat', 'racket', 'ball'],
    'Lab Equipment': ['microscope', 'lab', 'equipment', 'experiment', 'biology', 'chemistry'],
    'Stationery': ['pen', 'marker', 'highlighter', 'drawing', 'compass', 'stationery', 'pencil'],
  };
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (tokens.some((t) => keywords.includes(t))) return category;
  }
  return null;
}

export function generateResponse(query: string, resources: Resource[]): string {
  const tokens = tokenize(query);
  const q = query.toLowerCase();

  // Greeting
  if (/\b(hi|hello|hey|greetings)\b/.test(q)) {
    return "Hello! I'm EcoShare AI, your sustainability assistant. I can help you find resources, understand how the app uses ADSA algorithms, or learn about reducing waste. What would you like to know?";
  }

  // How does the app use ADSA
  if (tokens.includes('adsa') || (tokens.includes('algorithm') && (tokens.includes('use') || tokens.includes('work') || tokens.includes('how')))) {
    return "The Sustainable Resource Sharing System uses several ADSA algorithms:\n\n• Linear Search — scanning unsorted resource lists\n• Binary Search — fast O(log n) lookup in sorted lists\n• Sorting (Bubble, Selection, Insertion, Merge, Quick) — ordering resources by name, date, condition\n• HashMap — instant resource lookup by name key\n• Queue — processing resource requests in FIFO order\n• Priority Queue — handling urgent requests first\n• Graph + BFS/DFS — modeling user-sharing connections\n\nVisit the 'ADSA Algorithms' page to see interactive visualizations of each!";
  }

  // How to reduce waste
  if (tokens.includes('waste') || tokens.includes('reduce') || tokens.includes('sustainab')) {
    return "Here are ways to reduce waste through resource sharing:\n\n1. Share items you no longer need instead of throwing them away\n2. Borrow instead of buying new for short-term needs\n3. Pass on textbooks and notes to juniors\n4. Share electronics like calculators and chargers\n5. Give away furniture when moving out\n\nEvery shared item is one less in a landfill. Our platform tracks estimated waste reduced based on completed exchanges.";
  }

  // Find resources / what's available
  if (tokens.includes('find') || tokens.includes('available') || tokens.includes('search') || tokens.includes('show') || tokens.includes('resource')) {
    const category = categoryMatch(tokens);
    if (category) {
      const matches = resources.filter((r) => r.category === category && r.available);
      if (matches.length > 0) {
        const top = matches.slice(0, 4);
        return `I found ${matches.length} available ${category} resource${matches.length > 1 ? 's' : ''}:\n\n${top.map((r) => `• ${r.name} — ${r.condition}, owned by ${r.owner}`).join('\n')}\n\n${matches.length > 4 ? `...and ${matches.length - 4} more. ` : ''}Visit the Browse Resources page to see all of them!`;
      }
      return `Unfortunately, there are no available ${category} resources right now. Check back later or set up a request!`;
    }
    if (tokens.includes('near') || tokens.includes('me') || tokens.includes('location')) {
      return "To find resources near you, go to the Browse Resources page and use the search and category filters. You can also check the resource details page for the owner's location to find items closest to you.";
    }
    const available = resources.filter((r) => r.available);
    return `There are currently ${available.length} available resources across ${new Set(available.map((r) => r.category)).size} categories. Browse them all on the Resources page!`;
  }

  // Most reusable
  if (tokens.includes('reusable') || tokens.includes('popular') || tokens.includes('most')) {
    const categoryCount: Record<string, number> = {};
    resources.forEach((r) => {
      categoryCount[r.category] = (categoryCount[r.category] || 0) + 1;
    });
    const sorted = Object.entries(categoryCount).sort(([, a], [, b]) => b - a);
    const top = sorted[0];
    return `The most shared category is ${top[0]} with ${top[1]} resources. Books and Electronics tend to be the most reusable since they retain value and are needed by many students. Sharing these categories has the highest impact on waste reduction!`;
  }

  // How to share / add
  if (tokens.includes('share') || tokens.includes('add') || tokens.includes('upload') || tokens.includes('list')) {
    return "To share a resource:\n\n1. Click 'Share a Resource' in the navigation\n2. Fill in the resource name, category, condition, location, and description\n3. Choose whether to Give Away or Lend\n4. Submit the form\n\nYour resource will immediately appear in the Browse Resources page for others to find and request!";
  }

  // Request
  if (tokens.includes('request') || tokens.includes('borrow') || tokens.includes('how') && tokens.includes('get')) {
    return "To request a resource:\n\n1. Browse available resources on the Resources page\n2. Click on a resource to view details\n3. Click 'Request Resource' and write a message to the owner\n4. Mark it as urgent if you need it quickly\n5. Track your request status on the Requests page\n\nThe owner can approve, reject, or mark your request as completed.";
  }

  // EcoShare AI identity
  if (tokens.includes('who') || tokens.includes('what') && tokens.includes('you') || tokens.includes('your') && tokens.includes('name')) {
    return "I'm EcoShare AI, a local AI-style assistant built into the Sustainable Resource Sharing System. I can help you find resources, explain how the app works, answer questions about ADSA algorithms, and provide sustainability tips. I run entirely in your browser — no external API needed!";
  }

  // Thank you
  if (tokens.includes('thank') || tokens.includes('thanks')) {
    return "You're welcome! Feel free to ask me anything else about resources, sharing, or the platform. Happy sharing!";
  }

  // Default
  return "I'm not sure I understand that question. I can help you with:\n\n• Finding resources by category (try 'find me books')\n• Understanding how the app uses ADSA algorithms\n• Tips on reducing waste\n• How to share or request resources\n• What resources are most reusable\n\nTry asking one of those!";
}

export type { ChatMessage };
