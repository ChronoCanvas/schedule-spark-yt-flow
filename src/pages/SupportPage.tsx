
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, User, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import supportData from "@/data/support/supportArticles.json";

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { categories, articles } = supportData;
  
  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return articles;
    }
    
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        article.category.toLowerCase().includes(query)
    );
  }, [searchQuery, articles]);
  
  // Get popular articles
  const popularArticles = articles.filter((article) => article.popular);
  
  // Group articles by category
  const articlesByCategory = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      articles: filteredArticles.filter((article) => article.category === category.id),
    }));
  }, [categories, filteredArticles]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header theme="dark" />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            How can we <span className="text-red-500">help you?</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Search our knowledge base for answers to common questions and detailed guides.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-gray-800/50 border-gray-700 focus:border-red-500 focus:ring-red-500 rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Popular Articles Section */}
      {!searchQuery && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Star className="text-red-500 w-8 h-8" />
                Popular Articles
              </h2>
              <p className="text-gray-400">Most helpful articles chosen by our community</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/support/article/${article.slug}`}>
                    <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 group">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                            {categories.find(cat => cat.id === article.category)?.name}
                          </Badge>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-red-500 transition-colors">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400 line-clamp-2">
                          {article.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{article.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles by Category or Search Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {searchQuery ? (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold mb-2">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-gray-400">
                  Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/support/article/${article.slug}`}>
                      <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 group">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                              {categories.find(cat => cat.id === article.category)?.name}
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                          </div>
                          <CardTitle className="text-xl group-hover:text-red-500 transition-colors">
                            {article.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 line-clamp-2">
                            {article.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{article.author.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-400 mb-4">No articles found matching your search.</p>
                  <p className="text-gray-500">Try different keywords or browse our categories below.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-16">
              {articlesByCategory.map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
                    <p className="text-gray-400">{category.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.articles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Link to={`/support/article/${article.slug}`}>
                          <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 group">
                            <CardHeader>
                              <div className="flex items-center justify-between mb-2">
                                {article.popular && (
                                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                    Popular
                                  </Badge>
                                )}
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors ml-auto" />
                              </div>
                              <CardTitle className="text-xl group-hover:text-red-500 transition-colors">
                                {article.title}
                              </CardTitle>
                              <CardDescription className="text-gray-400 line-clamp-2">
                                {article.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>{article.author.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{article.readTime}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer theme="dark" />
    </div>
  );
};

export default SupportPage;
