import React, { useState, useEffect, useMemo } from 'react';
import { fetchProjectData, createInventoryItem, loginUser } from './api';

const pageLabels = {
  dashboard: ['Dashboard', 'Overview'],
  pos: ['New Transaction', 'Point of Sale'],
  records: ['Transaction Records', 'All Transactions'],
  customers: ['Customer Directory', 'CRM'],
  inventory: ['Inventory', 'Stock Management'],
  forecast: ['Sales Forecast', 'Predictive Analytics'],
  architecture: ['System Design', 'Chapter 3 — Design'],
  reports: ['Reports', 'Analytics']
};

const navItems = [
  { section: 'Main', items: [{ id: 'dashboard', icon: '⊞', label: 'Dashboard' }] },
  {
    section: 'Transactions',
    items: [
      { id: 'pos', icon: '🧾', label: 'New Transaction' },
      { id: 'records', icon: '📋', label: 'Transaction Records' },
      { id: 'customers', icon: '👤', label: 'Customers' }
    ]
  },
  {
    section: 'Operations',
    items: [
      { id: 'inventory', icon: '📦', label: 'Inventory' },
      { id: 'forecast', icon: '📈', label: 'Sales Forecast' }
    ]
  },
  {
    section: 'System',
    items: [
      { id: 'architecture', icon: '⚙️', label: 'System Design' },
      { id: 'reports', icon: '📊', label: 'Reports' }
    ]
  }
];

const paymentOptions = ['Cash', 'GCash', 'Credit Card', 'Debit Card', 'Bank Transfer'];
const recordStatusOptions = ['All Status', 'Paid', 'Processing', 'Pending'];
const inventoryStatusOptions = ['All Status', 'OK', 'Low', 'Critical'];
const appKpi = [
  { label: "Today's Revenue", value: '₱14,280', tone: 'green', subtitle: 'Since opening' },
  { label: 'Transactions Today', value: '23', tone: 'blue', subtitle: 'Current shift' },
  { label: 'Low Stock Alerts', value: '5', tone: 'red', subtitle: 'Action required' },
  { label: 'Inventory Value', value: '₱284K', tone: 'gold', subtitle: 'Estimated total' }
];

function getStatusBadge(status) {
  if (status === 'Critical') return 'badge-danger';
  if (status === 'Low') return 'badge-warning';
  if (status === 'Paid') return 'badge-success';
  if (status === 'Processing') return 'badge-info';
  return 'badge-neutral';
}

function ChartBars({ actual, forecast, labels, maxH = 90, style }) {
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
            {fVal ? <div className="chart-bar" style={{ height: `${fH}px`, background: 'var(--blue)', opacity: 0.55 }} /> : null}
          </div>
        );
      })}
      <div className="chart-label">{labels.map((label) => (<span key={label}>{label}</span>))}</div>
    </div>
  );
}

