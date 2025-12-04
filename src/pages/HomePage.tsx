import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, UtensilsCrossed, ArrowRight, Sparkles, Code2, TestTube, FileText, Layers } from 'lucide-react';
import { StatusBadge } from '@/components/Badge';
import { cn } from '@/lib/utils';

// Import actual data to get real counts
import { dishUseCases } from '@/features/dish/data/use-cases';
import { dishEdgeCases } from '@/features/dish/data/edge-cases';
import { dishTestCases } from '@/features/dish/data/test-cases';

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
];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(features.flatMap(f => f.tags)));

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = searchQuery === '' ||
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || feature.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] p-10 lg:p-16 xl:p-20 shadow-xl">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6bTEwIDEwdjZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 rounded-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-primary)]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-accent)]/5 rounded-full blur-[100px]" />

        <div className="relative">
          {/* Logo / Brand */}
          <div className="flex items-center justify-center gap-6 mb-12 lg:mb-16 animate-fade-in">
              <div className="icon-container w-20 h-20 lg:w-24 lg:h-24 rounded-2xl shadow-2xl">
                <Sparkles className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--color-text-primary)]">
                  BeeOrder Docs
                </h1>
                <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] mt-2 font-medium">
                  Feature Documentation Portal
                </p>
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] max-w-3xl mx-auto text-center leading-relaxed mb-16 lg:mb-20 animate-fade-in stagger-1">
              Comprehensive documentation for BeeOrder's Flutter application. 
              Browse features, understand use cases, explore edge cases, and track QA testing.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 lg:gap-12 mb-16 lg:mb-20 animate-fade-in stagger-2">
              <div className="stat-card px-10 lg:px-12 py-8 lg:py-10 rounded-2xl border-2 border-[var(--color-border)] shadow-lg">
                <div className="flex items-center gap-5 justify-center mb-4">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center border-2 border-[var(--color-primary)]/20">
                    <FileText className="w-7 h-7 lg:w-8 lg:h-8 text-[var(--color-primary)]" />
                  </div>
                  <span className="stat-value text-4xl lg:text-5xl font-bold">{features.length}</span>
                </div>
                <span className="stat-label block text-base lg:text-lg font-semibold">Features</span>
              </div>
              <div className="stat-card px-10 lg:px-12 py-8 lg:py-10 rounded-2xl border-2 border-[var(--color-border)] shadow-lg">
                <div className="flex items-center gap-5 justify-center mb-4">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-amber-500/10 flex items-center justify-center border-2 border-amber-500/20">
                    <Code2 className="w-7 h-7 lg:w-8 lg:h-8 text-amber-500" />
                  </div>
                  <span className="stat-value text-4xl lg:text-5xl font-bold">{features.reduce((acc, f) => acc + f.useCases, 0)}</span>
                </div>
                <span className="stat-label block text-base lg:text-lg font-semibold">Use Cases</span>
              </div>
              <div className="stat-card px-10 lg:px-12 py-8 lg:py-10 rounded-2xl border-2 border-[var(--color-border)] shadow-lg">
                <div className="flex items-center gap-5 justify-center mb-4">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/20">
                    <TestTube className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-500" />
                  </div>
                  <span className="stat-value text-4xl lg:text-5xl font-bold">{features.reduce((acc, f) => acc + f.testCases, 0)}</span>
                </div>
                <span className="stat-label block text-base lg:text-lg font-semibold">Test Cases</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-12 lg:mb-16 animate-fade-in stagger-3">
              <div className="relative">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 lg:w-7 lg:h-7 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-base pl-20 lg:pl-24 py-6 lg:py-7 text-lg lg:text-xl border-2 rounded-2xl shadow-lg focus:shadow-xl transition-all"
                />
              </div>
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 animate-fade-in stagger-4">
              <button
                onClick={() => setSelectedTag(null)}
                className={cn(
                  'px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-base lg:text-lg font-semibold transition-all border-2 shadow-md',
                  !selectedTag 
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg' 
                    : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)]'
                )}
              >
                <Layers className="w-5 h-5 inline-block mr-2" />
                All Features
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={cn(
                    'px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-base lg:text-lg font-semibold transition-all border-2 shadow-md',
                    selectedTag === tag
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg' 
                      : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)]'
                  )}
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-12 lg:space-y-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center border-2 border-[var(--color-primary)]/20">
            <Layers className="w-6 h-6 lg:w-8 lg:h-8 text-[var(--color-primary)]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--color-text-primary)]">
            Documented Features
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredFeatures.map((feature, index) => (
              <Link
                key={feature.id}
                to={feature.path}
                className={cn('block animate-fade-in group', `stagger-${index + 1}`)}
              >
                <div className="h-full bg-[var(--color-bg-tertiary)] rounded-3xl border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 hover:scale-[1.02]">
                  {/* Card Header with gradient background */}
                  <div className="px-10 lg:px-12 py-8 lg:py-10 bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-tertiary)] border-b-2 border-[var(--color-border)]">
                    <div className="flex items-center justify-between">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-xl shadow-[var(--color-primary)]/30">
                        <feature.icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                      <StatusBadge status={feature.status} />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-10 lg:p-12">
                    {/* Title & Description */}
                    <div className="mb-8">
                      <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                        {feature.name}
                      </h3>
                      <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {feature.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-4 py-2 text-sm lg:text-base font-semibold rounded-xl bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] shadow-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between pt-8 border-t-2 border-[var(--color-border)]">
                      <div className="flex gap-8">
                        <div className="text-center">
                          <div className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)]">{feature.useCases}</div>
                          <div className="text-xs lg:text-sm text-[var(--color-text-muted)] mt-1 uppercase tracking-wider font-semibold">Use Cases</div>
                        </div>
                        <div className="w-px h-12 bg-[var(--color-border)]" />
                        <div className="text-center">
                          <div className="text-2xl lg:text-3xl font-bold text-amber-500">{feature.edgeCases}</div>
                          <div className="text-xs lg:text-sm text-[var(--color-text-muted)] mt-1 uppercase tracking-wider font-semibold">Edge Cases</div>
                        </div>
                        <div className="w-px h-12 bg-[var(--color-border)]" />
                        <div className="text-center">
                          <div className="text-2xl lg:text-3xl font-bold text-emerald-500">{feature.testCases}</div>
                          <div className="text-xs lg:text-sm text-[var(--color-text-muted)] mt-1 uppercase tracking-wider font-semibold">Tests</div>
                        </div>
                      </div>
                      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-[var(--color-bg-primary)] border-2 border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all duration-300 shadow-lg group-hover:shadow-xl">
                        <ArrowRight className="w-6 h-6 lg:w-7 lg:h-7 text-[var(--color-text-muted)] group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        {filteredFeatures.length === 0 && (
          <div className="text-center py-32 lg:py-40 bg-[var(--color-bg-primary)] rounded-3xl border-2 border-[var(--color-border)]">
            <Search className="w-24 h-24 lg:w-32 lg:h-32 text-[var(--color-text-muted)] mx-auto mb-8 opacity-50" />
            <p className="text-2xl lg:text-3xl font-semibold text-[var(--color-text-primary)] mb-4">
              No features found
            </p>
            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)]">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
