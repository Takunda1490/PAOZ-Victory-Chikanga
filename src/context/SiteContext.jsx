import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  defaults,
  defaultServices,
  defaultPillars,
  defaultScriptures,
  defaultEvents,
  defaultGivingMethods,
} from "../data/defaults";

const SiteContext = createContext(null);

const SECTIONS = [
  "settings",
  "nav",
  "hero",
  "services",
  "about",
  "pillars",
  "scriptures",
  "events",
  "message",
  "visit",
  "giving",
  "footer",
];

const COLLECTIONS = {
  services: defaultServices,
  pillars: defaultPillars,
  scriptures: defaultScriptures,
  events: defaultEvents,
  giving_methods: defaultGivingMethods,
};

const DEFAULT_BY_TABLE = {
  services: defaultServices,
  pillars: defaultPillars,
  scriptures: defaultScriptures,
  events: defaultEvents,
  giving_methods: defaultGivingMethods,
};

const deepMerge = (base, override) => {
  if (Array.isArray(base) || typeof base !== "object" || base === null) {
    return override === undefined ? base : override;
  }
  const result = { ...base };
  if (override && typeof override === "object") {
    for (const key of Object.keys(base)) {
      result[key] = deepMerge(base[key], override[key]);
    }
  }
  return result;
};

export function SiteProvider({ children }) {
  const [sections, setSections] = useState(defaults);
  const [collections, setCollections] = useState({
    services: defaultServices,
    pillars: defaultPillars,
    scriptures: defaultScriptures,
    events: defaultEvents,
    giving_methods: defaultGivingMethods,
  });
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [connected, setConnected] = useState(isSupabaseConfigured);
  const [saveState, setSaveState] = useState("idle");

  const refresh = useCallback(async () => {
    if (!supabase) {
      setConnected(false);
      setLoading(false);
      return;
    }

    try {
      const [contentRes, ...collectionRes] = await Promise.all([
        supabase.from("site_content").select("key, value"),
        ...Object.keys(COLLECTIONS).map((table) =>
          supabase.from(table).select("*").order("sort_order"),
        ),
      ]);

      if (contentRes.error) throw contentRes.error;

      const nextSections = { ...defaults };
      for (const { key, value } of contentRes.data ?? []) {
        // Merge rather than replace so fields added later still get their
        // defaults on rows that were saved before the field existed.
        if (SECTIONS.includes(key)) nextSections[key] = deepMerge(defaults[key], value);
      }
      setSections(nextSections);

      const nextCollections = { ...collections };
      Object.keys(COLLECTIONS).forEach((table, i) => {
        const rows = collectionRes[i].data ?? [];
        nextCollections[table] = rows.length
          ? rows.map((row) => ({ ...row, sort_order: row.sort_order ?? 0 }))
          : DEFAULT_BY_TABLE[table];
      });
      setCollections(nextCollections);
      setConnected(true);
    } catch (error) {
      console.error("Failed to load site content:", error);
      setConnected(false);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // No realtime subscription: edits are applied when a visitor next loads the
  // page, so saving in the admin never changes a page someone is reading.

  const saveSection = useCallback(async (key, value) => {
    if (!supabase) throw new Error("Supabase is not configured");
    setSaveState("saving");
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value }, { onConflict: "key" });
    if (error) {
      setSaveState("error");
      throw error;
    }
    setSections((prev) => ({ ...prev, [key]: deepMerge(prev[key], value) }));
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2000);
  }, []);

  const saveCollection = useCallback(async (table, rows) => {
    if (!supabase) throw new Error("Supabase is not configured");
    setSaveState("saving");

    const payload = rows.map((row, i) => ({
      ...row,
      sort_order: i,
    }));

    const { data: existing, error: readError } = await supabase
      .from(table)
      .select("id");
    if (readError) {
      setSaveState("error");
      throw readError;
    }

    const existingIds = new Set((existing ?? []).map((r) => r.id));

    // Rows whose ID exists in DB -> update. Rows with no ID OR ID not in DB -> insert.
    const inserts = payload
      .filter((row) => !row.id || !existingIds.has(row.id))
      // Don't send id on inserts; let DB generate UUID
      .map(({ id, ...rest }) => rest);
    const updates = payload.filter((row) => row.id && existingIds.has(row.id));
    const removed = [...existingIds].filter((id) => !payload.some((r) => r.id === id));

    if (removed.length) {
      const { error } = await supabase.from(table).delete().in("id", removed);
      if (error) {
        setSaveState("error");
        throw error;
      }
    }

    if (inserts.length) {
      const { error } = await supabase.from(table).insert(inserts);
      if (error) {
        setSaveState("error");
        throw error;
      }
    }

    for (const row of updates) {
      const { id, ...rest } = row;
      const { error } = await supabase.from(table).update(rest).eq("id", id);
      if (error) {
        setSaveState("error");
        throw error;
      }
    }

    setCollections((prev) => ({ ...prev, [table]: rows }));
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2000);
    await refresh();
  }, [refresh]);

  const value = {
    ...sections,
    ...collections,
    loading,
    connected,
    saveState,
    refresh,
    saveSection,
    saveCollection,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used inside SiteProvider");
  return context;
}