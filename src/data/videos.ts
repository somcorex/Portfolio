export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  duration: string;
  views: string;
  featured: boolean;
}

// Demo videos using free Pexels/public domain samples
export const DEMO_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Cinematic City Dreams',
    description: 'An ethereal journey through urban landscapes captured with cinematic precision.',
    thumbnail: 'https://images.pexels.com/videos/3045163/pictures/preview-0.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Cinematic',
    duration: '2:34',
    views: '12.4K',
    featured: true,
  },
  {
    id: '2',
    title: 'Ocean Serenity',
    description: 'Peaceful ocean waves shot in slow motion for a meditative experience.',
    thumbnail: 'https://images.pexels.com/videos/1409899/pictures/preview-0.jpg',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Nature',
    duration: '3:12',
    views: '8.7K',
    featured: true,
  },
  {
    id: '3',
    title: 'Urban Motion',
    description: 'High-energy editing capturing the pulse of modern city life.',
    thumbnail: 'https://images.pexels.com/videos/2387793/pictures/preview-0.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Commercial',
    duration: '1:48',
    views: '23.1K',
    featured: true,
  },
  {
    id: '4',
    title: 'Golden Hour',
    description: 'Breathtaking sunset sequences edited with warm cinematic grading.',
    thumbnail: 'https://images.pexels.com/videos/857251/pictures/preview-0.jpg',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Cinematic',
    duration: '4:05',
    views: '15.8K',
    featured: false,
  },
  {
    id: '5',
    title: 'Brand Story',
    description: 'Luxury brand narrative told through premium visual storytelling.',
    thumbnail: 'https://images.pexels.com/videos/3045163/pictures/preview-0.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Commercial',
    duration: '2:56',
    views: '9.3K',
    featured: false,
  },
  {
    id: '6',
    title: 'Dance & Motion',
    description: 'Dynamic dance performance captured with creative camera movements.',
    thumbnail: 'https://images.pexels.com/videos/1409899/pictures/preview-0.jpg',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Performance',
    duration: '3:30',
    views: '31.2K',
    featured: false,
  },
];

export const VIDEO_CATEGORIES = ['All', 'Cinematic', 'Commercial', 'Nature', 'Performance'];
