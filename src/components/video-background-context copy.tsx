"use client";

import { useRef, useEffect, useState } from 'react';

interface VideoBackgroundContextProps {
  className?: string;
}

export function VideoBackgroundContext({ className = "" }: VideoBackgroundContextProps) {
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

  // Set up intersection observer for all sections
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    let activeSection = '';

    // Find which section is most visible
    const findMostVisibleSection = () => {
      let maxRatio = 0;
      let mostVisibleSection = '';

      videoSections.forEach(section => {
        const element = document.querySelector(section.selector);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const ratio = visibleHeight / windowHeight;
          
          if (ratio > maxRatio && ratio > 0.3) { // Must be at least 30% visible
            maxRatio = ratio;
            mostVisibleSection = section.videoSrc;
          }
        }
      });

      return mostVisibleSection;
    };

    // Debounced video switch to prevent flickering
    let switchTimeout: NodeJS.Timeout;
    const debouncedVideoSwitch = (newVideo: string) => {
      clearTimeout(switchTimeout);
      switchTimeout = setTimeout(() => {
        if (newVideo && newVideo !== currentVideo && !isTransitioning) {
          console.log(`Switching to video: ${newVideo}`);
          setNextVideo(newVideo);
          setIsTransitioning(true);
        }
      }, 150); // 150ms debounce
    };

    const handleScroll = () => {
      const newVideo = findMostVisibleSection();
      if (newVideo) {
        debouncedVideoSwitch(newVideo);
      }
    };

    // Use scroll event instead of intersection observer for more precise control
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(switchTimeout);
    };
  }, []);

  // Handle video crossfade transitions
  useEffect(() => {
    if (!nextVideo || !isTransitioning) return;

    const nextVideoEl = nextVideoRef.current;
    const currentVideoEl = currentVideoRef.current;
    if (!nextVideoEl || !currentVideoEl) return;

    console.log(`Starting crossfade from ${currentVideo} to ${nextVideo}`);

    // Prepare next video
    nextVideoEl.src = nextVideo;
    nextVideoEl.muted = true;
    nextVideoEl.volume = 0;
    nextVideoEl.currentTime = 0;

    const handleNextVideoReady = () => {
      nextVideoEl.play().then(() => {
        // Start crossfade
        nextVideoEl.style.opacity = '1';
        
        // Complete transition after fade
        setTimeout(() => {
          setCurrentVideo(nextVideo);
          setNextVideo('');
          setIsTransitioning(false);
          nextVideoEl.style.opacity = '0';
          
          // Update current video source
          currentVideoEl.src = nextVideo;
          currentVideoEl.currentTime = 0;
          currentVideoEl.play();
        }, 800); // 800ms crossfade
      }).catch((err: any) => {
        console.error('Next video play failed:', err);
        setIsTransitioning(false);
        setNextVideo('');
      });
    };

    nextVideoEl.addEventListener('canplay', handleNextVideoReady, { once: true });
    nextVideoEl.load();

  }, [nextVideo, isTransitioning, currentVideo]);

  // Current video management - initialize once
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
      console.log('Initial video loaded, attempting play...');
      updateStatus();
      video.play().then(() => {
        console.log('Initial video playing successfully');
        updateStatus();
      }).catch((err: any) => {
        console.error('Initial play failed:', err);
        updateStatus();
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', updateStatus);
    video.addEventListener('pause', updateStatus);
    video.addEventListener('error', updateStatus);

    // Set initial properties
    video.muted = true;
    video.volume = 0;
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
        src={currentVideo}
        style={{ zIndex: 1, transition: 'opacity 0.8s ease-in-out' }}
      >
        Your browser does not support video.
      </video>

      {/* Next video element for crossfading */}
      <video
        ref={nextVideoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        style={{ 
          zIndex: 2, 
          opacity: 0,
          transition: 'opacity 0.8s ease-in-out'
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

      {/* Debug overlay - shows current video and section visibility */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded z-50 font-mono text-sm">
          <h3 className="font-bold mb-2">Video Debug:</h3>
          <div>Current: {currentVideo}</div>
          <div>Loaded: {videoStatus.loaded ? '✅' : '❌'}</div>
          <div>Playing: {videoStatus.playing ? '✅' : '❌'}</div>
          {videoStatus.error && <div className="text-red-300">Error: {videoStatus.error}</div>}
        </div>
      )}
    </div>
  );
}