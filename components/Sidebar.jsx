'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Logs,
  User2,
  Globe,
  FileText,
  Workflow,
  Users,
  Zap,
  Settings,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/event-log', label: 'Event Log', icon: Logs },
  { href: '/personal-state', label: 'Personal State', icon: User2 },
  { href: '/ori-state', label: 'Ori State', icon: Globe },
  { href: '/content-os', label: 'Content OS', icon: FileText },
  { href: '/pipeline', label: 'Pipeline', icon: Workflow },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/production', label: 'Production', icon: Zap },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold">ORI Sprint OS</h1>
      </div>

      <nav className="px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
