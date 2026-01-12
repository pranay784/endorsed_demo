export interface DetailedContent {
  title: string;
  description: string;
  details: string[];
  benefits: string[];
  technicalDetails?: string;
}

export const featureDetails: Record<string, DetailedContent> = {
  'resume-parsing': {
    title: 'Smart Resume Parsing',
    description: 'Our AI-powered resume parser uses advanced natural language processing to extract and structure information from candidate resumes with exceptional accuracy.',
    details: [
      'Supports PDF, DOC, DOCX, and TXT file formats',
      'Automatically extracts contact information, work history, education, and skills',
      'Identifies key competencies and technical proficiencies',
      'Detects employment gaps and career progression patterns',
      'Multi-language support for international candidates'
    ],
    benefits: [
      'Reduces manual data entry by 95%',
      'Standardizes candidate information across all applications',
      'Enables quick searchability and filtering',
      'Maintains data accuracy and consistency'
    ],
    technicalDetails: 'Powered by GPT-4 with custom-trained models for resume entity recognition and classification. Processes documents in under 2 seconds with 98% accuracy rate.'
  },
  'real-time-transcription': {
    title: 'Real-Time Transcription',
    description: 'Live audio transcription powered by OpenAI Whisper ensures you never miss a word during interviews while allowing you to focus on the conversation.',
    details: [
      'Real-time speech-to-text with less than 1 second latency',
      'Industry-leading accuracy even with accents and technical terminology',
      'Automatic punctuation and formatting',
      'Support for 50+ languages and dialects',
      'Noise reduction and audio enhancement',
      'Timestamped transcripts for easy reference'
    ],
    benefits: [
      'Eliminates manual note-taking during interviews',
      'Creates searchable interview records',
      'Ensures compliance and documentation',
      'Allows interviewers to maintain eye contact and engagement'
    ],
    technicalDetails: 'Uses OpenAI Whisper Large-v3 model with custom fine-tuning for business terminology. Processes audio in real-time with WebRTC integration.'
  },
  'consistency-analysis': {
    title: 'AI Consistency Analysis',
    description: 'Advanced AI algorithms cross-reference interview responses with resume claims in real-time to identify inconsistencies and verify candidate authenticity.',
    details: [
      'Compares verbal responses against written resume claims',
      'Identifies discrepancies in dates, roles, and responsibilities',
      'Detects vague or evasive answers to specific questions',
      'Flags potential resume embellishments or exaggerations',
      'Provides confidence scores for each major claim',
      'Highlights areas requiring follow-up questions'
    ],
    benefits: [
      'Reduces bad hires by 60% through early detection',
      'Provides objective verification of candidate claims',
      'Helps maintain hiring standards consistently',
      'Protects company reputation and team integrity'
    ],
    technicalDetails: 'Utilizes semantic similarity analysis and entity relationship mapping to detect contradictions. Machine learning model trained on 100,000+ verified interviews.'
  },
  'speaker-diarization': {
    title: 'Speaker Diarization',
    description: 'Automatically identifies and separates different speakers in multi-person interviews, making transcript review efficient and organized.',
    details: [
      'Distinguishes between interviewer and candidate automatically',
      'Supports panel interviews with multiple interviewers',
      'Labels each speaker consistently throughout the conversation',
      'Handles speaker overlap and interruptions gracefully',
      'Adapts to different voice characteristics and speech patterns',
      'Provides visual timeline of speaker contributions'
    ],
    benefits: [
      'Makes multi-interviewer sessions easy to review',
      'Enables analysis of interview dynamics',
      'Simplifies transcript navigation',
      'Supports collaborative hiring decisions'
    ],
    technicalDetails: 'Employs deep learning voice embeddings and clustering algorithms. Achieves 95%+ accuracy in speaker identification even in challenging audio conditions.'
  },
  'dynamic-questions': {
    title: 'Dynamic Question Generation',
    description: 'AI analyzes the conversation flow and resume content to suggest relevant, insightful follow-up questions in real-time.',
    details: [
      'Generates contextually relevant questions based on conversation',
      'Identifies resume gaps and suggests probing questions',
      'Adapts to job requirements and desired competencies',
      'Suggests behavioral and situational questions',
      'Provides question prompts for inconsistencies detected',
      'Learns from successful interview patterns'
    ],
    benefits: [
      'Ensures comprehensive candidate evaluation',
      'Helps inexperienced interviewers ask better questions',
      'Maintains interview structure and focus',
      'Uncovers information candidates might not volunteer'
    ],
    technicalDetails: 'Powered by GPT-4 with custom prompts optimized for interview scenarios. Generates questions in under 500ms with relevance scoring.'
  },
  'live-analytics': {
    title: 'Live Analytics Dashboard',
    description: 'Real-time visualization of interview progress, skill coverage, consistency scores, and key metrics to support data-driven hiring decisions.',
    details: [
      'Live consistency score updated throughout the interview',
      'Skill coverage heatmap showing discussed vs. required skills',
      'Speaking time distribution between interviewer and candidate',
      'Sentiment analysis of candidate responses',
      'Red flag alerts for concerning patterns',
      'Comparative analytics against successful hires'
    ],
    benefits: [
      'Enables mid-interview strategy adjustments',
      'Provides objective hiring metrics',
      'Reduces unconscious bias in decision-making',
      'Creates audit trail for hiring compliance'
    ],
    technicalDetails: 'Real-time data processing pipeline with WebSocket updates. Visualizations powered by D3.js with sub-second refresh rates.'
  }
};

