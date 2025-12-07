# SPLASH Feature - Complete Analysis Report

## Executive Summary

The **SPLASH** feature is the entry point of the BeeOrder Flutter application. It displays an animated logo while initializing the app, loading server settings, checking authentication status, and routing users to the appropriate screen (Home, Login, User Info, or Update Required). The feature uses a **hybrid architecture** with both legacy MVVM (MobX) and newer Clean Architecture (Bloc/Cubit) implementations.

---

## Architecture

| Aspect | Details |
|--------|---------|
| **Pattern** | Hybrid: Clean Architecture (Primary) + Legacy MVVM |
| **Active Implementation** | `presentation/splash/` (Cubit-based) |
| **Legacy Implementation** | `splash/` (MobX-based, still referenced) |
| **State Management** | flutter_bloc (Cubit) + MobX (legacy) |
| **Dependency Injection** | injectable + GetX |
| **Migration Status** | In Progress - Both implementations coexist |

---

## Files Analyzed

### Presentation Layer (Clean Architecture - Active)

| File | Purpose | Key Methods |
|------|---------|-------------|
| `presentation/splash/splash_screen.dart` | Main splash UI with Lottie animation | `build()`, `_onAnimationComplete()`, `_handleClearCache()` |
| `presentation/splash/splash_viewmodel.dart` | Cubit for state management | `getAppSetting()`, `initialize()`, `startDebugMenuTimer()`, `clearSplashCache()`, `debugClearCacheAndLogout()` |
| `presentation/splash/state/splash_state.dart` | Equatable state class | `copyWith()`, `initial()` |

### Legacy Implementation (MVVM - Still Used)

| File | Purpose | Key Methods |
|------|---------|-------------|
| `splash/splash_view.dart` | Legacy splash UI | `initState()`, `build()` |
| `splash/view_model/splash_viewmodel.dart` | MobX ViewModel | `loadSettings()`, `appInitialize()`, `navigateToHome()`, `callAppConfigsApis()` |
| `splash/model/setting_model.dart` | Server config model | `fromJson()`, 70+ configuration fields |
| `splash/model/guest_model.dart` | Guest visit data | `fromJson()`, access limits |

### Service Layer

| File | Purpose | Key Methods |
|------|---------|-------------|
| `service/app_initialization_service.dart` | User state & routing | `decideNextRoute()`, `checkAppVersionUpdateType()`, `shouldShowIntroQuestions()` |
| `service/app_config_service.dart` | Config sync operations | `refreshFcmTokenIfNeeded()`, `ensureSplashAssets()`, `ensureLangFiles()` |
| `service/post_login_tasks_service.dart` | Background data load | `run()` - triggers multiple ViewModels |
| `service/authentication_service.dart` | Legacy auth service | `getAppSetting()`, `login()`, `verifyOtp()` |

### Data Layer

| File | Purpose | Key Methods |
|------|---------|-------------|
| `data/repository/auth_repository.dart` | Data access layer | `getAppSetting()`, `logout()`, `_syncSettings()`, `clearLocalAppDirectories()` |
| `data/remote/service/auth_service.dart` | API calls | `getAppSetting()`, `addGuestVisit()`, `updateFcmToken()` |
| `data/local/auth_local_storage.dart` | SharedPreferences | `setToken()`, `isFirstVisitRegistered()`, `setFirstVisitCompleted()` |

---

## Splash Flow Diagram

