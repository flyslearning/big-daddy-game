
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sb = supabase();

    if (!sb) {
      setReady(true);
      return;
    }

    let mounted = true;

    sb.auth
      .getUser()
      .then(({ data }) => {
        if (mounted) {
          setUser(data.user);
          setReady(true);
        }
      })
      .catch(() => {
        if (mounted) setReady(true);
      });

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, ready };
}

type Toast = {
  type: "error" | "success";
  title: string;
  message: string;
} | null;

export function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">(
    "login"
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [toast]);

  function showError(message: string) {
    setToast({
      type: "error",
      title: "Access Denied",
      message,
    });
  }

  function showSuccess(message: string) {
    setToast({
      type: "success",
      title: "Success",
      message,
    });
  }

  async function submit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (busy) return;

    const sb = supabase();

    if (!sb) {
      showError(
        "The Server Has Been Blocked."
      );
      return;
    }

    const cleanUsername = username.trim().toLowerCase();

    if (!/^[a-z0-9_]{3,24}$/.test(cleanUsername)) {
      showError(
        "Username must contain 3–24 letters, numbers or underscores."
      );
      return;
    }

    setBusy(true);
    setToast(null);

    try {
      if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: {
              username: cleanUsername,
            },
          },
        });

        if (error) {
          showError(error.message);
          return;
        }

        if (!data.session) {
          showSuccess(
            "Account request submitted. Check your email to verify your account."
          );
          return;
        }

        window.location.assign("/account");
        return;
      }

      // Secure username/password login.
      // Browser never receives another user's email.
      const response = await fetch("/api/auth/username-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          username: cleanUsername,
          password,
        }),
      });

      const result = await response.json();

      if (
        !response.ok ||
        !result.access_token ||
        !result.refresh_token
      ) {
        showError(
          result.error || "Invalid username or password."
        );
        return;
      }

      const { error } = await sb.auth.setSession({
        access_token: result.access_token,
        refresh_token: result.refresh_token,
      });

      if (error) {
        showError("Unable to establish your session.");
        return;
      }

      showSuccess("Login successful.");

      window.location.assign("/account");
    } catch {
      showError(
        "Unable to connect to the authentication server."
      );
    } finally {
      setBusy(false);
    }
  }

  function switchMode() {
    setMode(mode === "login" ? "signup" : "login");
    setUsername("");
    setEmail("");
    setPassword("");
    setToast(null);
  }

  return (
    <>
      {toast && (
        <div
          className={`bdg-toast ${
            toast.type === "error"
              ? "bdg-toast-error"
              : "bdg-toast-success"
          }`}
          role={toast.type === "error" ? "alert" : "status"}
        >
          <div className="bdg-toast-symbol">
            {toast.type === "error" ? "!" : "✓"}
          </div>

          <div className="bdg-toast-content">
            <strong>{toast.title}</strong>
            <p>{toast.message}</p>
          </div>

          <button
            type="button"
            className="bdg-toast-close"
            aria-label="Close notification"
            onClick={() => setToast(null)}
          >
            ×
          </button>

          <div className="bdg-toast-progress" />
        </div>
      )}

      <form className="authbox" onSubmit={submit}>
        <h1>
          {mode === "login"
            ? "Welcome Back"
            : "Create Account"}
        </h1>

        <p className="muted">
          BIG DADDY GAME — MEMBER ACCESS
        </p>

        <label>
          Username
          <input
            type="text"
            required
            minLength={3}
            maxLength={24}
            pattern="[A-Za-z0-9_]{3,24}"
            autoComplete="username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="Enter your username"
          />
        </label>

        {mode === "signup" && (
          <label>
            Email Address
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email for verification"
            />
          </label>
        )}

        <label>
          Password
          <input
            type="password"
            required
            minLength={8}
            autoComplete={
              mode === "login"
                ? "current-password"
                : "new-password"
            }
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
          />
        </label>

        <button
          className="primary full"
          type="submit"
          disabled={busy}
        >
          {busy
            ? "PLEASE WAIT..."
            : mode === "login"
              ? "LOG IN"
              : "CREATE ACCOUNT"}
        </button>

        <p className="muted">
          {mode === "login"
            ? "Don't have an account? "
            : "Already registered? "}

          <button
            className="textbutton"
            type="button"
            disabled={busy}
            onClick={switchMode}
          >
            {mode === "login"
              ? "Create Account"
              : "Log In"}
          </button>
        </p>
      </form>
    </>
  );
}
