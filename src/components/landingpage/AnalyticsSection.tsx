
const AnalyticsSection = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Intelligence,{" "}
              <span className="text-red-500">delivered to you.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              Transform your channel with AI-powered analytics that predict trends, 
              optimize performance, and unlock growth opportunities. Get actionable 
              insights delivered right to your mobile device.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Real-time performance tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Subscriber growth analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Video engagement insights</span>
              </div>
            </div>
          </div>

          {/* Right Column - Mockup Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/lovable-uploads/350c5369-04c9-40a2-b458-3adaaffbbeaf.png"
              alt="Mobile Analytics Dashboard"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
