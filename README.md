# 🏆 TCPC Challenge Simulator

A modern, dynamic competitive programming dashboard UI that simulates a live tournament with multiple teams racing toward a gold medal. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

### 🏆 Teams Journey
- Horizontal progression path showing teams racing toward a gold medal
- Real-time position updates based on scores
- Milestones at 20% (Bronze), 50% (Silver), and 80% (Final Sprint)
- Smooth animated team avatars with color-coded indicators

### ⏱ Global Tournament Countdown Timer
- Large, bold countdown timer (MM:SS format)
- Progress bar that shrinks as time decreases
- Warning color when time < 1 minute
- Real-time updates every second

### 🔔 Real-Time Notifications Panel
- Live notification feed with team activity
- Color-coded notifications by team
- Smooth fade-in/slide-up animations
- Auto-removal after 8 seconds
- Scrollable panel for multiple notifications

### 📈 Win Probability Panel
- Visual probability bars for each team
- Real-time percentage calculations based on scores
- Leading team indicator (⭐)
- Quick stats summary
- Smooth animated transitions

### 🏅 Leaderboard Section
- Auto-sorted by score
- Gold, Silver, Bronze highlighting for top 3
- Team colors and icons
- Problems solved counter
- Fast-solve bonus indicators

### 🧠 Problem Submission Controls
- Current problem information (name, difficulty, scores)
- Time remaining countdown with progress bar
- Simulation buttons for each team
- Real-time score updates when problems are solved

## 🎨 Design Features

- **Dark Mode**: Modern esports + tech aesthetic
- **Neon Accents**: Cyan and purple glow effects
- **Smooth Animations**: Transitions and hover effects
- **Responsive**: Works on mobile and desktop
- **Accessible**: High contrast, readable text
- **Color Palette**: 
  - Background: Dark blue/navy gradient
  - Primary glow: Cyan/purple
  - Team colors: Red, Blue, Green

## 🛠️ Technologies

- React 18
- Vite 5
- Tailwind CSS 3
- PostCSS & Autoprefixer

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage

The dashboard simulates a live competitive programming tournament:

1. **Watch the Teams Journey**: See teams progress along the track toward the gold medal
2. **Monitor the Countdown**: Keep track of remaining tournament time
3. **Read Notifications**: Stay updated with real-time team activity
4. **Check Probabilities**: See each team's win probability
5. **View Leaderboard**: Track rankings and scores
6. **Simulate Submissions**: Use the Problem Controls to simulate teams solving problems

## 🎯 Components

- `CountdownTimer` - Tournament countdown with progress bar
- `TeamsJourney` - Main visualization with team progression
- `NotificationsPanel` - Live notification feed
- `WinProbability` - Probability visualization
- `Leaderboard` - Rankings and scores
- `ProblemControls` - Problem info and simulation controls

## 🎨 Customization

All team colors, scores, and animations can be customized in the `App.jsx` component. The design uses Tailwind CSS utility classes for easy theming.

## 📝 Notes

- All animations are smooth and performant
- The dashboard updates in real-time
- Notifications auto-remove after 8 seconds
- Scores and probabilities recalculate automatically
- Leaderboard auto-sorts by score
