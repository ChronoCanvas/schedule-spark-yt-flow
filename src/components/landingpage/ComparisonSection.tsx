
import { Card, CardContent } from "@/components/ui/card";

const ComparisonSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Before vs After
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the transformation from traditional planning to smart, AI-powered travel experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold text-red-800 mb-2">Before</h3>
                  <ul className="text-red-700 space-y-2 text-left">
                    <li>• Hours of manual research</li>
                    <li>• Scattered information sources</li>
                    <li>• Overwhelming choices</li>
                    <li>• No personalization</li>
                    <li>• Time-consuming planning</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">After</h3>
                  <ul className="text-green-700 space-y-2 text-left">
                    <li>• AI-powered recommendations</li>
                    <li>• Personalized itineraries</li>
                    <li>• Smart budget optimization</li>
                    <li>• Real-time updates</li>
                    <li>• Effortless planning</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
