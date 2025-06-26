
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { Home, User, FileText, Mail, HelpCircle, Lock } from "lucide-react";

interface HeaderProps {
  theme?: "light" | "dark";
}

const Header = ({ theme = "light" }: HeaderProps) => {
  const isDark = theme === "dark";
  
  const tabs = [
    { title: "Home", icon: Home },
    { title: "About", icon: User },
    { title: "Pricing", icon: FileText },
    { title: "Contact", icon: Mail },
    { type: "separator" as const },
    { title: "Support", icon: HelpCircle },
    { title: "Privacy", icon: Lock },
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-20 w-full py-4 px-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center"
        >
          <div className={`text-2xl font-bold hover:opacity-80 transition-opacity ${isDark ? 'text-white' : 'text-blue-900'}`}>
            SPOTPLAN
          </div>
        </motion.div>

        {/* Right side with Navigation Menu and Login Button */}
        <div className="flex items-center gap-6">
          {/* Navigation Menu */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          >
            <ExpandableTabs 
              tabs={tabs} 
              theme={theme}
              className="hidden md:flex"
            />
          </motion.div>

          {/* Login Button */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Button 
              className="font-medium text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#2563eb' }}
            >
              Log in
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
