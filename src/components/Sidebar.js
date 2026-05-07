import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = { display: "block", padding: "0.5rem 1rem", color: "#1e3a5f", textDecoration: "none" };

export default function Sidebar() {
  return (
    <aside style={{ width: 200, background: "#fff", borderRight: "1px solid #e0e0e0" }}>
      <nav style={{ paddingTop: "1rem" }}>
        <NavLink to="/" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/inventory" style={linkStyle}>Inventory</NavLink>
        <NavLink to="/prescriptions" style={linkStyle}>Prescriptions</NavLink>
        <NavLink to="/billing" style={linkStyle}>Billing</NavLink>
        <NavLink to="/suppliers" style={linkStyle}>Suppliers</NavLink>
      </nav>
    </aside>
  );
}
