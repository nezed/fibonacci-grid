import type { CSSProperties as ReactCSSProperties } from 'react';

declare module 'react' {
  interface CSSProperties extends ReactCSSProperties {
    [key: `--${string}`]: string | number;
  }
}
