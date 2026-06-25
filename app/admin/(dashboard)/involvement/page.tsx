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

type InvolvementItem = {
  role: string;
  event: string;
  year: string | number;
  description: string;
};

export default function InvolvementEditor() {
  const { data, loading, saving, saveSection } = usePortfolioData();
  const [involvement, setInvolvement] = useState<InvolvementItem[]>([]);

  useEffect(() => {
    if (data?.involvement)
      setInvolvement(data.involvement as InvolvementItem[]);
  }, [data]);

  if (loading) return <Skeleton className="h-96 w-full" />;

  const updateItem = (index: number, field: string, value: unknown) => {
    const updated = [...involvement];
    updated[index] = { ...updated[index], [field]: value };
    setInvolvement(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Involvement</h1>
          <p className="text-muted-foreground">
            Manage extra-curricular activities
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            setInvolvement([
              ...involvement,
              {
                role: "",
                event: "",
                year: new Date().getFullYear(),
                description: "",
              },
            ])
          }
        >
          <PlusIcon className="mr-1 size-4" /> Add
        </Button>
      </div>
      {involvement.map((item, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              {item.role || "Untitled"} — {item.event || "Event"}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setInvolvement(involvement.filter((_, j) => j !== i))
              }
            >
              <TrashIcon className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={item.role}
                  onChange={(e) => updateItem(i, "role", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Event</Label>
                <Input
                  value={item.event}
                  onChange={(e) => updateItem(i, "event", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                value={String(item.year)}
                onChange={(e) => updateItem(i, "year", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={item.description}
                onChange={(e) => updateItem(i, "description", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <SaveButton
        saving={saving}
        onClick={() => saveSection("involvement", involvement)}
      />
    </div>
  );
}
