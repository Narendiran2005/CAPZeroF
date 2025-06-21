
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, ZoomIn, ZoomOut, Move3D } from 'lucide-react';

interface STLViewerProps {
  stlUrl: string;
  title?: string;
  className?: string;
}

const STLViewer = ({ stlUrl, title = "3D Model", className = "" }: STLViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Simple placeholder for STL viewer
    // In a real implementation, you would use Three.js with STL loader
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Set canvas size
      const container = containerRef.current;
      canvas.width = container.clientWidth;
      canvas.height = 400;

      // Draw placeholder content
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw a simple 3D-like wireframe cube as placeholder
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 2;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = 80;
      
      // Front face
      ctx.beginPath();
      ctx.rect(centerX - size, centerY - size, size * 2, size * 2);
      ctx.stroke();
      
      // Back face (offset)
      ctx.beginPath();
      ctx.rect(centerX - size + 20, centerY - size - 20, size * 2, size * 2);
      ctx.stroke();
      
      // Connect corners
      ctx.beginPath();
      ctx.moveTo(centerX - size, centerY - size);
      ctx.lineTo(centerX - size + 20, centerY - size - 20);
      ctx.moveTo(centerX + size, centerY - size);
      ctx.lineTo(centerX + size + 20, centerY - size - 20);
      ctx.moveTo(centerX - size, centerY + size);
      ctx.lineTo(centerX - size + 20, centerY + size - 20);
      ctx.moveTo(centerX + size, centerY + size);
      ctx.lineTo(centerX + size + 20, centerY + size - 20);
      ctx.stroke();
      
      // Add text
      ctx.fillStyle = '#374151';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('STL Model Preview', centerX, centerY + size + 40);
      ctx.font = '12px Arial';
      ctx.fillStyle = '#6b7280';
      ctx.fillText('(3D viewer integration needed)', centerX, centerY + size + 60);
    }
  }, [stlUrl]);

  const handleReset = () => {
    console.log('Reset view');
  };

  const handleZoomIn = () => {
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    console.log('Zoom out');
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleReset} title="Reset view">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleZoomIn} title="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleZoomOut} title="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="w-full">
          <canvas
            ref={canvasRef}
            className="w-full border rounded-lg bg-gray-50"
            style={{ height: '400px' }}
          />
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <Move3D className="h-4 w-4" />
          <span>Click and drag to rotate • Scroll to zoom</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default STLViewer;
