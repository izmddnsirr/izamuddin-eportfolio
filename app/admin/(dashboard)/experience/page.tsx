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

type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  durationLength?: string;
  responsibilities: string[];
};

export default function ExperienceEditor() {
  const { data, loading, saving, saveSection } = usePortfolioData();
  const [experience, setExperience] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    if (data?.experience) setExperience(data.experience as ExperienceItem[]);
  }, [data]);

  if (loading) return <Skeleton className="h-96 w-full" />;

  const updateItem = (index: number, field: string, value: unknown) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const addItem = () => {
    setExperience([
      ...experience,
      { company: "", role: "", duration: "", responsibilities: [] },
    ]);
  };

  const removeItem = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Experience</h1>
          <p className="text-muted-foreground">Manage work history</p>
        </div>
        <Button variant="outline" onClick={addItem}>
          <PlusIcon className="mr-1 size-4" /> Add Experience
        </Button>
      </div>
      {experience.map((item, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              {item.role || "Untitled"} — {item.company || "Company"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => removeItem(i)}>
              <TrashIcon className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={item.company}
                  onChange={(e) => updateItem(i, "company", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={item.role}
                  onChange={(e) => updateItem(i, "role", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={item.duration}
                  onChange={(e) => updateItem(i, "duration", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Duration Length</Label>
                <Input
                  value={item.durationLength || ""}
                  onChange={(e) =>
                    updateItem(i, "durationLength", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Responsibilities (one per line)</Label>
              <Textarea
                rows={6}
                value={item.responsibilities.join("\n")}
                onChange={(e) =>
                  updateItem(
                    i,
                    "responsibilities",
                    e.target.value.split("\n").filter(Boolean)
                  )
                }
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <SaveButton
        saving={saving}
        onClick={() => saveSection("experience", experience)}
      />
    </div>
  );
}
