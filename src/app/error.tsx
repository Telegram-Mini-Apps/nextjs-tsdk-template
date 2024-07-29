'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>An unhandled error occurred!</h2>
      <blockquote>
        <code>
          {error.message}
        </code>
      </blockquote>
      {reset && <button onClick={() => reset()}>Try again</button>}
    </div>
  );
}
