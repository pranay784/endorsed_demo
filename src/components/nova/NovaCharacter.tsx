interface OrbPosition {
  x: number;
  y: number;
}

interface NovaCharacterProps {
  onClick: () => void;
  isOpen: boolean;
  isSpeaking: boolean;
  tourPosition?: OrbPosition | null;
  isTourActive?: boolean;
}

export function NovaCharacter({
  onClick,
  isOpen,
  isSpeaking,
  tourPosition,
  isTourActive
}: NovaCharacterProps) {
  const isMoving = isTourActive && tourPosition;

  const style = isMoving
    ? {
        position: 'fixed' as const,
        left: `${tourPosition.x}px`,
        top: `${tourPosition.y}px`,
        transition: 'left 0.8s cubic-bezier(0.4, 0, 0.2, 1), top 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 60,
      }
    : undefined;

  return (
    <button
      onClick={onClick}
      style={style}
      className={`
        relative w-16 h-16 rounded-full
        bg-gradient-to-br from-cyan-400 via-blue-500 to-teal-500
        shadow-lg shadow-cyan-500/30
        transition-all duration-500 ease-out
        hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900
        ${isOpen && !isTourActive ? 'scale-90 opacity-80' : ''}
        ${isSpeaking || isTourActive ? 'animate-pulse-glow' : 'animate-breathe'}
        ${isMoving ? 'cursor-pointer' : ''}
      `}
      aria-label={isOpen ? 'Close NOVA chat' : 'Open NOVA chat'}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />

      <div className={`
        absolute inset-2 rounded-full
        bg-gradient-to-br from-cyan-300 via-blue-400 to-teal-400
        ${isSpeaking || isTourActive ? 'animate-inner-pulse' : ''}
      `} />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold text-xs tracking-wider drop-shadow-lg">
          NOVA
        </span>
      </div>

      <div className={`
        absolute -inset-1 rounded-full
        bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-teal-500/20
        blur-md
        transition-opacity duration-300
        ${isSpeaking || isTourActive ? 'opacity-100' : 'opacity-50'}
      `} />

      {isMoving && (
        <div className="absolute -inset-3 rounded-full animate-ping-slow opacity-30 bg-gradient-to-br from-cyan-400 via-blue-500 to-teal-500" />
      )}
    </button>
  );
}
