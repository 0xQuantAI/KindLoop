import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrgNeeds, createNeed } from '../services/api';
import FormPage from '../components/FormPage';
import FormSection from '../components/FormSection';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';

const CATEGORIES = ['Baking', 'Tutoring', 'Events', 'Food Drive', 'Community Help'];

export default function OrganizationDashboard() {
  const { user } = useAuth();
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    volunteersNeeded: 1,
    contactInstructions: '',
    estimatedHours: '',
  });
  const [error, setError] = useState('');

  const loadNeeds = () => {
    getOrgNeeds()
      .then((res) => setNeeds(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadNeeds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createNeed(form);
      setForm({
        title: '',
        description: '',
        category: '',
        location: '',
        date: '',
        volunteersNeeded: 1,
        contactInstructions: '',
        estimatedHours: '',
      });
      setShowForm(false);
      loadNeeds();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">Loading...</div>
    );
  }

  return (
    <div className="space-y-8">
      <FormPage
        title={user?.name || "Organization"}
        description={user?.approved ? "Post volunteer needs and see who signed up." : "Your account is pending approval."}
      >
        {!user?.approved ? (
          <div className="rounded-md border bg-muted p-4 text-sm text-muted-foreground">
            Your organization is pending approval. An admin must approve you before you can post opportunities.
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm text-muted-foreground">Volunteer needs</div>
            <div className="text-lg font-semibold">{needs.length}</div>
          </div>
          {user?.approved ? (
            <Button variant={showForm ? "outline" : "default"} onClick={() => setShowForm(!showForm)} type="button">
              {showForm ? 'Cancel' : 'Post New Need'}
            </Button>
          ) : null}
        </div>

        {showForm ? (
          <div className="rounded-xl border bg-card">
            <div className="h-2 w-full rounded-t-xl bg-primary" />
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error ? (
                  <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                ) : null}

                <FormSection title="Opportunity details" hint="Keep it short and clear — like a Google Form.">
                  <div className="grid gap-2">
                    <Label htmlFor="need-title">Title *</Label>
                    <Input
                      id="need-title"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Pack food boxes (Saturday morning)"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="need-desc">Description</Label>
                    <Textarea
                      id="need-desc"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="What will volunteers do? What should they bring?"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="need-category">Category *</Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) => setForm({ ...form, category: value })}
                    >
                      <SelectTrigger id="need-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="need-location">Location</Label>
                      <Input
                        id="need-location"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="need-date">Date *</Label>
                      <Input
                        id="need-date"
                        type="datetime-local"
                        required
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="need-vols">Volunteers Needed *</Label>
                      <Input
                        id="need-vols"
                        type="number"
                        min={1}
                        required
                        value={form.volunteersNeeded}
                        onChange={(e) =>
                          setForm({ ...form, volunteersNeeded: parseInt(e.target.value) || 1 })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="need-hours">Estimated Hours</Label>
                      <Input
                        id="need-hours"
                        type="number"
                        min={0}
                        value={form.estimatedHours}
                        onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })}
                        placeholder="2"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="need-contact">Contact Instructions</Label>
                    <Input
                      id="need-contact"
                      value={form.contactInstructions}
                      onChange={(e) =>
                        setForm({ ...form, contactInstructions: e.target.value })
                      }
                      placeholder="Text Sam at (555) 111-2222 when you arrive"
                    />
                  </div>
                </FormSection>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button type="submit" className="h-12 px-8 text-base">
                    Post Need
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        <div className="space-y-4">
          {needs.length === 0 ? (
            <div className="rounded-md border bg-card p-6 text-sm text-muted-foreground">
              No volunteer needs yet. Click “Post New Need” to create one.
            </div>
          ) : (
            needs.map((need) => (
              <div key={need._id} className="rounded-xl border bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-base font-semibold">{need.title}</div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant={need.status === "completed" ? "secondary" : "outline"}>
                        {need.status}
                      </Badge>
                      <span>•</span>
                      <span>
                        {need.volunteersJoined?.length || 0}/{need.volunteersNeeded} volunteers
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(need.date).toLocaleDateString()}
                  </div>
                </div>

                {need.description ? (
                  <p className="mt-3 text-sm text-muted-foreground">{need.description}</p>
                ) : null}

                <div className="mt-3 text-sm text-muted-foreground">
                  {need.location ? <span>📍 {need.location}</span> : <span>📍 TBD</span>}
                </div>

                {need.volunteersJoined?.length > 0 ? (
                  <div className="mt-4 rounded-lg bg-muted p-4">
                    <div className="text-sm font-medium">Volunteers</div>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {need.volunteersJoined.map((v) => (
                        <li key={v._id}>
                          • {v.name} ({v.email}) {v.phone ? `– ${v.phone}` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </FormPage>
    </div>
  );
}
