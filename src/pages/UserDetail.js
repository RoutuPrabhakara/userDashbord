import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsers } from "../services/api";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUsers();
      const found = data.find((u) => u.id === parseInt(id));
      setUser(found);
    };

    fetchUser();
  }, [id]);

  if (!user) return <div className="center">Loading...</div>;

  return (
    <div className="detail-page">
      <div className="card">
        <h2>{user.name}</h2>

        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Website:</b> {user.website}</p>

        <div className="section">
          <h3>Address</h3>
          <p>
            {user.address?.street}, {user.address?.city}
          </p>
        </div>

        <div className="section">
          <h3>Company</h3>
          <p>{user.company?.name}</p>
          <p className="tagline">{user.company?.catchPhrase}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;