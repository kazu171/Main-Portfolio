'use client';

import { MochiCard } from "@/components/ui/mochi-card";
import { MochiButton } from "@/components/ui/mochi-button";
import { AlertCircle, Home } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center mochi-texture">
      <MochiCard className="w-full max-w-md mx-4 p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>

        <h1 className="text-4xl font-black mb-4">404</h1>
        <h2 className="text-2xl font-bold text-muted-foreground mb-4">
          Page Not Found
        </h2>

        <p className="text-muted-foreground font-medium mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MochiButton onClick={() => router.push('/en')}>
            <Home className="w-4 h-4 mr-2" />
            Go to English Home
          </MochiButton>
          <MochiButton variant="secondary" onClick={() => router.push('/ja')}>
            <Home className="w-4 h-4 mr-2" />
            日本語ホームへ
          </MochiButton>
        </div>
      </MochiCard>
    </div>
  );
}