const initialInventoryForm = {
  item: '',
  category: ''
};

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [data, setData] = useState({ customers: [], transactions: [], inventory: [], forecastMonthly: [], topDemand: [] });
  const [inventoryForm, setInventoryForm] = useState(initialInventoryForm);
  const [inventoryMessage, setInventoryMessage] = useState('');
  const [inventoryError, setInventoryError] = useState('');
  const [recordSearch, setRecordSearch] = useState('');
  const [recordPaymentFilter, setRecordPaymentFilter] = useState('All Payment Types');
  const [recordStatusFilter, setRecordStatusFilter] = useState('All Status');
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState('All Categories');
  const [inventoryStatusFilter, setInventoryStatusFilter] = useState('All Status');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      loadData();
    }
  }, [loggedInUser]);

  const loadData = async () => {
    setInventoryError('');
    setIsLoading(true);
    try {
      const result = await fetchProjectData();
      setData({
        customers: result.customers || [],
        transactions: result.transactions || [],
        inventory: result.inventory || [],
        forecastMonthly: result.forecastMonthly || [],
        topDemand: result.topDemand || []
      });
    } catch (error) {
      setInventoryError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginChange = (field, value) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoginError('');
    try {
      const user = await loginUser(loginForm);
      setLoggedInUser(user);
      setCurrentPage('dashboard');
      setLoginForm({ username: '', password: '' });
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handleInventoryChange = (field, value) => {
    setInventoryForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleInventorySubmit = async (event) => {
    event.preventDefault();
    setInventoryError('');
    setInventoryMessage('');
    if (!inventoryForm.item || !inventoryForm.category) {
      setInventoryError('Please select both an item and a category.');
      return;
    }

    const selectedItem = data.inventory.find((item) => item.name === inventoryForm.item);
    const sku = selectedItem?.sku || `${inventoryForm.item.slice(0, 3).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

    try {
      const created = await createInventoryItem({
        name: inventoryForm.item,
        sku,
        category: inventoryForm.category
      });
      setData((prev) => ({ ...prev, inventory: [created, ...prev.inventory] }));
      setInventoryMessage(`Added ${created.name} to inventory.`);
      setInventoryForm(initialInventoryForm);
    } catch (error) {
      setInventoryError(error.message);
    }
  };

  const categories = useMemo(() => Array.from(new Set(data.inventory.map((item) => item.category))).sort(), [data.inventory]);
  const items = useMemo(() => Array.from(new Set(data.inventory.map((item) => item.name))).sort(), [data.inventory]);

  const filteredTransactions = useMemo(() => {
    const query = recordSearch.trim().toLowerCase();
    return data.transactions.filter((record) => {
      const matchesQuery = !query || [record.txnId, record.customerName, record.items, record.payment, record.status]
        .some((value) => value?.toLowerCase().includes(query));
      const matchesPayment = recordPaymentFilter === 'All Payment Types' || record.payment === recordPaymentFilter;
      const matchesStatus = recordStatusFilter === 'All Status' || record.status === recordStatusFilter;
      return matchesQuery && matchesPayment && matchesStatus;
    });
  }, [data.transactions, recordSearch, recordPaymentFilter, recordStatusFilter]);

  const filteredInventory = useMemo(() => {
    const query = inventorySearch.trim().toLowerCase();
    return data.inventory.filter((item) => {
      const matchesQuery = !query || [item.name, item.sku, item.category]
        .some((value) => value?.toLowerCase().includes(query));
      const matchesCategory = inventoryCategoryFilter === 'All Categories' || item.category === inventoryCategoryFilter;
      const matchesStatus = inventoryStatusFilter === 'All Status' || item.status === inventoryStatusFilter;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [data.inventory, inventorySearch, inventoryCategoryFilter, inventoryStatusFilter]);

  const recentTransactions = filteredTransactions.slice(0, 5);
  const pageHeader = pageLabels[currentPage] || ['Dashboard', 'Overview'];

  if (!loggedInUser) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="login-title">Staff Login</div>
          <div className="login-subtitle">Enter your staff account to access the Almeda Optical system.</div>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  className="form-input"
                  value={loginForm.username}
                  onChange={(e) => handleLoginChange('username', e.target.value)}
                  placeholder="Username"
                  autoComplete="username"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  className="form-input"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => handleLoginChange('password', e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </div>
            </div>
            {loginError ? <div className="login-error">{loginError}</div> : null}
            <div className="form-row" style={{ marginTop: 20 }}>
              <button className="btn btn-primary full-width">Sign In</button>
            </div>
          </form>
          <div className="form-hint" style={{ marginTop: 14 }}>
            Use <strong>admin / admin123</strong> or <strong>cashier / cashier123</strong> for testing.
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <aside className={sidebarHidden ? 'sidebar hidden' : 'sidebar'}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-eye">👁️</div>
          <div className="sidebar-logo-name">Almeda Optical</div>
          <div className="sidebar-logo-sub">Management System</div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((group) => (
            <div key={group.section}>
              <div className="sidebar-section">{group.section}</div>
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className={`nav-item${currentPage === item.id ? ' active' : ''}`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{loggedInUser.displayName?.split(' ').map((word) => word[0]).join('').slice(0, 2)}</div>
            <div>
              <div className="user-name">{loggedInUser.displayName}</div>
              <div className="user-role">{loggedInUser.role}</div>
            </div>
          </div>
        </div>
      </aside>

      <div className={sidebarHidden ? 'main sidebar-hidden' : 'main'}>
        <div className="topbar">
          <div className="hamburger-btn" onClick={() => setSidebarHidden((value) => !value)}>☰</div>
          <span className="topbar-page-title">{pageHeader[0]}</span>
          <span className="topbar-sep">/</span>
          <span className="topbar-breadcrumb">{pageHeader[1]}</span>
          <div className="topbar-right">
            <div className="logged-in-user">👤 {loggedInUser.displayName}</div>
            <button className="btn btn-secondary btn-sm" onClick={() => setLoggedInUser(null)}>Logout</button>
          </div>
        </div>

        <div className="content">
          <div className={`page${currentPage === 'dashboard' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Good morning, {loggedInUser.displayName}</div>
              <div className="page-subtitle">Everything is ready for your next transaction.</div>
            </div>

            <div className="kpi-grid">
              {appKpi.map((item) => (
                <div key={item.label} className={`kpi-card ${item.tone}`}>
                  <div className="kpi-label">{item.label}</div>
                  <div className="kpi-value">{item.value}</div>
                  <div className="kpi-sub">{item.subtitle}</div>
                </div>
              ))}
            </div>

            <div className="grid-2-1" style={{ marginBottom: 16 }}>
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="card-title" style={{ marginBottom: 0 }}>Recent Transactions</div>
                  <button className="btn btn-secondary btn-sm" onClick={() => setCurrentPage('records')}>View all →</button>
                </div>
                <table className="data-table">
                  <thead>
                    <tr><th>#</th><th>Customer</th><th>Item</th><th>Amount</th><th>Payment</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.txnId}>
                        <td className="text-xs">{transaction.txnId}</td>
                        <td className="name">{transaction.customerName}</td>
                        <td>{transaction.items}</td>
                        <td>₱{transaction.amount.toLocaleString()}</td>
                        <td>{transaction.payment}</td>
                        <td><span className={`badge ${getStatusBadge(transaction.status)}`}>{transaction.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="card">
                <div className="card-title">Inventory Snapshot</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <div className="alert-item">
                    <span className="status-dot dot-red" />
                    <div style={{ flex: 1 }}>
                      <div className="font-medium" style={{ fontSize: 13 }}>Ray-Ban RB3025 Gold</div>
                      <div className="text-xs">2 pcs remaining · needs restock</div>
                    </div>
                    <span className="badge badge-danger">Critical</span>
                  </div>
                  <div className="alert-item">
                    <span className="status-dot dot-orange" />
                    <div style={{ flex: 1 }}>
                      <div className="font-medium" style={{ fontSize: 13 }}>Oakley Holbrook</div>
                      <div className="text-xs">4 pcs remaining · below ideal level</div>
                    </div>
                    <span className="badge badge-warning">Low</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-2">
              <div className="card">
                <div className="card-title">Revenue Forecast</div>
                <ChartBars
                  actual={[48, 52, 58, 63, 0, 0, 0, 0, 0, 0]}
                  forecast={[0, 0, 0, 0, 68, 72, 70, 71, 74, 69]}
                  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']}
                />
              </div>
              <div className="card">
                <div className="card-title">Forecast Confidence</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {data.topDemand.slice(0, 5).map((item) => (
                    <div className="module-row" key={item.product}>
                      <div className="module-row-info">
                        <div className="module-row-name">{item.product}</div>
                        <div className="module-row-desc">Projected {item.units}</div>
                      </div>
                      <span className="badge badge-warning">{item.restock}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`page${currentPage === 'pos' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">New Transaction</div>
              <div className="page-subtitle">Paperless point-of-sale — fast checkout</div>
            </div>
            <div className="grid-2">
              <div>
                <div className="card mb-4">
                  <div className="card-title">Customer Information</div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Customer Name</label>
                      <input className="form-input" type="text" placeholder="Full name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact Number</label>
                      <input className="form-input" type="tel" placeholder="09XXXXXXXXX" />
                    </div>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-title">Product / Service</div>
                  <div className="form-row">
                    <div className="form-group" style={{ flex: 3 }}>
                      <label className="form-label">Item</label>
                      <select className="form-select">
                        {items.map((name) => <option key={name}>{name}</option>)}
                      </select>
                    </div>
                    <div className="form-group" style={{ flex: 0.8, minWidth: 80 }}>
                      <label className="form-label">Qty</label>
                      <input className="form-input" type="number" min="1" defaultValue="1" />
                    </div>
                    <div className="form-group" style={{ flex: 1.2 }}>
                      <label className="form-label">Unit Price</label>
                      <input className="form-input" type="text" placeholder="₱0" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Payment Method</label>
                      <select className="form-select">
                        {paymentOptions.map((payment) => <option key={payment}>{payment}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Notes / Special Instructions</label>
                      <textarea className="form-textarea" placeholder="Add any notes here..." />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="btn btn-primary">Process Transaction</button>
                    <button className="btn btn-secondary">Save Draft</button>
                  </div>
                </div>
              </div>

              <div>
                <div className="card mb-4">
                  <div className="card-title">Receipt Preview</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                    <strong style={{ fontSize: 14, color: 'var(--text)' }}>Almeda Optical Shangri-La</strong><br />
                    TXN preview and sales summary
                  </div>
                  <div className="receipt-line"><span>Sample item line</span><span>₱0.00</span></div>
                  <div className="receipt-total-line"><span>Total Due</span><span>₱0.00</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className={`page${currentPage === 'records' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Transaction Records</div>
              <div className="page-subtitle">Search and filter transactions in real time.</div>
            </div>
            <div className="top-actions">
              <input
                className="search-input"
                type="search"
                value={recordSearch}
                onChange={(e) => setRecordSearch(e.target.value)}
                placeholder="Search by customer, transaction ID, item, payment or status"
              />
              <select className="form-select" value={recordPaymentFilter} onChange={(e) => setRecordPaymentFilter(e.target.value)}>
                <option>All Payment Types</option>
                {paymentOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
              <select className="form-select" value={recordStatusFilter} onChange={(e) => setRecordStatusFilter(e.target.value)}>
                {recordStatusOptions.map((status) => <option key={status}>{status}</option>)}
              </select>
              <button className="btn btn-secondary btn-sm" onClick={() => loadData()}>Refresh</button>
              <button className="btn btn-primary btn-sm" onClick={() => setCurrentPage('pos')}>+ New Transaction</button>
            </div>

            <div className="card">
              <table className="data-table">
                <thead>
                  <tr><th>TXN ID</th><th>Date</th><th>Customer</th><th>Item(s)</th><th>Amount</th><th>Payment</th><th>Status</th><th /></tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((record) => (
                    <tr key={record.txnId}>
                      <td className="text-xs">{record.txnId}</td>
                      <td className="text-xs">{record.txDate}</td>
                      <td className="name">{record.customerName}</td>
                      <td>{record.items}</td>
                      <td>₱{record.amount.toLocaleString()}</td>
                      <td>{record.payment}</td>
                      <td><span className={`badge ${getStatusBadge(record.status)}`}>{record.status}</span></td>
                      <td><button className="btn btn-secondary btn-sm">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text3)' }}>
                <span>{filteredTransactions.length} records found</span>
                <div className="flex gap-2">
                  <button className="btn btn-secondary btn-sm">← Previous</button>
                  <button className="btn btn-secondary btn-sm">Next →</button>
                </div>
              </div>
            </div>
          </div>

          <div className={`page${currentPage === 'customers' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Customer Directory</div>
              <div className="page-subtitle">All registered customers and their profiles.</div>
            </div>
            <div className="top-actions">
              <input className="search-input" placeholder="Search by customer name or card" disabled />
              <button className="btn btn-primary btn-sm">+ Register Customer</button>
            </div>
            <div className="card">
              <table className="data-table">
                <thead><tr><th>Customer</th><th>Card No.</th><th>Total Spend</th><th>Last Visit</th><th>Status</th><th /></tr></thead>
                <tbody>
                  {data.customers.map((customer) => (
                    <tr key={customer.card}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="mini-avatar" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{customer.initials}</div>
                          <span className="name">{customer.name}</span>
                        </div>
                      </td>
                      <td className="text-xs">{customer.card}</td>
                      <td>₱{customer.totalSpend.toLocaleString()}</td>
                      <td>{customer.lastVisit}</td>
                      <td><span className={`badge ${customer.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>{customer.status}</span></td>
                      <td><button className="btn btn-secondary btn-sm">Profile</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`page${currentPage === 'inventory' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Inventory Management</div>
              <div className="page-subtitle">Real-time stock monitoring with searchable items.</div>
            </div>
            <div className="top-actions">
              <input
                className="search-input"
                type="search"
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                placeholder="Search products..."
              />
              <select className="form-select" value={inventoryCategoryFilter} onChange={(e) => setInventoryCategoryFilter(e.target.value)}>
                <option>All Categories</option>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
              <select className="form-select" value={inventoryStatusFilter} onChange={(e) => setInventoryStatusFilter(e.target.value)}>
                {inventoryStatusOptions.map((status) => <option key={status}>{status}</option>)}
              </select>
              <button className="btn btn-primary btn-sm" onClick={() => setInventoryForm(initialInventoryForm)}>+ Add Product</button>
            </div>
            {inventoryError && <div className="card" style={{ marginBottom: 16, borderColor: 'var(--red)' }}><div style={{ padding: 14, color: 'var(--red)', fontSize: 13 }}>{inventoryError}</div></div>}
            {inventoryMessage && <div className="card" style={{ marginBottom: 16, borderColor: 'var(--accent-mid)' }}><div style={{ padding: 14, color: 'var(--accent-mid)', fontSize: 13 }}>{inventoryMessage}</div></div>}
            <div className="card mb-4">
              <div className="card-title">Add New Inventory Item</div>
              <form className="grid-2" onSubmit={handleInventorySubmit}>
                <div className="form-group">
                  <label className="form-label">Item</label>
                  <select className="form-select" value={inventoryForm.item} onChange={(e) => handleInventoryChange('item', e.target.value)}>
                    <option value="">Select item</option>
                    {items.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={inventoryForm.category} onChange={(e) => handleInventoryChange('category', e.target.value)}>
                    <option value="">Select category</option>
                    {categories.map((category) => <option key={category}>{category}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ alignSelf: 'flex-end' }}>
                  <button className="btn btn-primary full-width" type="submit">Save Item</button>
                </div>
              </form>
            </div>
            <div className="card">
              <table className="data-table">
                <thead>
                  <tr><th>Product</th><th>SKU</th><th>Category</th><th>In Stock</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {filteredInventory.map((product) => (
                    <tr key={product.sku}>
                      <td className="name">{product.name}</td>
                      <td className="text-xs">{product.sku}</td>
                      <td>{product.category}</td>
                      <td><strong>{product.inStock}</strong></td>
                      <td><span className={`badge ${getStatusBadge(product.status)}`}>{product.status}</span></td>
                      <td><button className="btn btn-secondary btn-sm">Update</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`page${currentPage === 'forecast' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Sales Forecast</div>
              <div className="page-subtitle">Predictive analytics powered by backend data.</div>
            </div>
            <div className="kpi-grid">
              {appKpi.map((item) => (
                <div key={item.label} className={`kpi-card ${item.tone}`}>
                  <div className="kpi-label">{item.label}</div>
                  <div className="kpi-value">{item.value}</div>
                  <div className="kpi-sub">{item.subtitle}</div>
                </div>
              ))}
            </div>
            <div className="grid-2 mb-4">
              <div className="card">
                <div className="card-title">Revenue Forecast — 2026</div>
                <ChartBars
                  actual={[48, 52, 58, 63, 0, 0, 0]}
                  forecast={[0, 0, 0, 0, 68, 72, 70]}
                  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
                />
              </div>
              <div className="card">
                <div className="card-title">Top Demand</div>
                <table className="data-table">
                  <thead><tr><th>Product</th><th>Projected Units</th><th>Suggested Restock</th></tr></thead>
                  <tbody>
                    {data.topDemand.map((item) => (
                      <tr key={item.product}>
                        <td>{item.product}</td>
                        <td>{item.units}</td>
                        <td><span className="badge badge-warning">{item.restock}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className={`page${currentPage === 'architecture' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">System Design</div>
              <div className="page-subtitle">Architecture summary and module map.</div>
            </div>
            <div className="card">
              <div className="card-title">System Architecture — Core Modules</div>
              <div className="grid-3" style={{ gap: 12, marginTop: 16 }}>
                {[
                  { icon: '🧾', title: 'Paperless Transactions', desc: 'Digital POS, receipts, and customer records.' },
                  { icon: '📦', title: 'Inventory Optimization', desc: 'Searchable stock data and alerts.' },
                  { icon: '📈', title: 'Sales Forecasting', desc: 'Forecasting dashboard with predictive insights.' }
                ].map((item) => (
                  <div className="arch-module" key={item.title}>
                    <span className="arch-module-icon">{item.icon}</span>
                    <div className="arch-module-title">{item.title}</div>
                    <div className="arch-module-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`page${currentPage === 'reports' ? ' active' : ''}`}>
            <div className="page-header">
              <div className="page-title">Reports</div>
              <div className="page-subtitle">Generate summaries and exports.</div>
            </div>
            <div className="grid-2 mb-4">
              <div className="card">
                <div className="card-title">Generate Report</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Report Type</label>
                    <select className="form-select">
                      <option>Daily Sales Summary</option>
                      <option>Weekly Inventory Report</option>
                      <option>Monthly Revenue Analysis</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Date From</label><input className="form-input" type="date" defaultValue="2026-04-01" /></div>
                  <div className="form-group"><label className="form-label">Date To</label><input className="form-input" type="date" defaultValue="2026-04-12" /></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="btn btn-primary">Generate</button>
                  <button className="btn btn-secondary">Export CSV</button>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Quick Stats</div>
                <div className="grid-2" style={{ gap: 10 }}>
                  {[
                    { value: '₱189K', label: 'Month Revenue' },
                    { value: '302', label: 'Transactions' },
                    { value: '₱626', label: 'Avg. Ticket' }
                  ].map((stat) => (
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
    </>
  );
}

export default App;
