import internshipsImg from '../assets/images/service-internships.jpg';
import expertInsightsImg from '../assets/images/service-expert-insights.jpg';
import placementsImg from '../assets/images/service-placements.jpg';
import mentorImg from '../assets/images/mentor-students.jpg';
import skylineImg from '../assets/images/skyline-hiker.jpg';
import guideGenerationImg from '../assets/images/story-guide-generation.png';
import changeMakersImg from '../assets/images/story-change-makers.png';

export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Our Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const LINKS = {
  joinInitiative: '#',
  internships: '#',
  expertInsights: '#',
  placements: '#',
};

export const HERO_CONTENT = {
  titlePrefix: 'From Confusion to',
  titleHighlight: 'Clarity',
  subtitle: 'One Platform. Real Experience. Right Guidance.',
  popupContent: {
    badge: 'About SLG Solutions',
    title: 'From Confusion to Clarity',
    tagline: 'One Platform. Real Experience. Right Guidance.',
    fullText:
      'SLG Solutions is a platform designed to bridge the gap between students and the real world by connecting young people, especially students and unemployed youth from small cities and towns, with experienced professionals, industry experts, educators, entrepreneurs, and career mentors. Many students have ambition and talent, but may not have access to the right career guidance, industry exposure, or practical knowledge needed to understand the changing world. SLG Solutions aims to bring valuable real-world knowledge onto one platform, covering areas such as technology, job competition, career opportunities, industry trends, workplace expectations, skill development, and effective learning techniques. By learning directly from the experiences, journeys, challenges, and insights of people who have already been through the professional world, students can gain better awareness, prepare themselves for changing opportunities, and make more informed career decisions. Our goal is to create a bridge between education and real-world experience, helping the next generation learn, understand, prepare, and grow with the right knowledge.',
    paragraphs: [
      'SLG Solutions is a platform designed to bridge the gap between students and the real world by connecting young people, especially students and unemployed youth from small cities and towns, with experienced professionals, industry experts, educators, entrepreneurs, and career mentors.',
      'Many students have ambition and talent, but may not have access to the right career guidance, industry exposure, or practical knowledge needed to understand the changing world. SLG Solutions aims to bring valuable real-world knowledge onto one platform, covering areas such as technology, job competition, career opportunities, industry trends, workplace expectations, skill development, and effective learning techniques.',
      'By learning directly from the experiences, journeys, challenges, and insights of people who have already been through the professional world, students can gain better awareness, prepare themselves for changing opportunities, and make more informed career decisions.',
    ],
    goalCallout:
      'Our goal is to create a bridge between education and real-world experience, helping the next generation learn, understand, prepare, and grow with the right knowledge.',
    focusAreas: [
      'Technology',
      'Job Competition',
      'Career Opportunities',
      'Industry Trends',
      'Workplace Expectations',
      'Skill Development',
      'Effective Learning Techniques',
    ],
    footerTagline: 'SLG Solutions — Connecting Experience with the Next Generation.',
  },
};

export const ALLOW_MULTIPLE_OPEN = false;

export const YOUTUBE_LINKS = {
  internships: 'https://www.youtube.com/results?search_query=internship+skills+practical+learning',
  expertInsights: 'https://www.youtube.com/results?search_query=industry+expert+career+guidance',
  placements: 'https://www.youtube.com/results?search_query=campus+placement+interview+preparation',
  shareStory: 'https://www.youtube.com/results?search_query=share+your+story+mentor+students+career+guidance',
};

