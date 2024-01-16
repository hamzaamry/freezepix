import React from 'react';
import Typography from '@mui/material/Typography';

const Orders = () => {
  return (
    <div style={{
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '16px',
    }}>
      <div className="card-header">
        <Typography variant="h5" style={{ fontFamily: 'sans-serif', marginBottom: '1rem' }}>
          Dernières commandes
        </Typography>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", marginBottom: '1rem'
      }}>
        {/* Contenu du premier ensemble d'éléments */}
        <div>
          <Typography variant="body1" style={{ fontFamily: 'sans-serif' }}>
            John Doe
          </Typography>
        </div>
        <div>
          <Typography variant="body1" style={{ fontFamily: 'sans-serif' }}>
            john.doe@example.com
          </Typography>
        </div>
        <div>
          <Typography variant="body1" style={{ fontFamily: 'sans-serif' }}>
            $100
          </Typography>
        </div>
        <div style={{
          borderRadius: '8px',
          padding: '6px',
          backgroundColor: '#71f505',
        }}>
          <Typography variant="body1" style={{ fontFamily: 'sans-serif', color: '#2d6103' }}>
            Payé
          </Typography>
        </div>
      </div>

      {/* Ligne horizontale pour simuler une séparation entre les ensembles d'éléments */}
      <hr style={{ width: '100%', borderTop: '1px solid #ddd' }} />

      <div style={{
        display: "flex", justifyContent: "space-between"
      }}>
        {/* Contenu du deuxième ensemble d'éléments */}
        <div>
          <Typography variant="body1" style={{ fontFamily: 'sans-serif' }}>
            John Doe
          </Typography>
        </div>
        <div>
          <Typography variant="body1" style={{ fontFamily: 'sans-serif' }}>
            john.doe@example.com
          </Typography>
        </div>
        <div>
          <Typography variant="body1" style={{ fontFamily: 'sans-serif' }}>
            $100
          </Typography>
        </div>
        <div style={{
          borderRadius: '8px',
          padding: '6px',
          backgroundColor: '#71f505',
        }}>
          <Typography variant="body1" style={{ fontFamily: 'sans-serif', color: '#2d6103' }}>
            Payé
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Orders;
