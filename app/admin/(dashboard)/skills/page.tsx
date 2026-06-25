"use client";

import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { SaveButton } from "@/components/admin/save-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";

type SkillCategory = { category: string; skills: string[] };

export default function SkillsEditor() {
  const { data, loading, saving, saveSection } = usePortfolioData();
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [newSkill, setNewSkill] = useState<Record<number, string>>({});

  useEffect(() => {
    if (data?.skills) setSkills(data.skills as SkillCategory[]);
  }, [data]);

  if (loading) return <Skeleton className="h-96 w-full" />;

  const addCategory = () => {
    setSkills([...skills, { category: "", skills: [] }]);
  };

  const removeCategory = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateCategoryName = (index: number, name: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], category: name };
    setSkills(updated);
  };

  const addSkill = (catIndex: number) => {
    const value = newSkill[catIndex]?.trim();
    if (!value) return;
    const updated = [...skills];
    updated[catIndex] = {
      ...updated[catIndex],
      skills: [...updated[catIndex].skills, value],
    };
    setSkills(updated);
    setNewSkill({ ...newSkill, [catIndex]: "" });
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    const updated = [...skills];
    updated[catIndex] = {
      ...updated[catIndex],
      skills: updated[catIndex].skills.filter((_, i) => i !== skillIndex),
    };
    setSkills(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-muted-foreground">Manage skill categories</p>
        </div>
        <Button variant="outline" onClick={addCategory}>
          <PlusIcon className="mr-1 size-4" /> Add Category
        </Button>
      </div>
      {skills.map((cat, catIndex) => (
        <Card key={catIndex}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex-1 space-y-1">
              <Label>Category Name</Label>
              <Input
                value={cat.category}
                onChange={(e) => updateCategoryName(catIndex, e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => removeCategory(catIndex)}
            >
              <TrashIcon className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(catIndex, skillIndex)}
                    className="ml-1 rounded-full hover:bg-muted-foreground/20"
                  >
                    <XIcon className="size-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill[catIndex] || ""}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, [catIndex]: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(catIndex);
                  }
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSkill(catIndex)}
              >
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <SaveButton
        saving={saving}
        onClick={() => saveSection("skills", skills)}
      />
    </div>
  );
}
