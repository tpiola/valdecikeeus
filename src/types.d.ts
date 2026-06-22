// Type augmentation for Google's <model-viewer> web component
// Uses module augmentation to ADD (not replace) the element to JSX.IntrinsicElements
export {};

declare global {
  namespace JSX {
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
}
