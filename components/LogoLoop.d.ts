declare module "@/components/LogoLoop" {
  import type { CSSProperties, ReactNode } from "react";

  interface LogoNodeItem {
    node: ReactNode;
    title?: string;
    href?: string;
    ariaLabel?: string;
  }

  interface LogoImageItem {
    src: string;
    alt?: string;
    title?: string;
    href?: string;
    srcSet?: string;
    sizes?: string;
    width?: number;
    height?: number;
  }

  type LogoItem = LogoNodeItem | LogoImageItem;

  export interface LogoLoopProps {
    logos: LogoItem[];
    speed?: number;
    direction?: "left" | "right" | "up" | "down";
    width?: string | number;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    hoverSpeed?: number;
    fadeOut?: boolean;
    fadeOutColor?: string;
    scaleOnHover?: boolean;
    renderItem?: (item: LogoItem, key: string) => ReactNode;
    ariaLabel?: string;
    className?: string;
    style?: CSSProperties;
  }

  export const LogoLoop: React.FC<LogoLoopProps>;
  export default LogoLoop;
}
