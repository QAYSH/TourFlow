import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  BookOpen,
  Search,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const featuredPost = {
  title: "The Future of Product Onboarding: Trends for 2024",
  excerpt: "Discover the latest trends in user onboarding and how AI is changing the way we guide new users through products.",
  author: "Sarah Kim",
  date: "Dec 15, 2023",
  readTime: "8 min read",
  category: "Trends",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
};

const blogPosts = [
  {
    id: 1,
    title: "How We Increased User Activation by 47%",
    excerpt: "A case study on using interactive tours to boost feature adoption in a SaaS product.",
    author: "Alex Chen",
    date: "Nov 28, 2023",
    readTime: "6 min read",
    category: "Case Study",
  },
  {
    id: 2,
    title: "Building Accessible Product Tours",
    excerpt: "Best practices for creating tours that work for all users, including those with disabilities.",
    author: "Marcus Johnson",
    date: "Nov 15, 2023",
    readTime: "10 min read",
    category: "Accessibility",
  },
  {
    id: 3,
    title: "The Psychology of User Guidance",
    excerpt: "Understanding cognitive load and attention patterns to create more effective tours.",
    author: "Emily Zhang",
    date: "Oct 30, 2023",
    readTime: "7 min read",
    category: "Psychology",
  },
  {
    id: 4,
    title: "TourFlow API Deep Dive",
    excerpt: "Advanced techniques for customizing and extending TourFlow with our API.",
    author: "David Park",
    date: "Oct 12, 2023",
    readTime: "12 min read",
    category: "Technical",
  },
  {
    id: 5,
    title: "Measuring ROI of User Onboarding",
    excerpt: "How to calculate the business impact of your onboarding investments.",
    author: "Lisa Wang",
    date: "Sep 25, 2023",
    readTime: "5 min read",
    category: "Analytics",
  },
  {
    id: 6,
    title: "Multi-language Support Done Right",
    excerpt: "Strategies for creating tours that work seamlessly across different languages and cultures.",
    author: "Carlos Ruiz",
    date: "Sep 10, 2023",
    readTime: "9 min read",
    category: "Localization",
  },
];

const categories = [
  "All Posts",
  "Case Study",
  "Technical",
  "Trends",
  "Psychology",
  "Accessibility",
  "Analytics",
  "Localization",
];

const popularTags = [
  "User Experience",
  "Product Growth",
  "SaaS",
  "JavaScript",
  "React",
  "A/B Testing",
  "Mobile",
  "Enterprise",
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Blog</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
                Insights &{" "}
                <span className="gradient-text">Stories</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                Learn about user onboarding, product growth, and the latest trends 
                in product adoption.
              </p>

              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl mx-auto"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search articles, tutorials, and guides..."
                    className="pl-12 pr-4 py-6 glass text-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="font-heading text-2xl font-bold mb-8 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Featured Article
              </h2>

              <div className="glass rounded-2xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative h-64 md:h-auto">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                      style={{
                        backgroundImage: `url(${featuredPost.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </div>
                  <div className="p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                      <Tag className="w-3 h-3" />
                      {featuredPost.category}
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button variant="hero" asChild>
                      <Link to={`/blog/${featuredPost.title.toLowerCase().replace(/ /g, '-')}`}>
                        Read Full Article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="lg:w-2/3">
                  {/* Categories */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                  >
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category, index) => (
                        <button
                          key={category}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            index === 0
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Blog Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {blogPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass p-6 rounded-2xl hover:bg-card/80 transition-all duration-300 group"
                      >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                          <Link to={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {post.date}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}>
                              Read
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </motion.article>
                    ))}
                  </div>

                  {/* Pagination */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 flex justify-center"
                  >
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="ghost" size="sm" className="bg-primary text-primary-foreground">
                        1
                      </Button>
                      <Button variant="ghost" size="sm">
                        2
                      </Button>
                      <Button variant="ghost" size="sm">
                        3
                      </Button>
                      <Button variant="ghost" size="sm">
                        Next
                      </Button>
                    </div>
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3">
                  <div className="space-y-8">
                    {/* Popular Tags */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="glass p-6 rounded-2xl"
                    >
                      <h4 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Tag className="w-5 h-5 text-primary" />
                        Popular Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => (
                          <button
                            key={tag}
                            className="px-3 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="glass p-6 rounded-2xl"
                    >
                      <h4 className="font-heading font-semibold text-foreground mb-4">
                        Join Our Newsletter
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get the latest articles and insights delivered to your inbox.
                      </p>
                      <div className="space-y-3">
                        <Input placeholder="Your email" className="glass" />
                        <Button variant="hero" className="w-full">
                          Subscribe
                        </Button>
                      </div>
                    </motion.div>

                    {/* Community */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="glass p-6 rounded-2xl"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <MessageSquare className="w-6 h-6 text-primary" />
                        <h4 className="font-heading font-semibold text-foreground">
                          Join the Conversation
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Discuss articles and share ideas with other product enthusiasts.
                      </p>
                      <Button variant="hero-outline" className="w-full" asChild>
                        <Link to="/community">Join Community</Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}