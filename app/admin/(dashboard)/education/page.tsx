"use client";

import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { SaveButton } from "@/components/admin/save-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useState, useEffect } from "react";

type EducationItem = { institution: string; degree: string; year: string };

export default function EducationEditor() {
  const { data, loading, saving, saveSection } = usePortfolioData();
  const [education, setEducation] = useState<EducationItem[]>([]);

  useEffect(() => {
    if (data?.education) setEducation(data.education as EducationItem[]);
  }, [data]);

  if (loading) return <Skeleton className="h-96 w-full" />;

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Education</h1>
          <p className="text-muted-foreground">Manage education entries</p>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            setEducation([
              ...education,
              { institution: "", degree: "", year: "" },
            ])
          }
        >
          <PlusIcon className="mr-1 size-4" /> Add
        </Button>
      </div>
      {education.map((item, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              {item.degree || "Untitled"}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setEducation(education.filter((_, j) => j !== i))
              }
            >
              <TrashIcon className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Institution</Label>
              <Input
                value={item.institution}
                onChange={(e) => updateItem(i, "institution", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={item.degree}
                onChange={(e) => updateItem(i, "degree", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Year / CGPA</Label>
              <Input
                value={item.year}
                onChange={(e) => updateItem(i, "year", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <SaveButton
        saving={saving}
        onClick={() => saveSection("education", education)}
      />
    </div>
  );
}
