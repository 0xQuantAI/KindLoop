import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">
            Help your community — one small task at a time.
          </h1>
          <p className="text-lg text-muted-foreground">
            Organizations post simple volunteer needs. Volunteers sign up in one click.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 px-8 text-base">
              <Link to="/opportunities">Browse Opportunities</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 text-base">
              <Link to="/volunteer/signup">Sign Up as Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Volunteers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Sign up, browse opportunities, and click “I Can Help”.</p>
            <Button asChild variant="link" className="px-0">
              <Link to="/volunteer/signup">Get started →</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Organizations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Register, get approved, then post needs for volunteers.</p>
            <Button asChild variant="link" className="px-0">
              <Link to="/org/signup">Get started →</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
