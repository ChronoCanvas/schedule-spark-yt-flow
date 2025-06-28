
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bold, FileDown } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder
}) => {
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log('Exporting to PDF:', value);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            <Bold className="w-3 h-3" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportPDF}
          className="border-gray-700 text-white hover:bg-gray-800"
        >
          <FileDown className="w-3 h-3 mr-1" />
          Export PDF
        </Button>
      </div>
      
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 min-h-[300px] resize-none font-mono"
      />
      
      <p className="text-xs text-gray-500">
        Select text and use toolbar for formatting. Export as PDF when ready.
      </p>
    </div>
  );
};

export default RichTextEditor;
