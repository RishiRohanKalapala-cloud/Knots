import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, Sparkles, ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-8 shadow-2xl shadow-violet-500/25">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Join the
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"> Revolution</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Be part of an exclusive community where technology meets creativity. 
            Get cutting-edge insights delivered to your inbox.
          </p>
        </div>

        <Card className="bg-black/40 backdrop-blur-xl border border-white/10 relative overflow-hidden shadow-2xl shadow-violet-500/10">
          {/* Card Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
          
          <CardContent className="relative z-10 p-12 lg:p-16">
            <div className="max-w-2xl mx-auto">
              {/* Email Form */}
              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="pl-12 h-14 bg-white/5 border-white/20 text-white placeholder:text-muted-foreground focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 text-lg"
                  />
                </div>
                <Button 
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0 shadow-xl shadow-violet-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/40 text-lg font-semibold"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-3">
                    <Send className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Weekly Insights</h3>
                  <p className="text-sm text-muted-foreground">Curated content every Tuesday</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Exclusive Access</h3>
                  <p className="text-sm text-muted-foreground">Early access to new articles</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-3">
                    <Mail className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Zero Spam</h3>
                  <p className="text-sm text-muted-foreground">Unsubscribe anytime</p>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Join <span className="text-violet-400 font-semibold">2,847</span> readers who stay ahead of the curve
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;