export const SERVICES_CONTENT = {
  heading: 'Our Services',
  subheading: 'Practical Learning. Real Opportunities.',
  services: [
    {
      id: 'internships',
      title: 'Internships',
      description: 'Learn through real-world experience.',
      moreText:
        "Step into real projects guided by experienced mentors. You'll work with practical tools, solve real problems and build a portfolio that shows employers what you can actually do, not just what you've studied.",
      icon: 'GraduationCap',
      badgeBg: '#F97316',
      image: internshipsImg,
      alt: 'Student working on laptop during real-world internship',
      link: LINKS.internships,
      youtubeUrl: YOUTUBE_LINKS.internships,
    },
    {
      id: 'expert-insights',
      title: 'Expert Insights',
      description: 'Learn directly from industry professionals.',
      moreText:
        'Hear directly from professionals who have walked the path before you. Through talks and interactive sessions, they share honest career advice, industry trends and lessons that classrooms rarely cover, so you can choose your direction with clarity.',
      icon: 'Lightbulb',
      badgeBg: '#1E5BD8',
      image: expertInsightsImg,
      alt: 'Industry professional giving a presentation and keynote',
      link: LINKS.expertInsights,
      youtubeUrl: YOUTUBE_LINKS.expertInsights,
    },
    {
      id: 'placements',
      title: 'Placements',
      description: 'Connect talent with career opportunities.',
      moreText:
        'We connect skilled students with companies looking for fresh talent. From preparing you for opportunities to bringing you face to face with the right employers, we help turn your skills into a career you can be proud of.',
      icon: 'BriefcaseBusiness',
      badgeBg: '#16A34A',
      image: placementsImg,
      alt: 'Professionals shaking hands and discussing job placement',
      link: LINKS.placements,
      youtubeUrl: YOUTUBE_LINKS.placements,
    },
  ],
};

export const ABOUT_CONTENT = {
  heading: 'Share Your Story. Guide the Next Generation.',
  paragraph: 'Your experience can help students understand careers, opportunities and real-world challenges.',
  buttonText: 'JOIN THE INITIATIVE',
  buttonLink: LINKS.joinInitiative,
  youtubeUrl: YOUTUBE_LINKS.shareStory,
  extraContent: {
    guideGeneration: {
      title: 'Guide the Next Generation',
      subtitle: 'Share Your Story',
      image: guideGenerationImg,
      imageAlt: 'Mentor recording video session with laptop and guidance notes',
      paragraph:
        'If you are an expert, professional, educator, entrepreneur, or experienced individual, we invite you to share your journey and knowledge with students through SLG Solutions.',
      pillars: [
        'One conversation can create awareness.',
        'One experience can provide direction.',
        'One story can inspire a better future.',
      ],
      calloutTitle: 'Join Us for a Better Future',
      calloutSubtext: 'Share your story. Share your knowledge. Be part of the change.',
      footerTagline: 'SLG Solutions — Connecting Experience with the Next Generation.',
    },
    partOfTheChange: {
      title: 'Be Part of the Change',
      image: changeMakersImg,
      imageAlt: 'Professionals, Educators, Entrepreneurs, Industry Leaders and Experts inspiring students',
      guidingPrinciples: [
        "Your experience can become someone's guidance.",
        'Your story can inspire a young mind.',
        'Your knowledge can help shape a better tomorrow.',
      ],
      paragraphs: [
        'SLG Solutions is an open platform created to connect students and young people with experienced professionals, experts, educators, entrepreneurs, and industry leaders.',
        'Many students have talent and ambition, but they may not have access to the right guidance or real-world exposure. Sometimes, hearing directly from an experienced person can help them understand careers, opportunities, challenges, technology, education, and the changing world from a different perspective.',
        'That is why we invite you to be part of this initiative. Share your journey, experiences, knowledge, lessons, and valuable insights with the next generation. Your experience may answer a question a student has been searching for, help them explore a new opportunity, or simply give them the confidence to take the next step.',
      ],
    },
  },
  whyJoinHeading: 'Why Join Us?',
  benefits: [
    {
      icon: 'User',
      text: 'Share your professional journey',
      bgColor: '#E0ECFF',
      iconColor: '#1E5BD8',
    },
    {
      icon: 'Lightbulb',
      text: 'Guide students with practical insights',
      bgColor: '#FFE8D2',
      iconColor: '#EA580C',
    },
    {
      icon: 'Megaphone',
      text: 'Create awareness about emerging opportunities',
      bgColor: '#DDF5E3',
      iconColor: '#16A34A',
    },
    {
      icon: 'BookOpen',
      text: 'Share lessons from your journey',
      bgColor: '#ECE6FA',
      iconColor: '#7C3AED',
    },
    {
      icon: 'Users',
      text: 'Inspire the next generation',
      bgColor: '#D5F3EE',
      iconColor: '#0D9488',
    },
  ],
  scriptLines: ['Real People', 'Real Stories', 'Real Impact'],
  image: mentorImg,
  imageAlt: 'Mentor working with university students around study table',
};

