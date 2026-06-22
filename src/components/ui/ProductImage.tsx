"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

const FALLBACK = "/products/placeholder.svg";

export default function ProductImage(props: Omit<ImageProps, "onError">) {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc(FALLBACK)}
    />
  );
}
