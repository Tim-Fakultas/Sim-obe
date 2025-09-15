"use client"; // wajib karena ada useState/useEffect dan DOM manipulation

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useState, useEffect } from "react";
import { User, StudyProgram, Role } from "@/lib/user";

interface Props {
  apiUrl: string; // base url API Laravel
}

export default function UserTable({ apiUrl }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [psList, setPsList] = useState<StudyProgram[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data.data));

    fetch(`${apiUrl}/program-studi`) // contoh endpoint program studi
      .then((res) => res.json())
      .then((data) => setPsList(data));

    fetch(`${apiUrl}/roles`) // contoh endpoint roles
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, [apiUrl]);

  const handleEdit = (userId: number) => {
    fetch(`${apiUrl}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setEditingUser(data));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Master User</h1>
      <div className="mb-4 flex justify-end">
        <button className="btn btn-outline-primary">Add User</button>
      </div>

      <div className="overflow-auto">
        <table className="table table-bordered table-hover w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>NIP/NIM</th>
              <th>Name</th>
              <th>Program Studi</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td>{user.nipNim}</td>
                <td>{user.name}</td>
                <td>{user.ps?.namaps || "-"}</td>
                <td>{user.roles.join(", ")}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-outline-info"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => alert("Delete user " + user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit User</h3>
            <form>
              <input
                type="text"
                value={editingUser.nipNim}
                placeholder="NIP/NIM"
              />
              <input type="text" value={editingUser.name} placeholder="Name" />
              <input
                type="email"
                value={editingUser.email}
                placeholder="Email"
              />
              <select value={editingUser.kodeps}>
                {psList.map((ps) => (
                  <option key={ps.kodeps} value={ps.kodeps}>
                    {ps.namaps}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <label key={role.id}>
                    <input
                      type="checkbox"
                      checked={editingUser.roles.includes(role.name)}
                      readOnly
                    />{" "}
                    {role.name}
                  </label>
                ))}
              </div>
              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => setEditingUser(null)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
