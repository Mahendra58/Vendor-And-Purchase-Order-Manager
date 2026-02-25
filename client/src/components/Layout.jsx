import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import NotificationBell from './NotificationBell';
import {
    LayoutDashboard, Users, ShoppingCart, FileText, LogOut, Menu, X, Package,
    ChevronRight, Moon, Sun, Monitor, BarChart3, Wallet, Shield, FileStack, Boxes,
    Columns3, TrendingUp, GitCompareArrows, UserCog, Download, CreditCard, FileSearch,
    BookOpen,
} from 'lucide-react';

const allNavItems = [
    { section: 'Main Menu' },
    { to: '/', label: 'Dashboard', icon: LayoutDashboard, permission: 'canViewDashboard' },
    { to: '/vendors', label: 'Vendors', icon: Users, permission: 'canViewVendors' },
    { to: '/purchase-orders', label: 'Purchase Orders', icon: ShoppingCart, permission: 'canViewPurchaseOrders' },
    { to: '/invoices', label: 'Invoices', icon: FileText, permission: 'canViewInvoices' },
    { to: '/kanban', label: 'Kanban Board', icon: Columns3, permission: 'canViewKanban' },
    { section: 'Management' },
    { to: '/contracts', label: 'Contracts', icon: FileStack, permission: 'canViewContracts' },
    { to: '/inventory', label: 'Inventory', icon: Boxes, permission: 'canViewInventory' },
    { to: '/budgets', label: 'Budgets', icon: Wallet, permission: 'canViewBudgets' },
    { section: 'Intelligence' },
    { to: '/analytics', label: 'Analytics', icon: BarChart3, permission: 'canViewAnalytics' },
    { to: '/forecast', label: 'Forecasting', icon: TrendingUp, permission: 'canViewForecast' },
    { to: '/vendor-compare', label: 'Vendor Compare', icon: GitCompareArrows, permission: 'canViewVendorCompare' },
    { section: 'Finance' },
    { to: '/payments', label: 'Payments', icon: CreditCard, permission: 'canViewPayments' },
    { to: '/journal-entries', label: 'Journal Entries', icon: BookOpen, permission: 'canViewJournal' },
    { to: '/reconciliation', label: 'Reconciliation', icon: FileSearch, permission: 'canViewReconciliation' },
    { section: 'Administration' },
    { to: '/users', label: 'User Management', icon: UserCog, permission: 'canViewUsers' },
    { to: '/audit-logs', label: 'Audit Logs', icon: Shield, permission: 'canViewAuditLogs' },
];

const roleBadgeColors = {
    admin: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    manager: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    accountant: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    viewer: 'bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400',
};

const Layout = ({ children }) => {
    const { user, role, permissions, logout } = useAuth();
    const { dark, mode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/login'); };

    return (
        <div className="h-screen bg-surface-50 dark:bg-surface-950 flex overflow-hidden transition-colors duration-300">
            {sidebarOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[270px] bg-white dark:bg-surface-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="h-[68px] flex items-center gap-3 px-6 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-[15px] font-bold text-slate-800 dark:text-white tracking-tight">Vendor & PO</h1>
                        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Manager</p>
                    </div>
                    <button className="ml-auto lg:hidden p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" onClick={() => setSidebarOpen(false)}>
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
                    {allNavItems.map((item, i) => {
                        if (item.section) {
                            return <p key={i} className="px-3 pt-5 pb-2 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">{item.section}</p>;
                        }
                        if (!permissions[item.permission]) return null;
                        return (
                            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-950/50 dark:to-primary-900/20 text-primary-700 dark:text-primary-400 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-300'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary-500 rounded-r-full" />}
                                        <item.icon className={`w-[18px] h-[18px] transition-colors ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-500'}`} />
                                        <span className="flex-1">{item.label}</span>
                                        {isActive && <ChevronRight className="w-4 h-4 text-primary-400 dark:text-primary-500" />}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary-500/20">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{user?.name || 'Admin'}</p>
                            <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${roleBadgeColors[role] || roleBadgeColors.viewer}`}>{role}</span>
                        </div>
                        <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all duration-200" title="Logout">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 h-screen">
                <header className="h-[68px] shrink-0 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 flex items-center px-4 lg:px-8 z-30">
                    <button className="lg:hidden p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg mr-3" onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                    <div className="flex-1" />
                    <div className="flex items-center gap-3">
                        <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200 group" title={mode === 'light' ? 'Switch to Dark' : mode === 'dark' ? 'Switch to System' : 'Switch to Light'}>
                            {mode === 'light' && <Sun className="w-[18px] h-[18px] text-amber-500 group-hover:rotate-45 transition-transform duration-300" />}
                            {mode === 'dark' && <Moon className="w-[18px] h-[18px] text-indigo-400 group-hover:-rotate-12 transition-transform duration-300" />}
                            {mode === 'system' && <Monitor className="w-[18px] h-[18px] text-slate-500 dark:text-slate-400 group-hover:scale-110 transition-transform duration-300" />}
                        </button>
                        <NotificationBell />
                        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Welcome, <span className="font-bold text-slate-700 dark:text-slate-200">{user?.name || 'Admin'}</span></span>
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
