interface LoadingLogoProps {
  mode?: AnimationMode;
  /** defaults to 32px */
  height?: string;
  /** Pass a React component that has the SVG in it */
  Logo: ({ className }) => any;
}
const CLASS_NAMES = {
  bounce: {
    logo1: "opacity-50",
    logo2: "animate-bounce",
  },
  ping: {
    logo1: "opacity-75",
    logo2: "animate-ping",
  },
  pulse: {
    logo1: "animate-pulse",
    logo2: "hidden",
  },
};
type AnimationMode = keyof typeof CLASS_NAMES;

export function LoadingLogo({
  Logo,
  height = "32px",
  mode = "bounce",
}: LoadingLogoProps) {
  let cssClasses = CLASS_NAMES[mode];
  return (
    <div className="relative" style={{ height }}>
      <Logo
        className={`block h-full w-auto text-primary opac ${cssClasses?.logo1}`}
      />
      <Logo
        className={`block h-full w-auto absolute top-0 text-primary ${cssClasses?.logo2}`}
      />
    </div>
  );
}
