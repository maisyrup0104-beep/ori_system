import { Table2, Timeline } from 'lucide-react';

export default function ViewToggle({ activeView, onViewChange }) {
  return (
    <div className="flex gap-2 border border-green-200 rounded-lg p-1 w-fit">
      <button
        onClick={() => onViewChange('table')}
        className={`flex items-center gap-2 px-4 py-2 rounded transition-colors font-semibold ${
          activeView === 'table'
            ? 'bg-gradient-to-r from-pink-400 to-green-400 text-white'
            : 'bg-white text-gray-700 hover:bg-green-50'
        }`}
      >
        <Table2 size={18} />
        Table
      </button>
      <button
        onClick={() => onViewChange('timeline')}
        className={`flex items-center gap-2 px-4 py-2 rounded transition-colors font-semibold ${
          activeView === 'timeline'
            ? 'bg-gradient-to-r from-pink-400 to-green-400 text-white'
            : 'bg-white text-gray-700 hover:bg-green-50'
        }`}
      >
        <Timeline size={18} />
        Timeline
      </button>
    </div>
  );
}
