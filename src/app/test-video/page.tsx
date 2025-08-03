"use client";

import { useRef, useEffect, useState } from 'react';

export default function TestVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStatus, setVideoStatus] = useState({
    loaded: false,
    playing: false,
    error: null as string | null,
    currentTime: 0,
    duration: 0
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateStatus = () => {
      setVideoStatus({
        loaded: video.readyState >= 2,
        playing: !video.paused,
        error: video.error?.message || null,
        currentTime: video.currentTime,
        duration: video.duration || 0
      });
    };

    const handleLoadedData = () => {
      console.log('Video loaded, attempting play...');
      updateStatus();
      video.play().then(() => {
        console.log('Video playing successfully');
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
    video.addEventListener('timeupdate', updateStatus);

    // Set initial properties
    video.muted = true;
    video.volume = 0;
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', updateStatus);
      video.removeEventListener('pause', updateStatus);
      video.removeEventListener('error', updateStatus);
      video.removeEventListener('timeupdate', updateStatus);
    };
  }, []);

  return (
    <div className="min-h-screen relative bg-red-500">
      {/* Raw HTML5 video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls // Temporarily add controls to see the video
        style={{ zIndex: 1 }}
      >
        <source src="/video_1.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>

      {/* Debug overlay */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded z-10 font-mono text-sm">
        <h3 className="font-bold mb-2">Video Debug Info:</h3>
        <div>Loaded: {videoStatus.loaded ? '✅' : '❌'}</div>
        <div>Playing: {videoStatus.playing ? '✅' : '❌'}</div>
        <div>Current Time: {videoStatus.currentTime.toFixed(1)}s</div>
        <div>Duration: {videoStatus.duration.toFixed(1)}s</div>
        {videoStatus.error && <div className="text-red-300">Error: {videoStatus.error}</div>}
      </div>

      {/* Test text */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="text-white text-center bg-black bg-opacity-50 p-8 rounded">
          <h1 className="text-4xl font-bold mb-4">Raw Video Test</h1>
          <p className="text-xl">Red background should be hidden by video</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              const video = videoRef.current;
              if (video) {
                if (video.paused) {
                  video.play();
                } else {
                  video.pause();
                }
              }
            }}
          >
            Toggle Play/Pause
          </button>
        </div>
      </div>
    </div>
  );
}