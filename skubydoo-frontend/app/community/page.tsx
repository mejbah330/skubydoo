"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Upload, ArrowUp, ArrowDown, Crown } from "lucide-react";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const POSTS = [
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
          <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4">
            The Family
          </p>
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
            <div className="glass rounded-2xl p-6 mb-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Upload className="w-5 h-5 text-[#B0B0B0]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#B0B0B0]">Share your ShubyDoo fit</p>
              </div>
              <Button variant="outline" size="sm">
                Upload
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {POSTS.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-0 overflow-hidden">
                    <div
                      className="aspect-square bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold">{post.userName}</span>
                        <span className="text-[10px] text-[#B0B0B0]">{post.date}</span>
                      </div>
                      <p className="text-xs text-[#B0B0B0] mb-3">{post.caption}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-xs text-[#B0B0B0] hover:text-[#00D26A] transition-colors">
                          <ArrowUp className="w-3 h-3" /> {post.upvotes}
                        </button>
                        <button className="flex items-center gap-1 text-xs text-[#B0B0B0] hover:text-[#FF4444] transition-colors">
                          <ArrowDown className="w-3 h-3" />
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
                    {i === 0 ? <Crown className="w-5 h-5 text-[#D4AF37]" /> : `#${i + 1}`}
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
