# Sustainable Resource Sharing System

A college-level ADSA (Advanced Data Structures & Algorithms) project that combines modern web development, AI features, and algorithmic thinking to address the real-world problem of waste reduction through resource reuse.

> **Share more. Waste less. Build a sustainable community.**

---

## Project Description

The Sustainable Resource Sharing System is a platform where students and community members can share unused resources — books, electronics, furniture, clothes, lab equipment, sports gear, and more — instead of throwing them away. The application demonstrates ADSA concepts through real algorithm implementations, includes AI-powered features for recommendations and insights, and provides a polished, modern UI.

## Problem Statement

Every year, students discard usable resources when they could be shared with peers who need them. This creates unnecessary waste and financial burden. There is no centralized campus platform for sharing these resources efficiently, and existing solutions don't leverage algorithmic optimization or AI for better matching.

## Objectives

1. Reduce waste by enabling reuse of resources among students and community members.
2. Create a centralized platform for sharing books, electronics, furniture, and more.
3. Demonstrate ADSA concepts through real-world algorithm implementations.
4. Promote sustainability awareness and circular economy practices on campus.
5. Provide AI-powered recommendations and insights for better resource utilization.

## Features

- **Resource Management**: Add, edit, delete, search, filter, and sort resources.
- **Request System**: Request resources with pending/approved/rejected/completed states.
- **ADSA Algorithm Lab**: Interactive visualizations of 10+ algorithms.
- **AI Resource Recommender**: Similarity-based recommendation engine.
- **EcoShare AI Assistant**: Chatbot that answers questions about resources and sustainability.
- **AI Sustainability Insights**: Environmental impact dashboard with AI-generated insights.
- **Admin Dashboard**: Platform analytics with charts and statistics.
- **User Authentication**: Login and registration with form validation.
- **Toast Notifications**: Non-intrusive feedback for all user actions.
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| State | React Context + localStorage |
| Charts | Custom SVG components |
| AI | Local similarity scoring + NLP-style response engine |

## Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Charts.tsx       # Bar, Donut, Line chart components
│   ├── Footer.tsx
│   ├── Navbar.tsx       # Navigation with auth + dropdown
│   ├── ResourceCard.tsx
│   └── ToastContainer.tsx
├── context/
│   └── AppContext.tsx   # Global state: resources, requests, auth, toasts
├── data/
│   └── sampleData.ts    # 10 users, 25 resources, 15 requests
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── AddResourcePage.tsx
│   ├── DetailsPage.tsx
│   ├── RequestsPage.tsx
│   ├── UserDashboardPage.tsx
│   ├── AdminPage.tsx
│   ├── AboutPage.tsx
│   ├── AIAssistantPage.tsx
│   ├── AIRecommendationsPage.tsx
│   ├── AIInsightsPage.tsx
│   ├── AdsApage.tsx
│   └── adsa/            # Algorithm visualization components
│       ├── LinearSearchDemo.tsx
│       ├── BinarySearchDemo.tsx
│       ├── SortingDemo.tsx       # Bubble, Selection, Insertion, Merge, Quick
│       ├── HashTableDemo.tsx
│       ├── QueueDemo.tsx
│       ├── PriorityQueueDemo.tsx
│       ├── GraphDemo.tsx
│       └── BfsDfsDemo.tsx
├── services/
│   ├── aiAssistant.ts    # EcoShare AI local NLP engine
│   └── recommendations.ts # Similarity-based recommendation engine
├── types/
│   └── index.ts          # TypeScript types and constants
├── router.ts             # Hash-based routing
├── App.tsx
└── main.tsx
```

## ADSA Concepts Used

| Algorithm | Time Complexity | Application |
|-----------|----------------|-------------|
| Linear Search | O(n) | Scanning unsorted resource lists |
| Binary Search | O(log n) | Fast lookup in sorted lists |
| Bubble Sort | O(n²) | Simple ordering demonstration |
| Selection Sort | O(n²) | Minimum selection visualization |
| Insertion Sort | O(n²) | Incremental sorting |
| Merge Sort | O(n log n) | Efficient divide-and-conquer sorting |
| Quick Sort | O(n log n) avg | Partition-based sorting |
| Hash Table | O(1) avg | Instant resource lookup by name |
| Queue (FIFO) | O(1) | Processing requests in arrival order |
| Priority Queue | O(log n) | Urgent requests served first |
| Graph | O(V+E) | User-sharing network modeling |
| BFS | O(V+E) | Level-by-level graph traversal |
| DFS | O(V+E) | Depth-first graph traversal |

## AI Features

### 1. Smart Resource Recommender
- Uses similarity scoring based on: category match (40pts), description keyword overlap (up to 20pts), name similarity (8pts/word), condition match (10pts), sharing type (5pts), location proximity (8pts), and popularity (up to 10pts).
- Provides personalized recommendations based on user's shared resources.
- Shows match score and reasons for each recommendation.

### 2. EcoShare AI Assistant
- Chatbot interface with a local NLP-style response engine.
- Tokenizes user queries and matches against category keywords.
- Answers questions about: finding resources, ADSA usage, waste reduction, sharing instructions, most reusable items.
- Runs entirely in the browser — no external API calls.

### 3. AI Sustainability Insights
- Calculates: estimated waste reduced (kg), CO2 saved (kg), sustainability score (0-100).
- Generates natural-language insights from statistical data.
- Distinguishes "Calculated Statistic" from "AI-Generated" insights.
- Displays charts for category distribution, monthly trends, request status.

## Database Design

The application uses localStorage for persistence with the following data models:

- **Users**: id, name, email, password, location, joined
- **Resources**: id, name, category, description, condition, location, owner, quantity, sharingType, available, dateAdded, views
- **Requests**: id, resourceId, resourceName, requester, owner, status, dateRequested, urgent, message

Sample data: 10 users, 25 resources, 15 requests across 9 categories.

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## How to Run

1. Ensure Node.js 18+ is installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open the browser to the displayed URL.
5. The app loads with sample data — no setup required.

### Demo Login
- Email: `aarav@college.edu`
- Password: `demo123`

## Testing

See [TESTING.md](./TESTING.md) for detailed test results.

## Future Enhancements

- Real backend with Spring Boot REST API and PostgreSQL database.
- Image upload for resource photos.
- Real-time notifications using WebSockets.
- Geolocation-based resource matching.
- Integration with external AI APIs for enhanced recommendations.
- Mobile app version.
- Rating and review system for users.
- Automated matching algorithm for requests and resources.

## Team

- **Student Name**: [Your Name Here]
- **Roll Number**: [Your Roll Number]
- **Course**: ADSA (Advanced Data Structures & Algorithms)
- **Institution**: [Your College Name]

---

Built with care for a sustainable future.
