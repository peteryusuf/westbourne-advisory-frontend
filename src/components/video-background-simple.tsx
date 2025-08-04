"use client";

import { useRef, useEffect, useState, useMemo } from 'react';

interface VideoBackgroundSimpleProps {
  className?: string;
}

export function VideoBackgroundSimple({ className = "" }: VideoBackgroundSimpleProps) {
  const [currentVideo, setCurrentVideo] = useState('/video_1.mp4');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStatus, setVideoStatus] = useState({
    loaded: false,
    playing: false,
    error: null as string | null
  });

  // Define video sections with their corresponding videos
  const videoSections = useMemo(() => [
    { selector: 'section[data-section="hero"]', videoSrc: '/video_1.mp4', name: 'Hero' },
    { selector: 'section[data-section="how-it-works"]', videoSrc: '/video_2.mp4', name: 'How It Works' },
    { selector: 'section[data-section="testimonials"]', videoSrc: '/video_3.mp4', name: 'Testimonials' },
    { selector: 'section[data-section="faq"]', videoSrc: '/video_4.mp4', name: 'FAQ' },
    { selector: 'section[data-section="contact"]', videoSrc: '/video_2.mp4', name: 'Contact' }
  ], []);

  // Set up scroll-based video switching with debouncing
  useEffect(() => {
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
          
          if (ratio > maxRatio && ratio > 0.4) { // Must be at least 40% visible
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
        if (newVideo && newVideo !== currentVideo) {
          console.log(`Switching to video: ${newVideo}`);
          setCurrentVideo(newVideo);
        }
      }, 200); // 200ms debounce
    };

    const handleScroll = () => {
      const newVideo = findMostVisibleSection();
      if (newVideo) {
        debouncedVideoSwitch(newVideo);
      }
    };

    // Use scroll event for precise control
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(switchTimeout);
    };
  }, [currentVideo, videoSections]);

  // Video management effects
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateStatus = () => {
      setVideoStatus({
        loaded: video.readyState >= 2,
        playing: !video.paused,
        error: video.error?.message || null
      });
    };

    const handleLoadedData = () => {
      console.log('Video loaded, attempting play...');
      updateStatus();
      video.play().then(() => {
        console.log('Video playing successfully');
        updateStatus();
      }).catch((err: unknown) => {
        console.error('Play failed:', err);
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
  }, [currentVideo]);

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden ${className}`} style={{ zIndex: -10 }}>
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src={currentVideo}
        style={{ zIndex: 1 }}
      >
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