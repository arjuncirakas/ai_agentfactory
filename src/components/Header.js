import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  return (
    <header style={{ padding: "0.75rem 1rem", background: "#1e3a5f", color: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong>Pharmacy</strong>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link to="/" style={{ color: "#fff" }}>Dashboard</Link>
          {isAuthenticated && <button type="button" onClick={logout} style={{ color: "#fff" }}>Logout</button>}
          {!isAuthenticated && <Link to="/login" style={{ color: "#fff" }}>Login</Link>}
        </nav>
      </div>
      {user && <small>{user.email || "User"}</small>}
    </header>
  );
}