```
App Launch
    ↓
Splash Screen Shows (Lottie Animation)
    ↓
┌─────────────────────────────────────┐
│      getAppSetting() API Call       │
└─────────────────────────────────────┘
    │
    ├─ ❌ NoInternetException
    │       └─→ Show Retry Dialog (isDismissible: false)
    │               └─→ User taps "Retry" → Retry getAppSetting()
    │
    ├─ ❌ Other Error
    │       └─→ Show Error Dialog with Retry
    │
    └─ ✅ Success
            ↓
┌─────────────────────────────────────┐
│   _syncSettings() - Initialize:     │
│   • StaticData.settingModel         │
│   • UserManager (token, mobile)     │
│   • SettingManager (pickUpService)  │
│   • AppLinks (cachedUrl, isInvite)  │
└─────────────────────────────────────┘
            ↓
    Animation Completes
            ↓
┌─────────────────────────────────────┐
│        initialize() Called          │
└─────────────────────────────────────┘
            │
            ├─ First-Time User (IS_FIRST_APP = false)
            │       └─→ Show BeeIntro Welcome Screens
            │               └─→ User completes → setFirstVisitCompleted()
            │
            ├─ Check App Version Update
            │       ├─ update_type = 2 → Navigate to UPDATE_APP (blocking)
            │       └─ update_type = 1 → Show Soft Update Dialog (dismissable)
            │
            ├─ Check Intro Questions
            │       └─ Should show → Navigate to introQuestions
            │
            ├─ Check Deep Link
            │       └─ Pending deep link → DeepLinkExecutor.execute()
            │
            └─ decideNextRoute()
                    │
                    ├─ Token empty + Mobile empty → HOME (as guest)
                    ├─ Token empty + Mobile exists → OTP_VIEW
                    ├─ Token exists + Profile incomplete → USER_INFO_VIEW
                    └─ Token exists + Profile complete → HOME
```

---

## Statistics

| Metric | Count |
|--------|-------|
| **Use Cases Identified** | 15 |
| **Edge Cases Identified** | 36 |
| **Test Cases Generated** | 5 (Enhanced format) |
| **Navigation Paths** | 6 primary routes |
| **API Endpoints** | 4 |
| **Configuration Fields** | 70+ in SettingModel |

---

## Key Findings

### Business Logic Discovered

1. **Dual Architecture** - Both MVVM (MobX) and Clean Architecture (Bloc) implementations exist
   - Location: `splash/` and `presentation/splash/`
   - Impact: Some features call legacy methods while others use new architecture

2. **First-Visit Detection** - Uses `IS_FIRST_APP` boolean in SharedPreferences
   - Location: `data/local/auth_local_storage.dart:55-59`
   - Triggers BeeIntro welcome screens for new users

3. **Forced vs Soft Updates** - Determined by `update_type` field (1=soft, 2=forced)
   - Location: `service/app_initialization_service.dart:86-92`
   - Forced updates cannot be bypassed; soft updates can be dismissed

4. **Guest Visit Tracking** - Non-logged-in users are tracked via device ID
   - Location: `presentation/splash/splash_viewmodel.dart:99-106`
   - Returns GuestModel with access limits

5. **Debug Menu Timer** - Shows reset option after 30 seconds on splash
   - Location: `presentation/splash/splash_viewmodel.dart:44-47`
   - Allows testers to clear app data without reinstalling

### Validation Rules

| Rule | Error Message | Location |
|------|---------------|----------|
| No Internet | `"no_connection"` (localized) | `splash/view_model/splash_viewmodel.dart:174` |
| First Visit Check | N/A (UI change) | `data/local/auth_local_storage.dart:58` |
| Token Empty | N/A (navigation) | `service/app_initialization_service.dart:186` |
| Profile Incomplete | N/A (navigation) | `service/app_initialization_service.dart:195-199` |
| Version Invalid | Update screen/dialog | `presentation/splash/splash_viewmodel.dart:113-123` |

### API Calls Made

| Endpoint | Purpose | File:Line |
|----------|---------|-----------|
| `GET /settings` | Fetch app configuration | `data/remote/service/auth_service.dart:215-226` |
| `POST /guest-visit` | Register guest device | `data/remote/service/auth_service.dart:228-246` |
| `POST /update-fcm` | Sync FCM token | `data/remote/service/auth_service.dart:125-131` |
| `POST /logout` | Clear server session (debug) | `data/remote/service/auth_service.dart:88-93` |

### Navigation Logic

| Condition | Destination |
|-----------|-------------|
| First-time user | BeeIntro → then continue |
| Forced update required | UPDATE_APP (blocking) |
| Soft update available | Dialog → then continue |
| Intro questions available | introQuestions |
| Deep link present | Deep link destination |
| No token + No mobile | HOME (as guest) |
| No token + Has mobile | OTP_VIEW |
| Has token + Incomplete profile | USER_INFO_VIEW |
| Has token + Complete profile | HOME |

