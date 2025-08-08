"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-background dark:bg-background items-center justify-center relative overflow-hidden">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Reader Testimonials
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          What our community says about our blog stories and insights
        </p>
      </div>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "This blog has completely transformed how I think about technology and creativity. Every article offers fresh perspectives that challenge conventional thinking and inspire innovation.",
    name: "Sarah Chen",
    title: "Tech Entrepreneur",
  },
  {
    quote:
      "The depth of research and storytelling quality is exceptional. I've discovered countless new ideas and connections that have enhanced both my personal and professional journey.",
    name: "Michael Rodriguez",
    title: "Creative Director",
  },
  {
    quote: 
      "A rare gem in the digital landscape where thoughtful analysis meets engaging narrative. These stories don't just inform—they inspire action and reflection.",
    name: "Dr. Emily Watson",
    title: "Innovation Researcher",
  },
  {
    quote:
      "I look forward to every new article. The way complex topics are broken down and connected to human experience makes for compelling and accessible reading.",
    name: "David Kim",
    title: "Software Developer",
  },
  {
    quote:
      "This blog bridges the gap between technology and humanity beautifully. It's become my go-to resource for understanding how innovation shapes our world.",
    name: "Lisa Thompson",
    title: "Digital Strategist",
  },
];