import { ChevronFirst, ChevronLast, Play, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const trackLists = [
  '/audio/Cozy_Cabin.mp3',
  '/audio/Fields_of_Gold.mp3',
  '/audio/Fishing_by_the_Lake.mp3',
  '/audio/Harvest_Festival.mp3',
  '/audio/Meadow_Walk.mp3',
  '/audio/Morning_on_the_Farm.mp3',
  '/audio/Nighttime_Fireflies.mp3',
  '/audio/Raindrops_on_the_Roof.mp3',
  '/audio/Stardust_Dreams.mp3',
  '/audio/Village_Market.mp3',
];

// const randomTrack = (() => Math.floor(Math.random() * trackLists.length))();
const randomTrack = 8;

const AudioPlay = () => {
  const [track, setTrack] = useState(randomTrack);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) return;
    const audio = new Audio(trackLists[track]);
    audioRef.current = Object.assign(audio, {
      loop: true,
      volume: 0.3,
    });
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Automatic playback started!
          // Show playing UI.
          audio.pause();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      audio.pause();
      audio.remove();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();

    Object.assign(audio, {
      src: trackLists[track],
      currentTime: 0,
    });
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Automatic playback started!
          // Show playing UI.
          // audio.pause();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Automatic playback started!
              // Show playing UI.
              // audio.pause();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else audio.pause();
    } catch (err) {
      console.log(err);
    }
  }, [isPlaying]);

  const changeTrack = (increment: number) => {
    setTrack((prev) => {
      const index = prev + 1 * increment;

      if (index < 0) return trackLists.length - 1;
      if (index >= trackLists.length) return 0;
      return index;
    });
    setIsPlaying(true);
  };

  return (
    <div className="mt-auto">
      <div className="flex gap-3">
        <ChevronFirst strokeWidth={1} onClick={() => changeTrack(-1)} />
        {isPlaying ? <Pause fill="black" strokeWidth={1} onClick={() => setIsPlaying(false)} /> : <Play fill="black" strokeWidth={1} onClick={() => setIsPlaying(true)} />}
        <ChevronLast strokeWidth={1} onClick={() => changeTrack(1)} />
      </div>
      {trackLists[track]?.split('/').at(-1)}
    </div>
  );
};

export default AudioPlay;
