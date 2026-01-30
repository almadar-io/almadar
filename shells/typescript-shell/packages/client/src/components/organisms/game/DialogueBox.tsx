/**
 * DialogueBox Component
 *
 * NPC dialogue display with typewriter effect and choices.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '../../../lib/cn';

export interface DialogueChoice {
  text: string;
  action?: string;
  next?: string;
  disabled?: boolean;
}

export interface DialogueNode {
  id?: string;
  speaker: string;
  text: string;
  portrait?: string;
  choices?: DialogueChoice[];
  autoAdvance?: number; // ms to auto-advance, undefined = wait for input
}

export interface DialogueBoxProps {
  /** Current dialogue node to display */
  dialogue: DialogueNode;
  /** Typewriter speed in ms per character (0 = instant) */
  typewriterSpeed?: number;
  /** Position of dialogue box */
  position?: 'top' | 'bottom';
  /** Called when text animation completes */
  onComplete?: () => void;
  /** Called when a choice is selected */
  onChoice?: (choice: DialogueChoice) => void;
  /** Called when dialogue is advanced (no choices) */
  onAdvance?: () => void;
  /** Optional className */
  className?: string;
}

/**
 * Dialogue box component with typewriter effect
 *
 * @example
 * ```tsx
 * <DialogueBox
 *   dialogue={{
 *     speaker: "Old Man",
 *     text: "It's dangerous to go alone! Take this.",
 *     portrait: "/portraits/oldman.png",
 *     choices: [
 *       { text: "Thank you!", action: "ACCEPT_ITEM" },
 *       { text: "No thanks", next: "decline_node" }
 *     ]
 *   }}
 *   typewriterSpeed={30}
 *   onChoice={(choice) => handleChoice(choice)}
 *   position="bottom"
 * />
 * ```
 */
export function DialogueBox({
  dialogue,
  typewriterSpeed = 30,
  position = 'bottom',
  onComplete,
  onChoice,
  onAdvance,
  className,
}: DialogueBoxProps): JSX.Element {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(0);
  const textRef = useRef(dialogue.text);
  const charIndexRef = useRef(0);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset when dialogue changes
  useEffect(() => {
    textRef.current = dialogue.text;
    charIndexRef.current = 0;
    setDisplayedText('');
    setSelectedChoice(0);

    if (typewriterSpeed === 0) {
      // Instant display
      setDisplayedText(dialogue.text);
      setIsTyping(false);
      onComplete?.();
    } else {
      setIsTyping(true);
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [dialogue, typewriterSpeed, onComplete]);

  // Typewriter effect
  useEffect(() => {
    if (!isTyping || typewriterSpeed === 0) return;

    const interval = setInterval(() => {
      if (charIndexRef.current < textRef.current.length) {
        charIndexRef.current++;
        setDisplayedText(textRef.current.slice(0, charIndexRef.current));
      } else {
        setIsTyping(false);
        clearInterval(interval);
        onComplete?.();

        // Auto-advance if configured
        if (dialogue.autoAdvance && !dialogue.choices?.length) {
          autoAdvanceTimerRef.current = setTimeout(() => {
            onAdvance?.();
          }, dialogue.autoAdvance);
        }
      }
    }, typewriterSpeed);

    return () => clearInterval(interval);
  }, [isTyping, typewriterSpeed, dialogue.autoAdvance, dialogue.choices, onComplete, onAdvance]);

  // Skip to end of text
  const skipTypewriter = useCallback(() => {
    if (isTyping) {
      charIndexRef.current = textRef.current.length;
      setDisplayedText(textRef.current);
      setIsTyping(false);
      onComplete?.();
    }
  }, [isTyping, onComplete]);

  // Handle click/tap
  const handleClick = useCallback(() => {
    if (isTyping) {
      skipTypewriter();
    } else if (!dialogue.choices?.length) {
      onAdvance?.();
    }
  }, [isTyping, skipTypewriter, dialogue.choices, onAdvance]);

  // Handle keyboard input
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (isTyping) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        skipTypewriter();
      }
      return;
    }

    if (dialogue.choices?.length) {
      const enabledChoices = dialogue.choices.filter(c => !c.disabled);

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setSelectedChoice(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedChoice(prev => Math.min(enabledChoices.length - 1, prev + 1));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          const choice = enabledChoices[selectedChoice];
          if (choice) {
            onChoice?.(choice);
          }
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          const choiceIndex = parseInt(e.key) - 1;
          if (choiceIndex < enabledChoices.length) {
            e.preventDefault();
            onChoice?.(enabledChoices[choiceIndex]);
          }
          break;
      }
    } else {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onAdvance?.();
      }
    }
  }, [isTyping, skipTypewriter, dialogue.choices, selectedChoice, onChoice, onAdvance]);

  const enabledChoices = dialogue.choices?.filter(c => !c.disabled) ?? [];

  return (
    <div
      className={cn(
        'fixed left-0 right-0 z-40',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Dialogue"
    >
      <div className="mx-4 my-4 bg-gray-900 bg-opacity-95 border-2 border-gray-600 rounded-lg overflow-hidden">
        <div className="flex">
          {/* Portrait */}
          {dialogue.portrait && (
            <div className="flex-shrink-0 p-4 border-r border-gray-700">
              <img
                src={dialogue.portrait}
                alt={dialogue.speaker}
                className="w-24 h-24 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-4">
            {/* Speaker name */}
            <div className="text-yellow-400 font-bold mb-2">
              {dialogue.speaker}
            </div>

            {/* Dialogue text */}
            <div className="text-white text-lg leading-relaxed min-h-[60px]">
              {displayedText}
              {isTyping && (
                <span className="animate-pulse">▌</span>
              )}
            </div>

            {/* Choices */}
            {!isTyping && enabledChoices.length > 0 && (
              <div className="mt-4 space-y-2">
                {enabledChoices.map((choice, index) => (
                  <button
                    key={index}
                    type="button"
                    className={cn(
                      'block w-full text-left px-4 py-2 rounded transition-colors',
                      'hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400',
                      selectedChoice === index
                        ? 'bg-gray-700 text-yellow-400'
                        : 'bg-gray-800 text-white'
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChoice?.(choice);
                    }}
                  >
                    <span className="text-gray-500 mr-2">{index + 1}.</span>
                    {choice.text}
                  </button>
                ))}
              </div>
            )}

            {/* Continue indicator */}
            {!isTyping && !dialogue.choices?.length && (
              <div className="mt-4 text-gray-500 text-sm animate-pulse">
                Press SPACE or click to continue...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogueBox;
