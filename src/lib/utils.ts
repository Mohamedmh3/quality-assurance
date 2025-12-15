import type { Priority, Likelihood, TestStatus } from './types';

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getPriorityColor(priority: Priority): string {
  const colors: Record<Priority, string> = {
    Critical: 'bg-gradient-to-r from-red-500 to-pink-500',
    High: 'bg-gradient-to-r from-orange-500 to-red-500',
    Medium: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    Low: 'bg-gradient-to-r from-slate-500 to-slate-600',
  };
  return colors[priority];
}

export function getPriorityBadgeClass(priority: Priority): string {
  const classes: Record<Priority, string> = {
    Critical: 'badge-critical',
    High: 'badge-high',
    Medium: 'badge-medium',
    Low: 'badge-low',
  };
  return classes[priority];
}

export function getLikelihoodColor(likelihood: Likelihood): string {
  const colors: Record<Likelihood, string> = {
    High: 'text-red-400',
    Medium: 'text-yellow-400',
    Low: 'text-green-400',
  };
  return colors[likelihood];
}

export function getStatusColor(status: TestStatus): string {
  const colors: Record<TestStatus, string> = {
    'Not Started': 'text-slate-400',
    'In Progress': 'text-blue-400',
    Pass: 'text-green-400',
    Fail: 'text-red-400',
    Blocked: 'text-orange-400',
    Skip: 'text-slate-500',
  };
  return colors[status];
}

export function getStatusDotClass(status: TestStatus): string {
  const classes: Record<TestStatus, string> = {
    'Not Started': 'bg-slate-400',
    'In Progress': 'bg-blue-400',
    Pass: 'bg-green-400',
    Fail: 'bg-red-400',
    Blocked: 'bg-orange-400',
    Skip: 'bg-slate-500',
  };
  return classes[status];
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function exportToJSON<T>(data: T, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToCSV<T extends Record<string, unknown>>(data: T[], filename: string): void {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        return `"${stringValue.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Parse CSV file content into an array of objects
 */
export function parseCSV(csvContent: string): Record<string, unknown>[] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  // Parse header
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  
  // Parse rows
  const rows: Record<string, unknown>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => {
      let value = v.trim().replace(/^"|"$/g, '').replace(/""/g, '"');
      // Try to parse as JSON if it looks like an object
      if (value.startsWith('{') || value.startsWith('[')) {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      return value;
    });
    
    const row: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row);
  }
  
  return rows;
}

/**
 * Read and parse a JSON file
 */
export function readJSONFile(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        resolve(parsed);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * Read and parse a CSV file
 */
export function readCSVFile(file: File): Promise<Record<string, unknown>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = parseCSV(content);
        resolve(parsed);
      } catch (error) {
        reject(new Error('Invalid CSV file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

