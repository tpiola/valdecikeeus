/* eslint-disable */
// Augmentação para o web component <model-viewer> do Google
// Referencia os tipos do React e adiciona o elemento ao JSX.IntrinsicElements

/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        "ios-src"?: string;
        alt?: string;
        ar?: boolean | string;
        "ar-modes"?: string;
        "camera-controls"?: boolean | string;
        poster?: string;
        "shadow-intensity"?: string;
        "auto-rotate"?: boolean | string;
        "environment-image"?: string;
        exposure?: string;
        slot?: string;
        style?: React.CSSProperties;
      },
      HTMLElement
    >;
  }
}
