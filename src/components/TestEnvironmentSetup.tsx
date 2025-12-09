import { CheckCircle2, Download, User, Database, Smartphone, Wifi, HardDrive, AlertCircle } from 'lucide-react';
import type { TestEnvironmentSetup } from '@/lib/enhanced-qa-types';

const defaultSetup: TestEnvironmentSetup = {
  accountSetup: {
    title: '1. Setting Up Your Test Account',
    steps: [
      {
        step: 'Download the app',
        instructions: [
          'iPhone users: Open the App Store, search for "BeeOrder", tap "Get"',
          'Android users: Open Google Play Store, search for "BeeOrder", tap "Install"',
          'Wait for the app to download and install (usually 1-2 minutes)'
        ],
        estimatedTime: '2 minutes'
      },
      {
        step: 'Create a test account',
        instructions: [
          'Open the BeeOrder app',
          'Tap "Sign Up" on the first screen',
          'Use this test email: testuser+[yourname]@example.com (replace [yourname] with your actual name)',
          'Create a password (write it down!): Test123!',
          'Enter test name: Test User',
          'Enter test phone: (555) 123-4567',
          'Tap "Create Account"',
          'Check your email and verify the account if prompted'
        ],
        estimatedTime: '3 minutes',
        importantNote: '⚠️ Don\'t use your real email or personal information for testing!'
      },
      {
        step: 'Log in to your test account',
        instructions: [
          'Open the BeeOrder app',
          'Enter your test email: testuser+[yourname]@example.com',
          'Enter your password: Test123!',
          'Tap "Log In"',
          'You should see the home screen with restaurants'
        ],
        estimatedTime: '1 minute'
      }
    ]
  },
  testData: {
    title: '2. Test Data You\'ll Need',
    dataTable: [
      {
        whatItIsFor: 'Testing dish searches',
        dataToUse: 'Margherita Pizza',
        whereToFindIt: 'Search bar at top of app'
      },
      {
        whatItIsFor: 'Testing valid payment',
        dataToUse: 'Test Card: 4242 4242 4242 4242, Exp: 12/25, CVV: 123',
        whereToFindIt: 'Payment page (don\'t worry, no real charges will be made)'
      },
      {
        whatItIsFor: 'Testing addresses',
        dataToUse: '123 Test Street, Test City, TC 12345',
        whereToFindIt: 'Address form'
      },
      {
        whatItIsFor: 'Testing dish customization',
        dataToUse: 'Pizza with "Extra Cheese" option and "No Onions" topping',
        whereToFindIt: 'Dish detail page customization section'
      }
    ]
  },
  deviceRequirements: {
    title: '3. Device Requirements',
    requirements: [
      {
        requirement: 'Operating System',
        minimum: 'iOS 13+ or Android 8+',
        howToCheck: 'iPhone: Settings > General > About > iOS Version | Android: Settings > About Phone > Android Version'
      },
      {
        requirement: 'Internet Connection',
        minimum: 'Stable WiFi or 4G/5G',
        howToCheck: 'Open a web browser and make sure websites load quickly'
      },
      {
        requirement: 'Storage Space',
        minimum: 'At least 500 MB free',
        howToCheck: 'iPhone: Settings > General > iPhone Storage | Android: Settings > Storage'
      },
      {
        requirement: 'Battery',
        minimum: 'At least 20% battery',
        howToCheck: 'Check your device battery indicator'
      }
    ]
  }
};

interface TestEnvironmentSetupProps {
  setup?: TestEnvironmentSetup;
}

