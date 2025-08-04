"use client";

import { useRef, useEffect, useState } from 'react';

interface VideoBackgroundSmoothProps {
  className?: string;
}

export function VideoBackgroundSmooth({ className = "" }: VideoBackgroundSmoothProps) {
  const [currentVideo, setCurrentVideo] = useState('/video_1.mp4');
  const [nextVideo, setNextVideo] = useState('');
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoStatus, setVideoStatus] = useState({
    loaded: false,
    playing: false,
    error: null as string | null
  });

  // Define video sections with their corresponding videos
  const videoSections = [
    { selector: 'section[data-section="hero"]', videoSrc: '/video_1.mp4', name: 'Hero' },
    { selector: 'section[data-section="how-it-works"]', videoSrc: '/video_2.mp4', name: 'How It Works' },
    { selector: 'section[data-section="testimonials"]', videoSrc: '/video_3.mp4', name: 'Testimonials' },
    { selector: 'section[data-section="faq"]', videoSrc: '/video_4.mp4', name: 'FAQ' },
    { selector: 'section[data-section="contact"]', videoSrc: '/video_2.mp4', name: 'Contact' }
  ];

  // Function to switch videos smoothly
  const switchToVideo = (newVideoSrc: string) => {
    if (newVideoSrc === currentVideo) return;

    console.log(`Switching from ${currentVideo} to ${newVideoSrc}`);
    
    // If already transitioning, update the target video
    if (isTransitioning) {
      setNextVideo(newVideoSrc);
      return;
    }
    
    setIsTransitioning(true);
    setNextVideo(newVideoSrc);
  };

  // Handle smooth transition between videos
  useEffect(() => {
    if (!nextVideo || !isTransitioning) return;

    const nextVideoEl = nextVideoRef.current;
    const currentVideoEl = currentVideoRef.current;

    if (!nextVideoEl || !currentVideoEl) return;

    // Load and prepare the next video
    nextVideoEl.src = nextVideo;
    nextVideoEl.muted = true;
    nextVideoEl.volume = 0;
    
    const handleNextVideoReady = () => {
      nextVideoEl.play().then(() => {
        // Fade in next video, fade out current
        nextVideoEl.style.opacity = '1';
        currentVideoEl.style.opacity = '0';
        
        // After transition, swap the videos
        setTimeout(() => {
          setCurrentVideo(nextVideo);
          setNextVideo('');
          setIsTransitioning(false);
          
          // Reset opacity
          currentVideoEl.style.opacity = '1';
          nextVideoEl.style.opacity = '0';
          
          // Update current video source
          currentVideoEl.src = nextVideo;
          currentVideoEl.load();
        }, 1000); // 1 second transition
      });
    };

    nextVideoEl.addEventListener('canplay', handleNextVideoReady, { once: true });
    nextVideoEl.load();

    return () => {
      nextVideoEl.removeEventListener('canplay', handleNextVideoReady);
    };
  }, [nextVideo, isTransitioning, currentVideo]);

  // Set up intersection observer for all sections
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoSections.forEach(section => {
      const element = document.querySelector(section.selector);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                switchToVideo(section.videoSrc);
              }
            });
          },
          { 
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
          }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []); // Remove dependencies to prevent unnecessary re-registering of observers

  // Initialize current video
  useEffect(() => {
    const video = currentVideoRef.current;
    if (!video) return;

    const updateStatus = () => {
      setVideoStatus({
        loaded: video.readyState >= 2,
        playing: !video.paused,
        error: video.error?.message || null
      });
    };

    const handleLoadedData = () => {
      console.log('Current video loaded, attempting play...');
      updateStatus();
      video.play().then(() => {
        console.log('Current video playing successfully');
        updateStatus();
      }).catch(err => {
        console.error('Play failed:', err);
        updateStatus();
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', updateStatus);
    video.addEventListener('pause', updateStatus);
    video.addEventListener('error', updateStatus);

    video.muted = true;
    video.volume = 0;
    video.src = currentVideo;
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', updateStatus);
      video.removeEventListener('pause', updateStatus);
      video.removeEventListener('error', updateStatus);
    };
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden ${className}`} style={{ zIndex: -10 }}>
      {/* Current video element */}
      <video
        ref={currentVideoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        style={{ 
          zIndex: 1,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <source src={currentVideo} type="video/mp4" />
        Your browser does not support video.
      </video>

      {/* Next video element for smooth transitions */}
      <video
        ref={nextVideoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        style={{ 
          zIndex: 2,
          opacity: 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        {nextVideo && <source src={nextVideo} type="video/mp4" />}
        Your browser does not support video.
      </video>

      {/* Loading fallback */}
      {!videoStatus.loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading video background...</p>
          </div>
        </div>
      )}

      {/* Debug overlay - shows current video and transition status */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded z-50 font-mono text-sm">
          <h3 className="font-bold mb-2">Video Debug:</h3>
          <div>Current: {currentVideo}</div>
          <div>Next: {nextVideo || 'None'}</div>
          <div>Transitioning: {isTransitioning ? '✅' : '❌'}</div>
          <div>Loaded: {videoStatus.loaded ? '✅' : '❌'}</div>
          <div>Playing: {videoStatus.playing ? '✅' : '❌'}</div>
          {videoStatus.error && <div className="text-red-300">Error: {videoStatus.error}</div>}
        </div>
      )}
    </div>
  );
}