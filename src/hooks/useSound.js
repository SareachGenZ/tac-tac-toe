import { useCallback, useEffect, useRef } from 'react';

/**
 * Web Audio API sound effect synthesizer.
 * Requires zero external audio assets and respects the soundEnabled setting.
 */
export function useSound(enabled = true) {
  const audioCtxRef = useRef(null);

  const getContext = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, [enabled]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && typeof audioCtxRef.current.close === 'function') {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  const playTone = useCallback(
    (frequency, duration = 0.09, type = 'sine', volume = 0.08, delay = 0) => {
      const ctx = getContext();
      if (!ctx) return;

      const startTime = ctx.currentTime + delay;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration + 0.01);
    },
    [getContext]
  );

  const playClick = useCallback(() => {
    playTone(540, 0.05, 'triangle', 0.05);
  }, [playTone]);

  const playMoveX = useCallback(() => {
    playTone(440, 0.09, 'sine', 0.08, 0);
    playTone(620, 0.09, 'sine', 0.07, 0.045);
  }, [playTone]);

  const playMoveO = useCallback(() => {
    playTone(392, 0.09, 'triangle', 0.08, 0);
    playTone(523.25, 0.1, 'triangle', 0.07, 0.045);
  }, [playTone]);

  const playWin = useCallback(() => {
    playTone(523.25, 0.12, 'triangle', 0.09, 0);
    playTone(659.25, 0.12, 'triangle', 0.09, 0.09);
    playTone(783.99, 0.14, 'triangle', 0.09, 0.18);
    playTone(1046.5, 0.24, 'sine', 0.1, 0.27);
  }, [playTone]);

  const playDraw = useCallback(() => {
    playTone(349.23, 0.14, 'sine', 0.07, 0);
    playTone(311.13, 0.2, 'sine', 0.07, 0.12);
  }, [playTone]);

  return {
    playClick,
    playMoveX,
    playMoveO,
    playWin,
    playDraw,
  };
}

