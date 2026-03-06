import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormPage from '../components/FormPage';
import FormSection from '../components/FormSection';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

export default function OrganizationSignup() {
  const navigate = useNavigate();
  const { orgSignUp } = useAuth();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    contactPerson: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await orgSignUp(form);
      navigate('/org/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Sign up failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPage
        title="Organization Sign Up"
        description="After you sign up, an admin approves your organization. Then you can post volunteer needs."
      >
        {error ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <FormSection title="Organization details" hint="Fields marked * are required.">
          <div className="grid gap-2">
            <Label htmlFor="org-name">Organization Name *</Label>
            <Input
              id="org-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Sunny Food Bank"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="org-contact">Contact Person *</Label>
            <Input
              id="org-contact"
              required
              value={form.contactPerson}
              onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
              placeholder="Ava Martinez"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="org-email">Email *</Label>
            <Input
              id="org-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contact@sunnyfoodbank.org"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="org-password">Password *</Label>
            <Input
              id="org-password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="At least 6 characters"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="org-phone">Phone</Label>
              <Input
                id="org-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-location">Location</Label>
              <Input
                id="org-location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Downtown"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="org-desc">Description</Label>
            <Textarea
              id="org-desc"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What does your organization do? (1–2 sentences)"
            />
          </div>
        </FormSection>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline-offset-4 hover:underline">
              Login
            </Link>
          </p>
          <Button type="submit" className="h-12 px-8 text-base">
            Submit
          </Button>
        </div>
      </FormPage>
    </form>
  );
}
