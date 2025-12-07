import { useState } from 'react';
import { 
  Zap, 
  Folder, 
  GitBranch, 
  Code2, 
  Settings,
  Database,
  Globe,
  Layers,
  ChevronRight,
  Users,
  Shield,
  Smartphone,
  RefreshCw,
  Wifi,
  Clock,
  Key
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { Accordion, AccordionItem } from '@/components/Accordion';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { splashUseCases } from './data/use-cases';
import { splashEdgeCases } from './data/edge-cases';
import { splashTestCases } from './data/test-cases';
import { cn } from '@/lib/utils';

type TabId = 'overview' | 'use-cases' | 'edge-cases' | 'qa-tests' | 'implementation';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: Layers },
  { id: 'use-cases', label: 'Use Cases', icon: Users },
  { id: 'edge-cases', label: 'Edge Cases', icon: Shield },
  { id: 'qa-tests', label: 'QA Tests', icon: Settings },
  { id: 'implementation', label: 'Implementation', icon: Code2 },
];

const folderStructure = {
  name: 'auth/',
  type: 'folder' as const,
  children: [
    {
      name: 'splash/ (Legacy MVVM)',
      type: 'folder' as const,
      children: [
        { name: 'splash_view.dart', type: 'file' as const, description: 'Legacy splash screen UI' },
        {
          name: 'model/',
          type: 'folder' as const,
          children: [
            { name: 'setting_model.dart', type: 'file' as const, description: 'App settings from server' },
            { name: 'guest_model.dart', type: 'file' as const, description: 'Guest user data' },
          ],
        },
        {
          name: 'view_model/',
          type: 'folder' as const,
          children: [
            { name: 'splash_viewmodel.dart', type: 'file' as const, description: 'Legacy business logic' },
          ],
        },
      ],
    },
    {
      name: 'presentation/splash/ (Clean Architecture)',
      type: 'folder' as const,
      children: [
        { name: 'splash_screen.dart', type: 'file' as const, description: 'New splash screen UI' },
        { name: 'splash_viewmodel.dart', type: 'file' as const, description: 'Bloc-based Cubit' },
        {
          name: 'state/',
          type: 'folder' as const,
          children: [
            { name: 'splash_state.dart', type: 'file' as const, description: 'Equatable state class' },
          ],
        },
      ],
    },
    {
      name: 'service/',
      type: 'folder' as const,
      children: [
        { name: 'app_initialization_service.dart', type: 'file' as const, description: 'User state & routing' },
        { name: 'app_config_service.dart', type: 'file' as const, description: 'FCM, splash, lang sync' },
        { name: 'post_login_tasks_service.dart', type: 'file' as const, description: 'Background data load' },
        { name: 'authentication_service.dart', type: 'file' as const, description: 'Legacy auth service' },
      ],
    },
    {
      name: 'data/',
      type: 'folder' as const,
      children: [
        {
          name: 'repository/',
          type: 'folder' as const,
          children: [
            { name: 'auth_repository.dart', type: 'file' as const, description: 'Data access layer' },
          ],
        },
        {
          name: 'remote/service/',
          type: 'folder' as const,
          children: [
            { name: 'auth_service.dart', type: 'file' as const, description: 'API calls' },
          ],
        },
        {
          name: 'local/',
          type: 'folder' as const,
          children: [
            { name: 'auth_local_storage.dart', type: 'file' as const, description: 'SharedPreferences' },
          ],
        },
      ],
    },
  ],
};

