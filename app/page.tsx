import { Metadata } from "next";
import NetworkBackgroundClient from "@/components/network-background-client";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import RegistrationCard from "@/components/registration-card";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "DataDuels — Practice DSA, Duel Live",
  description:
    "Lightweight, fast, and fun 1v1 coding duels + topic-wise DSA practice.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export default async function Home() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect("/welcome");
  }

  return (
    <div className={`${inter.className} relative min-h-screen flex items-center justify-center bg-background`}>
      <NetworkBackgroundClient />
      <main className="container mx-auto flex w-full max-w-6xl items-center gap-12 px-6 py-20 relative z-10">
        <section className="flex flex-1 flex-col gap-8">
          {/* logo/title moved to the registration column */}

          <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-primary">
            Practice DSA. Jump into a 1v1 coding duel — fast, fair, and fun.
          </h1>

          <p className="max-w-lg text-lg text-muted-foreground">
            Train topic-wise problems and sharpen your skills. Solve problems
            side-by-side against others through matchmaking and solidify your problem solving skills. Streaks,
            levels, and leaderboards help you track progress.
          </p>

          <Card className="mt-6 max-w-md">
            <CardHeader>
              <CardTitle>How it works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>Pick a topic and practice problems.</li>
                <li>Solve problems to improve accuracy and speed.</li>
                <li>Participate in duels to practice coding under pressure.</li>
                <li>Track streaks, levels, and climb leaderboards.</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <aside className="w-[420px] flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
              <div className="h-20 w-20 rounded-xl bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center mb-2 shadow-lg">
                <Code className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-foreground">DataDuels</h2>
          </div>

          <RegistrationCard />
        </aside>
      </main>
    </div>
  );
}