### Critical Edge Cases

| Edge Case | Impact | Mitigation |
|-----------|--------|------------|
| No Internet on Launch | Critical | Retry dialog (cannot dismiss) |
| Forced Update Required | Critical | Blocking update screen |
| Token Expired | High | 401 triggers logout |
| Corrupted Local Storage | High | Returns null, treats as no data |
| Animation Load Failure | Medium | Fallback to static logo |
| FCM Token Failure | Low | Silent fail, retry next launch |

---

## Recommendations

### Issues Found

1. **Dual Implementation Complexity** - Having both MVVM and Clean Architecture creates maintenance burden
   - Recommendation: Complete migration to Clean Architecture
   - Priority: Medium

2. **Legacy Code Still Called** - Many features directly call `SplashViewModel` from legacy folder
   - Recommendation: Update callers to use new implementation
   - Priority: High

3. **Error Handling Inconsistency** - Some errors show messages, others fail silently
   - Recommendation: Standardize error handling approach
   - Priority: Medium

4. **No Offline Mode** - App requires internet to function
   - Recommendation: Consider offline-first architecture for critical flows
   - Priority: Low

### Test Coverage Gaps

- [ ] Deep link handling with invalid URLs
- [ ] App backgrounded during splash
- [ ] Memory pressure during animation
- [ ] Language sync failure recovery
- [ ] Multiple rapid app launches
- [ ] Screen rotation during splash

### Suggested Improvements

1. Add loading progress indicator for slow connections
2. Implement offline settings cache for basic functionality
3. Add animation skip button for impatient users
4. Improve error messages with actionable guidance
5. Add analytics for splash duration tracking

---

## Integration Instructions

### Adding SPLASH Feature to Portal

1. **Create folder structure:**
```
src/features/splash/
├── data/
│   ├── use-cases.ts
│   ├── edge-cases.ts
│   └── enhanced-test-cases.ts
├── types.ts
└── SplashFeature.tsx
```

2. **Update `src/data/features.ts`:**
```typescript
{
  id: 'splash',
  name: 'Splash Screen',
  path: '/feature/splash',
  description: 'App initialization, settings load, and user routing',
  status: 'Stable',
  architecture: 'Clean Architecture',
  useCaseCount: 15,
  edgeCaseCount: 36,
  icon: 'Zap',
  color: 'amber'
}
```

3. **Add route to `App.tsx`:**
```typescript
import { SplashFeature } from '@/features/splash/SplashFeature';

// In router configuration:
<Route path="/feature/splash" element={<SplashFeature />} />
```

4. **Test at:** `/feature/splash`

---

## Quality Checklist

- [x] Read ALL files in both `splash/` and `presentation/splash/`
- [x] Every public method has a use case
- [x] Every validation/error has an edge case
- [x] Critical paths have test cases
- [x] All error messages are documented from code
- [x] All file paths and line numbers are accurate
- [x] Test cases follow enhanced format for non-technical users
- [x] Non-technical users can execute tests without questions
- [x] React component matches DISH structure
- [x] TypeScript interfaces defined

---

## Appendix: SettingModel Fields

The `SettingModel` contains 70+ configuration fields. Key categories:

### Version & Update
- `isValidVersion` - App version status
- `splashVersion` - Splash animation version
- `langVersion` - Language files version
- `imagesVersion` - Image cache version

### Feature Flags
- `invite` - Invite feature enabled
- `isLiveChatEnabled` - Live chat available
- `isFlashSaleEnabled` - Flash sales active
- `showSearch` - Search visible
- `pickUpService` - Pickup available

### UI Configuration
- `currency` - Display currency
- `homePageRefreshTime` - Auto-refresh interval
- `loadingSentence` - Loading screen messages
- `baseImageUrl` - Image CDN base URL

### Analytics
- `enableRecordingAnalytics` - Screen recording
- `fcmToken` - Push notification token

---

*Report generated from comprehensive code analysis of BeeOrder Flutter application's SPLASH feature.*

