interface ButterflyLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ButterflyLogo = ({ size = "md", className = "" }: ButterflyLogoProps) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Left Wing - Upper (Changed fill-coral to fill-orange-500) */}
        <path
          d="M50 50 C30 30, 10 35, 15 55 C18 70, 35 75, 50 50"
          className="fill-orange-500"
          fillOpacity="0.9"
        />
        {/* Left Wing - Lower (Changed fill-teal to fill-orange-300) */}
        <path
          d="M50 50 C35 60, 20 80, 30 85 C40 88, 48 70, 50 50"
          className="fill-orange-300"
          fillOpacity="0.85"
        />
        
        {/* Right Wing - Upper */}
        <path
          d="M50 50 C70 30, 90 35, 85 55 C82 70, 65 75, 50 50"
          className="fill-orange-500"
          fillOpacity="0.9"
        />
        {/* Right Wing - Lower */}
        <path
          d="M50 50 C65 60, 80 80, 70 85 C60 88, 52 70, 50 50"
          className="fill-orange-300"
          fillOpacity="0.85"
        />
        
        {/* Wing Details - Left (Changed stroke to currentColor or orange-600) */}
        <path
          d="M50 50 C35 40, 22 42, 25 52"
          className="stroke-orange-600"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.6"
        />
        <circle cx="30" cy="48" r="4" className="fill-orange-200" fillOpacity="0.5" />
        
        {/* Wing Details - Right */}
        <path
          d="M50 50 C65 40, 78 42, 75 52"
          className="stroke-orange-600"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.6"
        />
        <circle cx="70" cy="48" r="4" className="fill-orange-200" fillOpacity="0.5" />
        
        {/* Body (Using Tailwind foreground color) */}
        <ellipse
          cx="50"
          cy="55"
          rx="4"
          ry="18"
          className="fill-foreground"
          fillOpacity="0.9"
        />
        
        {/* Head */}
        <circle cx="50" cy="35" r="5" className="fill-foreground" fillOpacity="0.9" />
        
        {/* Antennae */}
        <path
          d="M48 32 C45 25, 40 20, 38 18"
          className="stroke-foreground"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.8"
        />
        <path
          d="M52 32 C55 25, 60 20, 62 18"
          className="stroke-foreground"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.8"
        />
        <circle cx="38" cy="17" r="2" className="fill-orange-500" />
        <circle cx="62" cy="17" r="2" className="fill-orange-500" />
      </svg>
    </div>
  );
};

export default ButterflyLogo;