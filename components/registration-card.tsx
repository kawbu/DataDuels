"use client"

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/supabase-client";

export default function RegistrationCard() {
  const [mode, setMode] = React.useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const supabase = createClient();
  const router = useRouter();
  const [message, setMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        if (!displayName.trim()) {
          alert("Display name is required.");
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName }
          }
        });
        if (error) {
          alert(`Error signing up: ${error.message}`);
          return;
        } else {
          setMessage("Check your email to confirm your registration!");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          alert(`Error signing in: ${error.message}`);
          return;
        }
        // Redirect to welcome page after successful sign in
        router.push("/welcome");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card id="register">
      <CardHeader>
        <CardTitle>{mode === 'signup' ? 'Create your account' : 'Sign in to DataDuels'}</CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === 'signup'
            ? 'Join DataDuels to start practicing and dueling instantly.'
            : 'Welcome back! Sign in to continue.'}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          {mode === 'signup' && (
            <div>
              <Label htmlFor="displayName" className="sr-only">Display Name</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display Name"
                autoComplete="nickname"
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="email" className="sr-only">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" />
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading
                ? mode === 'signup' ? 'Saving...' : 'Signing in...'
                : mode === 'signup' ? 'Create account' : 'Sign in'}
            </Button>
          </div>
          {message && (
            <div className="text-center text-sm text-primary mt-2">{message}</div>
          )}
        </form>

        <div className="mt-4 text-xs text-muted-foreground flex flex-col items-center gap-2">
          <span>
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              className="ml-1 underline text-primary font-medium hover:opacity-80"
              onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
            >
              {mode === 'signup' ? 'Sign in' : 'Sign up'}
            </button>
          </span>
          <span>
            By continuing you agree to our <a className="underline">Terms</a> and <a className="underline">Privacy Policy</a>.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
