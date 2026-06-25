"use client";

import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { SaveButton } from "@/components/admin/save-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useState, useEffect } from "react";

type AchievementItem = {
  title: string;
  description: string;
  year: number | string;
  hidden?: boolean;
};

export default function AchievementsEditor() {
  const { data, loading, saving, saveSection } = usePortfolioData();
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);

  useEffect(() => {
    if (data?.achievements)
      setAchievements(data.achievements as AchievementItem[]);
  }, [data]);

  if (loading) return <Skeleton className="h-96 w-full" />;

  const updateItem = (index: number, field: string, value: unknown) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], [field]: value };
    setAchievements(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">Manage awards and recognitions</p>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            setAchievements([
              ...achievements,
              { title: "", description: "", year: new Date().getFullYear() },
            ])
          }
        >
          <PlusIcon className="mr-1 size-4" /> Add
        </Button>
      </div>
      {achievements.map((item, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              {item.title || "Untitled"}
              {item.hidden && (
                <span className="ml-2 text-xs text-muted-foreground">
                  Hidden
                </span>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setAchievements(achievements.filter((_, j) => j !== i))
              }
            >
              <TrashIcon className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={item.title}
                onChange={(e) => updateItem(i, "title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={2}
                value={item.description}
                onChange={(e) => updateItem(i, "description", e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  value={String(item.year)}
                  onChange={(e) => updateItem(i, "year", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id={`hidden-${i}`}
                  checked={item.hidden || false}
                  onChange={(e) => updateItem(i, "hidden", e.target.checked)}
                />
                <Label htmlFor={`hidden-${i}`}>Hidden from portfolio</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <SaveButton
        saving={saving}
        onClick={() => saveSection("achievements", achievements)}
      />
    </div>
  );
}
