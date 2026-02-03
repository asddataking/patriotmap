"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth/react/ui";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      onSessionChange={() => router.refresh()}
      emailOTP
      redirectTo="/explore"
      Link={Link}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
