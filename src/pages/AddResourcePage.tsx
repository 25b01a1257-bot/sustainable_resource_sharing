import { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/router';
import { CATEGORIES, CONDITIONS, type Category, type Condition, type SharingType } from '@/types';

interface FormData {
  name: string;
  category: Category | '';
  description: string;
  condition: Condition | '';
  location: string;
  owner: string;
  quantity: string;
  sharingType: SharingType;
}

const initialForm: FormData = {
  name: '',
  category: '',
  description: '',
  condition: '',
  location: '',
  owner: '',
  quantity: '1',
  sharingType: 'Give',
};

export default function AddResourcePage() {
  const { addResource } = useApp();
  const { navigate } = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = 'Resource name is required';
    if (!form.category) e.category = 'Please select a category';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.condition) e.condition = 'Please select a condition';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!form.owner.trim()) e.owner = 'Owner name is required';
    const qty = parseInt(form.quantity, 10);
    if (isNaN(qty) || qty < 1) e.quantity = 'Quantity must be at least 1';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    addResource({
      name: form.name.trim(),
      category: form.category as Category,
      description: form.description.trim(),
      condition: form.condition as Condition,
      location: form.location.trim(),
      owner: form.owner.trim(),
      quantity: parseInt(form.quantity, 10),
      sharingType: form.sharingType,
    });
    setSuccess(true);
    setForm(initialForm);
    setTimeout(() => setSuccess(false), 3000);
  };

  const update = (key: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const inputClass = (key: keyof FormData) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
      errors[key]
        ? 'border-red-300 focus:ring-red-500'
        : 'border-gray-200 focus:ring-green-500'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('dashboard')}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Share a Resource</h1>
        <p className="text-gray-500 text-sm mb-6">
          Fill in the details below to list an item for sharing with the community.
        </p>

        {success && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700">
              Resource shared successfully! It's now visible in the dashboard.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Resource Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="e.g., Engineering Mathematics textbook"
              className={inputClass('name')}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
          </div>

          {/* Category + Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass('category')}>
                <option value="">Select category...</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.category}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Condition *</label>
              <select value={form.condition} onChange={(e) => update('condition', e.target.value)} className={inputClass('condition')}>
                <option value="">Select condition...</option>
                {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.condition && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.condition}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={3}
              placeholder="Describe the item, its usage, and any wear and tear..."
              className={inputClass('description')}
            />
            {errors.description && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
          </div>

          {/* Location + Owner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location *</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder="e.g., Hostel A, Block 3"
                className={inputClass('location')}
              />
              {errors.location && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.location}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Owner Name *</label>
              <input
                type="text"
                value={form.owner}
                onChange={(e) => update('owner', e.target.value)}
                placeholder="Your name"
                className={inputClass('owner')}
              />
              {errors.owner && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.owner}</p>}
            </div>
          </div>

          {/* Quantity + Sharing Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Available Quantity *</label>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) => update('quantity', e.target.value)}
                className={inputClass('quantity')}
              />
              {errors.quantity && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.quantity}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Sharing Type</label>
              <div className="flex gap-3 mt-1">
                {(['Give', 'Lend'] as SharingType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update('sharingType', t)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      form.sharingType === t
                        ? 'bg-green-50 border-green-300 text-green-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {t === 'Give' ? 'Give Away' : 'Lend Temporarily'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-sm"
            >
              Share Resource
            </button>
            <button
              type="button"
              onClick={() => setForm(initialForm)}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
