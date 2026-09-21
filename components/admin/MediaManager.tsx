"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MediaAsset {
  id: string;
  name: string;
  type: "image" | "video";
  category: "logo" | "hero" | "leadership" | "media_gallery" | "certificate";
  url: string;
  dimensions?: string;
  location: string;
  description: string;
}

const INITIAL_ASSETS: MediaAsset[] = [
  {
    id: "asset-1",
    name: "Academy Header Logo",
    type: "image",
    category: "logo",
    url: "/logo.jpg",
    dimensions: "512 x 512 px",
    location: "Header Navigation, Footer & Brand Badges",
    description: "Primary registered logo for Masters Leadership Academy.",
  },
  {
    id: "asset-2",
    name: "Hero Section Background",
    type: "image",
    category: "hero",
    url: "/hero-background.jpg",
    dimensions: "1920 x 1080 px",
    location: "Index Page Hero Background",
    description: "High-resolution corporate conference background image.",
  },
  {
    id: "asset-3",
    name: "Chairman & Founder Portrait",
    type: "image",
    category: "leadership",
    url: "/chairman.jpg",
    dimensions: "600 x 600 px",
    location: "Index Page & About Page - Message from Chairman",
    description: "Official portrait of Dr. Orovwiroro Orakpowenri Godwin.",
  },
  {
    id: "asset-4",
    name: "Academy Showcase Video Stream",
    type: "video",
    category: "media_gallery",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    location: "Media Page & Index Video Player Component",
    description: "Main video showcase player for academy training sessions.",
  },
  {
    id: "asset-5",
    name: "CAC Registration Certificate Document",
    type: "image",
    category: "certificate",
    url: "/reference/registration-certificate.pdf",
    location: "Verify Certificate & About Page",
    description: "Legal CAC business registration certificate (BN 2357164).",
  },
  {
    id: "asset-6",
    name: "Favicon Icon",
    type: "image",
    category: "logo",
    url: "/favicon.ico",
    dimensions: "32 x 32 px",
    location: "Browser Tab & Bookmark Icon",
    description: "Standard favicon icon asset.",
  },
];