export function TestEnvironmentSetup({ setup = defaultSetup }: TestEnvironmentSetupProps) {
  return (
    <div className="space-y-12 lg:space-y-16 bg-gradient-to-br from-blue-500/10 via-[var(--color-bg-primary)] to-emerald-500/10 rounded-3xl border-2 border-blue-500/30 p-10 lg:p-16 xl:p-20 shadow-2xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center border-2 border-blue-500/30 shadow-xl">
            <CheckCircle2 className="w-8 h-8 lg:w-10 lg:h-10 text-blue-400" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--color-text-primary)]">
            Before You Start Testing
          </h2>
        </div>
        <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
          Follow these steps to get everything ready. This will take about 10 minutes, but it ensures your testing goes smoothly!
        </p>
      </div>

      {/* Account Setup */}
      <div className="bg-[var(--color-bg-secondary)] rounded-2xl border-2 border-[var(--color-border)] p-8 lg:p-12 shadow-xl">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center border-2 border-blue-500/30">
            <User className="w-7 h-7 text-blue-400" />
          </div>
          <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)]">
            {setup.accountSetup.title}
          </h3>
        </div>
        
        <div className="space-y-8">
          {setup.accountSetup.steps.map((stepData, idx) => (
            <div key={idx} className="bg-[var(--color-bg-primary)] rounded-xl border-2 border-[var(--color-border)] p-6 lg:p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                    {stepData.step}
                  </h4>
                  {stepData.importantNote && (
                    <div className="flex items-start gap-3 bg-amber-500/20 border-2 border-amber-500/30 rounded-lg p-4 mb-4">
                      <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-base lg:text-lg text-amber-200 font-semibold">{stepData.importantNote}</p>
                    </div>
                  )}
                  <ul className="space-y-3 mb-4">
                    {stepData.instructions.map((instruction, i) => (
                      <li key={i} className="flex items-start gap-4 text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 text-sm lg:text-base text-[var(--color-text-muted)] font-semibold">
                    <Download className="w-4 h-4" />
                    <span>Estimated time: {stepData.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Data */}
      <div className="bg-[var(--color-bg-secondary)] rounded-2xl border-2 border-[var(--color-border)] p-8 lg:p-12 shadow-xl">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-500/30">
            <Database className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)]">
            {setup.testData.title}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-primary)] border-2 border-[var(--color-border)]">
                <th className="text-left p-4 lg:p-6 text-base lg:text-lg font-bold text-[var(--color-text-primary)] border-r-2 border-[var(--color-border)]">
                  What It's For
                </th>
                <th className="text-left p-4 lg:p-6 text-base lg:text-lg font-bold text-[var(--color-text-primary)] border-r-2 border-[var(--color-border)]">
                  Data to Use
                </th>
                <th className="text-left p-4 lg:p-6 text-base lg:text-lg font-bold text-[var(--color-text-primary)]">
                  Where to Find It
                </th>
              </tr>
            </thead>
            <tbody>
              {setup.testData.dataTable.map((row, idx) => (
                <tr 
                  key={idx} 
                  className="border-2 border-[var(--color-border)] hover:bg-[var(--color-bg-primary)] transition-colors"
                >
                  <td className="p-4 lg:p-6 text-base lg:text-lg text-[var(--color-text-secondary)] border-r-2 border-[var(--color-border)] font-semibold">
                    {row.whatItIsFor}
                  </td>
                  <td className="p-4 lg:p-6 text-base lg:text-lg text-[var(--color-text-primary)] border-r-2 border-[var(--color-border)]">
                    <code className="bg-[var(--color-bg-tertiary)] px-4 py-2 rounded-lg border-2 border-[var(--color-border)] font-mono">
                      {row.dataToUse}
                    </code>
                  </td>
                  <td className="p-4 lg:p-6 text-base lg:text-lg text-[var(--color-text-secondary)]">
                    {row.whereToFindIt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device Requirements */}
      <div className="bg-[var(--color-bg-secondary)] rounded-2xl border-2 border-[var(--color-border)] p-8 lg:p-12 shadow-xl">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center border-2 border-purple-500/30">
            <Smartphone className="w-7 h-7 text-purple-400" />
          </div>
          <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)]">
            {setup.deviceRequirements.title}
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {setup.deviceRequirements.requirements.map((req, idx) => (
            <div key={idx} className="bg-[var(--color-bg-primary)] rounded-xl border-2 border-[var(--color-border)] p-6 lg:p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                {idx === 0 && <Smartphone className="w-6 h-6 text-purple-400" />}
                {idx === 1 && <Wifi className="w-6 h-6 text-blue-400" />}
                {idx === 2 && <HardDrive className="w-6 h-6 text-emerald-400" />}
                {idx === 3 && <CheckCircle2 className="w-6 h-6 text-amber-400" />}
                <h4 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">
                  {req.requirement}
                </h4>
              </div>
              <div className="mb-4">
                <p className="text-sm lg:text-base text-[var(--color-text-muted)] mb-2 font-semibold uppercase tracking-wider">
                  Minimum Required:
                </p>
                <p className="text-base lg:text-lg text-[var(--color-text-primary)] font-semibold">
                  {req.minimum}
                </p>
              </div>
              <div>
                <p className="text-sm lg:text-base text-[var(--color-text-muted)] mb-2 font-semibold uppercase tracking-wider">
                  How to Check:
                </p>
                <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {req.howToCheck}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ready to Start */}
      <div className="text-center bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl border-2 border-emerald-500/30 p-10 lg:p-12">
        <CheckCircle2 className="w-16 h-16 lg:w-20 lg:h-20 text-emerald-400 mx-auto mb-6" />
        <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          You're All Set! 🎉
        </h3>
        <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Once you've completed the setup steps above, you're ready to start testing. Scroll down to see the test checklist!
        </p>
      </div>
    </div>
  );
}