export const CLOSING_CONTENT = {
  headingPart1: 'Your Experience Can Build ',
  headingPart2: 'Brighter Futures.',
  subtext: 'Join us in creating a better-informed generation.',
  image: skylineImg,
  imageAlt: 'Hiker standing on mountain overlooking sunset city skyline with upward trajectory',
};

export const TESTIMONIALS_CONTENT = {
  badge: 'Student & Mentor Voices',
  heading: 'Real Stories. Real Transformations.',
  subheading: 'See how practical guidance and real-world internships turn confusion into career clarity.',
  spotlight: {
    tag: 'Placement Success Story',
    tagColor: '#16A34A',
    name: 'Rahul Verma',
    role: 'Junior Cloud Engineer',
    college: 'B.Tech CSE Graduate',
    rating: 5,
    quote:
      'I was overwhelmed by online courses and lacked real project confidence. Through SLG Solutions, I worked on live cloud infrastructure with a senior mentor. In just 45 days, I gained the skills and interview clarity needed to crack my first tech placement!',
    fullQuote:
      'I was overwhelmed by online courses and lacked real project confidence. Through SLG Solutions, I worked on live cloud infrastructure with a senior mentor. In just 45 days, I gained the skills and interview clarity needed to crack my first tech placement!',
  },
  tickerReviews: [
    {
      id: 'review-1',
      name: 'Priya Nair',
      role: 'Final Year IT Student',
      college: 'B.Tech IT, 2025 Batch',
      tag: 'Internships',
      tagColor: '#F97316',
      quote:
        'The hands-on internship gave me actual project exposure that helped me stand out in campus placements.',
      fullQuote:
        'The hands-on internship at SLG Solutions gave me actual project exposure that classroom textbooks could never teach. Building real microservices and collaborating in team sprints helped me stand out during technical interviews and secure multiple placement offers.',
      rating: 5,
    },
    {
      id: 'review-2',
      name: 'Aditya Rao',
      role: 'Cloud DevOps Enthusiast',
      college: 'Computer Science & Engineering',
      tag: 'Expert Insights',
      tagColor: '#1E5BD8',
      quote:
        'Interacting directly with seasoned tech leaders during Expert Insights gave me absolute clarity on my cloud career path.',
      fullQuote:
        'Interacting directly with seasoned tech leaders during the Expert Insights sessions gave me absolute clarity on my career path. Instead of blindly learning random tools, I received honest advice on industry demands, real architectures, and how to build a career with confidence.',
      rating: 5,
    },
    {
      id: 'review-3',
      name: 'Vikramaditya S.',
      role: 'Senior Tech Lead & Industry Mentor',
      college: '10+ Years in Tech Leadership',
      tag: 'Mentor Initiative',
      tagColor: '#16A34A',
      quote:
        'As an industry mentor, guiding these enthusiastic students through SLG Solutions has been deeply rewarding.',
      fullQuote:
        'As an industry mentor, guiding these enthusiastic students through SLG Solutions has been one of the most rewarding experiences of my career. The platform bridges the divide between academia and enterprise needs, enabling eager learners to become competent professionals.',
      rating: 5,
    },
    {
      id: 'review-4',
      name: 'Sneha Patel',
      role: 'Software Engineer',
      college: 'B.Tech Graduate, Tech Placed',
      tag: 'Placements',
      tagColor: '#7C3AED',
      quote:
        'SLG helped bridge the gap between classroom theory and what companies actually test. Cracked my job placement with confidence!',
      fullQuote:
        'SLG Solutions helped bridge the gap between classroom theory and what modern tech companies actually test for. From mock coding rounds to resume refinement with senior professionals, I felt completely prepared and cracked my top-tier placement!',
      rating: 5,
    },
    {
      id: 'review-5',
      name: 'Manish Das',
      role: 'Full Stack Developer',
      college: 'Master of Computer Applications',
      tag: 'Practical Learning',
      tagColor: '#0D9488',
      quote:
        'The real-world projects we built directly matched interview questions. Truly from confusion to clarity!',
      fullQuote:
        'The real-world projects we built directly matched interview scenarios and system design questions. Working with live databases, authentication pipelines, and APIs transformed my resume. It truly took me from confusion to career clarity!',
      rating: 5,
    },
    {
      id: 'review-6',
      name: 'Prof. Sunita Jena',
      role: 'College Faculty Advisor',
      college: 'Department of Computer Science',
      tag: 'Academic Partner',
      tagColor: '#EA580C',
      quote:
        'Honest career discussions with experienced professionals helped our students avoid common early-career mistakes.',
      fullQuote:
        'Inviting SLG Solutions for interactive sessions with our students was a game-changer. The honest career discussions with experienced industry professionals answered real questions our curriculum rarely addresses, preparing our batch for real-world transitions.',
      rating: 5,
    },
  ],
};

