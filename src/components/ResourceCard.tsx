import {
  BookOpen, PenTool, Laptop, Shirt, Sofa, Package,
  MapPin, User, Calendar, CheckCircle, XCircle, ArrowRight,
} from 'lucide-react';
import type { Resource } from '@/types';
import { useRouter } from '@/router';

const iconMap: Record<string, typeof BookOpen> = {
  BookOpen, PenTool, Laptop, Shirt, Sofa, Package,
};

export function CategoryIcon({ category, className = 'w-5 h-5' }: { category: string; className?: string }) {
  const Icon = iconMap[
    category === 'Books' ? 'BookOpen' :
    category === 'Stationery' ? 'PenTool' :
    category === 'Electronics' ? 'Laptop' :
    category === 'Clothes' ? 'Shirt' :
    category === 'Furniture' ? 'Sofa' : 'Package'
  ] ?? Package;
  return <Icon className={className} />;
}

const conditionColors: Record<string, string> = {
  'New': 'bg-green-100 text-green-700',
  'Like New': 'bg-emerald-100 text-emerald-700',
  'Good': 'bg-blue-100 text-blue-700',
  'Fair': 'bg-amber-100 text-amber-700',
  'Poor': 'bg-red-100 text-red-700',
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  const { navigate } = useRouter();

  return (
    <div
      onClick={() => navigate('details', { id: resource.id })}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-green-200 transition-all cursor-pointer overflow-hidden"
    >
      <div className="relative h-32 bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center">
        <CategoryIcon category={resource.category} className="w-12 h-12 text-white/90" />
        <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${conditionColors[resource.condition]}`}>
          {resource.condition}
        </span>
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
          {resource.sharingType}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors line-clamp-1">
          {resource.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{resource.category}</p>

        <div className="space-y-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>{resource.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span>{resource.owner}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{resource.dateAdded}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          {resource.available ? (
            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              <CheckCircle className="w-4 h-4" /> Available ({resource.quantity})
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-medium text-red-500">
              <XCircle className="w-4 h-4" /> Unavailable
            </span>
          )}
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
}
