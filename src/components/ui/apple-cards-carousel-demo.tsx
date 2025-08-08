"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Featured <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Blog Stories</span>
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const BlogContent = ({ article }: { article: string }) => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"blog-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {article}
              </span>{" "}
              Dive deep into the latest insights, trends, and innovations that are shaping our digital world. 
              From cutting-edge technology to creative breakthroughs, explore the stories that matter most 
              in today's rapidly evolving landscape.
            </p>
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop"
              alt="Blog content illustration"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-2xl mt-8"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Technology",
    title: "The Future of AI in Web Development",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <BlogContent article="Artificial Intelligence is revolutionizing how we build and interact with web applications." />,
  },
  {
    category: "Design",
    title: "Mastering Modern UI/UX Principles",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <BlogContent article="Explore the latest design trends and user experience strategies that create memorable digital experiences." />,
  },
  {
    category: "Development",
    title: "Building Scalable React Applications",
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2070&auto=format&fit=crop",
    content: <BlogContent article="Learn advanced React patterns and best practices for creating maintainable, large-scale applications." />,
  },
  {
    category: "Innovation",
    title: "The Rise of No-Code Platforms",
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop",
    content: <BlogContent article="Discover how no-code solutions are democratizing software development and empowering creators." />,
  },
  {
    category: "Trends",
    title: "Web3 and the Decentralized Web",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    content: <BlogContent article="Understanding blockchain technology and its impact on the future of web applications." />,
  },
  {
    category: "Career",
    title: "Breaking into Tech: A Developer's Journey",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <BlogContent article="Insights and advice for aspiring developers looking to start their career in technology." />,
  },
];