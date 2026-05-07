import React, { useEffect, useState } from "react";
import axios from "axios";

export default function InventoryPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/inventory", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        });
        if (!cancelled) setRows((rows) => Array.isArray(rows) ? rows : rows?.items || []);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div role="alert">{error}</div>;

  return (
    <div>
      <h1>Inventory</h1>
      <p>{rows.length} record(s)</p>
    </div>
  );
}