'use client';

import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeGeneratorProps {
  url: string;
}

export default function QRCodeGenerator({ url }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center gap-4 text-center">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
          QR Code
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Scan with your phone camera to open the link
        </p>
      </div>

      {/* QR Code Frame */}
      <div 
        ref={canvasRef} 
        className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center transition-all"
      >
        {url ? (
          <QRCodeCanvas
            value={url}
            size={140}
            level="H"
            marginSize={1}
          />
        ) : (
          <div className="w-[140px] h-[140px] flex items-center justify-center text-xs text-slate-400 italic">
            No URL provided
          </div>
        )}
      </div>

      {/* Download Action */}
      {url && (
        <button
          onClick={downloadQRCode}
          type="button"
          className="w-full py-2 px-4 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-xs transition-colors dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
        >
          Download PNG
        </button>
      )}
    </div>
  );
}