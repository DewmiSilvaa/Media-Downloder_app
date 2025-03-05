import React, { useState } from 'react';
import { Download, Youtube, Facebook, Instagram, MessageCircle, X, Mail, Globe, Phone, Loader2 } from 'lucide-react';
import axios from 'axios';
function App() {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'youtube' | 'facebook' | 'instagram'>('youtube');
  const [showHelp, setShowHelp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const platforms = {
    youtube: { name: 'YouTube', icon: Youtube, color: 'bg-red-500' },
    facebook: { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    instagram: { name: 'Instagram', icon: Instagram, color: 'bg-pink-600' }
  };

  const faqs = [
    {
      question: "How do I download a video?",
      answer: "Simply paste the video URL from your chosen platform (YouTube, Facebook, or Instagram) into the input field and click the Download button."
    },
    {
      question: "What video quality can I download?",
      answer: "We support downloading videos in various qualities up to the highest available resolution on the platform."
    },
    {
      question: "Is there a limit to how many videos I can download?",
      answer: "There are no strict limits, but we recommend reasonable use to ensure service availability for all users."
    },
    {
      question: "Why isn't my download starting?",
      answer: "Please ensure you've entered a valid URL. Some videos might be private or restricted, which prevents downloading."
    }
  ];

  const handleDownload = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/download', {
        url,
        platform: activeTab
      });

      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = response.data.downloadUrl;
      link.download = `${response.data.title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to download video. Please check the URL and try again.');
      console.error('Download error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (

    
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Media Downloader</h1>
            <p className="text-gray-400">Download your favorite content in high quality</p>
          </div>

          {/* Platform Tabs */}
          <div className="flex justify-center space-x-4 mb-8">
            {Object.entries(platforms).map(([key, { name, icon: Icon, color }]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as 'youtube' | 'facebook' | 'instagram')}
                className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                  activeTab === key
                    ? `${color} shadow-lg`
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {name}
              </button>
            ))}
          </div>

          {/* URL Input */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={`Enter ${platforms[activeTab].name} URL here...`}
                className="flex-1 px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleDownload}
                disabled={loading}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Download className="w-5 h-5 mr-2" />
                )}
                {loading ? 'Processing...' : 'Download'}
              </button>
            </div>
            {error && (
              <div className="mt-4 text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'High Quality', desc: 'Download in best available quality' },
              { title: 'Fast Download', desc: 'Quick and efficient processing' },
              { title: 'Easy to Use', desc: 'Simple and intuitive interface' }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Support Section */}
          <div className="mt-12 text-center">
            <button 
              onClick={() => setShowHelp(true)}
              className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Need Help?
            </button>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Help Center</h2>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* FAQs Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <div className="grid gap-4">
                  <a href="mailto:support@mediadownloader.com" className="flex items-center gap-3 bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>support@mediadownloader.com</span>
                  </a>
                  <a href="https://mediadownloader.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                    <Globe className="w-5 h-5" />
                    <span>Visit our website</span>
                  </a>
                  <div className="flex items-center gap-3 bg-gray-700 p-4 rounded-lg">
                    <Phone className="w-5 h-5" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default App;