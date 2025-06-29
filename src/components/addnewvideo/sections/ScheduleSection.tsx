
import React, { useState } from 'react';
import { Calendar, Clock, Upload, ExternalLink } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ScheduleSectionProps {
  scheduledDate: Date | null;
  scheduledTime: string;
  uploadNow: boolean;
  onScheduledDateChange: (date: Date | null) => void;
  onScheduledTimeChange: (time: string) => void;
  onUploadNowChange: (uploadNow: boolean) => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  scheduledDate,
  scheduledTime,
  uploadNow,
  onScheduledDateChange,
  onScheduledTimeChange,
  onUploadNowChange
}) => {
  const [timeHour, setTimeHour] = useState('12');
  const [timeMinute, setTimeMinute] = useState('00');
  const [timeAmPm, setTimeAmPm] = useState('PM');

  const handleTimeChange = (hour: string, minute: string, ampm: string) => {
    setTimeHour(hour);
    setTimeMinute(minute);
    setTimeAmPm(ampm);
    onScheduledTimeChange(`${hour}:${minute} ${ampm}`);
  };

  const handleUploadNow = () => {
    onUploadNowChange(true);
    console.log('Uploading now...');
  };

  const openYouTubeStudio = () => {
    window.open('https://studio.youtube.com', '_blank');
  };

  return (
    <GlowCard glowColor="red" customSize className="w-full p-6 mb-8">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-semibold text-white">Schedule or Upload</h2>
        </div>

        {/* Option A: Schedule Future Date & Time */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Option A: Schedule a Future Date & Time</h3>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Date Picker */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-gray-800 border-gray-600 text-white hover:bg-gray-700",
                      !scheduledDate && "text-gray-400"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-600" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={scheduledDate}
                    onSelect={onScheduledDateChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Picker */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Time</label>
              <div className="flex gap-2">
                <select
                  value={timeHour}
                  onChange={(e) => handleTimeChange(e.target.value, timeMinute, timeAmPm)}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const hour = i + 1;
                    return (
                      <option key={hour} value={hour.toString().padStart(2, '0')}>
                        {hour.toString().padStart(2, '0')}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={timeMinute}
                  onChange={(e) => handleTimeChange(timeHour, e.target.value, timeAmPm)}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i.toString().padStart(2, '0')}>
                      {i.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select
                  value={timeAmPm}
                  onChange={(e) => handleTimeChange(timeHour, timeMinute, e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          {scheduledDate && scheduledTime && (
            <p className="text-sm text-gray-400">
              📧 Email and push notifications will be sent at the scheduled time
            </p>
          )}
        </div>

        {/* Option B: Upload Now */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Option B: Upload Now</h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <GlowButton
              glowColor="green"
              leftIcon={<Upload className="w-4 h-4" />}
              onClick={handleUploadNow}
              className="bg-green-600 hover:bg-green-700 rounded-lg px-6 h-10"
            >
              Upload Now
            </GlowButton>

            <GlowButton
              glowColor="blue"
              leftIcon={<ExternalLink className="w-4 h-4" />}
              onClick={openYouTubeStudio}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6 h-10"
            >
              Open in YouTube Studio
            </GlowButton>
          </div>
        </div>

        {/* Warning Alert */}
        <Alert className="bg-yellow-900/20 border-yellow-600 text-yellow-200">
          <AlertDescription>
            <strong>⚠️ Due to YouTube API limitations, direct uploads are restricted:</strong>
            <ul className="mt-2 ml-4 list-disc space-y-1 text-sm">
              <li>Monetization, ad controls, end screens & cards are not configurable</li>
              <li>Cannot apply age restrictions or manage comment settings</li>
              <li>No control over YouTube processing speeds</li>
            </ul>
            <p className="mt-2 font-medium">➡️ We recommend uploading via YouTube Studio when reminded.</p>
          </AlertDescription>
        </Alert>
      </div>
    </GlowCard>
  );
};

export default ScheduleSection;
