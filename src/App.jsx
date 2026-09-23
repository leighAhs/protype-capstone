import React, { useState, useEffect } from 'react';
import { fetchInventory, createInventoryItem, createCustomer, createTransaction, updateTransactionItemStatus, loginUser, fetchUsers, createUser, updateUser, deleteUser, fetchUserActivity, fetchProjectData, fetchTransactions } from './api';

const pageLabels = {
  dashboard: ['Dashboard', 'Overview'],
  pos: ['New Transaction', 'Point of Sale'],
  records: ['Transaction Records', 'All Transactions'],
  customers: ['Customer Directory', 'CRM'],
  inventory: ['Inventory', 'Stock Management'],
  users: ['User Management', 'Admin Control'],
  forecast: ['Sales Forecast', 'Predictive Analytics'],
  architecture: ['System Design', 'Chapter 3 — Design'],
  reports: ['Reports', 'Analytics']
};

const navItems = [
  { section: 'Main', items: [{ id: 'dashboard', label: 'Dashboard' }] },
  {
    section: 'Transactions',
    items: [
      { id: 'pos', label: 'New Transaction' },
      { id: 'records', label: 'Transaction Records' },
      { id: 'customers', label: 'Customers' }
    ]
  },
  {
    section: 'Operations',
    items: [
      { id: 'forecast', label: 'Sales Forecast' }
    ]
  },
  {
    section: 'System',
    items: [
      { id: 'architecture', label: 'System Design', hideForStaff: true },
      { id: 'users', label: 'User Management', requiredRole: 'ADMIN' },
      { id: 'reports', label: 'Reports' }
    ]
  }
];

const formatUserRole = (role) => {
  if (!role) return '';
  const normalized = role.toString().toUpperCase();
  return normalized === 'ADMIN' ? 'Admin' : normalized === 'STAFF' ? 'Staff' : role;
};

const archModules = [
  { title: 'Paperless Transactions', desc: 'Digital POS, electronic receipts, prescription records, customer data capture', badge: 'Module 1', badgeClass: 'badge-info', style: { borderColor: 'var(--blue)', borderWidth: '2px' } },
  { title: 'Inventory Optimization', desc: 'Real-time stock tracking, automated low-stock alerts, reorder threshold management', badge: 'Module 2', badgeClass: 'badge-warning', style: { borderColor: 'var(--orange)', borderWidth: '2px' } },
  { title: 'Sales Forecasting', desc: 'Predictive analytics on historical data, 6-month demand projections, restock recommendations', badge: 'Module 3', badgeClass: 'badge-success', style: { borderColor: 'var(--accent-mid)', borderWidth: '2px' } },
  { title: 'User Access Control', desc: 'Role-based permissions: Admin, Manager, Cashier, Inventory Staff' },
  { title: 'Centralized Database', desc: 'Secure PostgreSQL storage for all records, transactions, inventory and analytics data' }
];

const roles = [
  { role: 'Admin', level: 'Full System', badgeClass: 'badge-danger' },
  { role: 'Manager', level: 'Reports + Forecast', badgeClass: 'badge-info' },
  { role: 'Cashier', level: 'POS', badgeClass: 'badge-success' },
  { role: 'Inventory Staff', level: 'Stock Module', badgeClass: 'badge-warning' }
];

const specs = [
  { label: 'Algorithm', value: 'Facebook Prophet' },
  { label: 'Training Data', value: 'Historical sales (2+ yrs)' },
  { label: 'Horizon', value: '6 months' },
  { label: 'Target MAPE', value: '< 10%' },
  { label: 'Update Frequency', value: 'Daily' }
];

