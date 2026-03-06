import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormPage from '../components/FormPage';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function Login() {
  const navigate = useNavigate();
  const { volunteerLogIn, orgLogIn, adminLogIn } = useAuth();
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('volunteer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (userType === 'volunteer') {
        await volunteerLogIn(email, password);
        navigate('/volunteer/dashboard');
      } else if (userType === 'organization') {
        await orgLogIn(email, password);
        navigate('/org/dashboard');
      } else {
        await adminLogIn(email, password);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPage title="Login" description="Choose your role, then sign in.">
        {error ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <div className="space-y-2">
          <Label>Log in as</Label>
          <Tabs value={userType} onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
              <TabsTrigger value="organization">Organization</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="login-email">Email *</Label>
          <Input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="login-password">Password *</Label>
          <Input
            id="login-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </div>

        <Button type="submit" className="h-12 w-full text-base">
          Login
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          {userType === 'volunteer' && (
            <Link to="/volunteer/signup" className="text-primary underline-offset-4 hover:underline">
              Volunteer Sign Up
            </Link>
          )}
          {userType === 'organization' && (
            <Link to="/org/signup" className="text-primary underline-offset-4 hover:underline">
              Organization Sign Up
            </Link>
          )}
        </p>
      </FormPage>
    </form>
  );
}
