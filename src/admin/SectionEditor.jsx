import { useEffect, useState } from "react";
import { Plus, Trash2, Save, AlertCircle } from "lucide-react";
import ImageField from "./ImageField";
import CollectionEditor from "./CollectionEditor";
import { useSite } from "../context/SiteContext";

function LinksEditor({ value, onChange }) {
  const links = value ?? [];
  const [draft, setDraft] = useState({ label: "", href: "#" });

  const commit = (next) => onChange(next);

  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        Menu links
      </label>

      <div className="space-y-2 mb-3">
        {links.map((link, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              type="text"
              value={link.label}
              onChange={(e) =>
                commit(
                  links.map((l, j) =>
                    j === i ? { ...l, label: e.target.value } : l,
                  ),
                )
              }
              placeholder="Label"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary-600"
            />
            <input
              type="text"
              value={link.href}
              onChange={(e) =>
                commit(
                  links.map((l, j) =>
                    j === i ? { ...l, href: e.target.value } : l,
                  ),
                )
              }
              placeholder="#section"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary-600"
            />
            <button
              type="button"
              onClick={() => commit(links.filter((_, j) => j !== i))}
              aria-label="Remove link"
              className="p-2 text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          commit([...links, { ...draft }]);
          setDraft({ label: "", href: "#" });
        }}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
      >
        <Plus className="w-4 h-4" /> Add link
      </button>

      <p className="mt-2 text-xs text-gray-500">
        Saved with the section Save button below.
      </p>
    </div>
  );
}

export default function SectionEditor({ spec }) {
  const { [spec.key]: values = {}, saveSection, saveState, connected } = useSite();
  const [draft, setDraft] = useState(values);
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft(values);
  }, [values]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(values);
  const saving = saveState === "saving";

  const set = (key, value) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    setError("");
    try {
      await saveSection(spec.key, draft);
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not save. Check your admin permissions.");
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500">{spec.description}</p>

      {!connected && (
        <p className="text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded-md px-3 py-2">
          Supabase is not configured, so edits cannot be saved. Add your keys to
          a <code className="font-mono">.env</code> file and restart the dev
          server.
        </p>
      )}

      {error && (
        <p className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>Not saved:</strong> {error}
          </span>
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {spec.fields.map((field) => {
          if (field.type === "image") {
            return (
              <ImageField
                key={field.key}
                label={field.label}
                value={draft[field.key]}
                onChange={(v) => set(field.key, v)}
              />
            );
          }

          if (field.type === "links") {
            return (
              <LinksEditor
                key={field.key}
                value={draft[field.key]}
                onChange={(next) => set(field.key, next)}
              />
            );
          }

          return (
            <div key={field.key}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={draft[field.key] ?? ""}
                  onChange={(e) => set(field.key, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                />
              ) : (
                <input
                  type="text"
                  value={draft[field.key] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => set(field.key, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={save}
          disabled={!dirty || saving || !connected}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : `Save ${spec.label}`}
        </button>
        {dirty && !saving && (
          <button
            type="button"
            onClick={() => setDraft(values)}
            className="text-sm font-semibold text-gray-500 hover:text-gray-800"
          >
            Discard changes
          </button>
        )}
      </div>
    </div>
  );
}

export { CollectionEditor };