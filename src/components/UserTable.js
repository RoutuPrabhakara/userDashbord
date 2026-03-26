import React from "react";
import { useNavigate } from "react-router-dom";

const UserTable = ({
  users,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) => {
  const navigate = useNavigate();

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th
            onClick={() => handleSort("name")}
            className="cursor-pointer"
          >
            Name
          </th>
          <th>Email</th>
          <th>Phone</th>
          <th
            onClick={() => handleSort("company")}
            className="cursor-pointer"
          >
            Company
          </th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="text-center cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/user/${user.id}`)}
          >
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>

            {/* 🔥 IMPORTANT FIX (safe access) */}
            <td>{user.company?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;