export const CONTACT_CONTENT = {
  badge: 'Get in Touch',
  heading: "Let's Connect &",
  highlight: 'Start Your Journey',
  subtitle:
    "Whether you're a student looking for guidance or a professional wanting to share your story, our team is here to support you every step of the way.",
  channels: [
    {
      id: 'email',
      title: 'Email Us Directly',
      value: 'contact@slgsolutions.in',
      link: 'mailto:contact@slgsolutions.in',
      hint: 'Online response within 24 hours',
    },
    {
      id: 'phone',
      title: 'Call / WhatsApp',
      value: '+91 98613 41427',
      link: 'https://wa.me/919861341427',
      hint: 'Mon – Sat, 9:00 AM to 6:00 PM IST',
    },
    {
      id: 'location',
      title: 'Headquarters',
      value: 'Bhubaneswar, Odisha, India',
      link: 'https://maps.google.com/?q=Bhubaneswar,Odisha',
      hint: 'Serving students across India',
    },
  ],
  roles: [
    'Student / Job Seeker',
    'Professional / Industry Mentor',
    'College / Educational Institution',
    'Recruiter / Employer',
  ],
};

export const FOOTER_CONTENT = {
  tagline: 'One Platform. Real Experience. Right Guidance.',
  scriptNote: 'Connecting Experience with the Next Generation.',
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Our Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
  servicesLinks: [
    { label: 'Internships', href: '#services' },
    { label: 'Expert Insights', href: '#services' },
    { label: 'Placements', href: '#services' },
    { label: 'Share Your Story', href: '#about' },
  ],
  socials: [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@slgsolutions',
      label: 'Watch SLG Solutions on YouTube',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/slgsolutions',
      label: 'Connect with SLG Solutions on LinkedIn',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/slgsolutions',
      label: 'Follow SLG Solutions on Instagram',
    },
    {
      name: 'Email',
      url: 'mailto:contact@slgsolutions.in',
      label: 'Send email to SLG Solutions',
    },
  ],
  copyright: `© ${new Date().getFullYear()} SLG Solutions. All rights reserved.`,
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Code of Ethics', href: '#' },
  ],
};

