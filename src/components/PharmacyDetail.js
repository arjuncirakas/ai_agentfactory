import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PharmacyDetail = () => {
  const [pharmacy, setPharmacy] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    axios.get('/api/pharmacies')
      .then(response => {
        setPharmacy(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filteredPharmacies = pharmacy.filter(pharmacyData =>
    pharmacyData.name.toLowerCase().includes(searchTerm) || pharmacyData.address.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <header className="app-header">
        <h1>Pharmacy Management System</h1>
        <p>This system is designed to streamline the operations of a pharmacy by providing a comprehensive platform for inventory tracking, prescription processing, patient records management, billing, and supplier management.</p>
      </header>
      <div className="filter-container">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by pharmacy name or address"
        />
        {filteredPharmacies.length > 0 && (
          <ul>
            {filteredPharmacies.map(pharmacyData => (
              <li key={pharmacyData.id}>
                <Link to={`/pharmacies/${pharmacyData.id}`}>
                  {pharmacyData.name} - {pharmacyData.address}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PharmacyDetail;