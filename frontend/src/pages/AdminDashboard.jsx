import { useState, useEffect } from 'react';
import {
  adminGetVolunteers,
  adminGetOrganizations,
  adminGetNeeds,
  adminApproveOrg,
  adminRemoveNeed,
  adminCompleteNeed,
} from '../services/api';
import FormPage from '../components/FormPage';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';

export default function AdminDashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [needs, setNeeds] = useState([]);
  const [tab, setTab] = useState('volunteers');
  const [loading, setLoading] = useState(true);

  const loadAll = () => {
    setLoading(true);
    Promise.all([
      adminGetVolunteers(),
      adminGetOrganizations(),
      adminGetNeeds(),
    ])
      .then(([v, o, n]) => {
        setVolunteers(v.data);
        setOrganizations(o.data);
        setNeeds(n.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleApproveOrg = (id) => {
    adminApproveOrg(id)
      .then(() => loadAll())
      .catch(console.error);
  };

  const handleRemoveNeed = (id) => {
    if (confirm('Remove this opportunity?')) {
      adminRemoveNeed(id)
        .then(() => loadAll())
        .catch(console.error);
    }
  };

  const handleCompleteNeed = (id) => {
    adminCompleteNeed(id)
      .then(() => loadAll())
      .catch(console.error);
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">Loading admin dashboard...</div>
    );
  }

  return (
    <FormPage title="Admin Dashboard" description="Approve orgs and manage requests.">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="needs">Requests</TabsTrigger>
        </TabsList>
      </Tabs>

      {tab === 'volunteers' && (
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">City</th>
                <th className="p-3 font-semibold">Interests</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((v) => (
                <tr key={v._id} className="border-t">
                  <td className="p-3">{v.name}</td>
                  <td className="p-3">{v.email}</td>
                  <td className="p-3">{v.city}</td>
                  <td className="p-3">{v.interests?.join(', ') || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {volunteers.length === 0 && (
            <p className="p-6 text-gray-500">No volunteers yet.</p>
          )}
        </div>
      )}

      {tab === 'organizations' && (
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Contact</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="p-3">{o.name}</td>
                  <td className="p-3">{o.contactPerson} ({o.email})</td>
                  <td className="p-3">
                    <Badge variant={o.approved ? "secondary" : "outline"}>
                      {o.approved ? 'Approved' : 'Pending'}
                    </Badge>
                  </td>
                  <td className="p-3">
                    {!o.approved && (
                      <Button
                        onClick={() => handleApproveOrg(o._id)}
                        size="sm"
                      >
                        Approve
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {organizations.length === 0 && (
            <p className="p-6 text-gray-500">No organizations yet.</p>
          )}
        </div>
      )}

      {tab === 'needs' && (
        <div className="space-y-4">
          {needs.map((n) => (
            <div
              key={n._id}
              className="bg-white p-5 rounded-xl shadow border flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-bold text-lg">{n.title}</h3>
                <p className="text-sm text-gray-600">{n.organizationId?.name} · {n.status}</p>
              </div>
              <div className="flex gap-2">
                {n.status !== 'completed' && (
                  <Button
                    onClick={() => handleCompleteNeed(n._id)}
                    size="sm"
                  >
                    Mark Completed
                  </Button>
                )}
                <Button
                  onClick={() => handleRemoveNeed(n._id)}
                  size="sm"
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          {needs.length === 0 && (
            <p className="p-6 text-gray-500 bg-white rounded-xl border">No opportunities yet.</p>
          )}
        </div>
      )}
    </FormPage>
  );
}