function ChartBars({ actual, forecast, labels, maxH = 80, style }) {
  const max = Math.max(...actual, ...forecast, 1);
  return (
    <div className="chart-bars" style={style}>
      {labels.map((label, idx) => {
        const aVal = actual[idx] || 0;
        const fVal = forecast[idx] || 0;
        const aH = Math.round((aVal / max) * maxH);
        const fH = Math.round((fVal / max) * maxH);
        return (
          <div className="chart-bar-group" key={`${label}-${idx}`}>
            {aVal ? <div className="chart-bar" style={{ height: `${aH}px`, background: 'var(--accent-mid)' }} /> : null}
            {fVal ? <div className="chart-bar" style={{ height: `${fH}px`, background: 'var(--blue)', opacity: 0.5 }} /> : null}
          </div>
        );
      })}
      <div className="chart-label">{labels.map((label) => (<span key={label}>{label}</span>))}</div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [transactionSearch, setTransactionSearch] = useState('');
  const [transactionPaymentFilter, setTransactionPaymentFilter] = useState('all');
  const [transactionStatusFilter, setTransactionStatusFilter] = useState('all');
  const [transactionDateFilter, setTransactionDateFilter] = useState('all');
  const [transactionPage, setTransactionPage] = useState(0);
  const [topDemandData, setTopDemandData] = useState([]);
  const [forecastMonthlyData, setForecastMonthlyData] = useState([]);
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [newInventoryItem, setNewInventoryItem] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: '',
    stock_color: 'var(--accent-mid)',
    status: 'OK'
  });
  const [inventoryMessage, setInventoryMessage] = useState('');
  const [inventoryError, setInventoryError] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [transactionError, setTransactionError] = useState('');
  const [transactionPreview, setTransactionPreview] = useState({
    name: '', age: '', address: '', contactNumber: '', item: '', quantity: '', unitPrice: '',
    prescriptionOd: '', prescriptionOs: '', pd: '', lensAddOn: '', payment: '', paymentStatus: '',
    rxBy: '',
    txnId: '', date: '', time: '', amount: 0
  });
  const [projectError, setProjectError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [pendingStatusConfirmation, setPendingStatusConfirmation] = useState(null);
  const [editingOwnProfile, setEditingOwnProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({ username: '', password: '', displayName: '' });
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const [newAccountForm, setNewAccountForm] = useState({ username: '', password: '', displayName: '', role: 'STAFF' });
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [editingAccountForm, setEditingAccountForm] = useState({ role: '' });
  const [activityHistory, setActivityHistory] = useState([]);
  const [activityTargetId, setActivityTargetId] = useState(null);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState('');

  useEffect(() => {
    // Clear any stored user on app load to require fresh login
    localStorage.removeItem('loggedInUser');
  }, []);

  useEffect(() => {
    setTransactionPage(0);
  }, [transactionSearch, transactionPaymentFilter, transactionStatusFilter, transactionDateFilter]);

  const [editingUser, setEditingUser] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const [userError, setUserError] = useState('');
  const [userForm, setUserForm] = useState({ username: '', password: '', displayName: '', role: 'STAFF' });

  const productOptions = Array.from(new Set(inventoryProducts.map((item) => item.name))).sort();

  const categoryOptions = Array.from(new Set(inventoryProducts.map((item) => item.category))).sort();

  const handleProductSelect = (productName) => {
    const matched = inventoryProducts.find((item) => item.name === productName);
    setNewInventoryItem((prev) => ({
      ...prev,
      name: productName,
      sku: matched?.sku || prev.sku,
      category: matched?.category || prev.category
    }));
  };

  const formatCurrency = (value) => {
    const number = Number(value);
    if (Number.isNaN(number)) return value || '₱0';
    return `₱${number.toLocaleString()}`;
  };

  const recentTransactions = [...transactions]
    .sort((a, b) => {
      const aDate = a.txDate || a.date || '';
      const aTime = a.txTime || a.tx_time || a.txTime || '00:00:00';
      const bDate = b.txDate || b.date || '';
      const bTime = b.txTime || b.tx_time || b.txTime || '00:00:00';
      const aDt = new Date(`${aDate}T${aTime}`);
      const bDt = new Date(`${bDate}T${bTime}`);
      return bDt - aDt;
    })
    .slice(0, 5)
    .map((tx) => ({
      id: tx.txnId || tx.tx_id || tx.id,
      date: tx.txDate || tx.date || tx.tx_date || '—',
      time: tx.txTime || tx.tx_time || tx.txTime || '',
      customer: tx.customerName || tx.customer_name || tx.customer || '—',
      item: tx.item_summary || tx.items || tx.item || '—',
      amount: formatCurrency(tx.amount),
      payment: tx.payment_method || tx.payment || tx.paymentMethod || '—',
      status: tx.status || 'Pending',
      itemStatus: tx.itemStatus || tx.item_status || 'Completed',
      badge: tx.status === 'Paid' ? 'badge-success' : tx.status === 'Half Paid' ? 'badge-warning' : tx.status === 'Processing' ? 'badge-info' : 'badge-warning'
    }));

  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const weekStart = new Date(today);
  const dayOfWeek = weekStart.getDay();
  weekStart.setDate(weekStart.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const weekStartKey = weekStart.toISOString().slice(0, 10);
  const monthStartKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;

  const recordRows = transactions
    .map((tx) => ({
      id: tx.txnId || tx.tx_id || tx.id,
      date: tx.txDate || tx.date || tx.tx_date || '—',
      customer: tx.customerName || tx.customer_name || tx.customer || '—',
      items: tx.item_summary || tx.items || tx.item || '—',
      amount: formatCurrency(tx.amount),
      payment: tx.payment_method || tx.payment || '—',
      rxBy: tx.rxBy || tx.rx_by || 'N/A',
      paymentStatus: tx.status || 'Pending',
      itemStatus: tx.itemStatus || tx.item_status || 'Completed',
      paymentBadge: tx.status === 'Paid' ? 'badge-success' : tx.status === 'Half Paid' ? 'badge-warning' : tx.status === 'Processing' ? 'badge-info' : 'badge-warning',
      itemBadge: (tx.itemStatus || tx.item_status || 'Completed') === 'Processing' ? 'badge-info' : 'badge-success'
    }))
    .filter((record) => {
      const query = transactionSearch.trim().toLowerCase();
      if (!query) return true;
      return `${record.id || ''} ${record.customer} ${record.items}`.toLowerCase().includes(query);
    })
    .filter((record) => {
      if (transactionDateFilter === 'all') return true;
      const transactionDate = record.date;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(transactionDate)) return false;
      if (transactionDateFilter === 'today') return transactionDate === todayKey;
      if (transactionDateFilter === 'week') return transactionDate >= weekStartKey && transactionDate <= todayKey;
      if (transactionDateFilter === 'month') return transactionDate >= monthStartKey && transactionDate <= todayKey;
      return true;
    })
    .filter((record) => {
      if (transactionPaymentFilter === 'all') return true;
      return record.payment.toLowerCase() === transactionPaymentFilter.toLowerCase();
    })
    .filter((record) => {
      if (transactionStatusFilter === 'all') return true;
      return record.paymentStatus.toLowerCase() === transactionStatusFilter.toLowerCase();
    });

  const pendingItemRows = transactions
    .map((tx) => ({
      id: tx.txnId || tx.tx_id || tx.id,
      customer: tx.customerName || tx.customer_name || tx.customer || '—',
      item: tx.item_summary || tx.items || tx.item || '—',
      date: tx.txDate || tx.date || tx.tx_date || '—',
      itemStatus: tx.itemStatus || tx.item_status || (tx.status === 'Processing' ? 'Processing' : 'Completed')
    }))
    .filter((record) => record.itemStatus.toLowerCase() === 'processing');

  const readyItemRows = transactions
    .map((tx) => ({
      id: tx.txnId || tx.tx_id || tx.id,
      customer: tx.customerName || tx.customer_name || tx.customer || '—',
      item: tx.item_summary || tx.items || tx.item || '—',
      date: tx.txDate || tx.date || tx.tx_date || '—',
      itemStatus: tx.itemStatus || tx.item_status || 'Completed'
    }))
    .filter((record) => record.itemStatus.toLowerCase() === 'ready');

  const transactionsPerPage = 10;
  const transactionPageCount = Math.max(1, Math.ceil(recordRows.length / transactionsPerPage));
  const currentTransactionPage = Math.min(transactionPage, transactionPageCount - 1);
  const visibleRecordRows = recordRows.slice(
    currentTransactionPage * transactionsPerPage,
    (currentTransactionPage + 1) * transactionsPerPage
  );

  const customerRows = customerList
    .map((customer) => ({
      ...customer,
      card: customer.cardNo || customer.card || 'N/A',
      spend: formatCurrency(customer.totalSpend || customer.spend || 0),
      visited: customer.lastVisit || customer.last_visit || 'N/A',
      statusClass: customer.status === 'Active' ? 'badge-success' : 'badge-warning'
    }))
    .filter((customer) => {
      const query = customerSearch.trim().toLowerCase();
      if (!query) return true;
      return `${customer.name || ''} ${customer.card}`.toLowerCase().includes(query);
    })
    .sort((firstCustomer, secondCustomer) => (firstCustomer.name || '').localeCompare(secondCustomer.name || ''));

  const openCustomerProfile = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const openTransactionDetails = (record) => {
    setSelectedTransaction(record);
    setShowTransactionModal(true);
  };

  const handleItemStatusChange = (txnId, itemStatus) => {
    setPendingStatusConfirmation({ txnId, itemStatus });
  };

  const confirmItemStatusChange = async () => {
    if (!pendingStatusConfirmation) return;
    const { txnId, itemStatus } = pendingStatusConfirmation;
    setPendingStatusConfirmation(null);
    setTransactionError('');
    try {
      const updatedTransaction = await updateTransactionItemStatus(txnId, itemStatus);
      setTransactions((previousTransactions) => previousTransactions.map((transaction) => {
        const currentId = transaction.txnId || transaction.tx_id || transaction.id;
        return currentId === txnId ? { ...transaction, ...updatedTransaction, itemStatus } : transaction;
      }));
    } catch (error) {
      setTransactionError(error.message);
    }
  };

  const topDemandRows = topDemandData.map((item) => ({
    product: item.product || item.name || '—',
    units: item.units || '—',
    restock: item.restock || '—',
    badgeClass: item.status === 'Critical' ? 'badge-danger' : 'badge-warning'
  }));

  const forecastRows = forecastMonthlyData.map((row) => ({
    month: row.month || '—',
    type: row.type || 'Forecast',
    revenue: formatCurrency(row.revenue),
    units: row.units || '—',
    change: row.changePct || row.change || '—',
    action: row.action || '—',
    confidence: row.confidence || '—',
    badgeClass: row.type === 'Forecast' ? 'badge-warning' : 'badge-neutral',
    rowStyle: row.type === 'Forecast' ? { background: 'var(--accent-light)' } : {}
  }));
  const chartForecastValues = forecastMonthlyData.slice(0, 10).map((row) => Number(row.revenue || 0) / 1000);
  const chartLabels = forecastMonthlyData.slice(0, 10).map((row) => row.month || '—');

  const labels = pageLabels[currentPage] || [currentPage, ''];
  const currentDateLabel = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());
  const todayDateKey = new Date().toISOString().slice(0, 10);
  const todayTransactions = transactions.filter((transaction) => (transaction.txDate || transaction.tx_date) === todayDateKey);
  const todayRevenue = todayTransactions.reduce((total, transaction) => total + Number(transaction.amount || 0), 0);
  const averageTransaction = transactions.length ? transactions.reduce((total, transaction) => total + Number(transaction.amount || 0), 0) / transactions.length : 0;
  const reportStats = [
    { value: formatCurrency(todayRevenue), label: 'Today Revenue' },
    { value: String(todayTransactions.length), label: 'Today Transactions' },
    { value: formatCurrency(averageTransaction), label: 'Average Ticket' }
  ];
  const isAdmin = loggedInUser?.role?.toString().toUpperCase() === 'ADMIN';
  const isStaff = loggedInUser?.role?.toString().toUpperCase() === 'STAFF';
  const canEditInventory = isAdmin;
  const currentUserRoleLabel = formatUserRole(loggedInUser?.role);
  const activityOwner = activityTargetId ? users.find((user) => user.id === activityTargetId) : loggedInUser;

  const lowStockAlertCount = inventoryProducts.filter((product) => {
    const inStock = Number(product.inStock);
    const reorder = Number(product.reorder);
    return reorder > 0 && inStock <= reorder;
  }).length;

  const inventoryAlerts = inventoryProducts
    .filter((product) => {
      const inStock = Number(product.inStock);
      const reorder = Number(product.reorder);
      return reorder > 0 && inStock <= reorder;
    })
    .slice(0, 5)
    .map((product) => ({
      label: product.name,
      description: `${product.inStock} pcs remaining · Reorder point: ${product.reorder}`,
      badge: product.status,
      badgeClass: product.status === 'Critical' ? 'badge-danger' : 'badge-warning',
      dot: product.status === 'Critical' ? 'dot-red' : 'dot-orange'
    }));

  const criticalStockCount = inventoryProducts.filter((product) => product.status === 'Critical').length;
  const lowStockOnlyCount = inventoryProducts.filter((product) => product.status === 'Low').length;
  const totalSkus = inventoryProducts.length;

  useEffect(() => {
    fetchInventory()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setInventoryProducts(data.map((item) => ({
            ...item,
            inStock: Number(item.in_stock ?? item.inStock),
            reorder: Number(item.reorder_point ?? item.reorderPoint),
            level: Number(item.stockLevelPct ?? item.level),
            color: item.stockColor || item.stock_color || 'var(--accent-mid)',
            date: item.lastUpdated || item.last_updated,
            statusClass: item.status === 'Critical' ? 'badge-danger' : item.status === 'Low' ? 'badge-warning' : 'badge-success',
            action: item.status === 'OK' ? 'Edit' : 'Reorder',
            actionClass: item.status === 'Critical' ? 'btn-danger' : 'btn-secondary'
          })));
        }
      })
      .catch((error) => {
        setInventoryError(error.message);
      });
  }, []);

  useEffect(() => {
    fetchProjectData()
      .then((data) => {
        setCustomerList(Array.isArray(data.customers) ? data.customers : []);
        setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
        setForecastMonthlyData(Array.isArray(data.forecastMonthly) ? data.forecastMonthly : []);
        setTopDemandData(Array.isArray(data.topDemand) ? data.topDemand : []);
      })
      .catch((error) => {
        setProjectError(error.message);
      });
  }, []);

  // If `/api/data` fails or doesn't include transactions, fetch transactions directly once.
  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTransactions(data);
        }
      })
      .catch(() => {
        // ignore fallback errors
      });
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      setUsers([]);
      return;
    }

    fetchUsers(loggedInUser?.role, loggedInUser?.id)
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        }
      })
      .catch((error) => {
        setUserError(error.message);
      });
  }, [isAdmin, loggedInUser?.role]);

  const handleInventoryInput = (field, value) => {
    setNewInventoryItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleTransactionSubmit = async (event) => {
    event.preventDefault();
    setTransactionMessage('');
    setTransactionError('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('customerName') || '').trim();
    const age = String(formData.get('age') || '').trim();
    const address = String(formData.get('address') || '').trim();
    const quantity = Number(formData.get('quantity') || 0);
    const unitPrice = Number(String(formData.get('unitPrice') || '').replace(/[^0-9.]/g, '')) || 0;

    if (!name) {
      setTransactionError('Please enter the customer name.');
      return;
    }

    try {
      const item = String(formData.get('item') || '').trim();
      const prescriptionOd = String(formData.get('prescriptionOd') || '').trim();
      const prescriptionOs = String(formData.get('prescriptionOs') || '').trim();
      const pd = String(formData.get('pd') || '').trim();
      const lensAddOn = String(formData.get('lensAddOn') || '').trim();
      const payment = String(formData.get('paymentMethod') || '').trim();
      const paymentStatus = String(formData.get('paymentStatus') || 'Paid').trim();
      const rxBy = String(formData.get('rxBy') || '').trim();
      const itemStatus = String(formData.get('itemStatus') || 'Processing').trim();
      const customer = await createCustomer({
        name,
        age: age || null,
        address: address || null,
        contactNumber: String(formData.get('contactNumber') || '').trim() || null,
        email: String(formData.get('email') || '').trim() || null,
        totalSpend: quantity * unitPrice,
        prescriptionOd: String(formData.get('prescriptionOd') || '').trim() || null,
        prescriptionOs: String(formData.get('prescriptionOs') || '').trim() || null
      });
      const transaction = await createTransaction({
        customerName: name,
        item,
        amount: quantity * unitPrice,
        payment,
        paymentStatus,
        rxBy: rxBy || null,
        itemStatus
      });

      const refreshedTransactions = await fetchTransactions();
      const savedTransactionId = transaction.txnId || transaction.tx_id || transaction.id;
      const savedTransactions = Array.isArray(refreshedTransactions)
        ? (refreshedTransactions.some((entry) => (entry.txnId || entry.tx_id || entry.id) === savedTransactionId)
          ? refreshedTransactions
          : [transaction, ...refreshedTransactions])
        : [transaction, ...transactions];
      setCustomerList((previousCustomers) => [customer, ...previousCustomers]);
      setTransactions(savedTransactions);
      const savedDate = transaction.txDate || transaction.tx_date || new Date().toISOString().slice(0, 10);
      const savedTime = transaction.txTime || transaction.tx_time || new Date().toTimeString().slice(0, 5);
      setTransactionPreview({
        name,
        age,
        address,
        contactNumber: String(formData.get('contactNumber') || '').trim(),
        item,
        quantity: String(quantity),
        unitPrice: String(formData.get('unitPrice') || '').trim(),
        prescriptionOd,
        prescriptionOs,
        pd,
        lensAddOn,
        payment,
        paymentStatus,
        rxBy: transaction.rxBy || transaction.rx_by || rxBy,
        txnId: transaction.txnId || transaction.tx_id || '—',
        date: savedDate,
        time: savedTime,
        amount: transaction.amount ?? quantity * unitPrice
      });
      setTransactionMessage(`${customer.name}'s transaction was saved successfully.`);
      form.reset();
    } catch (error) {
      setTransactionError(error.message);
    }
  };

  const handleUserFormChange = (field, value) => {
    setUserError('');
    setUserForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
    setUserForm({ username: user.username, password: '', displayName: user.displayName, role: user.role });
  };

  const handleDeleteUser = async (userId) => {
    setUserError('');
    setUserMessage('');
    try {
      await deleteUser(userId, loggedInUser?.role, loggedInUser?.id);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setUserMessage('User deleted successfully.');
    } catch (error) {
      setUserError(error.message);
    }
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    setUserError('');
    setUserMessage('');

    const payload = {
      username: userForm.username.trim(),
      password: userForm.password.trim(),
      displayName: userForm.displayName.trim(),
      role: userForm.role
    };

    if (!payload.username || !payload.displayName || !payload.role || (!editingUser && !payload.password)) {
      setUserError('Please provide username, display name, role, and password for new users.');
      return;
    }

    try {
      const saved = editingUser
        ? await updateUser(editingUser.id, payload, loggedInUser?.role, loggedInUser?.id)
        : await createUser(payload, loggedInUser?.role, loggedInUser?.id);

      const normalizedSaved = {
        ...saved,
        role: saved.role?.toString().toUpperCase()
      };

      setUsers((prev) => {
        if (editingUser) {
          return prev.map((user) => (user.id === normalizedSaved.id ? normalizedSaved : user));
        }
        return [normalizedSaved, ...prev];
      });

      setUserMessage(editingUser ? 'User updated successfully.' : 'User added successfully.');
      setShowUserForm(false);
      setEditingUser(null);
      setUserForm({ username: '', password: '', displayName: '', role: 'STAFF' });
    } catch (error) {
      setUserError(error.message);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoginError('');
    try {
      const user = await loginUser({ username: loginUsername.trim(), password: loginPassword });
      setLoggedInUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setLoginUsername('');
      setLoginPassword('');
      setCurrentPage('dashboard');
    } catch (error) {
      setLoginError(error.message || 'Login failed. Check your credentials.');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    setLoginError('');
    setCurrentPage('dashboard');
  };

  const handleEditOwnProfile = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        username: profileFormData.username.trim(),
        password: profileFormData.password.trim(),
        displayName: profileFormData.displayName.trim(),
        role: loggedInUser.role
      };

      if (!payload.username || !payload.displayName) {
        alert('Username and display name are required.');
        return;
      }

      const updated = await updateUser(loggedInUser.id, payload, loggedInUser?.role, loggedInUser?.id);
      const normalizedUpdate = { ...updated, role: updated.role?.toString().toUpperCase() };
      
      setLoggedInUser(normalizedUpdate);
      localStorage.setItem('loggedInUser', JSON.stringify(normalizedUpdate));
      setEditingOwnProfile(false);
      setProfileFormData({ username: '', password: '', displayName: '' });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  const handleEditAccountRole = async (event) => {
    event.preventDefault();
    if (!editingAccountId) return;
    
    try {
      const accountToEdit = users.find(u => u.id === editingAccountId);
      const payload = {
        username: accountToEdit.username,
        password: '',
        displayName: accountToEdit.displayName,
        role: editingAccountForm.role
      };

      const updated = await updateUser(editingAccountId, payload, loggedInUser?.role, loggedInUser?.id);
      const normalizedUpdate = { ...updated, role: updated.role?.toString().toUpperCase() };
      
      setUsers((prev) => prev.map((user) => (user.id === normalizedUpdate.id ? normalizedUpdate : user)));
      setEditingAccountId(null);
      alert('Account role updated successfully!');
    } catch (error) {
      alert('Error updating account: ' + error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirmation) return;
    if (deleteConfirmationText.toLowerCase() !== 'yes') {
      alert('You must type "yes" to confirm deletion.');
      return;
    }

    try {
      await deleteUser(deleteConfirmation.id, loggedInUser?.role, loggedInUser?.id);
      setUsers((prev) => prev.filter((user) => user.id !== deleteConfirmation.id));
      setDeleteConfirmation(null);
      setDeleteConfirmationText('');
      alert('Account deleted successfully!');
    } catch (error) {
      alert('Error deleting account: ' + error.message);
    }
  };

  const loadActivityHistory = async (userId) => {
    if (!loggedInUser) return;
    setActivityLoading(true);
    setActivityError('');
    setActivityTargetId(userId);
    try {
      const history = await fetchUserActivity(userId, loggedInUser.id, loggedInUser.role);
      setActivityHistory(Array.isArray(history) ? history : []);
    } catch (error) {
      setActivityError(error.message || 'Unable to load activity history.');
      setActivityHistory([]);
    } finally {
      setActivityLoading(false);
    }
  };

  const handleAddAccount = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        username: newAccountForm.username.trim(),
        password: newAccountForm.password.trim(),
        displayName: newAccountForm.displayName.trim(),
        role: newAccountForm.role
      };

      if (!payload.username || !payload.password || !payload.displayName || !payload.role) {
        alert('Please fill all required fields.');
        return;
      }

      const created = await createUser(payload, loggedInUser?.role, loggedInUser?.id);
      const normalizedCreate = { ...created, role: created.role?.toString().toUpperCase() };
      
      setUsers((prev) => [normalizedCreate, ...prev]);
      setShowAddAccountForm(false);
      setNewAccountForm({ username: '', password: '', displayName: '', role: 'STAFF' });
      alert('Account created successfully!');
    } catch (error) {
      alert('Error creating account: ' + error.message);
    }
  };

  if (!loggedInUser) {
    return (
      <div className="login-screen" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--surface)' }}>
        <div className="card" style={{ maxWidth: 420, width: '100%', padding: 32 }}>
          <div className="card-title" style={{ marginBottom: 16, textAlign: 'center' }}>Sign In to Almeda Optical</div>
          <p style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 24, textAlign: 'center' }}>Please log in before opening the dashboard.</p>
          {loginError ? <div className="alert-item" style={{ marginBottom: 16, color: 'var(--red)' }}>{loginError}</div> : null}
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} autoFocus />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}>Log In</button>
          </form>
        </div>
      </div>
    );
  }

  const handleInventorySubmit = async (event) => {
    event.preventDefault();
    setInventoryMessage('');
    setInventoryError('');

    const payload = {
      name: newInventoryItem.name.trim(),
      sku: newInventoryItem.sku.trim(),
      category: newInventoryItem.category.trim(),
      in_stock: Number(newInventoryItem.quantity),
      stock_color: newInventoryItem.stock_color,
      status: newInventoryItem.status
    };

    const isNumberMissing = (value) => typeof value !== 'number' || Number.isNaN(value);
    if (!payload.name || !payload.sku || !payload.category || isNumberMissing(payload.in_stock)) {
      setInventoryError('Please fill all required inventory fields, including quantity.');
      return;
    }

    try {
      const created = await createInventoryItem(payload);
      const createdProduct = {
        ...created,
        inStock: Number(created.in_stock ?? created.inStock),
        reorder: Number(created.reorder_point ?? created.reorderPoint),
        level: Number(created.stockLevelPct ?? created.level),
        color: created.stockColor || created.stock_color || 'var(--accent-mid)',
        date: created.lastUpdated || created.last_updated,
        statusClass: created.status === 'Critical' ? 'badge-danger' : created.status === 'Low' ? 'badge-warning' : 'badge-success',
        action: created.status === 'OK' ? 'Edit' : 'Reorder',
        actionClass: created.status === 'Critical' ? 'btn-danger' : 'btn-secondary'
      };
      setInventoryProducts((prev) => [createdProduct, ...prev]);
      setInventoryMessage(`Added ${createdProduct.name} to inventory.`);
      setShowInventoryForm(false);
      setNewInventoryItem({
        name: '',
        sku: '',
        category: '',
        quantity: '',
        stock_color: 'var(--accent-mid)',
        status: 'OK'
      });
    } catch (error) {
      setInventoryError(error.message);
    }
  };

  return (
    <>
      <aside className={sidebarHidden ? 'sidebar hidden' : 'sidebar'}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-name">Almeda Optical</div>
          <div className="sidebar-logo-sub">Management System</div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((group) => {
            const visibleItems = group.items.filter((item) => {
              if (item.requiredRole && !isAdmin) return false;
              if (item.hideForStaff && isStaff) return false;
              return true;
            });
            if (visibleItems.length === 0) return null;
            return (
              <div key={group.section}>
                <div className="sidebar-section">{group.section}</div>
                {visibleItems.map((item) => {
                  const badgeValue = item.id === 'inventory' ? (lowStockAlertCount > 0 ? String(lowStockAlertCount) : null) : item.badge;
                  return (
                    <div
                      key={item.id}
                      className={`nav-item${currentPage === item.id ? ' active' : ''}`}
                      onClick={() => setCurrentPage(item.id)}
                    >
                      {item.label}
                      {badgeValue ? <span className="nav-badge alert">{badgeValue}</span> : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip" onClick={() => {
            loadActivityHistory(loggedInUser?.id);
            setShowProfileModal(true);
          }} style={{ cursor: 'pointer' }}>
            <div className="user-avatar">{loggedInUser?.displayName?.charAt(0) || 'A'}</div>
            <div>
              <div className="user-name">{loggedInUser?.displayName || 'Admin User'}</div>
              <div className="user-role">{currentUserRoleLabel || 'Store Manager'}</div>
            </div>
          </div>
        </div>
      </aside>

      <div className={sidebarHidden ? 'main sidebar-hidden' : 'main'}>
        <div className="topbar">
          <button className="hamburger-btn" type="button" onClick={() => setSidebarHidden((value) => !value)}>Menu</button>
          <span className="topbar-page-title">{labels[0]}</span>
          <span className="topbar-sep">/</span>
          <span className="topbar-breadcrumb">{labels[1]}</span>
          <div className="topbar-right">
            <div className="topbar-date">{currentDateLabel}</div>
            <button className="btn btn-secondary btn-sm" type="button" onClick={handleLogout} style={{ marginRight: 10 }}>Log out</button>
            <button className="notif-btn" type="button">Alerts<span className="notif-dot" /></button>
          </div>
        </div>

        <div className="content">
          <div className={`page${currentPage === 'dashboard' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Good morning, {loggedInUser?.displayName || 'Admin'}</div>
              <div className="page-subtitle">Here's what's happening at Almeda Optical Shangri-La today</div>
            </div>

            <div className="kpi-grid">
              <div className="kpi-card green">
                <div className="kpi-label">Today's Revenue</div>
                <div className="kpi-value">{formatCurrency(todayRevenue)}</div>
                <div className="kpi-sub">Based on database transactions</div>
              </div>
              <div className="kpi-card blue">
                <div className="kpi-label">Transactions Today</div>
                <div className="kpi-value">{todayTransactions.length}</div>
                <div className="kpi-sub">Transactions recorded today</div>
              </div>
              <div className="kpi-card red">
                <div className="kpi-label">Low Stock Alerts</div>
                <div className="kpi-value">{lowStockAlertCount}</div>
                <div className="kpi-sub">Based on current inventory</div>
              </div>
            </div>

            <div className="grid-2-1" style={{ marginBottom: 16 }}>
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="card-title" style={{ marginBottom: 0 }}>Recent Transactions</div>
                  <button className="btn btn-secondary btn-sm" onClick={() => setCurrentPage('records')}>View all</button>
                </div>
                <table className="data-table">
                  <thead>
                    <tr><th>#</th><th>Customer</th><th>Item</th><th>Amount</th><th>Payment</th><th>Payment Status</th></tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="text-xs">{transaction.id}</td>
                        <td className="name">{transaction.customer}</td>
                        <td>{transaction.item}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.payment}</td>
                        <td><span className={`badge ${transaction.badge}`}>{transaction.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="card">
                <div className="card-title">Inventory Alerts</div>
                {inventoryAlerts.map((alert) => (
                  <div className="alert-item" key={alert.label}>
                    <span className={`status-dot ${alert.dot}`} />
                    <div style={{ flex: 1 }}>
                      <div className="font-medium" style={{ fontSize: 13 }}>{alert.label}</div>
                      <div className="text-xs">{alert.description}</div>
                    </div>
                    <span className={`badge ${alert.badgeClass}`}>{alert.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid-2">
              <div className="card">
                <div className="card-title">Monthly Revenue — 2026</div>
                <ChartBars
                  id="revenue-chart"
                  actual={chartForecastValues}
                  forecast={[]}
                  labels={chartLabels}
                  maxH={80}
                />
              </div>
              <div className="card">
                <div className="card-title">Forecast Data</div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>Loaded from the forecast database table.</div>
                </div>
                <table className="data-table">
                  <thead><tr><th>Month</th><th>Projected Revenue</th><th>vs Last Year</th><th>Confidence</th></tr></thead>
                  <tbody>
                    {forecastRows.map((row) => (
                      <tr key={row.month}>
                        <td>{row.month}</td>
                        <td style={{ fontWeight: 500 }}>{row.revenue}</td>
                        <td><span className="kpi-trend-up">{row.growth}</span></td>
                        <td><span className={`badge ${row.badgeClass}`}>{row.confidence}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className={`page${currentPage === 'pos' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">New Transaction</div>
              <div className="page-subtitle">Paperless point-of-sale</div>
            </div>

            <form className="grid-2" onSubmit={handleTransactionSubmit}>
              <div>
                <div className="card mb-4 transaction-note-card">
                  <div className="transaction-note-header">
                    <span>Customer Information</span>
                    <span className="transaction-note-tag">Info</span>
                  </div>
                  <div className="transaction-note-grid two-col">
                    <div className="transaction-note-field">
                      <label>Name</label>
                      <input className="transaction-note-input" name="customerName" type="text" placeholder="Full name" required />
                    </div>
                    <div className="transaction-note-field">
                      <label>Age</label>
                      <input className="transaction-note-input" name="age" type="number" min="1" placeholder="Age" />
                    </div>
                  </div>
                  <div className="transaction-note-grid">
                    <div className="transaction-note-field">
                      <label>Address</label>
                      <input className="transaction-note-input" name="address" type="text" placeholder="Address" />
                    </div>
                  </div>
                  <div className="transaction-note-grid two-col">
                    <div className="transaction-note-field">
                      <label>Number</label>
                      <input className="transaction-note-input" name="contactNumber" type="tel" placeholder="Contact number" />
                    </div>
                    <div className="transaction-note-field">
                      <label>Email</label>
                      <input className="transaction-note-input" name="email" type="email" placeholder="customer@email.com" />
                    </div>
                  </div>
                </div>

                <div className="card mb-4 transaction-note-card">
                  <div className="transaction-note-header">
                    <span>Product / Service</span>
                    <span className="transaction-note-tag">Order</span>
                  </div>
                  <div className="transaction-note-grid three-col">
                    <div className="transaction-note-field wide">
                      <label>Item</label>
                      <select className="transaction-note-select" name="item">
                        <option value="">Select a product or service</option>
                        {inventoryProducts.map((product) => (
                          <option key={product.sku} value={product.name}>{product.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="transaction-note-field small">
                      <label>Qty</label>
                      <input className="transaction-note-input" name="quantity" type="number" min="1" placeholder="Quantity" />
                    </div>
                    <div className="transaction-note-field small">
                      <label>Price</label>
                      <input className="transaction-note-input" name="unitPrice" type="text" placeholder="Unit price" />
                    </div>
                  </div>

                  <div className="transaction-note-grid two-col">
                    <div className="transaction-note-field">
                      <label>OD</label>
                      <input className="transaction-note-input" name="prescriptionOd" placeholder="-1.50 / -0.25 × 180" />
                    </div>
                    <div className="transaction-note-field">
                      <label>OS</label>
                      <input className="transaction-note-input" name="prescriptionOs" placeholder="-1.25 / -0.50 × 175" />
                    </div>
                  </div>

                  <div className="transaction-note-grid two-col">
                    <div className="transaction-note-field">
                      <label>PD</label>
                      <input className="transaction-note-input" name="pd" placeholder="63mm" />
                    </div>
                    <div className="transaction-note-field">
                      <label>Lens Add-on</label>
                      <select className="transaction-note-select" name="lensAddOn">
                        <option value="None">None</option>
                        {inventoryProducts.filter((product) => ['Lenses', 'Accessories'].includes(product.category)).map((product) => (
                          <option key={`addon-${product.sku}`} value={product.name}>{product.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="transaction-note-grid">
                    <div className="transaction-note-field">
                      <label>Payment</label>
                      <select className="transaction-note-select" name="paymentMethod">
                        <option>Cash</option>
                        <option>GCash</option>
                        <option>Credit Card</option>
                        <option>Debit Card</option>
                      </select>
                    </div>
                  </div>

                  <div className="transaction-note-grid">
                    <div className="transaction-note-field">
                      <label>Payment Status</label>
                      <select className="transaction-note-select" name="paymentStatus" defaultValue="Paid">
                        <option value="Paid">Paid</option>
                        <option value="Half Paid">Half Paid</option>
                      </select>
                    </div>
                  </div>

                  <div className="transaction-note-grid">
                    <div className="transaction-note-field">
                      <label>Item Status</label>
                      <select className="transaction-note-select pos-item-status-select" name="itemStatus" defaultValue="Processing">
                        <option value="Processing">Processing</option>
                        <option value="Ready">Ready for Pickup</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="transaction-note-grid">
                    <div className="transaction-note-field">
                      <label>RX BY</label>
                      <input className="transaction-note-input" name="rxBy" type="text" placeholder="Doctor / Optometrist" />
                    </div>
                  </div>

                  <div className="transaction-note-footer">
                    <div className="flex gap-2 mt-4">
                      <button type="submit" className="btn btn-primary">Process Transaction</button>
                      <button type="button" className="btn btn-secondary">Save Draft</button>
                      <button type="reset" className="btn btn-secondary">Clear</button>
                    </div>
                  </div>
                  {transactionError ? <div style={{ marginTop: 12, color: 'var(--red)', fontSize: 13 }}>{transactionError}</div> : null}
                  {transactionMessage ? <div style={{ marginTop: 12, color: 'var(--accent-mid)', fontSize: 13 }}>{transactionMessage}</div> : null}
                </div>
              </div>

              <div>
                <div className="card mb-4 transaction-note-card transaction-preview-card">
                  <div className="transaction-note-header">
                    <span>Transaction Details</span>
                    <span className="transaction-note-tag">Receipt</span>
                  </div>
                  <div className="transaction-preview-meta transaction-preview-identity">
                    <div>
                      <strong>Almeda Optical Shangri-La</strong>
                      <span>Shangri-La Plaza, Mandaluyong City</span>
                    </div>
                    <div className="transaction-preview-reference">
                      <span>{transactionPreview.txnId || 'New transaction'}</span>
                      <span>{transactionPreview.date || 'Not processed'}{transactionPreview.time ? ` · ${transactionPreview.time}` : ''}</span>
                    </div>
                  </div>

                  <div className="transaction-preview-section-label">Customer & Prescription</div>
                  <div className="transaction-preview-lines transaction-preview-customer">
                    <div className="transaction-preview-line"><span>NAME</span><span>{transactionPreview.name || '—'}</span></div>
                    <div className="transaction-preview-line"><span>AGE</span><span>{transactionPreview.age || '—'}</span></div>
                    <div className="transaction-preview-line"><span>ADD</span><span>{transactionPreview.address || '—'}</span></div>
                    <div className="transaction-preview-line"><span>NUMBER</span><span>{transactionPreview.contactNumber || '—'}</span></div>
                    <div className="transaction-preview-line"><span>ITEM</span><span>{transactionPreview.item || '—'}</span></div>
                    <div className="transaction-preview-line"><span>QTY</span><span>{transactionPreview.quantity || '—'}</span></div>
                    <div className="transaction-preview-line"><span>OD</span><span>{transactionPreview.prescriptionOd || '—'}</span></div>
                    <div className="transaction-preview-line"><span>OS</span><span>{transactionPreview.prescriptionOs || '—'}</span></div>
                    <div className="transaction-preview-line"><span>PD</span><span>{transactionPreview.pd || '—'}</span></div>
                  </div>

                  <div className="transaction-preview-section-label">Order Summary</div>
                  <div className="transaction-preview-charges">
                    <div className="receipt-line"><span>{transactionPreview.item || 'No product selected'} × {transactionPreview.quantity || '0'}</span><span>{formatCurrency(Number(transactionPreview.unitPrice.replace(/[^0-9.]/g, '')) * Number(transactionPreview.quantity || 0))}</span></div>
                    {transactionPreview.lensAddOn && transactionPreview.lensAddOn !== 'None' ? <div className="receipt-line"><span>{transactionPreview.lensAddOn}</span><span>Included</span></div> : null}
                    <div className="receipt-line"><span style={{ color: 'var(--text3)' }}>Payment</span><span>{transactionPreview.payment || '—'}</span></div>
                    <div className="receipt-line"><span style={{ color: 'var(--text3)' }}>Payment Status</span><span>{transactionPreview.paymentStatus || '—'}</span></div>
                    <div className="receipt-total-line"><span>Total Due</span><span>{formatCurrency(transactionPreview.amount)}</span></div>
                  </div>
                  <div className="transaction-preview-footer">
                    <div className="rx-by-block">
                      <span>RX BY</span>
                      <strong>{transactionPreview.rxBy || 'Not assigned'}</strong>
                    </div>
                    <div className="transaction-preview-item-status">
                      <span>ITEM STATUS</span>
                      <strong>{transactionPreview.itemStatus || 'Not processed'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className={`page${currentPage === 'records' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Transaction Records</div>
              <div className="page-subtitle">All paperless sales records — digitized & searchable</div>
            </div>
            <div className="top-actions">
              <input
                className="search-bar"
                type="search"
                value={transactionSearch}
                onChange={(event) => setTransactionSearch(event.target.value)}
                placeholder="Search by customer, TXN ID, item..."
                aria-label="Search transactions by customer, transaction ID, or item"
              />
              <select
                className="form-select"
                style={{ width: 'auto' }}
                value={transactionPaymentFilter}
                onChange={(event) => setTransactionPaymentFilter(event.target.value)}
                aria-label="Filter transactions by payment type"
              >
                <option value="all">All Payment Types</option>
                <option value="cash">Cash</option>
                <option value="gcash">GCash</option>
                <option value="credit card">Credit Card</option>
                <option value="debit card">Debit Card</option>
              </select>
              <select
                className="form-select"
                style={{ width: 'auto' }}
                value={transactionStatusFilter}
                onChange={(event) => setTransactionStatusFilter(event.target.value)}
                aria-label="Filter transactions by payment status"
              >
                <option value="all">All Payment Statuses</option>
                <option value="paid">Paid</option>
                <option value="half paid">Half Paid</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>
              <select
                className="form-select"
                style={{ width: 'auto' }}
                value={transactionDateFilter}
                onChange={(event) => setTransactionDateFilter(event.target.value)}
                aria-label="Filter transactions by date"
              >
                <option value="all">All Transactions</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <button className="btn btn-secondary btn-sm">Export CSV</button>
              <button className="btn btn-primary btn-sm" onClick={() => setCurrentPage('pos')}>+ New Transaction</button>
            </div>
            <div className="card pending-transactions-card">
              <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Pending Item Transactions</span>
                <span className="badge badge-info">{pendingItemRows.length} Processing</span>
              </div>
              {pendingItemRows.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr><th>TXN ID</th><th>Customer</th><th>Item(s)</th><th>Date</th><th>Item Status</th></tr>
                  </thead>
                  <tbody>
                    {pendingItemRows.map((record) => (
                      <tr key={`pending-${record.id}`}>
                        <td className="text-xs">{record.id}</td>
                        <td className="name">{record.customer}</td>
                        <td>{record.item}</td>
                        <td className="text-xs">{record.date}</td>
                        <td>
                          <select
                            className={`form-select item-status-select item-status-${record.itemStatus.toLowerCase()}`}
                            value={record.itemStatus === 'Completed' ? 'Completed' : record.itemStatus === 'Ready' ? 'Ready' : 'Processing'}
                            onChange={(event) => handleItemStatusChange(record.id, event.target.value)}
                            aria-label={`Item status for ${record.id}`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Ready">Ready for Pickup</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ color: 'var(--text3)', fontSize: 13 }}>No items are currently being processed.</div>
              )}
            </div>
            <div className="card pending-transactions-card">
              <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Ready for Pickup</span>
                <span className="badge badge-warning">{readyItemRows.length} Ready</span>
              </div>
              {readyItemRows.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr><th>TXN ID</th><th>Customer</th><th>Item(s)</th><th>Date</th><th>Item Status</th></tr>
                  </thead>
                  <tbody>
                    {readyItemRows.map((record) => (
                      <tr key={`ready-${record.id}`}>
                        <td className="text-xs">{record.id}</td>
                        <td className="name">{record.customer}</td>
                        <td>{record.item}</td>
                        <td className="text-xs">{record.date}</td>
                        <td>
                          <select
                            className="form-select item-status-select item-status-ready"
                            value="Ready"
                            onChange={(event) => handleItemStatusChange(record.id, event.target.value)}
                            aria-label={`Item status for ${record.id}`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Ready">Ready for Pickup</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ color: 'var(--text3)', fontSize: 13 }}>No items are ready for pickup.</div>
              )}
            </div>
            <div className="card">
              <table className="data-table">
                <thead>
                  <tr><th>TXN ID</th><th>Date</th><th>Customer</th><th>Item(s)</th><th>Amount</th><th>Payment</th><th>Item Status</th><th>Payment Status</th><th /></tr>
                </thead>
                <tbody>
                  {visibleRecordRows.map((record) => (
                    <tr key={`${record.id}-${record.date}`}>
                      <td className="text-xs">{record.id}</td>
                      <td className="text-xs">{record.date}</td>
                      <td className="name">{record.customer}</td>
                      <td>{record.items}</td>
                      <td>{record.amount}</td>
                      <td>{record.payment}</td>
                      <td>
                        {record.itemStatus === 'Completed' ? (
                          <span className="badge badge-success">Completed</span>
                        ) : (
                          <select
                            className={`form-select item-status-select item-status-${record.itemStatus.toLowerCase()}`}
                            value={record.itemStatus === 'Ready' ? 'Ready' : 'Processing'}
                            onChange={(event) => handleItemStatusChange(record.id, event.target.value)}
                            aria-label={`Item status for ${record.id}`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Ready">Ready for Pickup</option>
                            <option value="Completed">Completed</option>
                          </select>
                        )}
                      </td>
                      <td><span className={`badge ${record.paymentBadge}`}>{record.paymentStatus}</span></td>
                      <td><button className="btn btn-secondary btn-sm" onClick={() => openTransactionDetails(record)}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text3)' }}>
                <span>Showing {recordRows.length === 0 ? 0 : currentTransactionPage * transactionsPerPage + 1}-{Math.min((currentTransactionPage + 1) * transactionsPerPage, recordRows.length)} of {recordRows.length} records</span>
                <div className="flex gap-2">
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={currentTransactionPage === 0}
                    onClick={() => setTransactionPage((page) => Math.max(0, page - 1))}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={currentTransactionPage >= transactionPageCount - 1}
                    onClick={() => setTransactionPage((page) => Math.min(transactionPageCount - 1, page + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`page${currentPage === 'customers' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Customer Directory</div>
              <div className="page-subtitle">All registered customers and their profiles</div>
            </div>
            <div className="top-actions">
              <input
                className="search-bar"
                type="search"
                value={customerSearch}
                onChange={(event) => setCustomerSearch(event.target.value)}
                placeholder="Search by name or card no..."
                aria-label="Search customers by name or card number"
              />
              <button className="btn btn-primary btn-sm">+ Register Customer</button>
            </div>
            <div className="card">
              <table className="data-table">
                <thead><tr><th>Customer</th><th>Card No.</th><th>Total Spend</th><th>Last Visit</th><th>Status</th><th /></tr></thead>
                <tbody>
                  {customerRows.map((customer) => (
                    <tr key={customer.card}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="mini-avatar" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{customer.initials || customer.name?.charAt(0)}</div>
                          <span className="name">{customer.name}</span>
                        </div>
                      </td>
                      <td className="text-xs">{customer.card}</td>
                      <td>{customer.spend}</td>
                      <td>{customer.visited}</td>
                      <td><span className={`badge ${customer.statusClass}`}>{customer.status}</span></td>
                      <td><button className="btn btn-secondary btn-sm" onClick={() => openCustomerProfile(customer)}>Profile</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`page${currentPage === 'inventory' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Inventory Management</div>
              <div className="page-subtitle">Real-time stock monitoring with automated alerts</div>
            </div>
            <div className="kpi-grid">
              <div className="kpi-card green"><div className="kpi-label">Total SKUs</div><div className="kpi-value">{totalSkus}</div><div className="kpi-sub">Across all categories</div></div>
              <div className="kpi-card red"><div className="kpi-label">Critical Stock</div><div className="kpi-value">{criticalStockCount}</div><div className="kpi-sub"><span className="kpi-trend-down">Immediate reorder</span></div></div>
              <div className="kpi-card gold"><div className="kpi-label">Low Stock</div><div className="kpi-value">{lowStockOnlyCount}</div><div className="kpi-sub">Below reorder point</div></div>
              <div className="kpi-card blue"><div className="kpi-label">Inventory Value</div><div className="kpi-value">₱284K</div><div className="kpi-sub">Estimated total</div></div>
            </div>
            <div className="top-actions">
              <div className="search-bar">Search products...</div>
              <select className="form-select" style={{ width: 'auto' }}>
                <option>All Categories</option>
                <option>Frames</option>
                <option>Lenses</option>
                <option>Sunglasses</option>
                <option>Accessories</option>
                <option>Contact Lenses</option>
              </select>
              <select className="form-select" style={{ width: 'auto' }}>
                <option>All Status</option>
                <option>Critical</option>
                <option>Low</option>
                <option>OK</option>
              </select>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowInventoryForm((open) => !open)}
                disabled={!canEditInventory}
                style={canEditInventory ? {} : { opacity: 0.6, cursor: 'not-allowed' }}
              >
                {showInventoryForm ? 'Cancel' : '+ Add Product'}
              </button>
            </div>
            {inventoryError ? (
              <div className="card" style={{ marginBottom: 16, borderColor: 'var(--red)' }}>
                <div style={{ padding: 14, color: 'var(--red)', fontSize: 13 }}>Error: {inventoryError}</div>
              </div>
            ) : null}
            {inventoryMessage ? (
              <div className="card" style={{ marginBottom: 16, borderColor: 'var(--green)' }}>
                <div style={{ padding: 14, color: 'var(--green)', fontSize: 13 }}>{inventoryMessage}</div>
              </div>
            ) : null}
            {showInventoryForm ? (
              <div className="card mb-4">
                <div className="card-title">Add New Inventory Item</div>
                <form className="grid-2" onSubmit={handleInventorySubmit}>
                  <div className="form-group">
                    <label className="form-label">Product Name</label>
                    <select className="form-select" value={newInventoryItem.name} onChange={(e) => handleProductSelect(e.target.value)}>
                      <option value="">Select product</option>
                      {productOptions.map((product) => (
                        <option key={product} value={product}>{product}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">SKU</label>
                    <input className="form-input" value={newInventoryItem.sku} onChange={(e) => handleInventoryInput('sku', e.target.value)} placeholder="SG-010" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={newInventoryItem.category} onChange={(e) => handleInventoryInput('category', e.target.value)}>
                      <option value="">Select category</option>
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Items</label>
                    <input className="form-input" type="number" min="0" value={newInventoryItem.quantity} onChange={(e) => handleInventoryInput('quantity', e.target.value)} placeholder="0" />
                  </div>
                  <div className="form-group" style={{ alignSelf: 'flex-end' }}>
                    <button className="btn btn-primary" style={{ width: '100%' }}>Save Item</button>
                  </div>
                </form>
              </div>
            ) : null}
            <div className="card">
              <table className="data-table">
                <thead>
                  <tr><th>Product</th><th>SKU</th><th>Category</th><th>In Stock</th><th>Reorder Pt.</th><th>Stock Level</th><th>Last Updated</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {inventoryProducts.map((product) => (
                    <tr key={product.sku}>
                      <td className="name">{product.name}</td>
                      <td className="text-xs">{product.sku}</td>
                      <td>{product.category}</td>
                      <td><strong>{product.inStock}</strong></td>
                      <td>{product.reorder}</td>
                      <td>
                        <div className="stock-wrap">
                          <div className="stock-bar-bg"><div className="stock-bar-fill" style={{ width: `${product.level}%`, background: product.color }} /></div>
                          <span className="stock-val">{product.level}%</span>
                        </div>
                      </td>
                      <td className="text-xs">{product.date}</td>
                      <td><span className={`badge ${product.statusClass}`}>{product.status}</span></td>
                      <td>
                        <button
                          className={`btn ${product.actionClass} btn-sm`}
                          disabled={!canEditInventory}
                          style={!canEditInventory ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                        >
                          {product.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`page${currentPage === 'users' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">User Management</div>
              <div className="page-subtitle">Manage system users and roles</div>
            </div>
            <div className="top-actions">
              <div className="search-bar">User management for Admins only</div>
              <button className="btn btn-primary btn-sm" onClick={() => { setShowUserForm((open) => !open); setEditingUser(null); setUserForm({ username: '', password: '', displayName: '', role: 'STAFF' }); }}>
                {showUserForm ? 'Cancel' : '+ Add User'}
              </button>
            </div>
            {userError ? (
              <div className="card" style={{ marginBottom: 16, borderColor: 'var(--red)' }}>
                <div style={{ padding: 14, color: 'var(--red)', fontSize: 13 }}>Error: {userError}</div>
              </div>
            ) : null}
            {userMessage ? (
              <div className="card" style={{ marginBottom: 16, borderColor: 'var(--green)' }}>
                <div style={{ padding: 14, color: 'var(--green)', fontSize: 13 }}>{userMessage}</div>
              </div>
            ) : null}
            {showUserForm ? (
              <div className="card mb-4">
                <div className="card-title">{editingUser ? 'Edit User' : 'Add User'}</div>
                <form className="grid-2" onSubmit={handleUserSubmit}>
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input className="form-input" value={userForm.username} onChange={(e) => handleUserFormChange('username', e.target.value)} placeholder="username" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-input" type="password" value={userForm.password} onChange={(e) => handleUserFormChange('password', e.target.value)} placeholder={editingUser ? 'Leave blank to keep password' : 'password'} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Display Name</label>
                    <input className="form-input" value={userForm.displayName} onChange={(e) => handleUserFormChange('displayName', e.target.value)} placeholder="Full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <select className="form-select" value={userForm.role} onChange={(e) => handleUserFormChange('role', e.target.value)}>
                      <option value="STAFF">Staff</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ alignSelf: 'flex-end' }}>
                    <button className="btn btn-primary" style={{ width: '100%' }}>{editingUser ? 'Save Changes' : 'Create User'}</button>
                  </div>
                </form>
              </div>
            ) : null}
            <div className="card">
              <table className="data-table">
                <thead><tr><th>Name</th><th>Username</th><th>Role</th><th>Actions</th></tr></thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="name">{user.displayName}</td>
                      <td className="text-xs">{user.username}</td>
                      <td><span className="badge badge-info">{formatUserRole(user.role)}</span></td>
                      <td>
                        <button className="btn btn-secondary btn-sm" onClick={() => handleEditUser(user)} style={{ marginRight: 8 }}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`page${currentPage === 'forecast' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Sales Forecast</div>
              <div className="page-subtitle">Predictive analytics powered by historical sales data</div>
            </div>
            <div className="kpi-grid">
              {forecastRows.slice(0, 4).map((row, index) => (
                <div className={`kpi-card ${['green', 'blue', 'gold', 'red'][index]}`} key={row.month}>
                  <div className="kpi-label">{row.month}</div>
                  <div className="kpi-value">{row.revenue}</div>
                  <div className="kpi-sub">{row.action}</div>
                </div>
              ))}
            </div>
            <div className="grid-2 mb-4">
              <div className="card">
                <div className="card-title">Revenue Forecast — Jan to Oct 2026</div>
                <ChartBars
                  actual={[48, 52, 58, 63, 0, 0, 0, 0, 0, 0]}
                  forecast={[0, 0, 0, 0, 68, 72, 70, 71, 74, 69]}
                  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']}
                  maxH={100}
                  style={{ height: 130, paddingBottom: 30 }}
                />
                <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 12, height: 12, background: 'var(--accent-mid)', borderRadius: 2, display: 'inline-block' }} />Actual Sales</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 12, height: 12, background: 'var(--blue)', opacity: 0.5, borderRadius: 2, display: 'inline-block' }} />Forecast</span>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Top Demand</div>
                <table className="data-table">
                  <thead><tr><th>Product</th><th>Projected Units</th><th>Suggested Restock</th></tr></thead>
                  <tbody>
                    {topDemandRows.map((item) => (
                      <tr key={item.product}>
                        <td>{item.product}</td>
                        <td style={{ fontWeight: 500 }}>{item.units}</td>
                        <td><span className={`badge ${item.badgeClass}`}>{item.restock}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Monthly Forecast Table — Full Year 2026</div>
              <table className="data-table">
                <thead><tr><th>Month</th><th>Type</th><th>Projected Revenue</th><th>Units Sold (est.)</th><th>YoY Change</th><th>Inventory Action</th><th>Confidence</th></tr></thead>
                <tbody>
                  {forecastRows.map((row) => (
                    <tr key={row.month} style={row.rowStyle}>
                      <td>{row.month}</td>
                      <td><span className={`badge ${row.type === 'Forecast' ? 'badge-info' : 'badge-neutral'}`}>{row.type}</span></td>
                      <td>{row.revenue}</td>
                      <td>{row.units}</td>
                      <td><span style={{ color: 'var(--accent-mid)' }}>{row.change}</span></td>
                      <td>{row.action === '—' ? '—' : <span className={`badge ${row.badgeClass}`}>{row.action}</span>}</td>
                      <td>{row.type === 'Forecast' ? <span className={`badge ${row.badgeClass}`}>{row.confidence}</span> : row.confidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`page${currentPage === 'architecture' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">System Design</div>
              <div className="page-subtitle">Design of Software, Systems, Product and/or Processes — Chapter 3</div>
            </div>
            <div className="card mb-4">
              <div className="card-title">System Architecture — Core Modules</div>
              <div className="grid-3" style={{ gap: 12, marginBottom: 16 }}>
                {archModules.map((module) => (
                  <div className="arch-module" key={module.title} style={module.style}>
                    {module.badge ? <div className="arch-module-badge"><span className={`badge ${module.badgeClass}`}>{module.badge}</span></div> : null}
                    <div className="arch-module-title">{module.title}</div>
                    <div className="arch-module-desc">{module.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid-2 mb-4">
              <div className="card">
                <div className="card-title">Transaction Process Flow</div>
                <div className="flow-steps" style={{ gap: 0, flexWrap: 'nowrap', overflowX: 'auto', padding: '8px 0' }}>
                  {['Customer Lookup', 'Product Select', 'Payment', 'Receipt + Stock Update'].map((step, idx) => (
                    <React.Fragment key={step}>
                      <div className="flow-step done">
                        <div className="flow-step-circle">{idx + 1}</div>
                        <div className="flow-step-label">{step}</div>
                      </div>
                      {idx < 3 ? <div className="flow-arrow-line" /> : null}
                    </React.Fragment>
                  ))}
                </div>
                <hr className="divider" />
                <div className="card-title">Forecasting Pipeline</div>
                <div className="flow-steps" style={{ gap: 0, flexWrap: 'nowrap', overflowX: 'auto', padding: '8px 0' }}>
                  {['Sales Data Input', 'Data Cleaning', 'Prophet Model', 'Projection Output', 'Restock Alert'].map((step, idx) => (
                    <React.Fragment key={step}>
                      <div className="flow-step done">
                        <div className="flow-step-circle">{idx + 1}</div>
                        <div className="flow-step-label">{step}</div>
                      </div>
                      {idx < 4 ? <div className="flow-arrow-line" /> : null}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="card-title">Technology Stack</div>
                {[
                  { bg: 'var(--blue-light)', name: 'Frontend — React.js / Electron', desc: 'Desktop & web-based interface; responsive UI', badge: 'UI Layer', badgeClass: 'badge-info' },
                  { bg: 'var(--accent-light)', name: 'Backend — Spring Boot', desc: 'REST API, authentication, business logic', badge: 'API Layer', badgeClass: 'badge-success' },
                  { bg: 'var(--orange-light)', name: 'Database — PostgreSQL', desc: 'Relational data storage; all transactions and records', badge: 'Data Layer', badgeClass: 'badge-warning' },
                  { bg: 'var(--gold-light)', name: 'Analytics — Python / Prophet', desc: 'Time-series forecasting; scikit-learn preprocessing', badge: 'AI Layer', badgeClass: 'badge-gold' },
                  { bg: 'var(--surface2)', name: 'Platform — Desktop / Web', desc: 'Single-branch deployment; no mobile app', badge: 'Deployment', badgeClass: 'badge-neutral' }
                ].map((module) => (
                  <div className="module-row" key={module.name}>
                    <div className="module-row-info">
                      <div className="module-row-name">{module.name}</div>
                      <div className="module-row-desc">{module.desc}</div>
                    </div>
                    <span className={`badge ${module.badgeClass}`}>{module.badge}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid-3">
              <div className="card">
                <div className="card-title">User Roles & Permissions</div>
                <table className="data-table">
                  <thead><tr><th>Role</th><th>Access Level</th></tr></thead>
                  <tbody>
                    {roles.map((role) => (
                      <tr key={role.role}>
                        <td className="name">{role.role}</td>
                        <td><span className={`badge ${role.badgeClass}`}>{role.level}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card">
                <div className="card-title">Forecast Model Specs</div>
                <table className="data-table">
                  <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
                  <tbody>
                    {specs.map((spec) => (
                      <tr key={spec.label}>
                        <td style={{ color: 'var(--text3)' }}>{spec.label}</td>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card">
                <div className="card-title">System Scope</div>
                <div style={{ fontSize: 12, lineHeight: 1.8 }}>
                  {[
                    { label: 'Paperless POS & records', success: true },
                    { label: 'Inventory optimization', success: true },
                    { label: 'Predictive sales forecasting', success: true },
                    { label: 'External marketplaces', success: false },
                    { label: 'Mobile application', success: false },
                    { label: 'Multi-branch / payroll', success: false }
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: 6 }}>
                      <span className={`badge ${item.success ? 'badge-success' : 'badge-danger'}`}>{item.success ? 'Included' : 'Excluded'}</span> {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`page${currentPage === 'reports' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Reports</div>
              <div className="page-subtitle">Business performance summaries and analytics exports</div>
            </div>
            <div className="grid-2 mb-4">
              <div className="card">
                <div className="card-title">Generate Report</div>
                <div className="form-row"><div className="form-group"><label className="form-label">Report Type</label><select className="form-select"><option>Daily Sales Summary</option><option>Weekly Inventory Report</option><option>Monthly Revenue Analysis</option><option>Demand Forecast Report</option></select></div></div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Date From</label><input className="form-input" type="date" /></div>
                  <div className="form-group"><label className="form-label">Date To</label><input className="form-input" type="date" /></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="btn btn-primary">Generate Report</button>
                  <button className="btn btn-secondary">Export to CSV</button>
                  <button className="btn btn-secondary">Print</button>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Quick Stats</div>
                <div className="grid-2" style={{ gap: 10 }}>
                  {reportStats.map((stat) => (
                    <div key={stat.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--radius-sm)', padding: 12, textAlign: 'center' }}>
                      <div className="inline-stat-val">{stat.value}</div>
                      <div className="inline-stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pendingStatusConfirmation && (
        <div className="modal-overlay" onClick={() => setPendingStatusConfirmation(null)}>
          <div className="modal-content customer-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Item Status</h3>
              <button className="modal-close" onClick={() => setPendingStatusConfirmation(null)} aria-label="Close confirmation">×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to mark this item as <strong>{pendingStatusConfirmation.itemStatus === 'Ready' ? 'Ready for Pickup' : pendingStatusConfirmation.itemStatus}</strong>?</p>
              <div className="flex gap-2" style={{ justifyContent: 'flex-end', marginTop: 20 }}>
                <button className="btn btn-secondary" onClick={() => setPendingStatusConfirmation(null)}>Back</button>
                <button className="btn btn-primary" onClick={confirmItemStatusChange}>Yes, Update Status</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTransactionModal && selectedTransaction && (
        <div className="modal-overlay" onClick={() => setShowTransactionModal(false)}>
          <div className="modal-content customer-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>Transaction Details</h3>
              <button className="modal-close" onClick={() => setShowTransactionModal(false)} aria-label="Close transaction details">×</button>
            </div>
            <div className="modal-body">
              <div className="customer-detail-grid">
                <div className="profile-row"><span className="profile-label">TXN ID</span><span>{selectedTransaction.id || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Date</span><span>{selectedTransaction.date || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Customer</span><span>{selectedTransaction.customer || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Item(s)</span><span>{selectedTransaction.items || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Amount</span><span>{selectedTransaction.amount || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Payment</span><span>{selectedTransaction.payment || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Item Status</span><span className={`badge ${selectedTransaction.itemBadge}`}>{selectedTransaction.itemStatus || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Payment Status</span><span className={`badge ${selectedTransaction.paymentBadge}`}>{selectedTransaction.paymentStatus || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">RX BY</span><span>{selectedTransaction.rxBy || 'N/A'}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCustomerModal && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setShowCustomerModal(false)}>
          <div className="modal-content customer-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>Customer Profile</h3>
              <button className="modal-close" onClick={() => setShowCustomerModal(false)} aria-label="Close customer profile">×</button>
            </div>
            <div className="modal-body">
              <div className="profile-header">
                <div className="profile-avatar">{selectedCustomer.initials || selectedCustomer.name?.charAt(0) || '?'}</div>
                <div className="profile-info">
                  <div className="profile-name">{selectedCustomer.name || 'N/A'}</div>
                </div>
              </div>
              <div className="customer-detail-grid">
                <div className="profile-row"><span className="profile-label">Initials</span><span>{selectedCustomer.initials || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Contact Number</span><span>{selectedCustomer.contactNumber || selectedCustomer.contact_number || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Email</span><span>{selectedCustomer.email || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Points</span><span>{selectedCustomer.points ?? 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Total Spend</span><span>{formatCurrency(selectedCustomer.totalSpend)}</span></div>
                <div className="profile-row"><span className="profile-label">Last Visit</span><span>{selectedCustomer.lastVisit || selectedCustomer.last_visit || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Status</span><span className={`badge ${selectedCustomer.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{selectedCustomer.status || 'N/A'}</span></div>
                <div className="profile-row"><span className="profile-label">Created At</span><span>{selectedCustomer.createdAt || selectedCustomer.created_at || 'N/A'}</span></div>
              </div>
              <div className="profile-section customer-prescription">
                <h4>Prescription</h4>
                <div className="prescription-values">
                  <div><span className="profile-label">OD (Right)</span><strong>{selectedCustomer.prescriptionOd || selectedCustomer.prescription_od || 'Not recorded'}</strong></div>
                  <div><span className="profile-label">OS (Left)</span><strong>{selectedCustomer.prescriptionOs || selectedCustomer.prescription_os || 'Not recorded'}</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Profile</h3>
              <button className="modal-close" onClick={() => setShowProfileModal(false)}>Close</button>
            </div>
            <div className="modal-body">
              {/* My Profile Section */}
              <div className="profile-section">
                <div className="section-title-with-button">
                  <h4>My Profile</h4>
                  {!editingOwnProfile && (
                    <button className="btn btn-secondary btn-sm" onClick={() => {
                      setEditingOwnProfile(true);
                      setProfileFormData({
                        username: loggedInUser?.username || '',
                        password: '',
                        displayName: loggedInUser?.displayName || ''
                      });
                    }}>Edit</button>
                  )}
                </div>

                {editingOwnProfile ? (
                  <form onSubmit={handleEditOwnProfile} className="profile-form">
                    <div className="form-group">
                      <label className="form-label">Username</label>
                      <input 
                        className="form-input" 
                        type="text"
                        value={profileFormData.username}
                        onChange={(e) => setProfileFormData({...profileFormData, username: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Display Name</label>
                      <input 
                        className="form-input" 
                        type="text"
                        value={profileFormData.displayName}
                        onChange={(e) => setProfileFormData({...profileFormData, displayName: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New Password (optional)</label>
                      <input 
                        className="form-input" 
                        type="password"
                        placeholder="Leave blank to keep current password"
                        value={profileFormData.password}
                        onChange={(e) => setProfileFormData({...profileFormData, password: e.target.value})}
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => {
                        setEditingOwnProfile(false);
                        setProfileFormData({ username: '', password: '', displayName: '' });
                      }}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-display">
                    <div className="profile-row">
                      <span className="profile-label">Name:</span>
                      <span>{loggedInUser?.displayName || 'N/A'}</span>
                    </div>
                    <div className="profile-row">
                      <span className="profile-label">Username:</span>
                      <span>@{loggedInUser?.username || 'N/A'}</span>
                    </div>
                    <div className="profile-row">
                      <span className="profile-label">Role:</span>
                      <span><span className="badge badge-info">{currentUserRoleLabel || 'N/A'}</span></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Account Management Section */}
              {isAdmin && (
                <div className="profile-section">
                  <div className="section-title-with-button">
                    <h4>Manage Accounts</h4>
                    {!showAddAccountForm && (
                      <button className="btn btn-primary btn-sm" onClick={() => setShowAddAccountForm(true)}>+ Add Account</button>
                    )}
                  </div>

                  {showAddAccountForm && (
                    <div className="add-account-form-container">
                      <form onSubmit={handleAddAccount} className="profile-form">
                        <h5>Create New Account</h5>
                        <div className="form-group">
                          <label className="form-label">Username</label>
                          <input 
                            className="form-input" 
                            type="text"
                            value={newAccountForm.username}
                            onChange={(e) => setNewAccountForm({...newAccountForm, username: e.target.value})}
                            placeholder="New username"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Display Name</label>
                          <input 
                            className="form-input" 
                            type="text"
                            value={newAccountForm.displayName}
                            onChange={(e) => setNewAccountForm({...newAccountForm, displayName: e.target.value})}
                            placeholder="Full name"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Password</label>
                          <input 
                            className="form-input" 
                            type="password"
                            value={newAccountForm.password}
                            onChange={(e) => setNewAccountForm({...newAccountForm, password: e.target.value})}
                            placeholder="Password"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Role</label>
                          <select 
                            className="form-select"
                            value={newAccountForm.role}
                            onChange={(e) => setNewAccountForm({...newAccountForm, role: e.target.value})}
                          >
                            <option value="STAFF">Staff</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </div>
                        <div className="form-actions">
                          <button type="submit" className="btn btn-primary btn-sm">Create Account</button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => {
                            setShowAddAccountForm(false);
                            setNewAccountForm({ username: '', password: '', displayName: '', role: 'STAFF' });
                          }}>Cancel</button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="accounts-list">
                    {users.length > 0 ? (
                      users.map((user) => (
                        <div key={user.id} className="account-item">
                          <div className="account-avatar">{user.displayName?.charAt(0) || 'U'}</div>
                          <div className="account-info">
                            <div className="account-name">{user.displayName}</div>
                            {editingAccountId === user.id ? (
                              <div className="edit-account-form">
                                <select 
                                  className="form-select"
                                  value={editingAccountForm.role}
                                  onChange={(e) => setEditingAccountForm({role: e.target.value})}
                                >
                                  <option value="STAFF">Staff</option>
                                  <option value="ADMIN">Admin</option>
                                </select>
                                <div className="account-actions">
                                  <button className="btn btn-sm btn-primary" onClick={handleEditAccountRole}>Save</button>
                                  <button className="btn btn-sm btn-secondary" onClick={() => setEditingAccountId(null)}>Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="account-role">{formatUserRole(user.role)}</div>
                                <div className="account-username">@{user.username}</div>
                              </>
                            )}
                          </div>
                          {editingAccountId !== user.id && (
                            <div className="account-actions">
                              <button 
                                className="btn btn-secondary btn-sm" 
                                onClick={() => loadActivityHistory(user.id)}
                                style={{ marginRight: 8 }}
                              >View Activity</button>
                              <button 
                                className="btn btn-secondary btn-sm" 
                                onClick={() => {
                                  setEditingAccountId(user.id);
                                  setEditingAccountForm({role: user.role});
                                }}
                              >Edit Role</button>
                              <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => {
                                  setDeleteConfirmation(user);
                                  setDeleteConfirmationText('');
                                }}
                              >Delete</button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div style={{padding: '16px', textAlign: 'center', color: 'var(--text3)', fontSize: '13px'}}>
                        No accounts yet. Create one to get started.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!isAdmin && (
                <div className="profile-section">
                  <div className="staff-notice">
                    <div className="notice-text">
                      <strong>Staff Access</strong><br />
                      You have access to POS, inventory viewing, and transaction records. Contact an administrator for account management.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmation && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmation(null)}>
          <div className="modal-content delete-confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Account</h3>
              <button className="modal-close" onClick={() => setDeleteConfirmation(null)}>Close</button>
            </div>
            <div className="modal-body">
              <div className="warning-message">
                <div>
                  <strong>Are you sure you want to delete this account?</strong>
                  <p style={{marginTop: '8px', fontSize: '13px', color: 'var(--text3)'}}>
                    Account: <strong>{deleteConfirmation.displayName}</strong> (@{deleteConfirmation.username})
                  </p>
                  <p style={{marginTop: '4px', fontSize: '13px', color: 'var(--red)'}}>
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="confirmation-input">
                <label className="form-label">Type "yes" to confirm deletion:</label>
                <input 
                  className="form-input"
                  type="text"
                  value={deleteConfirmationText}
                  onChange={(e) => setDeleteConfirmationText(e.target.value)}
                  placeholder='Type "yes"'
                  autoFocus
                />
              </div>

              <div className="form-actions">
                <button 
                  className="btn btn-danger" 
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmationText.toLowerCase() !== 'yes'}
                  style={deleteConfirmationText.toLowerCase() !== 'yes' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >Delete Account</button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setDeleteConfirmation(null)}
                >Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