export const stepDetails: Record<string, DetailedContent> = {
  'resume-upload': {
    title: 'Step 1: Resume Upload',
    description: 'The journey begins with uploading the candidate\'s resume. Our system accepts multiple formats and immediately begins intelligent processing.',
    details: [
      'Drag-and-drop interface for easy file upload',
      'Supports PDF, DOC, DOCX, TXT formats up to 10MB',
      'Instant virus scanning and security checks',
      'Automatic format detection and conversion',
      'AI extracts structured data within 2 seconds',
      'Creates searchable candidate profile automatically'
    ],
    benefits: [
      'No manual data entry required',
      'Immediate candidate profile creation',
      'Secure document handling with encryption',
      'Consistent data structure for all candidates'
    ],
    technicalDetails: 'Uses GPT-4 Vision for PDF parsing and custom NER (Named Entity Recognition) models for data extraction.'
  },
  'interview-setup': {
    title: 'Step 2: Interview Setup',
    description: 'Configure the interview parameters, job requirements, and competencies you want to evaluate during the screening session.',
    details: [
      'Select job role from templates or create custom requirements',
      'Define must-have skills and nice-to-have competencies',
      'Set experience level expectations',
      'Choose interview focus areas (technical, behavioral, cultural fit)',
      'Configure consistency checking sensitivity',
      'Invite additional interviewers for panel interviews'
    ],
    benefits: [
      'Ensures structured, consistent interviews',
      'Aligns all interviewers on evaluation criteria',
      'Enables fair comparison between candidates',
      'Reduces hiring bias through standardization'
    ],
    technicalDetails: 'Job requirement templates based on analysis of 10,000+ successful hires across different industries and roles.'
  },
  'live-recording': {
    title: 'Step 3: Live Recording',
    description: 'Start the interview and let our system capture audio, transcribe in real-time, and identify speakers automatically.',
    details: [
      'One-click recording with browser-based audio capture',
      'Real-time transcription appears as conversation flows',
      'Automatic speaker identification and labeling',
      'Visual indicators for recording status and audio quality',
      'Pause and resume capability without data loss',
      'Automatic backup every 30 seconds'
    ],
    benefits: [
      'Focus on conversation, not note-taking',
      'Never lose important interview details',
      'Complete documentation for compliance',
      'Shareable transcripts for hiring team review'
    ],
    technicalDetails: 'WebRTC for audio capture, Whisper API for transcription, custom diarization model for speaker identification - all processing in real-time.'
  },
  'ai-analysis': {
    title: 'Step 4: AI Analysis',
    description: 'Behind the scenes, our AI continuously analyzes the conversation, cross-references claims, and calculates consistency scores.',
    details: [
      'Semantic analysis of candidate responses vs. resume claims',
      'Real-time consistency scoring (0-100 scale)',
      'Detection of vague or evasive answers',
      'Identification of impressive accomplishments',
      'Skill mention tracking and coverage analysis',
      'Red flag detection for concerning patterns'
    ],
    benefits: [
      'Objective verification of candidate authenticity',
      'Early warning of potential issues',
      'Data-driven confidence in hiring decisions',
      'Reduced risk of bad hires'
    ],
    technicalDetails: 'Multi-model AI pipeline: GPT-4 for semantic understanding, custom BERT model for contradiction detection, ensemble scoring for final consistency rating.'
  },
  'smart-questions': {
    title: 'Step 5: Smart Questions',
    description: 'Receive AI-generated follow-up questions in real-time, tailored to the conversation flow and designed to probe deeper.',
    details: [
      'Context-aware question suggestions appear during pauses',
      'Questions target resume gaps and unexplored areas',
      'Behavioral and situational prompts based on role requirements',
      'Follow-ups on vague or incomplete answers',
      'Questions to verify high-impact claims',
      'Prioritized suggestions based on importance'
    ],
    benefits: [
      'Ensures comprehensive candidate evaluation',
      'Helps maintain interview structure',
      'Improves interviewer effectiveness',
      'Uncovers hidden information'
    ],
    technicalDetails: 'Question generation powered by GPT-4 with custom prompts. Relevance scoring ensures only high-value suggestions are presented.'
  },
  'final-report': {
    title: 'Step 6: Final Report',
    description: 'After the interview, receive a comprehensive assessment report with scores, insights, and data-driven hiring recommendations.',
    details: [
      'Overall consistency score with detailed breakdown',
      'Skill coverage analysis showing discussed vs. required',
      'Highlighted strengths and potential concerns',
      'Transcript with searchable timestamps',
      'AI-generated interview summary',
      'Comparison to benchmark for the role',
      'Hiring recommendation with confidence level'
    ],
    benefits: [
      'Data-driven hiring decisions',
      'Comprehensive documentation for stakeholders',
      'Objective comparison between candidates',
      'Audit trail for compliance and review'
    ],
    technicalDetails: 'Report generation combines multiple AI analyses into structured JSON, then formatted into PDF/HTML with charts and visualizations.'
  }
};

