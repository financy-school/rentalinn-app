import axios from 'axios';
import {FINANCY_ENDPOINT_URL} from '../../config';

export const handleUserSignup = async credentials => {
  const url = `${FINANCY_ENDPOINT_URL}/auth/register`;
  const signup_res = await axios.post(url, credentials);

  return signup_res.data;
};

export const handleUserLogin = async credentials => {
  const url = `${FINANCY_ENDPOINT_URL}/auth/login`;

  const login_res = await axios.post(url, credentials);

  return login_res.data;
};

export const analyticsDashBoard = (accessToken, startDate, endDate) => {
  let url = `${FINANCY_ENDPOINT_URL}/analytics/dashboard`;

  if (!!startDate && !!endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }

  const analytics_res = axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return analytics_res;
};

export const analyticsPerformance = (accessToken, startDate, endDate) => {
  let url = `${FINANCY_ENDPOINT_URL}/analytics/performance`;

  if (!!startDate && !!endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }

  const performance_res = axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return performance_res;
};

export const propertyRooms = (accessToken, propertyId) => {
  const url = `${FINANCY_ENDPOINT_URL}/properties/${propertyId}/rooms`;

  const rooms_res = axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return rooms_res;
};

export const createRoom = (accessToken, propertyId, roomData) => {
  const url = `${FINANCY_ENDPOINT_URL}/properties/${propertyId}/rooms`;

  const create_room_res = axios.post(url, roomData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return create_room_res;
};

export const updateRoom = (accessToken, propertyId, roomId, roomData) => {
  const url = `${FINANCY_ENDPOINT_URL}/properties/${propertyId}/rooms/${roomId}`;

  const update_room_res = axios.put(url, roomData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return update_room_res;
};

export const deleteRoom = (accessToken, propertyId, roomId) => {
  const url = `${FINANCY_ENDPOINT_URL}/properties/${propertyId}/rooms/${roomId}`;

  const delete_room_res = axios.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return delete_room_res;
};

export const addTenant = (accessToken, propertyId, tenantData) => {
  const url = `${FINANCY_ENDPOINT_URL}/tenants`;

  const add_tenant_res = axios.post(
    url,
    {...tenantData, propertyId: propertyId.toString()},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return add_tenant_res;
};

export const fetchTenants = (accessToken, propertyId) => {
  const url = `${FINANCY_ENDPOINT_URL}/tenants`;

  const tenants_res = axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      propertyId: propertyId.toString(),
    },
  });

  return tenants_res;
};

export const createTicket = (accessToken, ticketData) => {
  const url = `${FINANCY_ENDPOINT_URL}/tickets`;
  console.log(ticketData);

  const create_ticket_res = axios.post(url, ticketData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return create_ticket_res;
};

export const fetchTickets = (accessToken, propertyId) => {
  const url = `${FINANCY_ENDPOINT_URL}/tickets?propertyId=${propertyId}`;

  const tickets_res = axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return tickets_res;
};

export const updateTicket = (accessToken, ticketId, ticketData) => {
  const url = `${FINANCY_ENDPOINT_URL}/tickets/${ticketId}`;

  const update_ticket_res = axios.put(url, ticketData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return update_ticket_res;
};
