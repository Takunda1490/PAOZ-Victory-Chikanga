import { useEffect, useState } from "react";
import { Lock, Mail, LogIn } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export default function AdminLogin({ user, onSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) onSignedIn(user);
  }, [user, onSignedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setError("");
    setBusy(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setBusy(false);
      return;
    }

    // Confirm the account is actually listed in the admins table.
    const { data: admin } = await supabase
      .from("admins")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      setError("This account is not registered as an administrator.");
      setBusy(false);
      return;
    }

    onSignedIn(data.user);
    setBusy(false);
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-3">
            Supabase is not configured
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Copy <code className="font-mono">.env.example</code> to{" "}
            <code className="font-mono">.env</code>, add your project URL and
            anon key, then restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-900 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">
            Admin Sign In
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            PAOZ Victory Tabernacle Chikanga
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-md bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-60"
          >
            <LogIn className="w-4 h-4" />
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <a
          href="/"
          className="block text-center text-sm text-gray-500 hover:text-primary-700 mt-6"
        >
          ← Back to the website
        </a>
      </div>
    </div>
  );
}