# Menu Restaurant Feature - Integration Guide

## Adding menu_restaurant to the Documentation Portal

This guide explains how to integrate the menu_restaurant feature documentation into the documentation portal.

---

## 1. File Structure Created

The following files have been created in `src/features/menu-restaurant/`:

```
src/features/menu-restaurant/
├── ANALYSIS_REPORT.md           # Complete analysis documentation
├── INTEGRATION_GUIDE.md         # This file
├── types.ts                     # TypeScript type definitions
├── MenuRestaurantFeature.tsx    # Main React component
└── data/
    ├── use-cases.ts             # 15 use cases extracted from code
    ├── edge-cases.ts            # 22 edge cases identified
    └── test-cases.ts            # 18 test cases in non-technical language
```

---

## 2. Update Feature Registry

In `src/data/features.ts`, add the menu_restaurant feature:

```typescript
{
  id: 'menu-restaurant',
  name: 'Menu Restaurant',
  path: '/feature/menu-restaurant',
  description: 'Restaurant browsing, menu viewing, search, and market-style store support',
  status: 'Stable',
  architecture: 'MVVM',
  useCaseCount: 15,
  edgeCaseCount: 22,
  icon: 'Store'
}
```

---

## 3. Add Route

In `src/App.tsx`, add the route:

```typescript
import { MenuRestaurantFeature } from './features/menu-restaurant/MenuRestaurantFeature';

// Inside <Routes>:
<Route path="/feature/menu-restaurant" element={<MenuRestaurantFeature />} />
```

---

## 4. Update Navigation (if applicable)

If your app has a sidebar or navigation menu, add a link:

```typescript
{
  to: '/feature/menu-restaurant',
  label: 'Menu Restaurant',
  icon: Store
}
```

---

## 5. Verify Installation

```bash
# Start development server
npm run dev

# Navigate to:
http://localhost:5173/feature/menu-restaurant
```

---

## 6. Verification Checklist

After integration, verify the following:

### Page Loads Correctly
- [ ] Page loads without errors
- [ ] Hero section displays with Store icon
- [ ] MVVM and Stable badges are visible
- [ ] Tab navigation works (Overview, Use Cases, Edge Cases, QA Tests, Implementation)

### Overview Tab
- [ ] Feature description is displayed
- [ ] Key Features grid shows 6 feature cards
- [ ] Statistics show correct counts (15 use cases, 22 edge cases, 18 tests, 13 API endpoints)
- [ ] User Flow diagram displays correctly
- [ ] Folder Structure tree is expandable

### Use Cases Tab
- [ ] All 15 use cases are displayed
- [ ] Use cases are expandable with full details
- [ ] Priority badges (Critical, High, Medium, Low) display correctly
- [ ] Flutter file references are shown

### Edge Cases Tab
- [ ] All 22 edge cases are displayed
- [ ] Category badges display correctly
- [ ] Likelihood × Impact matrix is visible
- [ ] Error messages are quoted from code

### QA Tests Tab
- [ ] All 18 test cases are displayed
- [ ] Test cases are in non-technical language
- [ ] "What You're Testing" and "Why It Matters" fields are clear
- [ ] Detailed steps are easy to follow
- [ ] Success checklist shows checkboxes
- [ ] Failure scenarios provide clear guidance

### Implementation Tab
- [ ] API Endpoints list shows all 13 endpoints
- [ ] Key ViewModels section is expandable
- [ ] Data Models section shows model structures
- [ ] Dependencies are organized by category

### Responsive Design
- [ ] Page works on mobile viewport
- [ ] Tab navigation scrolls horizontally on mobile
- [ ] Cards stack vertically on mobile

---

## 7. Statistics Summary

| Metric | Count |
|--------|-------|
| Use Cases | 15 |
| Edge Cases | 22 |
| Test Cases | 18 |
| API Endpoints | 13 |
| Flutter Files | 35+ |
| Widget Components | 25+ |

### Test Case Priority Distribution

| Priority | Count | Description |
|----------|-------|-------------|
| P0 (Critical) | 4 | Core menu loading, browsing, market view |
| P1 (High) | 8 | Search, pickup/delivery, favorites, error handling |
| P2 (Medium) | 5 | Rewards, guest mode, popups, nearest restaurant |
| P3 (Low) | 1 | Tutorial display |

---

## 8. Key Files Referenced

### ViewModels (Business Logic)
- `restaurant_single_modelview.dart` - Main menu logic (486 lines)
- `restaurant_single_search_viewmodel.dart` - Search logic (88 lines)

### Views
- `restaurant_menu_view.dart` - Main entry point
- `restaurant_page.dart` - Restaurant layout
- `market_view.dart` - Market layout
- `dynamic_rewards_widget.dart` - Rewards display

### Services
- `IMenuRestaurantService.dart` - Interface (60 lines)
- `menu_restaurant_service.dart` - Implementation (405 lines)

### Models
- `sub_menu_model.dart` - Menu category structure
- `menu_service_response.dart` - API response wrapper

---

## 9. Common Issues & Solutions

### Issue: "Module not found" error
**Solution**: Ensure the path alias `@/` is configured in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: Component not rendering
**Solution**: Check that all imports are correct and components exist:
```typescript
// Required components from @/components/
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { Accordion, AccordionItem } from '@/components/Accordion';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
```

### Issue: Styling not applied
**Solution**: Ensure Tailwind CSS is configured and the `cn` utility exists:
```typescript
import { cn } from '@/lib/utils';
```

---

## 10. Future Enhancements

Consider adding:
- [ ] Interactive API playground
- [ ] Code snippets from actual Flutter files
- [ ] Automated test runner integration
- [ ] Video walkthroughs for complex test cases
- [ ] Export functionality for QA checklists
- [ ] Search within test cases

---

## Contact

For questions about this feature documentation, refer to:
- Analysis Report: `ANALYSIS_REPORT.md`
- Flutter Source: `beeorder-frontend-v4/lib/features/restaurant/menu_restaurant/`





