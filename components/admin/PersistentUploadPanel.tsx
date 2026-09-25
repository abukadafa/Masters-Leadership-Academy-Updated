"use client";

import { FormEvent, useEffect, useState } from "react";

type UploadedAsset = { id: string; name: string; type: string; category: string; url: string; description: string | null };

export default function PersistentUploadPanel() {
  const [assets, setAssets] = useState<UploadedAsset[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("media_gallery");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/admin/media/uploads").then((res) => (res.ok ? res.json() : null)).then((data) => data && setAssets(data.assets || [])).catch(() => undefined);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) { setStatus("Choose an image or video first."); return; }
    setStatus("Uploading...");
    const form = new FormData();
    form.append("file", file); form.append("name", name || file.name); form.append("category", category); form.append("description", description);
    const response = await fetch("/api/admin/media/uploads", { method: "POST", body: form });
    const data = await response.json();
    if (!response.ok) { setStatus(data.error || "Upload failed."); return; }
    setAssets((current) => [data.asset, ...current]); setFile(null); setName(""); setDescription(""); setStatus("Uploaded and saved.");
    const input = document.getElementById("media-upload-file") as HTMLInputElement | null;
    if (input) input.value = "";
  }

  return (
    <section className="bg-white border border-rule-paper rounded-[4px] p-6">
      <div className="mb-5"><span className="font-mono text-[11px] text-copper uppercase tracking-[0.12em] block mb-1">Persistent Uploads</span><h2 className="font-serif text-[22px] text-ink-text font-bold">Upload images and logos</h2><p className="text-sm text-muted-paper mt-1">Files are saved on the server and remain available after refreshes and deployments.</p></div>
      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        <input id="media-upload-file" type="file" accept="image/*,video/mp4,video/webm" required onChange={(event) => setFile(event.target.files?.[0] || null)} className="w-full p-2.5 border border-rule-paper rounded-[3px] text-sm md:col-span-2" />
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Asset name" className="w-full p-2.5 border border-rule-paper rounded-[3px] text-sm" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full p-2.5 border border-rule-paper rounded-[3px] text-sm"><option value="logo">Logo & Branding</option><option value="hero">Hero Background</option><option value="leadership">Leadership</option><option value="media_gallery">Media Gallery</option><option value="certificate">Certificate</option></select>
        <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description (optional)" className="w-full p-2.5 border border-rule-paper rounded-[3px] text-sm md:col-span-2" />
        <div className="flex items-center gap-3 md:col-span-2"><button type="submit" className="btn btn-copper">Upload and Save</button>{status && <span className="text-sm text-muted-paper">{status}</span>}</div>
      </form>
      {assets.length > 0 && <div className="mt-6 border-t border-rule-paper pt-4"><p className="text-xs font-mono uppercase text-slate mb-3">Saved uploads</p><div className="grid gap-2">{assets.map((asset) => <div key={asset.id} className="flex items-center justify-between gap-3 text-sm"><a href={asset.url} target="_blank" rel="noreferrer" className="text-copper hover:underline truncate">{asset.name}</a><span className="text-xs text-muted-paper">{asset.category}</span></div>)}</div></div>}
    </section>
  );
}
