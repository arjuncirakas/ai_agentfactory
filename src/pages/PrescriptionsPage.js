import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PrescriptionsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/prescriptions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      });
      if (!loading) setRows(response.data ? response.data : response.data?.items || []);
    } catch (error) {
      if (!loading) setError(error?.message || "Failed to load");
    }
  };

  useEffect(() => {
    let cancelled = false;
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div role="alert">{error}</div>;

  return (
    <div>
      <h1>Prescriptions</h1>
      <p>{rows.length} record(s)</p>
    </div>
  );
}