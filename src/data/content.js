import internshipsImg from '../assets/images/service-internships.jpg';
import expertInsightsImg from '../assets/images/service-expert-insights.jpg';
import placementsImg from '../assets/images/service-placements.jpg';
import mentorImg from '../assets/images/mentor-students.jpg';
import skylineImg from '../assets/images/skyline-hiker.jpg';

export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
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
};

export const ALLOW_MULTIPLE_OPEN = false;

export const YOUTUBE_LINKS = {
  internships: 'https://www.youtube.com/results?search_query=internship+skills+practical+learning',
  expertInsights: 'https://www.youtube.com/results?search_query=industry+expert+career+guidance',
  placements: 'https://www.youtube.com/results?search_query=campus+placement+interview+preparation',
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
      icon: 'Users',
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
      icon: 'Briefcase',
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
