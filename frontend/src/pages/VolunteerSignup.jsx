import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormPage from '../components/FormPage';
import FormSection from '../components/FormSection';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

const INTERESTS = ['Baking', 'Tutoring', 'Event Help', 'Senior Care', 'Animal Care', 'Community Service'];

export default function VolunteerSignup() {
  const navigate = useNavigate();
  const { volunteerSignUp } = useAuth();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    interests: [],
  });

  const toggleInterest = (interest) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((i) => i !== interest)
        : [...f.interests, interest],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await volunteerSignUp(form);
      navigate('/volunteer/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Sign up failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPage
        title="Volunteer Sign Up"
        description="Fill this out once. Then you can join opportunities with one click."
      >
        {error ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <FormSection title="Your info" hint="Fields marked * are required.">
          <div className="grid gap-2">
            <Label htmlFor="vol-name">Name *</Label>
            <Input
              id="vol-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jordan Lee"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="vol-email">Email *</Label>
            <Input
              id="vol-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jordan@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="vol-password">Password *</Label>
            <Input
              id="vol-password"
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
              <Label htmlFor="vol-phone">Phone</Label>
              <Input
                id="vol-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vol-city">City</Label>
              <Input
                id="vol-city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Austin"
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="What do you like helping with?"
          hint="Pick as many as you want."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {INTERESTS.map((interest) => {
              const checked = form.interests.includes(interest);
              return (
                <label
                  key={interest}
                  className="flex items-start gap-3 rounded-lg border bg-background p-3 hover:bg-accent/40"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleInterest(interest)}
                    aria-label={interest}
                  />
                  <div className="leading-tight">
                    <div className="text-sm font-medium">{interest}</div>
                    <div className="text-xs text-muted-foreground">
                      {interest === "Baking" ? "Cakes, cookies, meals, etc." : "Opportunities in this category"}
                    </div>
                  </div>
                </label>
              );
            })}
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
