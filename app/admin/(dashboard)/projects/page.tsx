"use client";

import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { SaveButton } from "@/components/admin/save-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState, useEffect } from "react";

type Project = {
  title: string;
  year?: number;
  category: string;
  categories?: string[];
  image: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  images?: string[];
  details?: string;
  featured?: boolean;
};

export default function ProjectsEditor() {
  const { data, loading, saving, saveSection } = usePortfolioData();
  const [projects, setProjects] = useState<Project[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (data?.projects) setProjects(data.projects as Project[]);
  }, [data]);

  if (loading) return <Skeleton className="h-96 w-full" />;

  const updateProject = (index: number, field: string, value: unknown) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "New Project",
        category: "Web",
        image: "",
        description: "",
        techStack: [],
        githubUrl: "",
        liveUrl: "",
      },
    ]);
    setExpanded(projects.length);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
    setExpanded(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage project entries</p>
        </div>
        <Button variant="outline" onClick={addProject}>
          <PlusIcon className="mr-1 size-4" /> Add Project
        </Button>
      </div>
      {projects.map((project, i) => (
        <Card key={i}>
          <CardHeader
            className="flex cursor-pointer flex-row items-center justify-between"
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <CardTitle className="text-base">
              {project.title || "Untitled"}{" "}
              {project.featured && (
                <span className="ml-2 text-xs text-muted-foreground">
                  Featured
                </span>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeProject(i);
                }}
              >
                <TrashIcon className="size-4" />
              </Button>
              {expanded === i ? (
                <ChevronUpIcon className="size-4" />
              ) : (
                <ChevronDownIcon className="size-4" />
              )}
            </div>
          </CardHeader>
          {expanded === i && (
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={project.title}
                    onChange={(e) => updateProject(i, "title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    type="number"
                    value={project.year || ""}
                    onChange={(e) =>
                      updateProject(i, "year", Number(e.target.value) || undefined)
                    }
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={project.category}
                    onChange={(e) => updateProject(i, "category", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image Path</Label>
                  <Input
                    value={project.image}
                    onChange={(e) => updateProject(i, "image", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(i, "description", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Tech Stack (comma-separated)</Label>
                <Input
                  value={project.techStack.join(", ")}
                  onChange={(e) =>
                    updateProject(
                      i,
                      "techStack",
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input
                    value={project.githubUrl}
                    onChange={(e) =>
                      updateProject(i, "githubUrl", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Live URL</Label>
                  <Input
                    value={project.liveUrl}
                    onChange={(e) =>
                      updateProject(i, "liveUrl", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Details (Markdown)</Label>
                <Textarea
                  rows={8}
                  value={project.details || ""}
                  onChange={(e) => updateProject(i, "details", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`featured-${i}`}
                  checked={project.featured || false}
                  onChange={(e) =>
                    updateProject(i, "featured", e.target.checked)
                  }
                />
                <Label htmlFor={`featured-${i}`}>Featured</Label>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
      <SaveButton
        saving={saving}
        onClick={() => saveSection("projects", projects)}
      />
    </div>
  );
}
