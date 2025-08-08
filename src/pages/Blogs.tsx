import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Home, BookOpen, User, BarChart3, Users, PenTool, Search, Bell, LogOut, Heart, MessageCircle, Bookmark, Plus } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Profile {
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  created_at: string;
  author_id: string;
}

const Blogs = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const [blogs, setBlogs] = useState<(Blog & { profiles: Profile | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('For you');

  // Redirect if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  const fetchBlogs = async () => {
    try {
      const { data: blogsData, error: blogsError } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (blogsError) throw blogsError;

      if (blogsData && blogsData.length > 0) {
        const authorIds = [...new Set(blogsData.map(blog => blog.author_id))];
        
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('user_id, full_name, username, avatar_url')
          .in('user_id', authorIds);

        if (profilesError) throw profilesError;

        const blogsWithProfiles = blogsData.map(blog => ({
          ...blog,
          profiles: profilesData?.find(profile => profile.user_id === blog.author_id) || null
        }));

        setBlogs(blogsWithProfiles);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const readingTime = (content: string) => {
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const tabs = ['For you', 'Featured', 'Programming', 'Writing', 'Technology'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-foreground">Knots</h1>
              
              <div className="hidden md:flex items-center space-x-2 max-w-sm">
                <Search className="w-4 h-4 text-muted-foreground absolute ml-3" />
                <Input 
                  placeholder="Search" 
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-0"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <Button 
                onClick={() => window.location.href = '/write'}
                variant="ghost"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <PenTool className="w-4 h-4" />
                <span>Write</span>
              </Button>
              
              <Bell className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
              
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        <aside className="w-64 p-6 border-r border-border hidden lg:block">
          <nav className="space-y-4">
            <div className="flex items-center space-x-3 text-foreground hover:text-muted-foreground cursor-pointer p-2 rounded-lg">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground cursor-pointer p-2 rounded-lg">
              <BookOpen className="w-5 h-5" />
              <span>Library</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground cursor-pointer p-2 rounded-lg">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground cursor-pointer p-2 rounded-lg">
              <BarChart3 className="w-5 h-5" />
              <span>Stats</span>
            </div>
          </nav>
          
          <div className="mt-8">
            <p className="text-sm font-medium text-muted-foreground mb-4">Following</p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">See suggestions</p>
            </div>
          </div>
          
          <Button 
            onClick={handleSignOut}
            variant="ghost" 
            className="w-full mt-8 justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-2xl">
          {/* Tab Navigation */}
          <div className="border-b border-border sticky top-16 bg-background z-40">
            <div className="flex space-x-8 px-6 py-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap pb-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Feed */}
          <div className="px-6 py-8">
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <PenTool className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  No stories yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Be the first to share your story with the community!
                </p>
                <Button onClick={() => window.location.href = '/write'}>
                  Write Your First Story
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {blogs.map((blog) => (
                  <article key={blog.id} className="group cursor-pointer">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="w-5 h-5">
                        <AvatarImage src={blog.profiles?.avatar_url} />
                        <AvatarFallback>
                          <User className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span className="font-medium">
                          {blog.profiles?.full_name || blog.profiles?.username || 'Anonymous'}
                        </span>
                        <span>·</span>
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-muted-foreground transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-3">
                        {blog.excerpt || blog.content.slice(0, 200) + '...'}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground cursor-pointer">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">24</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground cursor-pointer">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">3</span>
                        </div>
                        <Bookmark className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        {readingTime(blog.content)}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 p-6 hidden xl:block">
          <div className="mb-8">
            <h3 className="font-semibold text-foreground mb-4">Staff Picks</h3>
            <div className="space-y-4">
              <div className="text-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar className="w-4 h-4">
                    <AvatarFallback><User className="w-2 h-2" /></AvatarFallback>
                  </Avatar>
                  <span className="text-muted-foreground">John Smith</span>
                </div>
                <h4 className="font-medium text-foreground line-clamp-2">
                  The Future of Web Development
                </h4>
              </div>
              <div className="text-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar className="w-4 h-4">
                    <AvatarFallback><User className="w-2 h-2" /></AvatarFallback>
                  </Avatar>
                  <span className="text-muted-foreground">Jane Doe</span>
                </div>
                <h4 className="font-medium text-foreground line-clamp-2">
                  Building Better User Experiences
                </h4>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Recommended topics</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Programming', 'JavaScript', 'React', 'Design', 'Writing'].map((topic) => (
                <Badge key={topic} variant="secondary" className="cursor-pointer hover:bg-muted">
                  {topic}
                </Badge>
              ))}
            </div>
            <button className="text-sm text-green-600 hover:text-green-700">
              See more topics
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blogs;