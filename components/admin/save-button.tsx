"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function SaveButton({
  saving,
  onClick,
}: {
  saving: boolean;
  onClick: () => void;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saving && saved) {
      const t = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [saving, saved]);

  return (
    <Button
      onClick={() => {
        onClick();
        setSaved(true);
      }}
      disabled={saving}
    >
      {saving ? (
        <LoaderIcon className="size-4 animate-spin" />
      ) : saved ? (
        <CheckIcon className="size-4" />
      ) : null}
      {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
    </Button>
  );
}
