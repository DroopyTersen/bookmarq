import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "../loaders/LoadingSpinner";

const DEFAULT = "/images/fallback.png";
interface ImgProps {
  initial?: string;
  src?: string;
  fallback?: string;
  opacity?: number;
  className?: string;
  width?: number;
  // height?: number;
  [key: string]: any;
}
export function Img({
  initial = "",
  src = DEFAULT,
  fallback = "",
  opacity = 1,
  className = "",
  width,
  height,
  ...rest
}: ImgProps) {
  let [imgSrc, setImgSrc] = useState<string | null>(initial);
  let fallbackRef = useRef(fallback);
  useEffect(() => {
    fallbackRef.current = fallback;
  });

  useEffect(() => {
    let isUnmounted = false;
    let image = new Image();
    image.onload = () => {
      if (!isUnmounted) {
        setTimeout(() => {
          setImgSrc(src);
        }, 10);
      }
    };
    image.onerror = () => {
      if (!isUnmounted) {
        setImgSrc(fallbackRef.current || null);
      }
    };
    image.src = src;
    return () => {
      isUnmounted = true;
    };
  }, [src]);
  let dimensions: {
    width?: string;
    height?: string;
    aspectRatio?: string;
    maxWidth?: string;
    maxHeight?: string;
  } = {};
  if (width) dimensions.width = `${width}px`;
  if (height) dimensions.height = `${height}px`;
  if (width && height) dimensions.aspectRatio = `${width}/${height}`;
  if (width) dimensions.maxWidth = `min(${width}px, 100%)`;
  if (height) dimensions.maxHeight = `min(${height}px, 100%)`;

  return (
    <>
      {imgSrc ? (
        <motion.img
          {...rest}
          className={`animated ${className}`}
          key={src}
          src={imgSrc}
          style={{ ...dimensions }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity }}
          transition={{ duration: imgSrc === src ? 0.2 : 0.15 }}
          loading="lazy"
        />
      ) : imgSrc === null ? null : (
        <div style={{ ...dimensions }}>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
