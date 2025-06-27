
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

const MarqueeSection = () => {
  return (
    <div className="w-full py-20 bg-white">
      <VelocityScroll
        text="Plan → Publish → Analyze → Repeat"
        default_velocity={3}
        className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-6xl md:leading-[4rem]"
      />
    </div>
  );
};

export default MarqueeSection;
