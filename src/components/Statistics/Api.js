import axios from 'axios';

export const VenteParJour = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/panier/DayPanierDelivered');
    return response.data ; 
  } catch (error) {
    console.error('Error fetching day panier delivered:', error);
  }
};

export const TotalUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/panier/NumberUsers');
      return response.data ; 
    } catch (error) {
      console.error('Error fetching day panier delivered:', error);
    }
  };

  export const NotDeliveredOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/panier/NumberPanierNotDelevred');
      return response.data ; 
    } catch (error) {
      console.error('Error fetching day panier delivered:', error);
    }
  };

  export const TotalBudget = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/panier/getAllSumOfPrix');
      return response.data 
    } catch (error) {
      console.error('Error fetching day panier delivered:', error);
    }
  };

