import { QAChecklist } from './QAChecklist';
import type { TestCase } from '@/lib/types';

interface QATestingGuideProps {
  testCases: TestCase[];
  featureName: string;
}

export function QATestingGuide({ testCases, featureName }: QATestingGuideProps) {
  return (
    <div className="space-y-12">
      {/* Main Checklist */}
      <QAChecklist testCases={testCases} featureName={featureName} />
    </div>
  );
}

