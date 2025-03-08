"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Volume1, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Componente Slider simples
const Slider = ({
  value,
  min,
  max,
  step,
  className,
  onValueChange,
  disabled,
}: {
  value: number[];
  min: number;
  max: number;
  step: number;
  className?: string;
  onValueChange: (value: number[]) => void;
  disabled?: boolean;
}) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      className={`w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer ${
        disabled ? "opacity-50" : ""
      } ${className}`}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      disabled={disabled}
    />
  );
};

interface AudioPlayerProps {
  text: string;
}

export function AudioPlayer({ text }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Limpa o texto HTML
  const cleanText = text.replace(/<[^>]*>/g, "").trim();

  // Inicializa a referência ao speechSynthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthRef.current = window.speechSynthesis;

      // Carrega as vozes disponíveis
      const loadVoices = () => {
        if (speechSynthRef.current) {
          const voices = speechSynthRef.current.getVoices();
          console.log(
            "Vozes disponíveis:",
            voices.map((v) => `${v.name} (${v.lang})`)
          );
        }
      };

      if (speechSynthRef.current) {
        speechSynthRef.current.onvoiceschanged = loadVoices;
        loadVoices();
      }
    }

    // Limpa a fala quando o componente é desmontado
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Monitora mudanças no estado de reprodução
  useEffect(() => {
    const checkSpeechStatus = () => {
      if (speechSynthRef.current && utteranceRef.current) {
        // Verifica se ainda está falando
        if (!speechSynthRef.current.speaking && isPlaying) {
          setIsPlaying(false);
        }

        // Garante que o estado de carregamento seja desativado
        if (isLoading && speechSynthRef.current.speaking) {
          setIsLoading(false);
        }
      }
    };

    const interval = setInterval(checkSpeechStatus, 100);
    return () => clearInterval(interval);
  }, [isPlaying, isLoading]);

  const togglePlay = async () => {
    if (isPlaying) {
      pauseSpeech();
    } else {
      if (
        utteranceRef.current &&
        speechSynthRef.current &&
        speechSynthRef.current.paused
      ) {
        resumeSpeech();
      } else {
        setIsLoading(true);

        // Define um timeout para garantir que o estado de carregamento não fique preso
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }

        loadingTimeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 3000); // Timeout de segurança de 3 segundos

        try {
          await startSpeech();
        } finally {
          if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
            loadingTimeoutRef.current = null;
          }
          setIsLoading(false);
        }
      }
    }
  };

  const startSpeech = async () => {
    const synth = speechSynthRef.current;
    if (!synth || !cleanText) return;

    stopSpeech();

    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "pt-BR";
      utterance.volume = volume;
      utteranceRef.current = utterance;

      // Tenta encontrar uma voz em português
      const voices = synth.getVoices();
      const portugueseVoice = voices.find(
        (voice) =>
          voice.lang.includes("pt") ||
          voice.lang.includes("PT") ||
          voice.name.includes("Portuguese") ||
          voice.name.includes("Brasil")
      );

      if (portugueseVoice) {
        console.log("Usando voz em português:", portugueseVoice.name);
        utterance.voice = portugueseVoice;
      }

      utterance.onstart = () => {
        console.log("Iniciando reprodução de áudio");
        setIsPlaying(true);
        setIsLoading(false);
      };

      utterance.onend = () => {
        console.log("Finalizando reprodução de áudio");
        setIsPlaying(false);
        setIsLoading(false);
        resolve();
      };

      utterance.onerror = (event) => {
        console.error("Erro na reprodução de áudio:", event);
        setIsPlaying(false);
        setIsLoading(false);
        resolve();
      };

      synth.speak(utterance);
    });
  };

  const stopSpeech = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsPlaying(false);
    }
  };

  const pauseSpeech = () => {
    const synth = speechSynthRef.current;
    if (synth && isPlaying) {
      console.log("Pausando áudio");
      synth.pause();
      setIsPlaying(false);
    }
  };

  const resumeSpeech = () => {
    const synth = speechSynthRef.current;
    if (synth && !isPlaying) {
      console.log("Retomando áudio");
      synth.resume();
      setIsPlaying(true);
    }
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    console.log("Alterando volume para:", newVolume);

    if (utteranceRef.current) {
      // Para o SpeechSynthesis, precisamos recriar a utterance com o novo volume
      if (isPlaying && speechSynthRef.current) {
        const wasPaused = speechSynthRef.current.paused;

        // Salva a posição atual (não é possível diretamente, então reiniciamos)
        stopSpeech();

        // Cria uma nova utterance com o novo volume
        const newUtterance = new SpeechSynthesisUtterance(cleanText);
        newUtterance.lang = "pt-BR";
        newUtterance.volume = newVolume;

        if (utteranceRef.current.voice) {
          newUtterance.voice = utteranceRef.current.voice;
        }

        newUtterance.onstart = () => {
          console.log("Reiniciando áudio com novo volume");
          setIsPlaying(true);
        };

        newUtterance.onend = () => {
          setIsPlaying(false);
        };

        utteranceRef.current = newUtterance;

        // Reinicia a fala
        if (!wasPaused && speechSynthRef.current) {
          speechSynthRef.current.speak(newUtterance);
        }
      }
    }
  };

  if (!cleanText) return null;

  return (
    <div className="flex items-center gap-3 mt-4 p-2 bg-accent/10 rounded-md">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={togglePlay}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 flex items-center justify-center rounded-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {isLoading ? "Carregando..." : isPlaying ? "Pausar" : "Ouvir"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center gap-2 flex-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => changeVolume(volume === 0 ? 1 : 0)}
          disabled={isLoading}
        >
          {volume === 0 ? (
            <VolumeX className="h-3 w-3" />
          ) : volume < 0.5 ? (
            <Volume1 className="h-3 w-3" />
          ) : (
            <Volume2 className="h-3 w-3" />
          )}
        </Button>
        <Slider
          value={[volume * 100]}
          min={0}
          max={100}
          step={5}
          className="flex-1 max-w-[100px]"
          onValueChange={(values: number[]) => changeVolume(values[0] / 100)}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
