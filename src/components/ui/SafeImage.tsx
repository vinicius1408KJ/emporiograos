"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** next/image que some em silêncio se o arquivo falhar (o fundo do quadro continua no lugar). */
export function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <Image {...props} onError={() => setFailed(true)} />;
}
