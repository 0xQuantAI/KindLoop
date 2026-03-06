import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getVolunteerMe, getNeeds } from '../services/api';
import OpportunityCard from '../components/OpportunityCard';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const [openNeeds, setOpenNeeds] = useState([]);
  const [opportunitiesJoined, setOpportunitiesJoined] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getNeeds({ status: 'open' }),
      getVolunteerMe(),
    ])
      .then(([openRes, meRes]) => {
        setOpenNeeds(openRes.data);
        const joined = meRes.data.opportunitiesJoined || [];
        setOpportunitiesJoined(joined);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const myJoined = opportunitiesJoined.filter((o) => o.status === 'open' || o.status === 'filled');
  const myCompleted = opportunitiesJoined.filter((o) => o.status === 'completed');
  const joinedIds = new Set(myJoined.map((o) => o._id));

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">Loading your dashboard...</div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-emerald-800">Hi, {user?.name}!</h1>
        <p className="text-gray-600">Here are your volunteer opportunities.</p>
      </div>

      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Open Opportunities</h2>
        <div className="space-y-4">
          {openNeeds.length === 0 ? (
            <p className="text-gray-500 bg-white p-6 rounded-xl border">
              No open opportunities right now. Check the opportunity board!
            </p>
          ) : (
            openNeeds
              .filter((n) => !joinedIds.has(n._id))
              .slice(0, 5)
              .map((need) => (
                <OpportunityCard key={need._id} need={need} showVolunteerButton />
              ))
          )}
        </div>
        <Link
          to="/opportunities"
          className="inline-block mt-4 py-2 px-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
        >
          Browse All Opportunities
        </Link>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Opportunities I Signed Up For</h2>
        <div className="space-y-4">
          {myJoined.length === 0 ? (
            <p className="text-gray-500 bg-white p-6 rounded-xl border">
              You haven&apos;t signed up for any opportunities yet.
            </p>
          ) : (
            myJoined.map((need) => (
              <OpportunityCard key={need._id} need={need} />
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Completed</h2>
        <div className="space-y-4">
          {myCompleted.length === 0 ? (
            <p className="text-gray-500 bg-white p-6 rounded-xl border">
              No completed opportunities yet.
            </p>
          ) : (
            myCompleted.map((need) => (
              <OpportunityCard key={need._id} need={need} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
