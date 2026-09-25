const API_BASE = '/api';

async function checkResponse(response) {
  const text = await response.text();
  if (!response.ok) {
    let message = `API request failed: ${response.status} ${response.statusText}`;
    try {
      const json = JSON.parse(text);
      if (json?.error) message = json.error;
    } catch (_error) {
      if (text.trim().startsWith('<')) {
        message = 'API request failed: received HTML response from backend';
      }
    }
    throw new Error(message);
  }
  if (!text) return {};
  if (text.trim().startsWith('<')) {
    throw new Error('Invalid API response: expected JSON but received HTML. Check the backend for errors.');
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Invalid JSON response from API: ${error.message}`);
  }
}

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (response.status === 401) {
      const text = await response.text();
      try {
        const json = JSON.parse(text);
        throw new Error(json.error || 'Username or password is incorrect.');
      } catch (_error) {
        throw new Error('Username or password is incorrect.');
      }
    }

    return await checkResponse(response);
  } catch (error) {
    throw new Error(error.message || 'Login failed. Please check your credentials and backend status.');
  }
}

function buildUserHeaders(userRole, userId) {
  const headers = {
    'Content-Type': 'application/json',
    'X-User-Role': userRole || 'STAFF'
  };
  if (userId !== undefined && userId !== null) {
    headers['X-User-Id'] = String(userId);
  }
  return headers;
}

export async function fetchUsers(userRole, userId) {
  const response = await fetch(`${API_BASE}/users`, {
    headers: buildUserHeaders(userRole, userId)
  });
  return await checkResponse(response);
}

export async function createUser(item, userRole, userId) {
  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: buildUserHeaders(userRole, userId),
    body: JSON.stringify(item)
  });
  return await checkResponse(response);
}

export async function updateUser(id, item, userRole, userId) {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: buildUserHeaders(userRole, userId),
    body: JSON.stringify(item)
  });
  return await checkResponse(response);
}

export async function deleteUser(id, userRole, userId) {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    headers: buildUserHeaders(userRole, userId)
  });
  return await checkResponse(response);
}

export async function fetchUserActivity(userId, callerId, userRole) {
  const response = await fetch(`${API_BASE}/users/${userId}/activity`, {
    headers: buildUserHeaders(userRole, callerId)
  });
  return await checkResponse(response);
}

export async function fetchInventory() {
  const response = await fetch(`${API_BASE}/inventory`);
  return await checkResponse(response);
}

export async function fetchProjectData() {
  const response = await fetch(`${API_BASE}/data`);
  return await checkResponse(response);
}

export async function fetchTransactions() {
  const response = await fetch(`${API_BASE}/transactions`);
  return await checkResponse(response);
}

export async function createTransaction(transaction) {
  const response = await fetch(`${API_BASE}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  });
  return await checkResponse(response);
}

export async function updateTransactionItemStatus(txnId, itemStatus) {
  const response = await fetch(`${API_BASE}/transactions/${encodeURIComponent(txnId)}/item-status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemStatus })
  });
  return await checkResponse(response);
}

export async function updateTransactionPaymentStatus(txnId, paymentAmount) {
  const response = await fetch(`${API_BASE}/transactions/${encodeURIComponent(txnId)}/payment-status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ paymentAmount })
  });
  return await checkResponse(response);
}

export async function createCustomer(customer) {
  const response = await fetch(`${API_BASE}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
  });
  return await checkResponse(response);
}

export async function createInventoryItem(item) {
  const response = await fetch(`${API_BASE}/inventory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  });
  return await checkResponse(response);
}
