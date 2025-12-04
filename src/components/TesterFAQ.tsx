import { useState } from 'react';
import { HelpCircle, AlertCircle, CheckCircle2, Clock, FileQuestion } from 'lucide-react';
import type { TesterFAQ } from '@/lib/enhanced-qa-types';
import { cn } from '@/lib/utils';

const faqData: TesterFAQ[] = [
  {
    question: 'What if I find something that looks wrong but it\'s not in the test cases?',
    answer: 'Great! Report it anyway. Add a note in the "Additional Findings" section at the bottom of the test. Include a screenshot and describe what looks wrong. Your observations are valuable even if they\'re not part of the official test steps.',
    importance: 'high'
  },
  {
    question: 'How do I know if something is a bug or just a design choice?',
    answer: 'If it confuses you, frustrates you, or stops you from completing a task, report it. The team will decide if it\'s a bug or just needs clearer design. Your confusion is valuable feedback! When in doubt, report it.',
    importance: 'high'
  },
  {
    question: 'What if the test instructions don\'t match what I see on my screen?',
    answer: 'Take a screenshot of what you see and report this in the "Test Environment Issues" section. The app might have been updated, or there might be a difference between iOS and Android. Include your device type and app version.',
    importance: 'high'
  },
  {
    question: 'Can I test on multiple devices?',
    answer: 'Yes! Testing on different phones and tablets helps us find device-specific bugs. Just make sure to note which device you used for each test in the notes section.',
    importance: 'medium'
  },
  {
    question: 'How long should each test take?',
    answer: 'Most simple tests take 2-5 minutes. Complex tests might take 10-15 minutes. If a test is taking longer than expected, take a break or ask for help. Don\'t rush - thorough testing is more important than speed.',
    importance: 'medium'
  },
  {
    question: 'What if I accidentally skip a step?',
    answer: 'No problem! Just mark the test as "Not Completed" and start over. It\'s better to redo a test than to report inaccurate results. You can also add a note explaining what happened.',
    importance: 'low'
  },
  {
    question: 'What if the app crashes or freezes?',
    answer: 'Take a screenshot if possible, then restart the app. Note the crash in your test results and describe what you were doing when it happened. Include the time and any error messages you saw.',
    importance: 'high'
  },
  {
    question: 'Should I test with real payment information?',
    answer: 'No! Always use the test payment information provided in the Test Environment Setup section. Never use your real credit card or payment details for testing.',
    importance: 'high'
  },
  {
    question: 'What if I\'m not sure if a test passed or failed?',
    answer: 'Use the "Not Sure" status option and add detailed notes about what seemed wrong. The team will review it. It\'s better to flag something uncertain than to miss a potential issue.',
    importance: 'medium'
  },
  {
    question: 'Can I test features that aren\'t in the checklist?',
    answer: 'Absolutely! If you discover other features or notice something interesting, feel free to explore and report your findings. Just make sure to complete the required tests first.',
    importance: 'low'
  }
];

export function TesterFAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const groupedFAQ = {
    high: faqData.filter(f => f.importance === 'high'),
    medium: faqData.filter(f => f.importance === 'medium'),
    low: faqData.filter(f => f.importance === 'low')
  };

  return (
    <div className="space-y-12 lg:space-y-16 bg-gradient-to-br from-indigo-500/10 via-[var(--color-bg-primary)] to-purple-500/10 rounded-3xl border-2 border-indigo-500/30 p-10 lg:p-16 xl:p-20 shadow-2xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border-2 border-indigo-500/30 shadow-xl">
            <HelpCircle className="w-8 h-8 lg:w-10 lg:h-10 text-indigo-400" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--color-text-primary)]">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
          Have a question? Check here first! These are the most common questions from testers.
        </p>
      </div>

      {/* High Importance */}
      {groupedFAQ.high.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)]">
              Important Questions
            </h3>
          </div>
          <div className="space-y-4">
            {groupedFAQ.high.map((faq, idx) => (
              <FAQItem
                key={idx}
                faq={faq}
                isExpanded={expandedIndex === idx}
                onToggle={() => toggleExpanded(idx)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Medium Importance */}
      {groupedFAQ.medium.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <Clock className="w-8 h-8 text-amber-400" />
            <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)]">
              Common Questions
            </h3>
          </div>
          <div className="space-y-4">
            {groupedFAQ.medium.map((faq, idx) => (
              <FAQItem
                key={idx}
                faq={faq}
                isExpanded={expandedIndex === groupedFAQ.high.length + idx}
                onToggle={() => toggleExpanded(groupedFAQ.high.length + idx)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Low Importance */}
      {groupedFAQ.low.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <HelpCircle className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)]">
              Other Questions
            </h3>
          </div>
          <div className="space-y-4">
            {groupedFAQ.low.map((faq, idx) => (
              <FAQItem
                key={idx}
                faq={faq}
                isExpanded={expandedIndex === groupedFAQ.high.length + groupedFAQ.medium.length + idx}
                onToggle={() => toggleExpanded(groupedFAQ.high.length + groupedFAQ.medium.length + idx)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Still have questions */}
      <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl border-2 border-indigo-500/30 p-8 lg:p-10 text-center">
        <FileQuestion className="w-12 h-12 lg:w-16 lg:h-16 text-indigo-400 mx-auto mb-4" />
        <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          Still Have Questions?
        </h3>
        <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
          If you have a question that isn't answered here, don't hesitate to ask! 
          Add it to your test notes or reach out to the testing coordinator.
        </p>
      </div>
    </div>
  );
}

interface FAQItemProps {
  faq: TesterFAQ;
  isExpanded: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isExpanded, onToggle }: FAQItemProps) {
  const getIcon = () => {
    switch (faq.importance) {
      case 'high':
        return <AlertCircle className="w-6 h-6 text-red-400" />;
      case 'medium':
        return <Clock className="w-6 h-6 text-amber-400" />;
      default:
        return <HelpCircle className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <div className="bg-[var(--color-bg-secondary)] rounded-2xl border-2 border-[var(--color-border)] overflow-hidden shadow-lg">
      <button
        onClick={onToggle}
        className="w-full p-6 lg:p-8 flex items-start gap-4 text-left hover:bg-[var(--color-bg-primary)] transition-colors"
      >
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="text-lg lg:text-xl font-bold text-[var(--color-text-primary)] mb-2">
            {faq.question}
          </h4>
          {isExpanded && (
            <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed mt-4">
              {faq.answer}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          <CheckCircle2
            className={cn(
              'w-6 h-6 transition-transform',
              isExpanded ? 'rotate-180 text-indigo-400' : 'text-[var(--color-text-muted)]'
            )}
          />
        </div>
      </button>
    </div>
  );
}

