import { useState } from 'react';
import { BookOpen, TestTube, AlertTriangle, Code2, GitBranch, FileText, ChevronRight } from 'lucide-react';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { tagScreensUseCases } from './data/use-cases';
import { tagScreensTestCases } from './data/test-cases';
import { tagScreensEdgeCases } from './data/edge-cases';

export function TagScreensFeature() {
  const [activeTab, setActiveTab] = useState<'overview' | 'use-cases' | 'edge-cases' | 'flow-diagrams' | 'qa-tests' | 'implementation'>('qa-tests');

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Tag Screens</h1>
              <p className="text-white/90 text-lg">
                Browse dishes and restaurants filtered by tags with infinite scroll pagination
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'use-cases', label: 'Use Cases', icon: Code2 },
              { id: 'edge-cases', label: 'Edge Cases', icon: AlertTriangle },
              { id: 'qa-tests', label: 'QA Tests', icon: TestTube },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                      : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'use-cases' && <UseCaseSection useCases={tagScreensUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={tagScreensEdgeCases} />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={tagScreensTestCases} featureName="Tag Screens" />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* What It Does */}
      <section className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[var(--color-primary)]" />
          What It Does
        </h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          The Tag Screens feature allows users to browse dishes and restaurants filtered by specific tags. 
          Users can view all items associated with a tag (e.g., "Spicy", "Vegetarian", "Fast Food") in dedicated screens 
          with infinite scroll pagination. The feature supports both dish tags and restaurant tags, providing a seamless 
          browsing experience with loading states, error handling, and smooth navigation.
        </p>
      </section>

      {/* Who Uses It */}
      <section className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-[var(--color-primary)]" />
          Who Uses It
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">End Users</h3>
              <p className="text-[var(--color-text-secondary)]">
                Browse dishes and restaurants by tags from home feed, search results, or category pages. 
                Discover new items based on preferences and interests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Value */}
      <section className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <Code2 className="w-6 h-6 text-[var(--color-primary)]" />
          Key Value
        </h2>
        <ul className="space-y-2 text-[var(--color-text-secondary)]">
          <li className="flex items-start gap-2">
            <ChevronRight className="w-5 h-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
            <span>Enables tag-based discovery of dishes and restaurants</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="w-5 h-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
            <span>Provides infinite scroll pagination for smooth browsing</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="w-5 h-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
            <span>Supports both dish and restaurant filtering by tags</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="w-5 h-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
            <span>Handles errors and empty states gracefully</span>
          </li>
        </ul>
      </section>

      {/* Entry Points */}
      <section className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-[var(--color-primary)]" />
          Entry Points
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Home Feed</h3>
              <p className="text-[var(--color-text-secondary)]">
                Tap on tag buttons or links in home feed sections
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Search Results</h3>
              <p className="text-[var(--color-text-secondary)]">
                Tap on tags from search result filters or categories
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Category Pages</h3>
              <p className="text-[var(--color-text-secondary)]">
                Tap on tags from category or filter pages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <Code2 className="w-6 h-6 text-[var(--color-primary)]" />
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Tag Dishes Screen</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Browse dishes filtered by tag with infinite scroll pagination
            </p>
          </div>
          <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Tag Restaurants Screen</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Browse restaurants filtered by tag with infinite scroll pagination
            </p>
          </div>
          <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Infinite Scroll</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Automatic pagination loads more items as user scrolls
            </p>
          </div>
          <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Error Handling</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Graceful error handling with retry functionality
            </p>
          </div>
          <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Empty States</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Clear empty state messages when no results found
            </p>
          </div>
          <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border)] p-4">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Navigation</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Navigate to dish details or restaurant menu from tag lists
            </p>
          </div>
        </div>
      </section>

      {/* Folder Structure */}
      <section className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-[var(--color-primary)]" />
          Folder Structure
        </h2>
        <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border)] p-4 font-mono text-sm">
          <div className="text-[var(--color-text-secondary)]">
            <div>tag_screens/</div>
            <div className="ml-4">
              <div>presentation/</div>
              <div className="ml-4">
                <div>tag_dishes/</div>
                <div className="ml-4">
                  <div>tag_dishes_view.dart</div>
                  <div>tag_dishes_viewmodel.dart</div>
                  <div>components/</div>
                  <div className="ml-4">tag_dishes_list.dart</div>
                  <div>state/</div>
                  <div className="ml-4">tag_dishes_state.dart</div>
                </div>
                <div>tag_restaurants/</div>
                <div className="ml-4">
                  <div>tag_restaurants_view.dart</div>
                  <div>tag_restaurants_viewmodel.dart</div>
                  <div>components/</div>
                  <div className="ml-4">tag_restaurants_list.dart</div>
                  <div>states/</div>
                  <div className="ml-4">tag_restaurants_states.dart</div>
                </div>
              </div>
              <div>data/</div>
              <div className="ml-4">
                <div>repository/</div>
                <div className="ml-4">tag_repository.dart</div>
                <div>remote/</div>
                <div className="ml-4">
                  <div>service/</div>
                  <div className="ml-4">tag_service.dart</div>
                  <div>model/</div>
                  <div className="ml-4">tag_dishes_model.dart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

