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

type SocialLink = { label: string; href: string };
type ContactState = { email: string; socials: SocialLink[] };

export default function ContactEditor() {
  const { data, loading, saving, saveSection } = usePortfolioData();
  const [contact, setContact] = useState<ContactState>({
    email: "",
    socials: [],
  });

  useEffect(() => {
    if (data?.contact) setContact(data.contact as ContactState);
  }, [data]);

  if (loading) return <Skeleton className="h-96 w-full" />;

  const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
    const socials = [...contact.socials];
    socials[index] = { ...socials[index], [field]: value };
    setContact({ ...contact, socials });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="text-muted-foreground">Manage contact info and socials</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Social Links</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setContact({
                ...contact,
                socials: [...contact.socials, { label: "", href: "" }],
              })
            }
          >
            <PlusIcon className="mr-1 size-4" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {contact.socials.map((social, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1 space-y-1">
                <Label>Label</Label>
                <Input
                  value={social.label}
                  onChange={(e) => updateSocial(i, "label", e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label>URL</Label>
                <Input
                  value={social.href}
                  onChange={(e) => updateSocial(i, "href", e.target.value)}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setContact({
                    ...contact,
                    socials: contact.socials.filter((_, j) => j !== i),
                  })
                }
              >
                <TrashIcon className="size-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      <SaveButton
        saving={saving}
        onClick={() => saveSection("contact", contact)}
      />
    </div>
  );
}
