import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getNeedById, volunteerForNeed } from '../services/api';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userType } = useAuth();
  const [need, setNeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    getNeedById(id)
      .then((res) => {
        setNeed(res.data);
        const isJoined = res.data.volunteersJoined?.some((v) => String(v._id) === String(user?.id));
        setJoined(isJoined);
      })
      .catch(() => setNeed(null))
      .finally(() => setLoading(false));
  }, [id, user?.id]);

  const handleVolunteer = async () => {
    if (userType !== 'volunteer') {
      setError('Please log in to join this KindLoop.');
      return;
    }
    setJoining(true);
    setError('');
    try {
      const { data } = await volunteerForNeed(id);
      setNeed(data);
      setJoined(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not sign up');
    } finally {
      setJoining(false);
    }
  };

  const joinedCount = need?.volunteersJoined?.length || 0;
  const slotsLeft = need ? Math.max(0, need.volunteersNeeded - joinedCount) : 0;
  const isFull = slotsLeft <= 0;
  const additionalCount = need ? Math.max(0, joinedCount - need.volunteersNeeded) : 0;

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">Loading...</div>
    );
  }

  if (!need) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">KindLoop not found.</p>
        <Button variant="link" onClick={() => navigate('/opportunities')} className="mt-4">
          Back to KindLoops
        </Button>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-2xl">KindLoop: {need.title}</CardTitle>
          <Badge variant="secondary">{need.category}</Badge>
        </div>
        {need.description ? (
          <p className="text-sm text-muted-foreground">{need.description}</p>
        ) : null}
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p><span className="font-medium text-foreground">Organization:</span> {need.organizationId?.name}</p>
        <p><span className="font-medium text-foreground">Location:</span> {need.location || 'TBD'}</p>
        <p><span className="font-medium text-foreground">Date:</span> {new Date(need.date).toLocaleString()}</p>
        <p>
          <span className="font-medium text-foreground">Helpers:</span>{" "}
          {joinedCount} signed up for {need.volunteersNeeded} needed
          {additionalCount > 0 ? ` (+${additionalCount} additional)` : ""}
        </p>
        {need.estimatedHours > 0 ? (
          <p><span className="font-medium text-foreground">Estimated hours:</span> {need.estimatedHours}</p>
        ) : null}
        {need.contactInstructions ? (
          <p><span className="font-medium text-foreground">Contact:</span> {need.contactInstructions}</p>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button variant="outline" onClick={() => navigate('/opportunities')} className="w-full sm:w-auto">
          Back
        </Button>

        {userType === 'volunteer' && !joined ? (
          <Button onClick={handleVolunteer} disabled={joining} className="w-full sm:flex-1 h-12 text-base">
            {joining ? 'Signing up...' : isFull ? 'Join the Loop (additional)' : 'Join the Loop'}
          </Button>
        ) : null}

        {joined ? (
          <Badge className="w-full justify-center sm:w-auto" variant="secondary">
            ✓ You signed up!
          </Badge>
        ) : null}

        {isFull && !userType ? (
          <Badge className="w-full justify-center sm:w-auto" variant="outline">
            Slots filled — sign in to join as additional helper
          </Badge>
        ) : null}
      </CardFooter>

      {need.volunteersJoined?.length > 0 ? (
        <div className="border-t p-6">
          <div className="text-sm font-medium">Helpers ({need.volunteersJoined.length})</div>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {need.volunteersJoined.map((v) => (
              <li key={v._id}>• {v.name} {v.email ? `(${v.email})` : ""}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}
