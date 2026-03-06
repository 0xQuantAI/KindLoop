import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

export default function OpportunityCard({ need, showVolunteerButton = false }) {
  const joinedCount = need.volunteersJoined?.length || 0;
  const helpersNeeded = need.volunteersNeeded;
  const isFull = joinedCount >= helpersNeeded;
  const additionalCount = Math.max(0, joinedCount - helpersNeeded);

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="space-y-1">
        <p className="text-base font-semibold leading-tight sm:text-lg">
          KindLoop: {need.title}
        </p>
        {need.organizationId?.name ? (
          <p className="text-sm text-muted-foreground">by {need.organizationId.name}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-2">
        {need.description ? (
          <p className="text-sm text-muted-foreground line-clamp-2">{need.description}</p>
        ) : null}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span>Location: {need.location || 'TBD'}</span>
          <span>Helpers Needed: {helpersNeeded}</span>
          {additionalCount > 0 ? (
            <span className="text-primary">+{additionalCount} extra joined</span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/opportunities/${need._id}`}>View Details</Link>
        </Button>
        {showVolunteerButton ? (
          <Button asChild className="flex-1">
            <Link to={`/opportunities/${need._id}`}>
              {isFull ? 'Join the Loop (additional)' : 'Join the Loop'}
            </Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
