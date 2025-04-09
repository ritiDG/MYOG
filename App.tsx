import React, { useState, useRef } from 'react';
import { Play, Link2, Code, Upload, Gamepad2 } from 'lucide-react';
import Modal from './components/Modal';
import Button from './components/Button';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [gameName, setGameName] = useState('');
  const [gameUrl, setGameUrl] = useState('');
  const [selectedOption, setSelectedOption] = useState<'url' | 'code' | 'upload' | null>(null);
  const [codeInputs, setCodeInputs] = useState({
    html: '',
    css: '',
    javascript: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleCreateGame = () => {
    setIsModalOpen(true);
    setStep(0);
    setGameName('');
    setGameUrl('');
    setCodeInputs({ html: '', css: '', javascript: '' });
    setUploadedFiles([]);
    setSelectedOption(null);
  };

  const handleContinue = () => {
    if (gameName.trim()) {
      setStep(1);
    }
  };

  const handleOptionSelect = (option: 'url' | 'code' | 'upload') => {
    setSelectedOption(option);
    setStep(2);
  };

  const handleCodeChange = (language: keyof typeof codeInputs, value: string) => {
    setCodeInputs(prev => ({
      ...prev,
      [language]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(files);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles(files);
  };

  const isCodeValid = () => {
    return Object.values(codeInputs).some(code => code.trim() !== '');
  };

  const handleSubmit = () => {
    if (selectedOption === 'url' && gameUrl.trim()) {
      console.log('Submitting game with URL:', { name: gameName, url: gameUrl });
      setIsModalOpen(false);
    } else if (selectedOption === 'code' && isCodeValid()) {
      console.log('Submitting game with code:', { name: gameName, code: codeInputs });
      setIsModalOpen(false);
    } else if (selectedOption === 'upload' && uploadedFiles.length > 0) {
      console.log('Submitting game with files:', { name: gameName, files: uploadedFiles });
      setIsModalOpen(false);
    }
  };

  const renderModalContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6 pixel-border">
            <h2 className="text-2xl font-bold text-white mb-4 retro-text">Name Your Game</h2>
            <input
              type="text"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Enter your game name..."
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-[#00ff00] focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] focus:ring-opacity-50 transition-all duration-200 text-[#00ff00] placeholder-gray-500 retro-input"
              onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
            />
            <Button 
              onClick={handleContinue}
              disabled={!gameName.trim()}
              className="w-full retro-button"
            >
              Continue
            </Button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 pixel-border">
            <h2 className="text-2xl font-bold text-white mb-4 retro-text">Choose Your Option</h2>
            <div className="grid grid-cols-1 gap-4">
              <Button onClick={() => handleOptionSelect('url')} variant="outline" className="retro-button">
                <Link2 className="w-5 h-5 mr-2" />
                Insert URL Link
              </Button>
              <Button onClick={() => handleOptionSelect('code')} variant="outline" className="retro-button">
                <Code className="w-5 h-5 mr-2" />
                Code
              </Button>
              <Button onClick={() => handleOptionSelect('upload')} variant="outline" className="retro-button">
                <Upload className="w-5 h-5 mr-2" />
                Upload Files
              </Button>
            </div>
          </div>
        );
      case 2:
        if (selectedOption === 'url') {
          return (
            <div className="space-y-6 pixel-border">
              <h2 className="text-2xl font-bold text-white mb-4 retro-text">Enter Game URL</h2>
              <textarea
                value={gameUrl}
                onChange={(e) => setGameUrl(e.target.value)}
                placeholder="Enter game URL..."
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-[#00ff00] focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] focus:ring-opacity-50 transition-all duration-200 text-[#00ff00] placeholder-gray-500 min-h-[150px] retro-input"
              />
              <div className="flex gap-4">
                <Button 
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 retro-button"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!gameUrl.trim()}
                  className="flex-1 retro-button"
                >
                  Submit
                </Button>
              </div>
            </div>
          );
        } else if (selectedOption === 'code') {
          return (
            <div className="space-y-6 pixel-border">
              <h2 className="text-2xl font-bold text-white mb-4 retro-text">Enter Game Code</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#00ff00] mb-2 retro-text">HTML</label>
                  <textarea
                    value={codeInputs.html}
                    onChange={(e) => handleCodeChange('html', e.target.value)}
                    placeholder="Enter HTML code..."
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-[#00ff00] focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] focus:ring-opacity-50 transition-all duration-200 text-[#00ff00] placeholder-gray-500 min-h-[120px] font-mono retro-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#00ff00] mb-2 retro-text">CSS</label>
                  <textarea
                    value={codeInputs.css}
                    onChange={(e) => handleCodeChange('css', e.target.value)}
                    placeholder="Enter CSS code..."
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-[#00ff00] focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] focus:ring-opacity-50 transition-all duration-200 text-[#00ff00] placeholder-gray-500 min-h-[120px] font-mono retro-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#00ff00] mb-2 retro-text">JavaScript</label>
                  <textarea
                    value={codeInputs.javascript}
                    onChange={(e) => handleCodeChange('javascript', e.target.value)}
                    placeholder="Enter JavaScript code..."
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-[#00ff00] focus:border-[#00ff00] focus:ring-2 focus:ring-[#00ff00] focus:ring-opacity-50 transition-all duration-200 text-[#00ff00] placeholder-gray-500 min-h-[120px] font-mono retro-input"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 retro-button"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!isCodeValid()}
                  className="flex-1 retro-button"
                >
                  Submit
                </Button>
              </div>
            </div>
          );
        } else if (selectedOption === 'upload') {
          return (
            <div className="space-y-6 pixel-border">
              <h2 className="text-2xl font-bold text-white mb-4 retro-text">Upload Game Files</h2>
              <div
                className="w-full min-h-[200px] border-2 border-dashed border-[#00ff00] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#00ff99] transition-colors duration-200"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-[#00ff00] mb-4" />
                <p className="text-[#00ff00] text-center retro-text">
                  Drag and drop your files here<br />or click to select files
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                />
              </div>
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[#00ff00] retro-text">Uploaded Files:</p>
                  <ul className="list-disc list-inside text-[#00ff00]">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="retro-text">{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-4">
                <Button 
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 retro-button"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={uploadedFiles.length === 0}
                  className="flex-1 retro-button"
                >
                  Submit
                </Button>
              </div>
            </div>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZmYwMDEwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="animate-pulse-slow absolute top-1/4 left-1/4 w-2 h-2 bg-[#00ff00] rounded-full"></div>
          <div className="animate-pulse-slow absolute top-3/4 right-1/4 w-2 h-2 bg-[#00ff00] rounded-full"></div>
          <div className="animate-pulse-slow absolute top-1/2 left-1/2 w-2 h-2 bg-[#00ff00] rounded-full"></div>
        </div>
        
        <div className="text-center space-y-8">
          <Gamepad2 className="w-24 h-24 text-[#00ff00] mx-auto animate-float" />
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-[#00ff00] retro-text glow-text">
            Game Creator
          </h1>
          <p className="text-[#00ff00] text-xl mb-12 text-center max-w-2xl retro-text">
            Create and share your games with just a few clicks. Start your journey now.
          </p>
          <Button onClick={handleCreateGame} className="retro-button">
            <Play className="w-5 h-5 mr-2" />
            Create a Game
          </Button>
        </div>
      </div>

      {/* Game Creation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {renderModalContent()}
      </Modal>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .retro-text {
          font-family: 'Press Start 2P', monospace;
          text-shadow: 0 0 5px #00ff00;
        }

        .glow-text {
          text-shadow: 0 0 10px #00ff00, 0 0 15px #00ff00;
        }

        .pixel-border {
          border: 4px solid #00ff00;
          box-shadow: 0 0 5px #00ff00;
          padding: 20px;
          border-radius: 4px;
        }

        .retro-button {
          border: 2px solid #00ff00 !important;
          color: #00ff00 !important;
          text-shadow: 0 0 3px #00ff00 !important;
          transition: all 0.3s ease !important;
        }

        .retro-button:hover:not(:disabled) {
          background: #00ff0010 !important;
          box-shadow: 0 0 5px #00ff00 !important;
        }

        .retro-input {
          font-family: 'Share Tech Mono', monospace;
          text-shadow: 0 0 3px #00ff00;
        }

        .retro-input::placeholder {
          color: #00ff0080;
        }
      `}</style>
    </div>
  );
}

export default App;