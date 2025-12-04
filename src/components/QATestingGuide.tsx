import { useState } from 'react';
import { 
  CheckSquare, 
  BookOpen, 
  Lightbulb, 
  Target, 
  PlayCircle, 
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Star
} from 'lucide-react';
import { QAChecklist } from './QAChecklist';
import { TesterFAQ } from './TesterFAQ';
import type { TestCase } from '@/lib/types';
import { cn } from '@/lib/utils';

interface QATestingGuideProps {
  testCases: TestCase[];
  featureName: string;
}

const testCategories = [
  {
    id: 'navigation',
    name: 'Opening & Loading',
    icon: PlayCircle,
    description: 'Tests for opening the dish page from different places and making sure everything loads correctly',
    color: 'blue',
    examples: ['Opening from menu', 'Opening from home feed', 'Opening from a link']
  },
  {
    id: 'customization',
    name: 'Customizing Your Order',
    icon: Target,
    description: 'Tests for choosing options (like size), adding toppings, and changing quantity',
    color: 'purple',
    examples: ['Selecting size options', 'Adding extra toppings', 'Changing quantity']
  },
  {
    id: 'cart',
    name: 'Adding to Cart',
    icon: CheckSquare,
    description: 'Tests for adding dishes to your cart and making sure everything works correctly',
    color: 'green',
    examples: ['Adding to cart', 'Editing cart items', 'Cart validation']
  },
  {
    id: 'features',
    name: 'Special Features',
    icon: Lightbulb,
    description: 'Tests for favorites, sharing, notes, and other special features',
    color: 'amber',
    examples: ['Saving favorites', 'Sharing dishes', 'Adding special notes']
  },
  {
    id: 'errors',
    name: 'Error Handling',
    icon: AlertCircle,
    description: 'Tests for what happens when something goes wrong (network issues, missing items, etc.)',
    color: 'red',
    examples: ['Network errors', 'Missing items', 'Invalid data']
  },
  {
    id: 'ui',
    name: 'User Interface',
    icon: BookOpen,
    description: 'Tests for how the screen looks and works on different devices and languages',
    color: 'cyan',
    examples: ['Screen layout', 'Keyboard handling', 'Different languages']
  }
];

const statusGuide = [
  {
    status: 'Not Started',
    icon: Clock,
    color: 'slate',
    description: "You haven't tested this yet"
  },
  {
    status: 'In Progress',
    icon: PlayCircle,
    color: 'blue',
    description: 'You are currently testing this'
  },
  {
    status: 'Pass',
    icon: CheckCircle2,
    color: 'emerald',
    description: 'Everything works as expected! ✓'
  },
  {
    status: 'Fail',
    icon: XCircle,
    color: 'red',
    description: 'Something is broken or not working correctly'
  },
  {
    status: 'Blocked',
    icon: AlertCircle,
    color: 'orange',
    description: "You can't test this right now (missing data, blocked by another issue, etc.)"
  },
  {
    status: 'Skip',
    icon: ArrowRight,
    color: 'gray',
    description: 'You decided to skip this test (not applicable, etc.)'
  }
];

