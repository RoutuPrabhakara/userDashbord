import React, { useState, useEffect, useMemo } from "react";
import { getUsers } from "../services/api";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users once
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Memoized filtered users based on search
  const filteredUsers = useMemo(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const exact = users.find(
      (user) =>
        user.name.toLowerCase() === search.toLowerCase() ||
        user.email.toLowerCase() === search.toLowerCase()
    );

    setSelectedUser(exact || null);

    return filtered;
  }, [search, users]);

  if (loading) return <Loader />;

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />

      {selectedUser ? (
        <div className="detail-page">
          <div className="card">
            <h2>{selectedUser.name}</h2>
            <p><b>Username:</b> {selectedUser.username}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Phone:</b> {selectedUser.phone}</p>
            <p><b>Website:</b> {selectedUser.website}</p>

            <div className="section">
              <h3>Address</h3>
              <p>
                {selectedUser.address?.street}, {selectedUser.address?.city}
              </p>
            </div>

            <div className="section">
              <h3>Company</h3>
              <p>{selectedUser.company?.name}</p>
              <p className="tagline">{selectedUser.company?.catchPhrase}</p>
            </div>
          </div>
        </div>
      ) : (
        <UserTable users={filteredUsers} />
      )}
    </div>
  );
};

export default Dashboard;