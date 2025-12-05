import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CountdownTimer from "./components/CountdownTimer";
import TeamsJourney from "./components/TeamsJourney";
import FloatingNotifications from "./components/FloatingNotifications";
import NotificationBell from "./components/NotificationBell";
import WinProbability from "./components/WinProbability";
import Leaderboard from "./components/Leaderboard";
import ProblemControls from "./components/ProblemControls";
import NotificationsPanel from "./components/NotificationsPanel";
import Sidebar from "./components/Sidebar";
import ProblemsPage from "./components/ProblemsPage";
import FinalResultsPage from "./components/FinalResultsPage";
import LoginPage from "./components/LoginPage";

function App() {
  const [teams, setTeams] = useState([
    {
      id: "alpha",
      name: "Team Alpha",
      score: 1250,
      problemsSolved: 4,
      color: "red",
      progress: 42,
    },
    {
      id: "binary",
      name: "Binary Beasts",
      score: 980,
      problemsSolved: 3,
      color: "blue",
      progress: 33,
    },
    {
      id: "stack",
      name: "Stack Overflowers",
      score: 750,
      problemsSolved: 2,
      color: "green",
      progress: 25,
    },
  ]);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(true);
  const [problems] = useState([
    {
      id: "A",
      title: "Problem A: Warm-up Arrays",
      duration: 20,
      points: 300,
      bonus: 50,
      status: "passed",
    },
    {
      id: "B",
      title: "Problem B: Graph Traversal",
      duration: 30,
      points: 450,
      bonus: 75,
      status: "current",
    },
    {
      id: "C",
      title: "Problem C: Dynamic Programming",
      duration: 35,
      points: 500,
      bonus: 100,
      status: "upcoming",
    },
    {
      id: "D",
      title: "Problem D: String Algorithms",
      duration: 25,
      points: 400,
      bonus: 60,
      status: "upcoming",
    },
    {
      id: "E",
      title: "Problem E: Number Theory",
      duration: 40,
      points: 600,
      bonus: 120,
      status: "upcoming",
    },
  ]);
  const [finalResults] = useState([
    {
      id: "alpha",
      name: "Team Alpha",
      finalScore: 3120,
      rank: 1,
      problemsSolved: 7,
      fastestSolve: 3,
      penalties: 1,
    },
    {
      id: "binary",
      name: "Binary Beasts",
      finalScore: 2890,
      rank: 2,
      problemsSolved: 6,
      fastestSolve: 4,
      penalties: 2,
    },
    {
      id: "stack",
      name: "Stack Overflowers",
      finalScore: 2560,
      rank: 3,
      problemsSolved: 5,
      fastestSolve: 5,
      penalties: 1,
    },
    {
      id: "delta",
      name: "Delta Coders",
      finalScore: 2100,
      rank: 4,
      problemsSolved: 4,
      fastestSolve: 6,
      penalties: 3,
    },
    {
      id: "gamma",
      name: "Gamma Gurus",
      finalScore: 1980,
      rank: 5,
      problemsSolved: 4,
      fastestSolve: 7,
      penalties: 4,
    },
  ]);
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("authToken"))
  );

  const handleLoginSuccess = (token) => {
    setIsAuthenticated(Boolean(token));
  };

  const handleDismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleProblemSolved = (teamId, problemName, points) => {
    setTeams((prevTeams) => {
      const updated = prevTeams.map((team) => {
        if (team.id === teamId) {
          const newScore = team.score + points;
          const newProgress = Math.min(100, (newScore / 3000) * 100);
          return {
            ...team,
            score: newScore,
            problemsSolved: team.problemsSolved + 1,
            progress: newProgress,
          };
        }
        return team;
      });
      // Recalculate progress based on relative scores
      const maxScore = Math.max(...updated.map((t) => t.score));
      return updated.map((team) => ({
        ...team,
        progress: (team.score / maxScore) * 100,
      }));
    });

    const team = teams.find((t) => t.id === teamId);
    addNotification(
      `${team.name} solved ${problemName} (+${points} pts, bonus applied)`,
      team.color
    );
  };

  const addNotification = (message, color) => {
    const notification = {
      id: Date.now(),
      message,
      color,
      timestamp: new Date(),
    };
    setNotifications((prev) => [notification, ...prev].slice(0, 10));
  };

  // Simulate random notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomTeam = teams[Math.floor(Math.random() * teams.length)];
        const problems = [
          "Problem A",
          "Problem B",
          "Problem C",
          "Problem D",
          "Problem E",
        ];
        const problem = problems[Math.floor(Math.random() * problems.length)];
        const points = Math.floor(Math.random() * 200) + 100;
        addNotification(
          `${randomTeam.name} solved ${problem} (+${points} pts)`,
          randomTeam.color
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [teams]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                TCPC Challenge Simulator
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Competitive Programming Tournament Dashboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              <NotificationBell
                count={notifications.length}
                onClick={() => setShowNotifications(!showNotifications)}
              />
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Status
                </div>
                <div className="text-sm font-medium text-green-600 mt-0.5">
                  Live
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 px-8 py-8">
          <Routes>
            <Route
              path="/login"
              element={<LoginPage onSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <div>
                    <div className="mb-8">
                      <CountdownTimer />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-3 space-y-6">
                        <TeamsJourney teams={teams} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Leaderboard teams={teams} />
                          <ProblemControls
                            teams={teams}
                            onProblemSolved={handleProblemSolved}
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <WinProbability teams={teams} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/teams"
              element={
                isAuthenticated ? (
                  <TeamsJourney teams={teams} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/leaderboard"
              element={
                isAuthenticated ? (
                  <Leaderboard teams={teams} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/probability"
              element={
                isAuthenticated ? (
                  <WinProbability teams={teams} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/notifications"
              element={
                isAuthenticated ? (
                  <NotificationsPanel notifications={notifications} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/controls"
              element={
                isAuthenticated ? (
                  <ProblemControls
                    teams={teams}
                    onProblemSolved={handleProblemSolved}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/problems"
              element={
                isAuthenticated ? (
                  <ProblemsPage problems={problems} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/final-results"
              element={
                isAuthenticated ? (
                  <FinalResultsPage results={finalResults} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>

      {isAuthenticated && showNotifications && (
        <FloatingNotifications
          notifications={notifications}
          onDismiss={handleDismissNotification}
        />
      )}
    </div>
  );
}

export default App;
