import { useEffect, useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Save, Undo2 } from "lucide-react";
import ImageField from "./ImageField";

function RowField({ field, value, onChange }) {
  const id = `f-${field.key}`;

  if (field.type === "textarea") {
    return (
      <>
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700 mb-1.5"
        >
          {field.label}
        </label>
        <textarea
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
        />
      </>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 md:col-span-2">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 accent-primary-600"
        />
        {field.label}
      </label>
    );
  }

  return (
    <>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
        {field.label}
      </label>
      <input
        id={id}
        type="text"
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
      />
    </>
  );
}

export default function CollectionEditor({ spec, rows, onSave, saving, connected }) {
  const saved = rows ?? [];
  // Edits stay in this draft until Save is pressed.
  const [draft, setDraft] = useState(saved);

  useEffect(() => {
    setDraft(rows ?? []);
  }, [rows]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const singular = spec.label.replace(/s$/, "").toLowerCase();

  const update = (index, key, value) =>
    setDraft((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );

  const move = (index, direction) =>
    setDraft((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const remove = (index) =>
    setDraft((prev) => prev.filter((_, i) => i !== index));

  const add = () => setDraft((prev) => [...prev, { ...spec.newItem }]);

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500">{spec.description}</p>

      {draft.map((item, index) => (
        <div
          key={item.id ?? `new-${index}`}
          className={`border rounded-lg bg-white transition-colors ${
            dirty ? "border-primary-300" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h3 className="font-semibold text-gray-800 truncate">
              {item[spec.titleKey] || `Untitled item ${index + 1}`}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
                className="p-1.5 text-gray-500 hover:text-primary-700 disabled:opacity-30"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === draft.length - 1}
                aria-label="Move down"
                className="p-1.5 text-gray-500 hover:text-primary-700 disabled:opacity-30"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="Delete"
                className="p-1.5 text-gray-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 grid md:grid-cols-2 gap-4">
            {spec.fields.map((field) =>
              field.type === "image" ? (
                <ImageField
                  key={field.key}
                  label={field.label}
                  value={item[field.key]}
                  onChange={(v) => update(index, field.key, v)}
                />
              ) : (
                <div key={field.key}>
                  <RowField
                    field={field}
                    value={item[field.key]}
                    onChange={(v) => update(index, field.key, v)}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md border-2 border-dashed border-primary-600 text-primary-700 hover:bg-primary-50 transition-colors"
      >
        <Plus className="w-4 h-4" /> Add {singular}
      </button>

      <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
        <button
          type="button"
          onClick={() => onSave(draft)}
          disabled={!dirty || saving || !connected}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : `Save ${spec.label}`}
        </button>
        {dirty && !saving && (
          <button
            type="button"
            onClick={() => setDraft(saved)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800"
          >
            <Undo2 className="w-4 h-4" /> Discard changes
          </button>
        )}
        {dirty && !saving && (
          <span className="text-sm text-primary-700">Unsaved changes</span>
        )}
      </div>
    </div>
  );
}