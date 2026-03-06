import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function OpportunityCard({ need, showVolunteerButton = false }) {
  const slotsLeft = need.volunteersNeeded - (need.volunteersJoined?.length || 0);
  const isFull = slotsLeft <= 0;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base sm:text-lg">{need.title}</CardTitle>
          <Badge variant="secondary">{need.category}</Badge>
        </div>
        {need.organizationId?.name ? (
          <div className="text-sm text-muted-foreground">by {need.organizationId.name}</div>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-3">
        {need.description ? (
          <p className="text-sm text-muted-foreground line-clamp-2">{need.description}</p>
        ) : null}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span>📍 {need.location || 'TBD'}</span>
          <span>📅 {new Date(need.date).toLocaleDateString()}</span>
          <span>👥 {need.volunteersJoined?.length || 0} of {need.volunteersNeeded} needed{isFull && (need.volunteersJoined?.length || 0) > need.volunteersNeeded ? ` (+${(need.volunteersJoined?.length || 0) - need.volunteersNeeded} extra)` : ''}</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/opportunities/${need._id}`}>View Details</Link>
        </Button>
        {showVolunteerButton ? (
          isFull ? (
            <Button asChild variant="secondary" className="flex-1">
              <Link to={`/opportunities/${need._id}`}>Join as additional volunteer</Link>
            </Button>
          ) : (
            <Button asChild className="flex-1">
              <Link to={`/opportunities/${need._id}`}>I Can Help</Link>
            </Button>
          )
        ) : null}
      </CardFooter>
    </Card>
  );
}
