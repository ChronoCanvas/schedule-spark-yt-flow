
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

          {/* Right Column - Mobile Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-3xl shadow-2xl">
                <img
                  src="/public/lovable-uploads/78296343-29d6-4141-a8ff-28b5730a0c66.png"
                  alt="Mobile Analytics Dashboard"
                  className="w-64 h-auto rounded-2xl"
                />
              </div>
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-blue-500 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
