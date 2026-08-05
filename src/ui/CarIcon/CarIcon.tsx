interface CarIconProps {
  color: string;
  className?: string;
}

function CarIcon({ color, className = '' }: CarIconProps) {
  return (
    <svg className={className} viewBox="0 7.5 64 23.5" width="56" height="21">
      <path
        fill={color}
        d="M6 16 L8 14.6 L19 14 L24 9 L35 9 L43 14 L56 15 Q58 15.4 58 18
           L58 26 L54 26 A5 5 0 1 1 44 26 L22 26 A5 5 0 1 1 12 26 L6 26 Z"
      />
      <circle cx="17" cy="26" r="4" fill="#1f2937" />
      <circle cx="49" cy="26" r="4" fill="#1f2937" />
    </svg>
  );
}

export default CarIcon;
