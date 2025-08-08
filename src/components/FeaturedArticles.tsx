"use client"; // Required for using useState

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User } from "lucide-react";
import { useState } from "react";

const allArticles = [
  {
    id: 1,
    title: "The Art of Digital Storytelling",
    description: "Exploring how modern technology transforms the way we tell and consume stories in the digital age.",
    category: "Technology",
    author: "Sarah Chen",
    readTime: "8 min read",
    date: "Jan 15, 2024",
    featured: true,
    publisher: "Shorthand",
    link: "https://shorthand.com/resources/examples-of-digital-storytelling/"
  },
  {
    id: 2,
    title: "Building Connections in Remote Teams",
    description: "Strategies for fostering meaningful relationships and collaboration in distributed work environments.",
    category: "Leadership",
    author: "Marcus Johnson",
    readTime: "6 min read",
    date: "Sep 23, 2024",
    featured: false,
    publisher: "ActivTrak",
    link: "https://www.activtrak.com/blog/remote-team-collaboration/"
  },
  {
    id: 3,
    title: "The Psychology of Design Patterns",
    description: "Understanding how familiar patterns in design influence user behavior and decision-making.",
    category: "Design",
    author: "Emily Rodriguez",
    readTime: "12 min read",
    date: "Jun 17, 2025",
    featured: false,
    publisher: "Number Analytics",
    link: "https://numberanalytics.com/psychology-in-design-patterns/"
  },
  {
      id: 4,
      title: "Mastering Remote Collaboration",
      description: "Make remote teamwork not just functional, but exceptional, improving productivity and culture.",
      category: "Leadership",
      author: "Vibe Board",
      readTime: "10 min read",
      date: "Apr 23, 2025",
      featured: false,
      publisher: "Vibe",
      link: "https://vibe.us/blog/remote-collaboration-strategies/"
    },
    {
      id: 5,
      title: "Digital Storytelling for Writers",
      description: "Tapping into new literacies like digital storytelling may boost motivation and scaffold understanding.",
      category: "Education",
      author: "Reading Rockets",
      readTime: "9 min read",
      date: "Jul 01, 2024",
      featured: false,
      publisher: "Reading Rockets",
      link: "https://www.readingrockets.org/teaching/reading101-course/modules/writing/digital-storytelling-extending-potential-struggling"
    },
    {
        id: 6,
        title: "AI in Web Design: A New Frontier",
        description: "How artificial intelligence is reshaping the landscape of web design and user experience.",
        category: "AI",
        author: "Alex Sterling",
        readTime: "11 min read",
        date: "Aug 05, 2025",
        featured: false,
        publisher: "Webflow",
        link: "https://webflow.com/blog/ai-web-design"
    },
    {
        id: 7,
        title: "Sustainable Tech: A Greener Future",
        description: "Innovations in technology that are paving the way for a more sustainable and eco-friendly world.",
        category: "Sustainability",
        author: "Jasmine Kaur",
        readTime: "7 min read",
        date: "Aug 10, 2025",
        featured: false,
        publisher: "GreenBiz",
        link: "https://www.greenbiz.com/topics/technology"
    },
    {
        id: 8,
        title: "The Creator Economy Explained",
        description: "An inside look at the platforms and tools empowering a new generation of digital creators.",
        category: "Business",
        author: "Leo Martinez",
        readTime: "9 min read",
        date: "Aug 12, 2025",
        featured: false,
        publisher: "SignalFire",
        link: "https://signalfire.com/blog/creator-economy/"
    }
];

const FeaturedArticles = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const featuredArticle = allArticles.find(article => article.featured);
  const otherArticles = allArticles.filter(article => !article.featured);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            From the Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover our most engaging content that connects ideas and inspires action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="md:col-span-3 lg:col-span-2">
                <Card className="bg-card border-border hover:shadow-glow transition-all duration-300 h-full flex flex-col">
                    <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            {featuredArticle.category}
                            </Badge>
                            <div className="flex items-center text-muted-foreground text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {featuredArticle.readTime}
                            </div>
                        </div>
                        <CardTitle className="text-3xl text-foreground leading-tight">
                            {featuredArticle.title}
                        </CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">
                            {featuredArticle.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 mt-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-muted-foreground">
                            <User className="w-4 h-4 mr-2" />
                            <span className="mr-4">{featuredArticle.author}</span>
                            <span>{featuredArticle.date}</span>
                            </div>
                            <a href={featuredArticle.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" className="text-accent hover:text-accent-foreground">
                                Read More
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
          )}

          {/* Other Articles - Sliced for "Load More" */}
          {otherArticles.slice(0, visibleCount - 1).map((article) => (
            <Card key={article.id} className="bg-card border-border hover:shadow-glow transition-all duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl text-foreground leading-tight">
                  {article.title}
                </CardTitle>
                 <CardDescription className="text-sm text-muted-foreground pt-2">
                    {article.description}
                  </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-3">{article.author}</span>
                  </div>
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="text-accent hover:text-accent-foreground">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < allArticles.length && (
            <div className="text-center mt-12">
                <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-border hover:bg-secondary rounded-full px-8"
                    onClick={handleLoadMore}
                >
                    View All Articles
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArticles;