export default function MediaManager() {
  const [assets, setAssets] = useState<MediaAsset[]>(INITIAL_ASSETS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);

  // New Media Form state
  const [newAsset, setNewAsset] = useState({
    name: "",
    type: "image" as "image" | "video",
    category: "media_gallery" as MediaAsset["category"],
    url: "",
    location: "Media Gallery",
    description: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredAssets = selectedCategory === "all"
    ? assets
    : assets.filter((a) => a.category === selectedCategory || a.type === selectedCategory);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.url) return;

    const created: MediaAsset = {
      id: `asset-${Date.now()}`,
      name: newAsset.name,
      type: newAsset.type,
      category: newAsset.category,
      url: newAsset.url,
      location: newAsset.location,
      description: newAsset.description || "Custom uploaded media asset.",
    };

    setAssets([created, ...assets]);
    setShowAddModal(false);
    setNewAsset({
      name: "",
      type: "image",
      category: "media_gallery",
      url: "",
      location: "Media Gallery",
      description: "",
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 border border-rule-paper rounded-[4px]">
        <div>
          <span className="font-mono text-[11px] text-copper uppercase tracking-[0.12em] block mb-1">
            Media & Asset Management
          </span>
          <h1 className="text-[26px] font-serif text-ink-text font-bold">
            Pictures & Video Portal
          </h1>
          <p className="text-[14px] text-muted-paper mt-1">
            Access, view, preview, and update all media assets, photos, and video links used across the website.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-copper self-start md:self-auto flex items-center gap-2 cursor-pointer"
        >
          <span>+ Add Media Asset</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-rule-paper pb-3">
        {[
          { id: "all", label: "All Media Assets" },
          { id: "image", label: "Pictures Only" },
          { id: "video", label: "Videos Only" },
          { id: "logo", label: "Logos & Branding" },
          { id: "hero", label: "Hero & Backgrounds" },
          { id: "leadership", label: "Leadership Photos" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 text-[13px] rounded-[3px] font-medium transition-colors cursor-pointer ${
              selectedCategory === tab.id
                ? "bg-ink text-cream-text font-semibold"
                : "bg-paper-2 text-ink-text hover:bg-paper"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white border border-rule-paper rounded-[4px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Preview Box */}
            <div className="h-48 bg-ink-2 relative flex items-center justify-center p-4 border-b border-rule-paper overflow-hidden">
              {asset.type === "image" && asset.url.endsWith(".pdf") ? (
                <div className="text-center text-cream-text p-4">
                  <span className="text-4xl block mb-2">📄</span>
                  <span className="text-xs font-mono text-copper-light uppercase">PDF Document</span>
                </div>
              ) : asset.type === "image" ? (
                <Image
                  src={asset.url}
                  alt={asset.name}
                  fill
                  sizes="400px"
                  className="object-contain p-2"
                />
              ) : (
                <div className="text-center text-cream-text p-4">
                  <span className="text-4xl block mb-2">🎥</span>
                  <span className="text-xs font-mono text-copper-light uppercase">Video Asset</span>
                  <p className="text-[11px] text-[#AEC0BB] mt-1 truncate max-w-[240px]">{asset.url}</p>
                </div>
              )}
              <span className="absolute top-3 left-3 bg-ink/90 text-copper-light font-mono text-[10px] uppercase px-2 py-1 rounded-[2px]">
                {asset.type}
              </span>
            </div>

            {/* Asset Information */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-[17px] font-semibold text-ink-text mb-1">
                  {asset.name}
                </h3>
                <p className="text-[12px] text-muted-paper mb-3">{asset.description}</p>
                <div className="space-y-1 text-[12px]">
                  <div className="flex items-center gap-2 text-ink-text">
                    <span className="font-semibold text-slate">Location:</span>
                    <span className="text-muted-paper">{asset.location}</span>
                  </div>
                  {asset.dimensions && (
                    <div className="flex items-center gap-2 text-ink-text">
                      <span className="font-semibold text-slate">Size:</span>
                      <span className="font-mono text-muted-paper">{asset.dimensions}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-ink-text truncate">
                    <span className="font-semibold text-slate">URL:</span>
                    <span className="font-mono text-copper truncate">{asset.url}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-rule-paper flex gap-2">
                <button
                  onClick={() => setPreviewAsset(asset)}
                  className="btn btn-outline-ink text-xs flex-1 justify-center py-2 cursor-pointer"
                >
                  Inspect Preview
                </button>
                <button
                  onClick={() => handleCopyUrl(asset.id, asset.url)}
                  className="btn btn-copper text-xs py-2 px-3 cursor-pointer"
                >
                  {copiedId === asset.id ? "Copied! ✓" : "Copy URL"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[6px] max-w-[600px] w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPreviewAsset(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl cursor-pointer"
            >
              ✕
            </button>
            <span className="font-mono text-[10px] text-copper uppercase tracking-wider block mb-1">
              Asset Details
            </span>
            <h2 className="font-serif text-[22px] font-bold text-ink-text mb-4">
              {previewAsset.name}
            </h2>

            <div className="bg-ink-2 h-64 relative rounded-[4px] overflow-hidden mb-4 flex items-center justify-center">
              {previewAsset.type === "image" && previewAsset.url.endsWith(".pdf") ? (
                <div className="text-center text-cream-text">
                  <span className="text-5xl block mb-2">📄</span>
                  <p className="text-sm font-mono text-copper-light">{previewAsset.url}</p>
                </div>
              ) : previewAsset.type === "image" ? (
                <Image
                  src={previewAsset.url}
                  alt={previewAsset.name}
                  fill
                  sizes="600px"
                  className="object-contain p-2"
                />
              ) : (
                <iframe
                  src={previewAsset.url}
                  title={previewAsset.name}
                  className="w-full h-full border-none"
                />
              )}
            </div>

            <div className="space-y-2 text-[13px] text-ink-text bg-paper-2 p-4 rounded-[4px]">
              <p><strong>Description:</strong> {previewAsset.description}</p>
              <p><strong>Web Location:</strong> {previewAsset.location}</p>
              <p><strong>Asset Path:</strong> <code className="bg-white px-2 py-0.5 rounded font-mono text-copper">{previewAsset.url}</code></p>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => setPreviewAsset(null)} className="btn btn-outline-ink">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[6px] max-w-[500px] w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl cursor-pointer"
            >
              ✕
            </button>
            <h2 className="font-serif text-[20px] font-bold text-ink-text mb-4">
              Add New Media Asset
            </h2>

            <form onSubmit={handleAddAsset} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate mb-1">Asset Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Conference Presentation 2026"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  className="w-full p-2.5 border border-rule-paper rounded-[3px] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate mb-1">Type</label>
                  <select
                    value={newAsset.type}
                    onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value as "image" | "video" })}
                    className="w-full p-2.5 border border-rule-paper rounded-[3px] text-sm"
                  >
                    <option value="image">Picture (Image)</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate mb-1">Category</label>
                  <select
                    value={newAsset.category}
                    onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value as MediaAsset["category"] })}
                    className="w-full p-2.5 border border-rule-paper rounded-[3px] text-sm"
                  >
                    <option value="media_gallery">Media Gallery</option>
                    <option value="hero">Hero Background</option>
                    <option value="logo">Logo & Branding</option>
                    <option value="leadership">Leadership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate mb-1">Image / Video URL</label>
                <input
                  type="text"
                  required
                  placeholder="/images/photo.jpg or https://..."
                  value={newAsset.url}
                  onChange={(e) => setNewAsset({ ...newAsset, url: e.target.value })}
                  className="w-full p-2.5 border border-rule-paper rounded-[3px] text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Brief description of the image/video"
                  value={newAsset.description}
                  onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                  className="w-full p-2.5 border border-rule-paper rounded-[3px] text-sm"
                />
              </div>

              <div className="pt-3 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-outline-ink"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-copper">
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
