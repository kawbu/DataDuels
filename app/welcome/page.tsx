"use client";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/supabase-client";
import { useRouter } from "next/navigation";
import * as React from "react";
import EditorWithCard from "@/components/editor-with-card";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export default function WelcomePage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = React.useState(false);
  const [displayName, setDisplayName] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setDisplayName(user?.user_metadata?.display_name || null);
    };
    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    router.push("/");
  };

  return (
    <div
      className={
        `${inter.className} flex min-h-screen flex-col items-center justify-center bg-background`
      }
    >
      <h1 className="text-4xl font-extrabold text-primary text-center mb-8">
        {`Welcome to DataDuels${displayName ? `, ${displayName}` : ''}`}
      </h1>
      <Button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Log out"}
      </Button>
      <EditorWithCard />
    </div>
  );
}
