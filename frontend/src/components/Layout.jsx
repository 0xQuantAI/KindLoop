import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export default function Layout({ children }) {
  const { user, userType, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              KL
            </span>
            <span>KindLoop</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/opportunities">KindLoops</Link>
            </Button>

            {!user ? (
              <>
                <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/volunteer/signup">Join a KindLoop</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link to="/org/signup">Start a KindLoop</Link>
                </Button>
              </>
            ) : (
              <>
                {userType === 'volunteer' ? (
                  <Button asChild variant="outline">
                    <Link to="/volunteer/dashboard">My Dashboard</Link>
                  </Button>
                ) : null}
                {userType === 'organization' ? (
                  <Button asChild variant="outline">
                    <Link to="/org/dashboard">My Dashboard</Link>
                  </Button>
                ) : null}
                {userType === 'admin' ? (
                  <Button asChild variant="outline">
                    <Link to="/admin">Admin</Link>
                  </Button>
                ) : null}

                <span className="hidden text-sm text-muted-foreground sm:inline">
                  {user.name || user.contactPerson || user.email}
                </span>
                <Button onClick={logout} variant="ghost">
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
