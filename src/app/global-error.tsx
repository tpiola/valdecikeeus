"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">Algo deu errado!</h2>
          <button
            onClick={() => reset()}
            className="rounded bg-accent px-4 py-2 text-white"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