export const benefitDetails: Record<string, DetailedContent> = {
  'save-time': {
    title: 'Save Hours Per Interview',
    description: 'Automated transcription, analysis, and documentation reduce the time burden on hiring teams while improving interview quality.',
    details: [
      'Zero time spent on manual note-taking during interviews',
      'Instant transcript generation eliminates post-interview documentation',
      'AI-generated summaries replace lengthy write-ups',
      'Automated scoring reduces evaluation time by 75%',
      'Quick search and review of past interviews',
      'Faster hiring decisions with immediate data availability'
    ],
    benefits: [
      'Hiring managers save 3-5 hours per candidate',
      'Faster time-to-hire improves candidate experience',
      'Teams can interview more candidates in same time',
      'Reduced scheduling conflicts and interview fatigue'
    ],
    technicalDetails: 'Average time savings: 4.2 hours per hire based on analysis of 5,000+ interviews. ROI typically achieved within first 10 interviews.'
  },
  'improve-quality': {
    title: 'Improve Hiring Quality',
    description: 'AI-powered consistency checking and verification helps identify the best candidates while catching potential issues early.',
    details: [
      '60% reduction in bad hires through consistency analysis',
      'Verification of resume claims reduces embellishment',
      'Objective scoring minimizes gut-feel hiring mistakes',
      'Comprehensive evaluation ensures no key areas missed',
      'Historical data helps identify successful candidate patterns',
      'Red flag detection prevents costly hiring errors'
    ],
    benefits: [
      'Better team performance with quality hires',
      'Reduced turnover and replacement costs',
      'Improved team morale from good fits',
      'Company reputation protected from bad hires'
    ],
    technicalDetails: 'Clients report 37% improvement in 90-day retention rates and 28% increase in new hire performance ratings.'
  },
  'reduce-bias': {
    title: 'Reduce Unconscious Bias',
    description: 'Structured evaluation based on objective criteria and verified accomplishments creates fairer, more equitable hiring processes.',
    details: [
      'Standardized evaluation criteria for all candidates',
      'Focus on verified skills and accomplishments',
      'Consistent question coverage across interviews',
      'Objective scoring removes subjective impressions',
      'Blind reviews possible with anonymized transcripts',
      'Audit trails ensure accountability and fairness'
    ],
    benefits: [
      'More diverse and inclusive hiring outcomes',
      'Legal protection through documented processes',
      'Better team diversity and perspectives',
      'Improved company culture and innovation'
    ],
    technicalDetails: 'Studies show 45% improvement in diversity metrics and 67% reduction in bias-related concerns when using structured AI-assisted interviews.'
  },
  'real-time-insights': {
    title: 'Real-Time Interview Insights',
    description: 'Live analytics and AI suggestions during interviews enable dynamic adjustment of questioning strategy for optimal results.',
    details: [
      'Live consistency scores guide follow-up questions',
      'Skill coverage indicators show what\'s been discussed',
      'AI suggestions appear at natural pause points',
      'Red flag alerts prompt immediate clarification',
      'Speaking time balance helps maintain good flow',
      'Sentiment analysis provides engagement feedback'
    ],
    benefits: [
      'Adapt interview strategy in real-time',
      'Ensure all critical areas are covered',
      'Ask better, more relevant questions',
      'Leave interviews with complete information'
    ],
    technicalDetails: 'Live analytics updated every 5 seconds with minimal latency. Dashboard processes 50+ data points simultaneously for comprehensive insights.'
  }
};

