"use client";

import { useState, useEffect, useCallback } from "react";

export function usePortfolioData() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/portfolio");
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveSection = async (section: string, value: unknown) => {
    setSaving(true);
    const res = await fetch("/api/portfolio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, value }),
    });
    const json = await res.json();
    setData(json);
    setSaving(false);
    return json;
  };

  return { data, loading, saving, saveSection, refetch: fetchData };
}
