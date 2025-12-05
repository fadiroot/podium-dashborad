import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitting, setSubmitting] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  const canSubmit = emailValid && passwordValid && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const token = "jury";
      localStorage.setItem("authToken", token);
      if (onSuccess) onSuccess(token);
      navigate("/");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-6 pt-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900">Jury Login</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your credentials</p>
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none transition-shadow ${
                  touched.email && !emailValid
                    ? "border-red-300 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-indigo-200"
                }`}
                placeholder="name@example.com"
                autoComplete="email"
              />
              {touched.email && !emailValid && (
                <div className="mt-1 text-xs text-red-600">
                  Enter a valid email address
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none transition-shadow ${
                  touched.password && !passwordValid
                    ? "border-red-300 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-indigo-200"
                }`}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div
                  className={`rounded px-2 py-1 ${
                    /[A-Z]/.test(password)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  Uppercase
                </div>
                <div
                  className={`rounded px-2 py-1 ${
                    /[a-z]/.test(password)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  Lowercase
                </div>
                <div
                  className={`rounded px-2 py-1 ${
                    /[0-9]/.test(password)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  Number
                </div>
                <div
                  className={`rounded px-2 py-1 ${
                    /[^A-Za-z0-9]/.test(password)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  Symbol
                </div>
                <div
                  className={`rounded px-2 py-1 ${
                    password.length >= 8
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  8+ chars
                </div>
                <div className="rounded px-2 py-1 bg-sky-100 text-sky-700">
                  No spaces
                </div>
              </div>
              {touched.password && !passwordValid && (
                <div className="mt-1 text-xs text-red-600">
                  Password must meet all requirements
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full rounded-md px-3 py-2 text-sm font-semibold text-white transition-colors ${
                canSubmit
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-300 cursor-not-allowed"
              }`}
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
        <div className="px-6 py-4 mt-4 bg-gradient-to-r from-indigo-50 to-sky-50 border-t border-gray-200 text-xs text-gray-500">
          Authorized jury access only
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
