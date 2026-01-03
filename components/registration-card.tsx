"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegistrationCard() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Thanks ${name || username || "friend"}! Placeholder registration complete.`);
    }, 700);
  }

  return (
    <Card id="register">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">Join DataDuels — start practicing and dueling instantly.</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <div>
            <Label htmlFor="name" className="sr-only">Username</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Username" />
          </div>

          <div>
            <Label htmlFor="email" className="sr-only">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </div>

          <div>
            <Label htmlFor="username" className="sr-only">DisplayName</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a display name" />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Saving..." : "Create account"}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-xs text-muted-foreground">
          By continuing you agree to our <a className="underline">Terms</a> and <a className="underline">Privacy Policy</a>.
        </div>
      </CardContent>
    </Card>
  );
}
