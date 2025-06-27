
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import supportData from "@/data/support/supportArticles.json";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const SupportArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { articles, categories } = supportData;
  
  const article = articles.find((a) => a.slug === slug);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/support">
            <Button className="bg-red-500 hover:bg-red-600">
              Back to Support
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const category = categories.find((c) => c.id === article.category);
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-gray-300 leading-relaxed mb-6"
          >
            {block.text}
          </motion.p>
        );
      
      case "heading":
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-6"
          >
            <HeadingTag className={`font-bold text-white ${
              block.level === 2 ? 'text-2xl' : 
              block.level === 3 ? 'text-xl' : 'text-lg'
            }`}>
              {block.text}
            </HeadingTag>
          </motion.div>
        );
      
      case "callout":
        const variantStyles = {
          info: "bg-blue-500/20 border-blue-500/30 text-blue-300",
          success: "bg-green-500/20 border-green-500/30 text-green-300",
          warning: "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
          error: "bg-red-500/20 border-red-500/30 text-red-300",
        };
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`p-4 rounded-lg border mb-6 ${variantStyles[block.variant as keyof typeof variantStyles]}`}
          >
            <p className="font-medium">{block.text}</p>
          </motion.div>
        );
      
      case "image":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-8"
          >
            <AspectRatio ratio={block.aspectRatio === "16:9" ? 16/9 : block.aspectRatio === "4:3" ? 4/3 : 1}>
              <img
                src={block.src}
                alt={block.alt}
                className="rounded-lg object-cover w-full h-full"
              />
            </AspectRatio>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header theme="dark" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link to="/support" className="hover:text-red-500 transition-colors">
              Support
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <Link to="/support" className="hover:text-red-500 transition-colors">
              {category?.name}
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="text-white">{article.title}</span>
          </nav>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Link to="/support">
            <Button variant="ghost" className="text-gray-400 hover:text-white p-0">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Support
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-4">
            <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30 mb-4">
              {category?.name}
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-400 mb-8">
            {article.description}
          </p>
          
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-16">
          {article.content.map((block, index) => renderContentBlock(block, index))}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="border-t border-gray-800 pt-12"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/support/article/${relatedArticle.slug}`}>
                    <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 group">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2 group-hover:text-red-500 transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                          {relatedArticle.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{relatedArticle.readTime}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer theme="dark" />
    </div>
  );
};

export default SupportArticlePage;
