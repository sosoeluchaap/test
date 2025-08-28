import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const isEmailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isEmailValid(email)) {
      toast.error("Adresse e-mail invalide", { description: "Veuillez renseigner une adresse complète (ex: nom@domaine.com)" });
      return;
    }
    toast.success("Signed in", { description: `Welcome back, ${email || "user"}!` });
  };

  const showEmailError = (emailTouched || submitted) && email.length > 0 && !isEmailValid(email);
  const isDisabled = !email || password.length < 6 || showEmailError;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div
        className="relative h-[36vh] md:h-[44vh] bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[hsl(var(--background))]" />
      </div>

      <main className="relative z-20 -mt-24 md:-mt-28 px-4 md:px-6">
        <section className="mx-auto max-w-md">
          <div className="rounded-3xl bg-card text-card-foreground shadow-xl ring-1 ring-black/5 overflow-hidden">
            <header className="px-6 pt-6 pb-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Bienvenue</p>
              <h1 className="mt-1 text-2xl font-bold leading-tight">Connectez-vous</h1>
              <p className="mt-1 text-sm text-muted-foreground">Accédez à votre espace en toute sécurité</p>
            </header>

            <form onSubmit={onSubmit} className="px-6 pb-6">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Email ou numéro</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      inputMode="email"
                      placeholder="jean@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      aria-invalid={showEmailError}
                      className={`h-12 rounded-full pl-12 pr-4 bg-white/90 shadow-sm focus-visible:ring-[hsl(var(--ring))] ${showEmailError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                  </div>
                  {showEmailError && (
                    <p className="mt-1 text-xs text-destructive">Adresse e-mail invalide</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-full pl-12 pr-12 bg-white/90 shadow-sm focus-visible:ring-[hsl(var(--ring))]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <Switch checked={remember} onCheckedChange={setRemember} />
                    <span className="text-sm text-muted-foreground">Se souvenir de moi</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast("Réinitialisation", { description: "Un lien de réinitialisation a été envoyé si l'email existe." })}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isDisabled}
                  className="h-12 w-full rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 disabled:opacity-50"
                >
                  Se connecter
                </Button>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Connexion sécurisée et chiffrée</span>
                </div>
              </div>
            </form>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            En vous connectant, vous acceptez nos conditions d'utilisation.
          </p>
        </section>
      </main>
    </div>
  );
}
