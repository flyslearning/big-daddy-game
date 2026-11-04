
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

    sb.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user);
        setReady(true);
      }
    }).catch(() => {
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

type ToastType = "error" | "success";

type ToastState = {
  type: ToastType;
  title: string;
  message: string;
} | null;

export function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  // Automatically dismiss popup after 5 seconds
  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const showError = (message: string) => {
    setToast({
      type: "error",
      title: "Access Denied",
      message,
    });
  };

  const showSuccess = (message: string) => {
    setToast({
      type: "success",
      title: "Success",
      message,
    });
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (busy) return;

    const sb = supabase();

    if (!sb) {
      showError("The Server Has Been Blocked.");
      return;
    }

    setBusy(true);
    setToast(null);

    try {
      const result =
        mode === "signup"
          ? await sb.auth.signUp({
              email: email.trim(),
              password,
            })
          : await sb.auth.signInWithPassword({
              email: email.trim(),
              password,
            });

      if (result.error) {
        showError(result.error.message);
        return;
      }

      if (mode === "signup" && !result.data.session) {
        showSuccess(
          "Please check your email to verify your account."
        );
        return;
      }

      showSuccess("Authentication successful. Redirecting...");

      window.location.assign("/account");
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "Unable to connect to the server. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  function switchMode() {
    setMode(mode === "login" ? "signup" : "login");
    setToast(null);
    setPassword("");
  }

  return (
    <>
      {/* ERROR / SUCCESS POPUP */}
      {toast && (
        <div
          className={`bdg-toast ${
            toast.type === "error"
              ? "bdg-toast-error"
              : "bdg-toast-success"
          }`}
          role={toast.type === "error" ? "alert" : "status"}
          aria-live={toast.type === "error" ? "assertive" : "polite"}
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
            onClick={() => setToast(null)}
            aria-label="Close notification"
          >
            ×
          </button>

          <div className="bdg-toast-progress" />
        </div>
      )}

      {/* LOGIN / SIGNUP FORM */}
      <form className="authbox" onSubmit={submit}>
        <h1>
          {mode === "login"
            ? "Welcome Back"
            : "Create Account"}
        </h1>

        <p className="muted">
          Big Daddy Game Member Access
        </p>

        <label>
          Email Address
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            minLength={6}
            required
            autoComplete={
              mode === "login"
                ? "current-password"
                : "new-password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </label>

        <button
          className="primary full"
          type="submit"
          disabled={busy}
        >
          {busy
            ? "Please Wait..."
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
            onClick={switchMode}
            disabled={busy}
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
