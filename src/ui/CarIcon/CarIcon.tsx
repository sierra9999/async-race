interface CarIconProps {
  color: string;
  className?: string;
}

function CarIcon({ color, className = '' }: CarIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 32" width="48" height="24">
      <path
        fill={color}
        d="M6 22 L10 12 Q13 8 20 8 L40 8 Q47 8 50 12 L58 22 L58 26 L54 26 A5 5 0 1 1 44 26
           L22 26 A5 5 0 1 1 12 26 L6 26 Z"
      />
      <circle cx="17" cy="26" r="4" fill="#1f2937" />
      <circle cx="49" cy="26" r="4" fill="#1f2937" />
    </svg>
  );
}

export default CarIcon;
