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
        style?: React.CSSProperties;
        "environment-image"?: string;
        exposure?: string;
      },
      HTMLElement
    >;
  }
}
