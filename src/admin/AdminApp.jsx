import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Loader,
  Check,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useSite } from "../context/SiteContext";
import { sectionSpecs, collectionSpecs } from "./fieldSpecs";
import SectionEditor from "./SectionEditor";
import CollectionEditor from "./CollectionEditor";
import AdminLogin from "./AdminLogin";

export default function AdminApp() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState(sectionSpecs[0].key);
  const [error, setError] = useState("");

  useEffect(() => {
    let tag = document.head.querySelector('meta[name="robots"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", "noindex, nofollow");
    return () => {
      const t = document.head.querySelector('meta[name="robots"]');
      if (t) t.remove();
    };
  }, []);

  const { saveCollection, saveState, connected, loading } = useSite();

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleCollectionSave = async (rows) => {
    setError("");
    try {
      await saveCollection(tab, rows);
    } catch (err) {
      setError(err.message || "Could not save. Check your admin permissions.");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin user={user} onSignedIn={setUser} />;
  }

  const tabs = [
    ...sectionSpecs.map((s) => ({ ...s, kind: "section" })),
    ...collectionSpecs.map((c) => ({
      ...c,
      key: c.table,
      kind: "collection",
    })),
  ];

  const activeTab = tabs.find((t) => t.key === tab) ?? tabs[0];
  const activeCollection = collectionSpecs.find((c) => c.table === tab);
  const activeSection = sectionSpecs.find((s) => s.key === tab);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-primary-300" />
            <div>
              <h1 className="font-serif font-bold leading-tight">
                Site Content Manager
              </h1>
              <p className="text-xs text-primary-200">
                PAOZ Victory Tabernacle Chikanga
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> View site
            </Link>
            <span className="hidden md:block text-sm text-primary-200 truncate max-w-[180px]">
              {user.email}
            </span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {!connected && (
        <div className="bg-amber-100 border-b border-amber-300 text-amber-900 text-sm px-4 py-2 text-center">
          Supabase is not connected — the site is running on the built-in
          default content and edits will not be saved.
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[280px_1fr] gap-8">
        <nav className="lg:sticky lg:top-8 lg:self-start">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 max-h-[70vh] overflow-y-auto">
            <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wider text-gray-400">
              Text sections
            </p>
            {tabs
              .filter((t) => t.kind === "section")
              .map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    tab === t.key
                      ? "bg-primary-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}

            <p className="px-3 pt-4 pb-1 text-xs font-bold uppercase tracking-wider text-gray-400">
              Repeating items
            </p>
            {tabs
              .filter((t) => t.kind === "collection")
              .map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    tab === t.key
                      ? "bg-primary-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
          </div>
        </nav>

        <main className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 min-h-[400px]">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-5">
            {activeTab.label}
          </h2>

          {error && (
            <p className="mb-4 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </p>
          )}

          {saveState === "saved" && (
            <p className="mb-4 flex items-center gap-2 text-sm text-primary-800 bg-primary-50 border border-primary-200 rounded-md px-3 py-2">
              <Check className="w-4 h-4 shrink-0" /> Changes saved. Visitors
              see them the next time they load the page.
            </p>
          )}

          {loading ? (
            <div className="flex items-center gap-3 text-gray-500">
              <Loader className="w-5 h-5 animate-spin" /> Loading content…
            </div>
          ) : activeCollection ? (
            <CollectionEditorWrapper
              spec={activeCollection}
              onSave={handleCollectionSave}
              connected={connected}
            />
          ) : activeSection ? (
            <SectionEditor spec={activeSection} />
          ) : null}
        </main>
      </div>
    </div>
  );
}

// Reads the saved rows from context so the editor always shows saved values.
function CollectionEditorWrapper({ spec, onSave, connected }) {
  const { [spec.table]: rows = [], saveState } = useSite();

  return (
    <CollectionEditor
      spec={spec}
      rows={rows}
      onSave={onSave}
      saving={saveState === "saving"}
      connected={connected}
    />
  );
}