export function SplashFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-amber-500">Splash</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Splash Feature
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status="Stable" />
          <ArchitectureBadge type="Clean" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-20 z-10 glass rounded-xl border border-[var(--color-border)] p-4 shadow-lg">
        <nav className="flex gap-4 lg:gap-6 overflow-x-auto" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn('tab-item', activeTab === tab.id && 'active')}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6 shadow-lg">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'use-cases' && <UseCaseSection useCases={splashUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={splashEdgeCases} />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={splashTestCases} featureName="splash" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-16 lg:space-y-20 animate-fade-in">
      {/* Plain Language Summary */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-amber-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            When someone opens the BeeOrder app, the <strong className="text-[var(--color-text-primary)]">Splash Screen</strong> is 
            the first thing they see. It shows the company logo with a nice animation while the app gets ready in the background.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Behind the scenes, the app is doing important work: checking if you're already logged in, downloading the latest 
            settings from the server, checking if there's a new version of the app, and loading your saved preferences like 
            your preferred language (Arabic or English).
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Once everything is ready, the splash screen automatically takes you to the right place: 
            the <strong className="text-[var(--color-text-primary)]">home screen</strong> if you're logged in, 
            the <strong className="text-[var(--color-text-primary)]">login page</strong> if you're not, or 
            the <strong className="text-[var(--color-text-primary)]">profile page</strong> if you need to complete your account setup.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="info-box flex-col success">
              <Users className="w-8 h-8 text-emerald-500 mb-3" />
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">Who Uses It</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Every user, every time they open the app
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Clock className="w-8 h-8 text-amber-500 mb-3" />
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">Duration</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                2-5 seconds (animation + loading)
              </p>
            </div>
            <div className="info-box flex-col">
              <Key className="w-8 h-8 text-[var(--color-primary)] mb-3" />
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">Key Decision</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Where to send the user next
              </p>
            </div>
            <div className="info-box flex-col info">
              <RefreshCw className="w-8 h-8 text-blue-500 mb-3" />
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">Background</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Syncs settings, tokens, assets
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Flow */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-blue-500" />
            </div>
            Navigation Flow
          </CardTitle>
          <CardDescription className="text-base">Where users go after splash based on their state</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8 border border-[var(--color-border)]">
            <div className="space-y-4 font-mono text-sm">
              <div className="text-[var(--color-text-muted)]">App Launch</div>
              <div className="ml-4 text-[var(--color-text-muted)]">↓</div>
              <div className="ml-4 text-amber-500">Splash Screen (Logo Animation)</div>
              <div className="ml-8 text-[var(--color-text-muted)]">↓</div>
              <div className="ml-8 text-blue-400">Load Settings from Server</div>
              <div className="ml-12 text-[var(--color-text-muted)]">├─ ❌ No Internet → <span className="text-red-400">Retry Dialog</span></div>
              <div className="ml-12 text-[var(--color-text-muted)]">├─ ❌ Forced Update → <span className="text-orange-400">Update Screen (blocking)</span></div>
              <div className="ml-12 text-[var(--color-text-muted)]">├─ ⚠️ Soft Update → <span className="text-yellow-400">Update Dialog (dismissable)</span></div>
              <div className="ml-12 text-[var(--color-text-muted)]">└─ ✅ Settings OK → <span className="text-green-400">Continue...</span></div>
              <div className="ml-8 text-[var(--color-text-muted)]">↓</div>
              <div className="ml-8 text-purple-400">Check User State</div>
              <div className="ml-12 text-[var(--color-text-muted)]">├─ First Time User → <span className="text-cyan-400">Welcome Introduction (BeeIntro)</span></div>
              <div className="ml-12 text-[var(--color-text-muted)]">├─ Has Token + Complete Profile → <span className="text-green-400">Home Screen</span></div>
              <div className="ml-12 text-[var(--color-text-muted)]">├─ Has Token + Incomplete Profile → <span className="text-yellow-400">User Info Screen</span></div>
              <div className="ml-12 text-[var(--color-text-muted)]">├─ Has Mobile + No Token → <span className="text-blue-400">OTP Screen</span></div>
              <div className="ml-12 text-[var(--color-text-muted)]">└─ No Mobile + No Token → <span className="text-green-400">Home (as Guest)</span></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Folder Structure */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Folder className="w-6 h-6 text-amber-500" />
            </div>
            Folder Structure
          </CardTitle>
          <CardDescription className="text-base">
            Hybrid architecture: Legacy MVVM + Clean Architecture with Bloc
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8 border border-[var(--color-border)]">
            <FolderTree data={folderStructure} />
          </div>
        </CardContent>
      </Card>

      {/* Dependencies */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-purple-500" />
            </div>
            Dependencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Features Used',
                items: ['cart (MyCartViewModel)', 'profile/my_address', 'helpers/know_us', 'helpers/tutorials', 'home_feed'],
              },
              {
                title: 'Core Services',
                items: ['HttpManager', 'NavigationService', 'LocaleManager', 'UserManager', 'SettingManager', 'AnalyticsManager', 'DeepLinkHandler'],
              },
              {
                title: 'Libraries',
                items: ['flutter_bloc', 'get (GetX)', 'lottie', 'firebase_messaging', 'flutter_udid', 'easy_localization', 'injectable'],
              },
            ].map((group) => (
              <div key={group.title} className="info-box flex-col">
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">{group.title}</h4>
                <ul className="space-y-4">
                  {group.items.map(dep => (
                    <li key={dep} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                      <ChevronRight className="w-4 h-4 text-amber-500" />
                      {dep}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ImplementationTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Accordion>
        {/* API Endpoints */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <span className="font-semibold text-xl">API Endpoints</span>
            </div>
          }
          defaultOpen
        >
          <div className="space-y-6">
            {[
              {
                method: 'GET',
                path: '/settings',
                description: 'Fetch app configuration, version info, feature flags, and user settings',
                params: ['lat: string', 'lng: string'],
              },
              {
                method: 'POST',
                path: '/guest-visit',
                description: 'Register a guest visit for non-logged-in users (analytics)',
                params: ['device_id: string', 'fcm_token: string', 'just_update_location: boolean'],
              },
              {
                method: 'POST',
                path: '/update-fcm',
                description: 'Update Firebase Cloud Messaging token for push notifications',
                params: ['token: string'],
              },
              {
                method: 'POST',
                path: '/logout',
                description: 'Invalidate user session on server (used by debug reset)',
                params: [],
              },
            ].map((endpoint, idx) => (
              <div key={idx} className="bg-[var(--color-bg-tertiary)] rounded-2xl p-7 border border-[var(--color-border)]">
                <div className="flex items-center gap-4 mb-4">
                  <span className={cn(
                    'badge-base',
                    endpoint.method === 'GET' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  )}>
                    {endpoint.method}
                  </span>
                  <code className="text-xl text-amber-500 font-mono">{endpoint.path}</code>
                </div>
                <p className="text-base text-[var(--color-text-secondary)] mb-5">{endpoint.description}</p>
                {endpoint.params.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {endpoint.params.map(param => (
                      <code key={param} className="text-sm bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                        {param}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Data Models */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-500" />
              </div>
              <span className="font-semibold text-xl">Data Models</span>
            </div>
          }
        >
          <div className="space-y-6">
            {[
              {
                name: 'SettingModel',
                file: 'splash/model/setting_model.dart',
                fields: ['isValidVersion', 'currency', 'invite', 'splashVersion', 'langVersion', 'imagesVersion', 'fcmToken', 'subDomain', 'isLiveChatEnabled', 'enableRecordingAnalytics', '+50 more config fields'],
              },
              {
                name: 'ValidVersionModel',
                file: 'helpers/update_app/model/valid_version_model.dart',
                fields: ['status: boolean', 'update_type: int (1=soft, 2=forced)', 'link: string', 'softmessage: string'],
              },
              {
                name: 'GuestModel',
                file: 'splash/model/guest_model.dart',
                fields: ['visitsCount', 'allowedOutletsCountForGuest', 'allowedHomeListsCountForGuest', 'allowedRestaurantDishesCountForGuest'],
              },
              {
                name: 'SplashState',
                file: 'presentation/splash/state/splash_state.dart',
                fields: ['getSettings: AsyncState<SettingModel>', 'nextRoute: String?', 'showDebugMenu: boolean', 'shouldSyncLanguage: boolean'],
              },
            ].map((model, idx) => (
              <div key={idx} className="bg-[var(--color-bg-tertiary)] rounded-2xl p-7 border border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
                  <span className="font-semibold text-xl text-[var(--color-text-primary)]">{model.name}</span>
                  <code className="text-sm text-[var(--color-text-muted)] font-mono bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg border border-[var(--color-border)]">
                    {model.file}
                  </code>
                </div>
                <div className="flex flex-wrap gap-3">
                  {model.fields.map(field => (
                    <code key={field} className="text-sm bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg text-[var(--color-text-secondary)] font-mono border border-[var(--color-border)]">
                      {field}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* ViewModel Methods */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-emerald-500" />
              </div>
              <span className="font-semibold text-xl">Key Methods (SplashViewModel)</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: 'getAppSetting()', desc: 'Fetch settings from server, emit loading/success/error states' },
              { name: 'initialize()', desc: 'Run full initialization after settings load + animation complete' },
              { name: 'startDebugMenuTimer()', desc: 'Show debug menu after 30 seconds on splash' },
              { name: 'clearSplashCache()', desc: 'Reset cached splash animation files' },
              { name: 'debugClearCacheAndLogout()', desc: 'Clear all data and restart app (debug)' },
              { name: 'reLoadSettings()', desc: 'Refresh settings without UI state changes' },
              { name: 'loadNeededData()', desc: 'Sync basic user data from preferences' },
              { name: 'loadInfo()', desc: 'Full info load (settings + language + addresses)' },
            ].map((method, idx) => (
              <div key={idx} className="flex items-start gap-5 bg-[var(--color-bg-tertiary)] rounded-xl p-5 border border-[var(--color-border)]">
                <code className="text-sm text-amber-500 font-mono bg-[var(--color-bg-primary)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                  {method.name}
                </code>
                <span className="text-base text-[var(--color-text-secondary)]">{method.desc}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Service Methods */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Wifi className="w-6 h-6 text-cyan-500" />
              </div>
              <span className="font-semibold text-xl">Service Layer Methods</span>
            </div>
          }
        >
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">AppInitializationService</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'decideNextRoute()', desc: 'Determine HOME, OTP, or USER_INFO based on token/profile' },
                  { name: 'checkAppVersionUpdateType()', desc: 'Return null, 1 (soft), or 2 (forced) update' },
                  { name: 'shouldShowIntroQuestions()', desc: 'Check if "Know Us" questions should show' },
                  { name: 'initializeCrashlyticsUser()', desc: 'Set Firebase user identifier' },
                  { name: 'loadCartIfLoggedIn()', desc: 'Pre-load cart for logged in users' },
                  { name: 'runPostLoginTasks()', desc: 'Trigger PostLoginTasksService' },
                ].map((method, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-[var(--color-bg-tertiary)] rounded-lg p-4 border border-[var(--color-border)]">
                    <code className="text-sm text-blue-400 font-mono">{method.name}</code>
                    <span className="text-sm text-[var(--color-text-secondary)]">{method.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">AppConfigService</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'refreshFcmTokenIfNeeded()', desc: 'Update FCM token on server if changed' },
                  { name: 'ensureSplashAssets()', desc: 'Download new splash animations if version changed' },
                  { name: 'ensureLangFiles()', desc: 'Download new language files if version changed' },
                  { name: 'ensureImagesVersion()', desc: 'Clear image cache if version increased' },
                  { name: 'addGuestVisitIfNeeded()', desc: 'Register device for guest analytics' },
                ].map((method, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-[var(--color-bg-tertiary)] rounded-lg p-4 border border-[var(--color-border)]">
                    <code className="text-sm text-purple-400 font-mono">{method.name}</code>
                    <span className="text-sm text-[var(--color-text-secondary)]">{method.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">PostLoginTasksService</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'fetchUserTicket()', desc: 'Load user support tickets' },
                  { name: 'fetchTutorialList()', desc: 'Load app tutorial/wizard data' },
                  { name: 'getUserQuestion()', desc: 'Load "Know Us" survey questions' },
                  { name: 'getAddresses()', desc: 'Pre-load user saved addresses' },
                  { name: 'getSurveyApi()', desc: 'Load feedback surveys (if invite enabled)' },
                  { name: 'getHomeData()', desc: 'Pre-load home feed data' },
                ].map((method, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-[var(--color-bg-tertiary)] rounded-lg p-4 border border-[var(--color-border)]">
                    <code className="text-sm text-emerald-400 font-mono">{method.name}</code>
                    <span className="text-sm text-[var(--color-text-secondary)]">{method.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionItem>

        {/* Architecture Notes */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
              <span className="font-semibold text-xl">Architecture Notes</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="info-box flex-col success">
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">Active Implementation (Clean Architecture)</h4>
              <ul className="space-y-4">
                {[
                  { icon: '✅', text: 'presentation/splash/splash_screen.dart - Main UI' },
                  { icon: '✅', text: 'presentation/splash/splash_viewmodel.dart - Cubit' },
                  { icon: '✅', text: 'presentation/splash/state/splash_state.dart - State' },
                  { icon: '✅', text: 'Uses flutter_bloc for state management' },
                  { icon: '✅', text: 'Injectable dependency injection' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                    <span className="text-lg">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="info-box flex-col warning">
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">Legacy Implementation (Still Referenced)</h4>
              <ul className="space-y-4">
                {[
                  { icon: '⚠️', text: 'splash/splash_view.dart - Old UI' },
                  { icon: '⚠️', text: 'splash/view_model/splash_viewmodel.dart - MobX' },
                  { icon: '⚠️', text: 'splash/model/ - Same models used by both' },
                  { icon: '⚠️', text: 'Many features still call legacy methods' },
                  { icon: '📝', text: 'Migration in progress - not deprecated yet' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                    <span className="text-lg">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

