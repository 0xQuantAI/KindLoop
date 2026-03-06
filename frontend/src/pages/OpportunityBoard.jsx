import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNeeds } from '../services/api';
import OpportunityCard from '../components/OpportunityCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const CATEGORIES = ['All', 'Baking', 'Tutoring', 'Events', 'Food Drive', 'Community Help'];

export default function OpportunityBoard() {
  const { user, userType } = useAuth();
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  // Load opportunities for everyone (no login required); API returns open + filled so users can join as additional
  useEffect(() => {
    setError(null);
    const params = {};
    if (category !== 'All') params.category = category;
    if (location.trim()) params.location = location.trim();
    if (date) params.date = date;
    getNeeds(params)
      .then((res) => setNeeds(res.data || []))
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.error || 'Could not load KindLoops.');
        setNeeds([]);
      })
      .finally(() => setLoading(false));
  }, [category, location, date]);

  const showVolunteerButton = userType === 'volunteer';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">KindLoops</h1>
          <p className="text-sm text-muted-foreground">
            Find a KindLoop and join the loop.
          </p>
        </div>
        {!user ? (
          <Badge variant="secondary" className="w-fit">
            Sign up to join
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              type="button"
              variant={category === c ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Input
            placeholder="Filter by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setCategory("All");
              setLocation("");
              setDate("");
            }}
          >
            Clear filters
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-500">Loading KindLoops...</p>
      ) : error ? (
        <p className="text-center py-12 text-destructive bg-destructive/10 p-8 rounded-xl border border-destructive/30">
          {error}
        </p>
      ) : needs.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground bg-card p-8 rounded-xl border">
          No KindLoops at the moment. Check back soon!
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {needs.map((need) => (
            <OpportunityCard
              key={need._id}
              need={need}
              showVolunteerButton={showVolunteerButton}
            />
          ))}
        </div>
      )}

      {!user && (
        <div className="rounded-xl border bg-muted p-4 text-center">
          <p className="text-muted-foreground font-medium">
            Sign up to join KindLoops and click &quot;Join the Loop&quot;.
          </p>
        </div>
      )}
    </div>
  );
}
