import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Video, DEMO_VIDEOS } from '../data/videos';

interface VideoContextType {
  videos: Video[];
  addVideo: (video: Omit<Video, 'id'>) => void;
  deleteVideo: (id: string) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  // Load videos from LocalStorage, or fallback to DEMO_VIDEOS
  const [videos, setVideos] = useState<Video[]>(() => {
    const savedVideos = localStorage.getItem('somcorex_videos');
    if (savedVideos) {
      return JSON.parse(savedVideos);
    }
    return DEMO_VIDEOS;
  });

  // Save to LocalStorage whenever videos change
  useEffect(() => {
    localStorage.setItem('somcorex_videos', JSON.stringify(videos));
    // NOTE: In the future, this is where you would send data to Firebase/MongoDB
  }, [videos]);

  const addVideo = (videoData: Omit<Video, 'id'>) => {
    const newVideo: Video = { ...videoData, id: String(Date.now()) };
    setVideos(prev => [...prev, newVideo]);
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo, deleteVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
};
