"use client";

import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { SaveButton } from "@/components/admin/save-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export default function HeroEditor() {
  const { data, loading, saving, saveSection } = usePortfolioData();
  const [hero, setHero] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (data?.hero) setHero(data.hero as Record<string, unknown>);
  }, [data]);

  if (loading) return <EditorSkeleton />;

  const ctaPrimary = (hero.ctaPrimary || {}) as Record<string, string>;
  const ctaSecondary = (hero.ctaSecondary || {}) as Record<string, string>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hero Section</h1>
        <p className="text-muted-foreground">Edit the hero banner content</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={(hero.fullName as string) || ""}
              onChange={(e) => setHero({ ...hero, fullName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input
              value={(hero.role as string) || ""}
              onChange={(e) => setHero({ ...hero, role: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Tagline</Label>
            <Input
              value={(hero.tagline as string) || ""}
              onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Summary</Label>
            <Textarea
              rows={4}
              value={(hero.summary as string) || ""}
              onChange={(e) => setHero({ ...hero, summary: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>CTA Primary Label</Label>
              <Input
                value={ctaPrimary.label || ""}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    ctaPrimary: { ...ctaPrimary, label: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>CTA Primary Target ID</Label>
              <Input
                value={ctaPrimary.targetId || ""}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    ctaPrimary: { ...ctaPrimary, targetId: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>CTA Secondary Label</Label>
              <Input
                value={ctaSecondary.label || ""}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    ctaSecondary: { ...ctaSecondary, label: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>CTA Secondary Href</Label>
              <Input
                value={ctaSecondary.href || ""}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    ctaSecondary: { ...ctaSecondary, href: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <SaveButton saving={saving} onClick={() => saveSection("hero", hero)} />
    </div>
  );
}

function EditorSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