export function QATestingGuide({ testCases, featureName }: QATestingGuideProps) {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="space-y-12">
      {/* Welcome Section - Simplified & Clean */}
      {showGuide && (
        <div className="bg-[var(--color-bg-secondary)] rounded-2xl border-2 border-[var(--color-border)] shadow-lg">
          <div className="p-10 lg:p-12">
            {/* Header */}
            <div className="flex items-start justify-between gap-6 mb-10">
              <div className="flex-1">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[var(--color-primary)] flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
                      QA Testing Guide
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-semibold border border-emerald-500/30">
                        Beginner Friendly
                      </span>
                      <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold border border-blue-500/30">
                        Step-by-Step
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
                  A simple guide to test the Dish feature. No technical knowledge required. Follow the steps and mark your results.
                </p>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="w-10 h-10 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-primary)] transition-colors flex items-center justify-center flex-shrink-0"
                aria-label="Close guide"
              >
                ×
              </button>
            </div>
            
            {/* Content Sections */}
            <div className="space-y-8">
            {/* What is QA Testing */}
            <div className="bg-gradient-to-br from-blue-500/10 via-[var(--color-bg-primary)] to-purple-500/10 rounded-2xl p-8 lg:p-10 border-2 border-blue-500/20 shadow-xl">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <HelpCircle className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                    What is QA Testing?
                  </h3>
                  <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6">
                    QA (Quality Assurance) testing means trying out the app to make sure everything works correctly. 
                    Think of it like checking a recipe - you follow the steps and make sure the result is what you expected!
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-[var(--color-bg-tertiary)] p-5 rounded-xl border border-[var(--color-border)]">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold text-[var(--color-text-primary)]">Your Role</span>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        You're like a quality inspector - testing features to find any issues before customers do
                      </p>
                    </div>
                    <div className="bg-[var(--color-bg-tertiary)] p-5 rounded-xl border border-[var(--color-border)]">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="w-5 h-5 text-amber-400" />
                        <span className="font-semibold text-[var(--color-text-primary)]">Why It Matters</span>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Your testing helps us catch bugs early and make the app better for everyone
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              {/* How to Use This Guide */}
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                  How to Use This Guide
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      step: '1',
                      title: 'Read the Test',
                      description: 'Each test tells you what to do step by step. Take your time to understand what you need to test.',
                      icon: FileText
                    },
                    {
                      step: '2',
                      title: 'Follow the Steps',
                      description: 'Do exactly what the instructions say. Open the app and perform each action carefully.',
                      icon: PlayCircle
                    },
                    {
                      step: '3',
                      title: 'Check the Result',
                      description: 'See if what happened matches what was expected. Mark it as Pass or Fail accordingly.',
                      icon: CheckCircle2
                    }
                  ].map(({ step, title, description, icon: Icon }) => (
                    <div key={step} className="bg-[var(--color-bg-primary)] rounded-xl p-6 border border-[var(--color-border)]">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xl">
                          {step}
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                        </div>
                      </div>
                      <h4 className="font-bold text-lg text-[var(--color-text-primary)] mb-2">{title}</h4>
                      <p className="text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Test Status Guide */}
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                  Understanding Test Status
                </h3>
                <p className="text-base lg:text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  Each test can have different statuses. Here's what each one means:
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {statusGuide.map(({ status, icon: Icon, color, description }) => (
                    <div key={status} className="flex items-start gap-4 bg-[var(--color-bg-primary)] rounded-lg p-5 border border-[var(--color-border)]">
                      <div className={cn(
                        'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                        color === 'emerald' && 'bg-emerald-500/20 text-emerald-400',
                        color === 'red' && 'bg-red-500/20 text-red-400',
                        color === 'blue' && 'bg-blue-500/20 text-blue-400',
                        color === 'orange' && 'bg-orange-500/20 text-orange-400',
                        color === 'slate' && 'bg-slate-500/20 text-slate-400',
                        color === 'gray' && 'bg-gray-500/20 text-gray-400'
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg text-[var(--color-text-primary)] mb-2">{status}</h4>
                        <p className="text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Test Categories */}
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                  What Are We Testing?
                </h3>
                <p className="text-base lg:text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  We test different aspects of the Dish feature. Here are the main categories:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {testCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.id} className="bg-[var(--color-bg-primary)] rounded-lg p-6 border border-[var(--color-border)]">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                            category.color === 'blue' && 'bg-blue-500/20 text-blue-400',
                            category.color === 'purple' && 'bg-purple-500/20 text-purple-400',
                            category.color === 'green' && 'bg-emerald-500/20 text-emerald-400',
                            category.color === 'amber' && 'bg-amber-500/20 text-amber-400',
                            category.color === 'red' && 'bg-red-500/20 text-red-400',
                            category.color === 'cyan' && 'bg-cyan-500/20 text-cyan-400'
                          )}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-[var(--color-text-primary)] mb-2">
                              {category.name}
                            </h4>
                            <p className="text-sm lg:text-base text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                              {category.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {category.examples.map((example) => (
                                <span key={example} className="text-xs lg:text-sm bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] px-3 py-1 rounded-lg border border-[var(--color-border)]">
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-[var(--color-bg-primary)] rounded-xl p-6 border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                    Quick Tips
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Read each step carefully before doing it',
                    'Take your time - there\'s no rush!',
                    'If something doesn\'t work, mark it as "Fail" and add notes',
                    'You can always come back and test again later',
                    'Start with the most important tests (marked as Critical)',
                    'Don\'t worry if you skip some tests - focus on what matters'
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm lg:text-base text-[var(--color-text-secondary)] leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Show/Hide Guide Toggle */}
      {!showGuide && (
        <button
          onClick={() => setShowGuide(true)}
          className="w-full btn btn-ghost flex items-center justify-center gap-4 py-6 lg:py-8 text-lg lg:text-xl bg-gradient-to-r from-[var(--color-bg-primary)] to-[var(--color-bg-tertiary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 shadow-lg hover:shadow-xl transition-all rounded-2xl"
        >
          <BookOpen className="w-6 h-6 lg:w-8 lg:h-8" />
          <span className="font-semibold">Show Testing Guide</span>
        </button>
      )}

      {/* Additional Help Sections */}
      <div className="space-y-12 lg:space-y-16">
        {/* FAQ */}
        <section id="faq">
          <TesterFAQ />
        </section>
      </div>

      {/* Main Checklist */}
      <div className="mt-16">
        <QAChecklist testCases={testCases} featureName={featureName} />
      </div>
    </div>
  );
}

