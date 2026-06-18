"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowUp, ArrowDown, Crown, Image, X, Send, Camera } from "lucide-react";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Post {
  id: string;
  userName: string;
  image: string;
  caption: string;
  upvotes: number;
  downvotes: number;
  date: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    userName: "street_k1ng",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    caption: "Shadow King hitting different in the city lights.",
    upvotes: 234,
    downvotes: 3,
    date: "2 hours ago",
  },
  {
    id: "2",
    userName: "fashion.phantom",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80",
    caption: "Neon Protocol under UV. This is art.",
    upvotes: 189,
    downvotes: 5,
    date: "5 hours ago",
  },
  {
    id: "3",
    userName: "gold.era",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
    caption: "Golden Crown. No words needed.",
    upvotes: 312,
    downvotes: 1,
    date: "1 day ago",
  },
];

const LEADERBOARD = [
  { name: "street_k1ng", posts: 45, upvotes: 1234 },
  { name: "gold.era", posts: 38, upvotes: 1102 },
  { name: "fashion.phantom", posts: 31, upvotes: 987 },
  { name: "sneaker.sage", posts: 28, upvotes: 845 },
];

const DESIGN_VOTES = [
  { name: "Cyber Bloom", votes: 456, description: "Floral cyberpunk fusion" },
  { name: "Midnight Marble", votes: 389, description: "Marble texture experiment" },
  { name: "Gold Fracture", votes: 312, description: "Shattered gold pattern" },
];

export default function CommunityPage() {
  const [tab, setTab] = useState<"wall" | "leaderboard" | "designs">("wall");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadName, setUploadName] = useState("");
  const [uploadCaption, setUploadCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File too large. Max 10MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      setUploadPreview(url);
    }
  };

  const handleUpload = () => {
    if (!uploadPreview || !uploadName.trim() || !uploadCaption.trim()) return;

    const newPost: Post = {
      id: String(Date.now()),
      userName: uploadName.trim(),
      image: uploadPreview,
      caption: uploadCaption.trim(),
      upvotes: 0,
      downvotes: 0,
      date: "Just now",
    };

    setPosts([newPost, ...posts]);
    setShowUpload(false);
    setUploadPreview(null);
    setUploadName("");
    setUploadCaption("");
  };

  const handleRemovePreview = () => {
    setUploadPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <GoldParticles count={30} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_70%)]" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4">The Family</p>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight font-display">
            <span className="gold-text">COMMUNITY</span>
          </h1>
        </div>
      </section>

      <div className="flex justify-center gap-2 mb-10">
        {[
          { id: "wall" as const, label: "Wall" },
          { id: "leaderboard" as const, label: "Top" },
          { id: "designs" as const, label: "Vote" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-6 py-2 text-xs tracking-widest uppercase rounded-full transition-all ${
              tab === id
                ? "bg-[#D4AF37] text-black font-bold"
                : "glass text-[#B0B0B0] hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="pb-20 px-4 max-w-5xl mx-auto">
        {tab === "wall" && (
          <>
            <div className="glass rounded-2xl p-4 md:p-6 mb-8">
              <AnimatePresence mode="wait">
                {!showUpload ? (
                  <motion.div
                    key="upload-trigger"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Camera className="w-5 h-5 text-[#B0B0B0]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#B0B0B0]">Share your ShubyDoo fit</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowUpload(true)}>
                      <Image className="w-4 h-4 mr-2" /> Upload
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-wider">New Post</h3>
                      <button
                        onClick={() => {
                          setShowUpload(false);
                          setUploadPreview(null);
                        }}
                        className="text-[#B0B0B0] hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="community-upload"
                        />
                        {uploadPreview ? (
                          <div className="relative w-32 h-32 rounded-xl overflow-hidden glass">
                            <img
                              src={uploadPreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={handleRemovePreview}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="community-upload"
                            className="w-32 h-32 rounded-xl glass flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#D4AF37]/30 transition-colors border border-white/5"
                          >
                            <Image className="w-6 h-6 text-[#B0B0B0]" />
                            <span className="text-[10px] text-[#B0B0B0]">Add Photo</span>
                          </label>
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={uploadName}
                          onChange={(e) => setUploadName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                        />
                        <textarea
                          value={uploadCaption}
                          onChange={(e) => setUploadCaption(e.target.value)}
                          placeholder="Write a caption..."
                          rows={2}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowUpload(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="gold"
                            size="sm"
                            onClick={handleUpload}
                            disabled={!uploadPreview || !uploadName.trim() || !uploadCaption.trim()}
                          >
                            <Send className="w-3 h-3 mr-2" /> Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-0 overflow-hidden">
                    <div className="aspect-square bg-[#0F0F0F] relative">
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector(".fallback")) {
                            const fb = document.createElement("div");
                            fb.className =
                              "fallback absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0F0F0F]";
                            fb.innerHTML = `<svg class="w-10 h-10 text-[#D4AF37]/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span class="text-[10px] text-[#B0B0B0]">Image unavailable</span>`;
                            parent.appendChild(fb);
                          }
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold">{post.userName}</span>
                        <span className="text-[10px] text-[#B0B0B0]">{post.date}</span>
                      </div>
                      <p className="text-xs text-[#B0B0B0] mb-3 line-clamp-2">{post.caption}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-xs text-[#B0B0B0] hover:text-[#00D26A] transition-colors">
                          <ArrowUp className="w-3 h-3" /> {post.upvotes}
                        </button>
                        <button className="flex items-center gap-1 text-xs text-[#B0B0B0] hover:text-[#FF4444] transition-colors">
                          <ArrowDown className="w-3 h-3" /> {post.downvotes}
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === "leaderboard" && (
          <div className="space-y-4">
            {LEADERBOARD.map((entry, i) => (
              <motion.div
                key={entry.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg font-bold">
                    {i === 0 ? (
                      <Crown className="w-5 h-5 text-[#D4AF37]" />
                    ) : (
                      `#${i + 1}`
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{entry.name}</p>
                    <p className="text-xs text-[#B0B0B0]">
                      {entry.posts} posts · {entry.upvotes} upvotes
                    </p>
                  </div>
                  <Badge variant={i === 0 ? "gold" : "default"}>
                    {i === 0 ? "Top Collector" : "Supporter"}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "designs" && (
          <div className="space-y-6">
            <p className="text-center text-[#B0B0B0] text-sm mb-8">
              Vote for the next ShubyDoo design. The community decides.
            </p>
            {DESIGN_VOTES.map((design, i) => (
              <motion.div
                key={design.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold">{design.name}</h3>
                    <p className="text-xs text-[#B0B0B0] mt-1">{design.description}</p>
                    <p className="text-xs text-[#D4AF37] mt-2">{design.votes} votes</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Heart className="w-3 h-3 mr-1" /> Vote
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
