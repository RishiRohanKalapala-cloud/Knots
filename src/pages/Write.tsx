import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MoreHorizontal, Bell, User } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const Write = () => {
  const { user, loading: authLoading } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSave = async (publish = false) => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    setLoading(true);
    
    try {
      const blogData = {
        title: title.trim(),
        content: content.trim(),
        excerpt: content.slice(0, 150) + '...',
        published: publish,
        author_id: user?.id,
      };

      const { error } = await supabase
        .from('blogs')
        .insert([blogData]);

      if (error) throw error;

      toast.success(publish ? 'Blog published successfully!' : 'Blog saved as draft!');
      
      // Clear form
      setTitle('');
      setContent('');
      
      // Redirect to blogs after a short delay
      setTimeout(() => {
        window.location.href = '/blogs';
      }, 1500);
      
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => window.location.href = '/blogs'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Knots</h1>
              <span className="text-sm text-muted-foreground">Draft in Techiespeaks</span>
              <span className="text-sm text-muted-foreground">Saved</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => handleSave(true)}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2"
              >
                Publish
              </Button>
              
              <MoreHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
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

      {/* Main Writing Area */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title Input */}
        <div className="mb-8">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-4xl font-medium placeholder-muted-foreground bg-transparent border-none outline-none resize-none overflow-hidden"
            style={{ height: 'auto' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
            rows={1}
          />
        </div>

        {/* Content Input */}
        <div className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            className="w-full text-xl leading-relaxed placeholder-muted-foreground bg-transparent border-none outline-none resize-none"
            style={{ minHeight: '400px' }}
          />
        </div>

        {/* Floating Toolbar */}
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col space-y-4 bg-background border border-border rounded-lg p-2 shadow-lg">
          <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded">
            <span className="text-lg font-bold">B</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded">
            <span className="text-lg italic">I</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded">
            <span className="text-lg">🔗</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded">
            <span className="text-lg">""</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded">
            <span className="text-lg">H</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded">
            <span className="text-lg">⋯</span>
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={loading}
              className="text-muted-foreground"
            >
              Save Draft
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{content.length} characters</span>
            <span>•</span>
            <span>{Math.ceil(content.split(' ').length / 200)} min read</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Write;