import { useState, useEffect } from "react";
import { getPortfolioData, savePortfolioData, PortfolioData, generateId } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Trash2, Plus, ArrowLeft, Save } from "lucide-react";

const Admin = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPortfolioData().then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await savePortfolioData(data);
      toast.success("Portfolio saved!");
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;

  const updateField = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setData((prev) => prev ? { ...prev, [key]: value } : prev);
  };

  const addProject = () => {
    updateField("projects", [
      ...data.projects,
      { id: generateId(), title: "New Project", subtitle: "", imageUrl: "", link: "#", featured: false },
    ]);
  };

  const removeProject = (id: string) => {
    updateField("projects", data.projects.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, field: string, value: string | boolean) => {
    updateField("projects", data.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addWriting = () => {
    updateField("writings", [
      ...data.writings,
      { id: generateId(), title: "New Article", url: "#", date: new Date().getFullYear().toString() },
    ]);
  };

  const removeWriting = (id: string) => {
    updateField("writings", data.writings.filter((w) => w.id !== id));
  };

  const updateWriting = (id: string, field: string, value: string) => {
    updateField("writings", data.writings.map((w) => (w.id === id ? { ...w, [field]: value } : w)));
  };

  const addSocial = () => {
    updateField("socialLinks", [...data.socialLinks, { label: "New Link", url: "#" }]);
  };

  const removeSocial = (i: number) => {
    updateField("socialLinks", data.socialLinks.filter((_, idx) => idx !== i));
  };

  const updateSocial = (i: number, field: string, value: string) => {
    updateField("socialLinks", data.socialLinks.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </button>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save Changes"}
        </Button>
      </div>

      <h1 className="text-3xl font-medium tracking-tight mb-10">Admin Panel</h1>

      {/* Basic Info */}
      <section className="mb-12 space-y-4">
        <h2 className="text-xl font-medium mb-4 text-primary">Basic Info</h2>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Name</label>
          <Input value={data.name} onChange={(e) => updateField("name", e.target.value)} />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Greeting (e.g. "hi. i'm")</label>
          <Input value={data.greeting} onChange={(e) => updateField("greeting", e.target.value)} />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Bio</label>
          <Textarea value={data.bio} onChange={(e) => updateField("bio", e.target.value)} rows={3} />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Email</label>
          <Input value={data.email} onChange={(e) => updateField("email", e.target.value)} />
        </div>
      </section>

      {/* Projects */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-primary">Projects</h2>
          <Button variant="outline" size="sm" onClick={addProject} className="gap-1">
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>
        <div className="space-y-6">
          {data.projects.map((project) => (
            <div key={project.id} className="bg-card rounded-xl p-5 space-y-3 border border-border">
              <div className="flex justify-between items-start">
                <Input value={project.title} onChange={(e) => updateProject(project.id, "title", e.target.value)} placeholder="Title" className="font-medium" />
                <Button variant="ghost" size="icon" onClick={() => removeProject(project.id)} className="text-destructive ml-2 shrink-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input value={project.subtitle} onChange={(e) => updateProject(project.id, "subtitle", e.target.value)} placeholder="Subtitle" />
              <Input value={project.imageUrl} onChange={(e) => updateProject(project.id, "imageUrl", e.target.value)} placeholder="Image URL" />
              <Input value={project.link} onChange={(e) => updateProject(project.id, "link", e.target.value)} placeholder="Project Link" />
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={project.featured} onChange={(e) => updateProject(project.id, "featured", e.target.checked)} className="accent-primary" />
                Featured
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Writings */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-primary">Writings</h2>
          <Button variant="outline" size="sm" onClick={addWriting} className="gap-1">
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {data.writings.map((w) => (
            <div key={w.id} className="bg-card rounded-xl p-5 space-y-3 border border-border">
              <div className="flex justify-between items-start">
                <Input value={w.title} onChange={(e) => updateWriting(w.id, "title", e.target.value)} placeholder="Title" />
                <Button variant="ghost" size="icon" onClick={() => removeWriting(w.id)} className="text-destructive ml-2 shrink-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input value={w.url} onChange={(e) => updateWriting(w.id, "url", e.target.value)} placeholder="URL" />
                <Input value={w.date} onChange={(e) => updateWriting(w.id, "date", e.target.value)} placeholder="Date" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-primary">Social Links</h2>
          <Button variant="outline" size="sm" onClick={addSocial} className="gap-1">
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {data.socialLinks.map((s, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Input value={s.label} onChange={(e) => updateSocial(i, "label", e.target.value)} placeholder="Label" />
              <Input value={s.url} onChange={(e) => updateSocial(i, "url", e.target.value)} placeholder="URL" />
              <Button variant="ghost" size="icon" onClick={() => removeSocial(i)} className="text-destructive shrink-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-border">
        <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Admin;
