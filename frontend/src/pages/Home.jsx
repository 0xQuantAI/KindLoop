import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Heart,
  Building2,
  ArrowRight,
  Sparkles,
  Users,
  CalendarCheck,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="-mt-8 flex flex-col">
      {/* Hero — full-width, high-impact */}
      <section
        className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden border-b"
        aria-label="Hero"
      >
        {/* Background: gradient + soft radial glow */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/12 via-primary/5 to-background"
          aria-hidden
        />
        <div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/8 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 md:py-36">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/90 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur sm:mb-8">
              <Sparkles className="h-4 w-4" aria-hidden />
              Connecting people through simple acts of kindness
            </p>

            {/* Main headline — benefit-first */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">One small act.</span>
              <span className="block text-foreground">
                A ripple of good.
              </span>
            </h1>

            {/* Brand + tagline */}
            <p className="mt-6 text-xl font-semibold tracking-tight text-primary sm:mt-8 sm:text-2xl md:text-3xl">
              KindLoop
            </p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Post what your community needs. Join when you can. No forms, no long-term commitment — just show up and help.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:gap-5">
              <Button asChild size="lg" className="h-12 w-full px-8 text-base font-semibold shadow-lg sm:h-14 sm:w-auto sm:px-10">
                <Link to="/opportunities" className="inline-flex items-center gap-2">
                  Find a KindLoop
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 w-full border-2 px-8 text-base font-medium sm:h-14 sm:w-auto sm:px-10">
                <Link to="/volunteer/signup">Join a KindLoop</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Free to use · Browse without signing up
            </p>
          </div>
        </div>
      </section>

      {/* Below KindLoop — Start vs Join */}
      <section className="mx-auto w-full max-w-5xl px-4 py-14 sm:py-16" aria-labelledby="audience-heading">
        <h2 id="audience-heading" className="sr-only">
          Start or join a KindLoop
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="overflow-hidden border-2 transition-shadow hover:shadow-md">
            <CardHeader className="space-y-2 pb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" aria-hidden />
              </div>
              <CardTitle className="text-xl">Start a KindLoop</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-sm leading-relaxed">
                Post something your community needs.
              </p>
              <Button asChild variant="link" className="h-auto px-0 font-medium text-primary">
                <Link to="/org/signup" className="inline-flex items-center gap-1">
                  Get started
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 transition-shadow hover:shadow-md">
            <CardHeader className="space-y-2 pb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Heart className="h-6 w-6" aria-hidden />
              </div>
              <CardTitle className="text-xl">Join a KindLoop</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-sm leading-relaxed">
                Help someone and make an impact.
              </p>
              <Button asChild variant="link" className="h-auto px-0 font-medium text-primary">
                <Link to="/volunteer/signup" className="inline-flex items-center gap-1">
                  Get started
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section
        className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-y bg-muted/50"
        aria-labelledby="how-heading"
      >
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-14">
          <h2 id="how-heading" className="mb-8 text-center text-2xl font-semibold tracking-tight">
            Simple from start to finish
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-medium text-foreground">Browse</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                See KindLoops by category, location, and date.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Heart className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-medium text-foreground">Join the Loop</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                One click to join. No forms or long applications.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <CalendarCheck className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-medium text-foreground">Show up</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get details and contact info. Go help when it works for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-5xl px-4 py-14 sm:py-16" aria-labelledby="cta-heading">
        <div className="rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-10">
          <h2 id="cta-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to make a difference?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Browse KindLoops now — no account needed to look around.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-11 px-6">
              <Link to="/opportunities">Find a KindLoop</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 px-6">
              <Link to="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
