interface SkeletonProps {
  color?: string;
  className?: string;
}

export function Skeleton({ color = "gray-200", className = "" }: SkeletonProps) {
  return (
    <div className={`relative w-full bg-transparent py-4 ${className}`}>
      <div className="flex space-x-4 animate-pulse">
        <div className="flex-1 py-1 space-y-4">
          <div className={`w-3/4 h-4 bg-${color} rounded`}></div>
          <div className="space-y-2">
            <div className={`h-4 bg-${color} rounded`}></div>
            <div className={`w-5/6 h-4 bg-${color} rounded`}></div>
            <div className={`w-5/6 h-4 bg-${color} rounded`}></div>
          </div>
          <div className={`w-3/4 h-4 bg-${color} rounded`}></div>
          <div className="space-y-2">
            <div className={`h-4 bg-${color} rounded`}></div>
            <div className={`w-5/6 h-4 bg-${color} rounded`}></div>
            <div className={`w-5/6 h-4 bg-${color} rounded`}></div>
          </div>
          <div className={`w-3/4 h-4 bg-${color} rounded`}></div>
        </div>
      </div>
    </div>
  );
}
