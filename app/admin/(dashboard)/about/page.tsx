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

type StatItem = { label: string; value: string };
type AboutState = {
  profileImage: string;
  bio: string;
  stats: StatItem[];
};

export default function AboutEditor() {
  const { data, loading, saving, saveSection } = usePortfolioData();
  const [about, setAbout] = useState<AboutState>({
    profileImage: "",
    bio: "",
    stats: [],
  });

  useEffect(() => {
    if (data?.about) setAbout(data.about as AboutState);
  }, [data]);

  if (loading) return <Skeleton className="h-96 w-full" />;

  const updateStat = (index: number, field: keyof StatItem, value: string) => {
    const stats = [...about.stats];
    stats[index] = { ...stats[index], [field]: value };
    setAbout({ ...about, stats });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">About Section</h1>
        <p className="text-muted-foreground">Edit bio and stats</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Profile Image Path</Label>
            <Input
              value={about.profileImage}
              onChange={(e) =>
                setAbout({ ...about, profileImage: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              rows={6}
              value={about.bio}
              onChange={(e) => setAbout({ ...about, bio: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stats</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setAbout({
                ...about,
                stats: [...about.stats, { label: "", value: "" }],
              })
            }
          >
            <PlusIcon className="mr-1 size-4" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {about.stats.map((stat, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1 space-y-1">
                <Label>Label</Label>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(i, "label", e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label>Value</Label>
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(i, "value", e.target.value)}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setAbout({
                    ...about,
                    stats: about.stats.filter((_, j) => j !== i),
                  })
                }
              >
                <TrashIcon className="size-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      <SaveButton saving={saving} onClick={() => saveSection("about", about)} />
    </div>
  );
}