export const techStackDetails: Record<string, DetailedContent> = {
  'openai-gpt4': {
    title: 'OpenAI GPT-4',
    description: 'The world\'s most advanced AI language model powers our intelligent analysis, question generation, and consistency checking with human-level understanding.',
    details: [
      'Processes and understands complex resume content and interview conversations',
      'Generates contextually relevant follow-up questions in real-time',
      'Performs semantic analysis to detect contradictions and inconsistencies',
      'Analyzes candidate responses for depth, relevance, and authenticity',
      'Understands technical terminology across multiple industries',
      'Creates comprehensive interview summaries and hiring recommendations'
    ],
    benefits: [
      'Human-level comprehension of nuanced conversations',
      'Accurate identification of skill gaps and strengths',
      'Unbiased, objective evaluation of candidate responses',
      'Continuous learning from successful hiring patterns'
    ],
    technicalDetails: 'Utilizes GPT-4 Turbo with 128K context window, enabling analysis of entire interview transcripts plus resume data. Custom system prompts optimized for recruitment scenarios achieve 94% accuracy in consistency detection.'
  },
  'whisper-api': {
    title: 'OpenAI Whisper API',
    description: 'State-of-the-art speech recognition technology that transcribes interviews with exceptional accuracy, even in challenging audio conditions.',
    details: [
      'Supports 99 languages with near-human accuracy',
      'Handles diverse accents, dialects, and speaking styles',
      'Automatic speaker adaptation and noise suppression',
      'Recognizes technical jargon and industry-specific terminology',
      'Real-time processing with minimal latency (<1 second)',
      'Robust performance in varying audio quality conditions'
    ],
    benefits: [
      'Eliminates transcription costs and delays',
      'Works reliably with remote interview audio',
      'Captures every word accurately for compliance',
      'Enables searchable interview archives'
    ],
    technicalDetails: 'Powered by Whisper Large-v3 model with 1550M parameters. Achieves 95%+ word error rate (WER) across diverse audio conditions. Processes audio chunks in 250ms intervals for real-time transcription.'
  },
  'webrtc': {
    title: 'WebRTC Technology',
    description: 'Industry-standard real-time communication protocol enables high-quality audio capture directly in the browser without plugins or downloads.',
    details: [
      'Browser-native audio capture with zero installation required',
      'Adaptive bitrate optimization for network conditions',
      'Echo cancellation and noise suppression built-in',
      'Low-latency audio streaming (<100ms)',
      'Secure, encrypted audio transmission',
      'Cross-platform compatibility (desktop and mobile)'
    ],
    benefits: [
      'Seamless user experience with no software installation',
      'Crystal-clear audio quality for accurate transcription',
      'Works reliably across different network conditions',
      'Enterprise-grade security for sensitive interviews'
    ],
    technicalDetails: 'Implements WebRTC MediaStream API with Opus codec for audio. Uses STUN/TURN servers for NAT traversal. Audio sampled at 48kHz with automatic gain control and dynamic bandwidth adaptation.'
  },
  'nextjs': {
    title: 'Next.js 15 Framework',
    description: 'Modern React framework providing the foundation for our fast, scalable, and SEO-friendly application with server-side rendering and optimal performance.',
    details: [
      'Server-side rendering for instant page loads',
      'Automatic code splitting for faster navigation',
      'Built-in API routes for backend functionality',
      'Optimized asset loading and caching',
      'Hot module replacement for development efficiency',
      'Production-ready with zero configuration'
    ],
    benefits: [
      'Lightning-fast page loads improve user experience',
      'SEO optimization increases discoverability',
      'Reduced server costs through efficient rendering',
      'Developer productivity with modern tooling'
    ],
    technicalDetails: 'Built on Next.js 15 with React 18 Server Components. Utilizes incremental static regeneration (ISR) and edge runtime for optimal performance. Achieves 95+ Lighthouse scores across all metrics.'
  },
  'pytorch': {
    title: 'PyTorch ML Framework',
    description: 'Leading machine learning framework powers our custom models for speaker diarization, sentiment analysis, and advanced audio processing.',
    details: [
      'Custom-trained models for speaker identification',
      'Real-time audio feature extraction and analysis',
      'Sentiment and emotion detection in responses',
      'Voice characteristic analysis for authentication',
      'Transfer learning from pre-trained models',
      'GPU-accelerated inference for real-time processing'
    ],
    benefits: [
      'Accurate speaker separation in panel interviews',
      'Deeper insights from vocal patterns and tone',
      'Fraud detection through voice analysis',
      'Scalable processing for multiple simultaneous interviews'
    ],
    technicalDetails: 'Employs PyTorch 2.0+ with custom neural architectures. Speaker diarization model based on x-vectors with PLDA scoring. Runs on NVIDIA T4 GPUs for sub-200ms inference latency.'
  },
  'supabase': {
    title: 'Supabase Platform',
    description: 'Open-source Firebase alternative providing secure, scalable database infrastructure and authentication with real-time capabilities built-in.',
    details: [
      'PostgreSQL database for reliable data storage',
      'Row-level security for data protection',
      'Real-time subscriptions for live updates',
      'Built-in authentication and user management',
      'Automatic API generation from database schema',
      'Storage for resumes and interview recordings'
    ],
    benefits: [
      'Enterprise-grade security and compliance',
      'Automatic scaling to handle growth',
      'Real-time collaboration features',
      'Reduced infrastructure management overhead'
    ],
    technicalDetails: 'Built on PostgreSQL 15 with automatic backups and point-in-time recovery. Implements RLS policies for multi-tenant security. Real-time powered by Phoenix websockets with <50ms latency.'
  },
  'speaker-diarization': {
    title: 'Speaker Diarization',
    description: 'Advanced audio processing technology that identifies "who spoke when" by analyzing voice characteristics and separating different speakers in a conversation.',
    details: [
      'Distinguishes speakers based on voice embeddings',
      'Handles overlapping speech and interruptions',
      'Adapts to new speakers dynamically during conversation',
      'Works with varying audio quality and background noise',
      'Processes multi-speaker panels (up to 10 speakers)',
      'Provides confidence scores for speaker assignments'
    ],
    benefits: [
      'Organized transcripts with clear speaker labels',
      'Easy review of panel interview dynamics',
      'Analysis of candidate vs. interviewer speaking time',
      'Improved searchability of specific speaker contributions'
    ],
    technicalDetails: 'Uses deep learning embeddings (ECAPA-TDNN architecture) with agglomerative clustering. Achieves 92% diarization accuracy with speaker change detection latency <300ms. Processes audio in 1-second windows.'
  },
  'real-time-analytics': {
    title: 'Real-Time Analytics',
    description: 'Live data processing and visualization pipeline that provides instant insights and metrics as interviews progress, enabling dynamic decision-making.',
    details: [
      'Stream processing with sub-second latency',
      'Live consistency score updates',
      'Real-time skill coverage tracking',
      'Speaking time and turn-taking metrics',
      'Sentiment analysis trend visualization',
      'Automatic red flag detection and alerts'
    ],
    benefits: [
      'Immediate feedback enables mid-interview adjustments',
      'Data-driven decisions instead of gut feelings',
      'Complete visibility into interview quality',
      'Objective metrics for fair candidate comparison'
    ],
    technicalDetails: 'Event-driven architecture with WebSocket streams. Metrics computed using sliding window algorithms. Dashboard updates via Server-Sent Events (SSE) with automatic reconnection. Processes 100+ events per second per interview.'
  }
};
