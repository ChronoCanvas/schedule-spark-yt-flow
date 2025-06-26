"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  type: "tab";
}

interface Separator {
  type: "separator";
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
  defaultSelected?: number | null;
  theme?: "light" | "dark";
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor,
  onChange,
  defaultSelected = null,
  theme = "dark",
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(defaultSelected);
  const outsideClickRef = React.useRef(null);

  React.useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
  };

  const isDark = theme === "dark";
  
  const defaultActiveColor = isDark ? "text-white" : "#ff0003";
  const finalActiveColor = activeColor || defaultActiveColor;

  const Separator = () => (
    <div 
      className={cn(
        "mx-1 h-[24px] w-[1.2px]",
        isDark ? "bg-gray-600" : "bg-gray-300"
      )} 
      aria-hidden="true" 
    />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border p-1 shadow-sm",
        isDark 
          ? "border-gray-600 bg-black/80 backdrop-blur-sm" 
          : "border-gray-200 bg-white/80 backdrop-blur-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const tabItem = tab as Tab;
        const Icon = tabItem.icon;
        
        return (
          <motion.button
            key={tabItem.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              selected === index
                ? cn(
                    isDark ? "bg-[#ff0003]/20 backdrop-blur-sm text-[#ff0003]" : "bg-[#ff0003]/10 text-[#ff0003]"
                  )
                : isDark 
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tabItem.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
