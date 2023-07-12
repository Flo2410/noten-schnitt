"use client";

import { Reauth } from "components/Reauth";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <Reauth done={reset} />;
}
