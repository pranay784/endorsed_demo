import { useState } from 'react';
import {
  FileText,
  Mic,
  Lightbulb,
  Users,
  MessageSquare,
  BarChart3,
  Clock,
  CheckCircle,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Play
} from 'lucide-react';
import { Modal } from './components/Modal';
import { Nova } from './components/nova';
import { featureDetails, stepDetails, benefitDetails, techStackDetails, DetailedContent } from './data/content';

function App() {
  const [selectedContent, setSelectedContent] = useState<DetailedContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content: DetailedContent) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedContent(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <nav className="fixed top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <Star className="w-8 h-8 text-blue-600 fill-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Endorsed AI
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#features" className="hidden text-gray-600 transition-colors md:block hover:text-gray-900">
                Features
              </a>
              <a href="#how-it-works" className="hidden text-gray-600 transition-colors md:block hover:text-gray-900">
                How It Works
              </a>
              <button className="px-6 py-2 font-semibold text-white transition-all bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md">
                Get Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero-section" className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center animate-fadeInUp">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
              AI-Powered Recruitment Revolution
            </span>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Hiring Process
              </span>
            </h1>
            <p className="max-w-3xl mx-auto mb-10 text-xl leading-relaxed text-gray-600 md:text-2xl">
              Real-time AI candidate screening with live transcription, consistency analysis,
              and intelligent question generation. Make better hiring decisions faster.
            </p>

            <div className="flex flex-col justify-center gap-4 mb-16 sm:flex-row">
              <button className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 group">
                Start Screening Demo
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 transition-all bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 group">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo Video
              </button>
            </div>

            <div id="hero-stats" className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200">
              <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                <div className="transition-transform hover:scale-105">
                  <div className="mb-2 text-4xl font-bold text-blue-600">80%</div>
                  <div className="text-gray-600">Time Saved</div>
                </div>
                <div className="transition-transform hover:scale-105">
                  <div className="mb-2 text-4xl font-bold text-blue-600">95%</div>
                  <div className="text-gray-600">Accuracy Rate</div>
                </div>
                <div className="transition-transform hover:scale-105">
                  <div className="mb-2 text-4xl font-bold text-blue-600">50+</div>
                  <div className="text-gray-600">Hiring Teams</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-20 bg-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Powerful Features for Modern Recruitment
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Everything you need to conduct thorough, efficient, and fair candidate interviews
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FileText,
                color: 'text-blue-600 bg-blue-100',
                title: 'Smart Resume Parsing',
                description: 'AI-powered extraction of skills, experience, and qualifications from PDF/TXT resumes',
                key: 'resume-parsing',
                tourId: 'feature-resume-parsing'
              },
              {
                icon: Mic,
                color: 'text-green-600 bg-green-100',
                title: 'Real-Time Transcription',
                description: 'Live audio capture with OpenAI Whisper integration for accurate speech-to-text',
                key: 'real-time-transcription',
                tourId: 'feature-real-time-transcription'
              },
              {
                icon: Lightbulb,
                color: 'text-orange-600 bg-orange-100',
                title: 'AI Consistency Analysis',
                description: 'Cross-references interview responses with resume claims for authenticity scoring',
                key: 'consistency-analysis',
                tourId: 'feature-consistency-analysis'
              },
              {
                icon: Users,
                color: 'text-pink-600 bg-pink-100',
                title: 'Speaker Diarization',
                description: 'Automatically identifies and labels different speakers in conversations',
                key: 'speaker-diarization',
                tourId: 'feature-speaker-diarization'
              },
              {
                icon: MessageSquare,
                color: 'text-cyan-600 bg-cyan-100',
                title: 'Dynamic Questions',
                description: 'AI-generated follow-up questions based on resume gaps and conversation flow',
                key: 'dynamic-questions',
                tourId: 'feature-dynamic-questions'
              },
              {
                icon: BarChart3,
                color: 'text-teal-600 bg-teal-100',
                title: 'Live Analytics Dashboard',
                description: 'Real-time scoring, skill coverage tracking, and interview statistics',
                key: 'live-analytics',
                tourId: 'feature-live-analytics'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  id={feature.tourId}
                  onClick={() => openModal(featureDetails[feature.key])}
                  className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mb-3 text-gray-600 leading-relaxed">{feature.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:underline">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works-section" className="px-4 py-20 bg-gradient-to-b from-gray-50 to-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              How It Works
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Simple 6-step process from resume to hiring decision
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { number: '01', title: 'Resume Upload', desc: 'Upload candidate resume for AI-powered parsing and initial analysis', key: 'resume-upload', tourId: 'step-resume-upload' },
              { number: '02', title: 'Interview Setup', desc: 'Configure job requirements and start real-time screening session', key: 'interview-setup', tourId: 'step-interview-setup' },
              { number: '03', title: 'Live Recording', desc: 'Capture audio with automatic transcription and speaker identification', key: 'live-recording', tourId: 'step-live-recording' },
              { number: '04', title: 'AI Analysis', desc: 'Real-time consistency checking and authenticity scoring', key: 'ai-analysis', tourId: 'step-ai-analysis' },
              { number: '05', title: 'Smart Questions', desc: 'AI suggests relevant follow-up questions based on conversation', key: 'smart-questions', tourId: 'step-smart-questions' },
              { number: '06', title: 'Final Report', desc: 'Comprehensive assessment with hiring recommendations', key: 'final-report', tourId: 'step-final-report' }
            ].map((step, index) => (
              <div
                key={index}
                id={step.tourId}
                onClick={() => openModal(stepDetails[step.key])}
                className="relative p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1 group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center mb-4 space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-lg font-bold text-white bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full shadow-md group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mb-3 text-gray-600 leading-relaxed">{step.desc}</p>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:underline">
                    See details
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits-section" className="px-4 py-20 bg-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Why Choose Endorsed AI?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Join leading companies using AI to revolutionize their hiring process
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { icon: Clock, title: 'Save Hours Per Interview', desc: 'Automated transcription and analysis reduces manual note-taking by 80%', key: 'save-time', color: 'text-blue-600 bg-blue-100', tourId: 'benefit-save-time' },
              { icon: CheckCircle, title: 'Improve Hiring Quality', desc: 'AI-powered consistency checking catches red flags and verifies claims', key: 'improve-quality', color: 'text-green-600 bg-green-100', tourId: 'benefit-improve-quality' },
              { icon: Shield, title: 'Reduce Bias', desc: 'Structured analysis focuses on skills and experience, not subjective impressions', key: 'reduce-bias', color: 'text-orange-600 bg-orange-100', tourId: 'benefit-reduce-bias' },
              { icon: Zap, title: 'Real-Time Insights', desc: 'Get instant feedback during interviews to adjust questioning strategy', key: 'real-time-insights', color: 'text-cyan-600 bg-cyan-100', tourId: 'benefit-real-time-insights' }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  id={benefit.tourId}
                  onClick={() => openModal(benefitDetails[benefit.key])}
                  className="p-8 transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div className={`inline-flex p-3 rounded-lg ${benefit.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="mb-4 text-gray-600 leading-relaxed">{benefit.desc}</p>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:underline">
                    Explore benefits
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tech-section" className="px-4 py-20 bg-gradient-to-b from-gray-50 to-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Built with Modern Technology
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Leveraging cutting-edge AI and real-time technologies for unparalleled performance
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            {[
              { name: 'OpenAI GPT-4', desc: 'Advanced AI Analysis', key: 'openai-gpt4' },
              { name: 'Whisper API', desc: 'Speech Recognition', key: 'whisper-api' },
              { name: 'WebRTC', desc: 'Real-time Audio', key: 'webrtc' },
              { name: 'Next.js 15', desc: 'Modern Framework', key: 'nextjs' },
              { name: 'PyTorch', desc: 'ML Processing', key: 'pytorch' },
              { name: 'Supabase', desc: 'Database & Auth', key: 'supabase' },
              { name: 'Speaker Diarization', desc: 'Voice Separation', key: 'speaker-diarization' },
              { name: 'Real-time Analytics', desc: 'Live Insights', key: 'real-time-analytics' }
            ].map((tech, index) => (
              <div
                key={index}
                onClick={() => openModal(techStackDetails[tech.key])}
                className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md hover:-translate-y-0.5 group"
              >
                <div className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{tech.name}</div>
                <div className="text-sm text-gray-600 mb-2">{tech.desc}</div>
                <div className="text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to learn more
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta-section" className="px-4 py-20 text-white bg-gradient-to-r from-blue-600 to-cyan-600 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Ready to Transform Your Hiring?
          </h2>
          <p className="mb-10 text-xl opacity-95">
            Join forward-thinking companies using AI to make better hiring decisions
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="px-8 py-4 text-lg font-semibold text-blue-600 transition-all bg-white shadow-lg rounded-xl hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5">
              Start Free Trial
            </button>
            <button className="px-8 py-4 text-lg font-semibold text-white transition-all border-2 border-white shadow-lg rounded-xl hover:bg-white hover:text-blue-600 hover:shadow-xl hover:-translate-y-0.5">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      <footer className="px-4 py-8 bg-white border-t border-gray-200 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center mb-4 space-x-2 md:mb-0">
              <Star className="w-6 h-6 text-blue-600 fill-blue-600" />
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Endorsed AI
              </span>
            </div>
            <div className="text-sm text-gray-600">
              2024 Endorsed AI. Transforming recruitment with artificial intelligence.
            </div>
          </div>
        </div>
      </footer>

      {selectedContent && (
        <Modal isOpen={isModalOpen} onClose={closeModal} content={selectedContent} />
      )}

      <Nova />
    </div>
  );
}

export default App;
