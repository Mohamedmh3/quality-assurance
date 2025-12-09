import { useState } from 'react';
import { X, Upload, AlertCircle, Camera, FileText } from 'lucide-react';
import type { BugReportData } from '@/lib/enhanced-qa-types';
import { cn } from '@/lib/utils';

interface BugReportFormProps {
  testId: string;
  testName: string;
  onSubmit: (data: BugReportData) => void;
  onCancel: () => void;
}

export function BugReportForm({ testId, testName, onSubmit, onCancel }: BugReportFormProps) {
  const [formData, setFormData] = useState<BugReportData>({
    whatWentWrong: '',
    whatExpected: '',
    canReproduce: 'yes',
    importance: 'medium',
    screenshots: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.whatWentWrong.trim()) {
      newErrors.whatWentWrong = 'Please describe what went wrong';
    }
    if (!formData.whatExpected.trim()) {
      newErrors.whatExpected = 'Please describe what you expected to happen';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        screenshots: [...prev.screenshots, ...files]
      }));
    }
  };

  const removeScreenshot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  const importanceOptions = [
    { value: 'critical', label: '🔴 Critical - The app is completely broken', color: 'text-red-400' },
    { value: 'high', label: '🟠 High - A major feature doesn\'t work', color: 'text-orange-400' },
    { value: 'medium', label: '🟡 Medium - Something is annoying or confusing', color: 'text-amber-400' },
    { value: 'low', label: '🟢 Low - A minor cosmetic issue', color: 'text-emerald-400' }
  ];

  const reproduceOptions = [
    { value: 'yes', label: 'Yes, it happens every time' },
    { value: 'sometimes', label: 'Sometimes, but not always' },
    { value: 'once', label: 'No, it only happened once' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--color-bg-secondary)] rounded-3xl border-2 border-red-500/30 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[var(--color-bg-secondary)] border-b-2 border-[var(--color-border)] p-6 lg:p-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
              Report This Issue
            </h3>
            <p className="text-base lg:text-lg text-[var(--color-text-secondary)]">
              Test: {testName} ({testId})
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-[var(--color-text-muted)]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-8">
          {/* What went wrong */}
          <div>
            <label className="block text-lg lg:text-xl font-bold text-[var(--color-text-primary)] mb-3">
              What went wrong? <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.whatWentWrong}
              onChange={(e) => setFormData(prev => ({ ...prev, whatWentWrong: e.target.value }))}
              placeholder="Example: The 'Add to Cart' button didn't do anything when I tapped it"
              className={cn(
                'w-full min-h-[120px] p-4 rounded-xl border-2 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]',
                'focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500',
                errors.whatWentWrong ? 'border-red-500' : 'border-[var(--color-border)]'
              )}
              required
            />
            {errors.whatWentWrong && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.whatWentWrong}
              </p>
            )}
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Describe in your own words what happened
            </p>
          </div>

          {/* What expected */}
          <div>
            <label className="block text-lg lg:text-xl font-bold text-[var(--color-text-primary)] mb-3">
              What did you expect to happen? <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.whatExpected}
              onChange={(e) => setFormData(prev => ({ ...prev, whatExpected: e.target.value }))}
              placeholder="Example: The dish should have been added to my cart"
              className={cn(
                'w-full min-h-[120px] p-4 rounded-xl border-2 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]',
                'focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500',
                errors.whatExpected ? 'border-red-500' : 'border-[var(--color-border)]'
              )}
              required
            />
            {errors.whatExpected && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.whatExpected}
              </p>
            )}
          </div>

          {/* Can reproduce */}
          <div>
            <label className="block text-lg lg:text-xl font-bold text-[var(--color-text-primary)] mb-3">
              Can you make it happen again? <span className="text-red-400">*</span>
            </label>
            <div className="space-y-3">
              {reproduceOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                    formData.canReproduce === option.value
                      ? 'bg-red-500/20 border-red-500/50'
                      : 'bg-[var(--color-bg-primary)] border-[var(--color-border)] hover:border-red-500/30'
                  )}
                >
                  <input
                    type="radio"
                    name="canReproduce"
                    value={option.value}
                    checked={formData.canReproduce === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, canReproduce: e.target.value as any }))}
                    className="w-5 h-5 text-red-500"
                  />
                  <span className="text-base lg:text-lg text-[var(--color-text-primary)] font-medium">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Importance */}
          <div>
            <label className="block text-lg lg:text-xl font-bold text-[var(--color-text-primary)] mb-3">
              How important is this? <span className="text-red-400">*</span>
            </label>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Not sure? If it stops you from completing a purchase, it's Critical or High
            </p>
            <div className="space-y-3">
              {importanceOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                    formData.importance === option.value
                      ? 'bg-red-500/20 border-red-500/50'
                      : 'bg-[var(--color-bg-primary)] border-[var(--color-border)] hover:border-red-500/30'
                  )}
                >
                  <input
                    type="radio"
                    name="importance"
                    value={option.value}
                    checked={formData.importance === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, importance: e.target.value as any }))}
                    className="w-5 h-5 text-red-500"
                  />
                  <span className={cn('text-base lg:text-lg font-medium', option.color)}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div>
            <label className="block text-lg lg:text-xl font-bold text-[var(--color-text-primary)] mb-3">
              Screenshots or Screen Recording
            </label>
            <div className="bg-[var(--color-bg-primary)] rounded-xl border-2 border-[var(--color-border)] p-6">
              <div className="mb-4">
                <p className="text-sm lg:text-base text-[var(--color-text-muted)] mb-4">
                  Take a screenshot on your device:
                </p>
                <ul className="space-y-2 text-sm lg:text-base text-[var(--color-text-secondary)] mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    iPhone: Press Side Button + Volume Up
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    Android: Press Power Button + Volume Down
                  </li>
                </ul>
              </div>
              
              <label className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-[var(--color-border)] rounded-xl cursor-pointer hover:border-red-500/50 transition-colors">
                <Upload className="w-6 h-6 text-[var(--color-text-muted)]" />
                <span className="text-base lg:text-lg text-[var(--color-text-primary)] font-semibold">
                  Attach Screenshot or Video
                </span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              
              {formData.screenshots.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.screenshots.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]"
                    >
                      <div className="flex items-center gap-3">
                        <Camera className="w-5 h-5 text-[var(--color-text-muted)]" />
                        <span className="text-sm lg:text-base text-[var(--color-text-primary)]">
                          {file.name}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)]">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeScreenshot(idx)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex gap-4 pt-6 border-t-2 border-[var(--color-border)]">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-4 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] rounded-xl border-2 border-[var(--color-border)] font-semibold text-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <FileText className="w-5 h-5 inline-block mr-2" />
              Submit Bug Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}





