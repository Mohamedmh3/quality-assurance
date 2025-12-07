import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, UtensilsCrossed, ArrowRight, FileText, Layers, Zap, Code2, TestTube, AlertTriangle, Store } from 'lucide-react';
import { StatusBadge } from '@/components/Badge';
import { cn } from '@/lib/utils';

// Import actual data to get real counts
import { dishUseCases } from '@/features/dish/data/use-cases';
import { dishEdgeCases } from '@/features/dish/data/edge-cases';
import { dishTestCases } from '@/features/dish/data/test-cases';
import { splashUseCases } from '@/features/splash/data/use-cases';
import { splashEdgeCases } from '@/features/splash/data/edge-cases';
import { splashTestCases } from '@/features/splash/data/test-cases';
import { menuRestaurantUseCases } from '@/features/menu-restaurant/data/use-cases';
import { menuRestaurantEdgeCases } from '@/features/menu-restaurant/data/edge-cases';
import { menuRestaurantTestCases } from '@/features/menu-restaurant/data/test-cases';

interface FeatureCard {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  status: 'Stable' | 'Beta' | 'Alpha' | 'Deprecated';
  architecture: 'MVVM' | 'Clean' | 'MVC' | 'MVP';
  useCases: number;
  edgeCases: number;
  testCases: number;
  path: string;
  tags: string[];
}

const features: FeatureCard[] = [
  {
    id: 'dish',
    name: 'Dish Feature',
    icon: UtensilsCrossed,
    description: 'View dish details, customize options and toppings, adjust quantity, and add to cart.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: dishUseCases.length,
    edgeCases: dishEdgeCases.length,
    testCases: dishTestCases.length,
    path: '/feature/dish',
    tags: ['Cart', 'Customization', 'Favorites'],
  },
  {
    id: 'menu-restaurant',
    name: 'Menu Restaurant',
    icon: Store,
    description: 'Browse restaurants and markets, view menus, search items, toggle pickup/delivery, and manage favorites.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: menuRestaurantUseCases.length,
    edgeCases: menuRestaurantEdgeCases.length,
    testCases: menuRestaurantTestCases.length,
    path: '/feature/menu-restaurant',
    tags: ['Menu', 'Search', 'Favorites', 'Market'],
  },
  {
    id: 'splash',
    name: 'Splash Screen',
    icon: Zap,
    description: 'App initialization, authentication routing, settings loading, and first-time user experience.',
    status: 'Stable',
    architecture: 'Clean',
    useCases: splashUseCases.length,
    edgeCases: splashEdgeCases.length,
    testCases: splashTestCases.length,
    path: '/feature/splash',
    tags: ['Authentication', 'Initialization', 'Navigation'],
  },
];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(features.flatMap(f => f.tags)));
  const totalUseCases = features.reduce((acc, f) => acc + f.useCases, 0);
  const totalEdgeCases = features.reduce((acc, f) => acc + f.edgeCases, 0);
  const totalTests = features.reduce((acc, f) => acc + f.testCases, 0);

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = searchQuery === '' ||
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || feature.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-8 bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]" style={{ marginBottom: '32px' }}>
          BeeOrder Documentation
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl" style={{ marginBottom: '48px' }}>
          Comprehensive documentation for BeeOrder's Flutter application. 
          Browse features, explore use cases, and track QA testing.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6" style={{ marginBottom: '48px' }}>
          <div className="flex items-center gap-3 px-6 py-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{features.length}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Features</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{totalUseCases}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Use Cases</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{totalEdgeCases}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Edge Cases</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TestTube className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{totalTests}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Test Cases</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md" style={{ marginBottom: '32px' }}>
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '48px', paddingTop: '16px', paddingBottom: '16px', paddingRight: '20px' }}
              className="w-full text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
            />
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={cn(
              'rounded-xl text-base font-semibold transition-all duration-200 flex items-center gap-2',
              !selectedTag 
                ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/35' 
                : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
            )}
            style={{ padding: '16px 32px' }}
          >
            <Layers className="w-5 h-5" />
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={cn(
                'rounded-xl text-base font-semibold transition-all duration-200',
                selectedTag === tag
                  ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/35' 
                  : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
              )}
              style={{ padding: '16px 32px' }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
            <Layers className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Documented Features
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {filteredFeatures.map((feature) => (
            <Link
              key={feature.id}
              to={feature.path}
              className="block group"
            >
              <div className="h-full bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-200 hover:shadow-lg hover:shadow-[var(--color-primary)]/5" style={{ padding: '32px' }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <StatusBadge status={feature.status} />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {feature.name}
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {feature.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-[var(--color-primary)]">{feature.useCases}</div>
                      <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Use Cases</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-amber-500">{feature.edgeCases}</div>
                      <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Edge Cases</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-emerald-500">{feature.testCases}</div>
                      <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Tests</div>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all">
                    <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredFeatures.length === 0 && (
          <div className="text-center py-16 bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)]">
            <Search className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              No features found
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="px-4 py-2 text-sm font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-lg hover:bg-[var(--color-primary)]/20 transition-all"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
