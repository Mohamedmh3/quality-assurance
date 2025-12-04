# DISH Feature Analysis

## Overview

The **Dish Feature** is a critical component of the BeeOrder mobile application that enables users to view detailed information about menu items, customize them with options and toppings, adjust quantities, add special notes, and add configured items to their shopping cart.

**Architecture**: MVVM with MobX State Management  
**Status**: Stable  
**Files Analyzed**: 17 source files  

## Files Analyzed

### params/
| File | Purpose |
|------|---------|
| `dish_page_params.dart` | Navigation parameters DTO for dish page including dish data, cart context, restaurant status, and display mode flags |

### services/
| File | Purpose |
|------|---------|
| `IDishService.dart` | Abstract interface defining dish service contract (fetchDish, fetchDishesList, updateDishFave) |
| `dish_service.dart` | Concrete implementation of dish API calls using HttpManager |

### view/
| File | Purpose |
|------|---------|
| `dish_page_view.dart` | Main screen widget orchestrating the dish page UI with BaseView pattern |

### viewmodel/
| File | Purpose |
|------|---------|
| `dish_page_viewmodel.dart` | Business logic and state management using MobX (observables, actions, computed properties) |
| `dish_page_viewmodel.g.dart` | Generated MobX store implementation |

### widget/
| File | Purpose |
|------|---------|
| `add_cart_buttom.dart` | Add to Cart/Edit Cart button with validation and navigation logic |
| `cover_dish_widget.dart` | Hero image widget with zoom capability |
| `dish_bottom_sheet.dart` | Bottom action sheet containing quantity selector and add button |
| `dish_note_widget.dart` | Special notes text input field |
| `dish_page_appbar.dart` | Custom app bar with restaurant info, favorite, and share actions |
| `extra_note_widget.dart` | Container section for additional notes |
| `options_dish_widget.dart` | Option group selection with required validation and auto-scroll |
| `price_point_container.dart` | Price display with old price strikethrough and loyalty points |
| `quantity_icon_widget.dart` | Plus/minus icon buttons |
| `quantity_selector_widget.dart` | Quantity selector with increment/decrement and inventory validation |
| `title_descrption_text.dart` | Dish name and description text widget |
| `topping_widget.dart` | Topping group selection with min/max limits |

## Architecture Pattern

**MVVM with MobX State Management**

```
┌─────────────────────────────────────────────────────────────────┐
│                          VIEW LAYER                              │
│  dish_page_view.dart + widget/*.dart                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  • DishPageView (StatefulWidget)                            ││
│  │  • BaseView pattern with onModelReady                       ││
│  │  • Observer widgets for reactive updates                    ││
│  │  • Reusable widgets for each section                        ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       VIEWMODEL LAYER                            │
│  dish_page_viewmodel.dart                                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  MobX Store with:                                           ││
│  │  • @observable state properties                             ││
│  │  • @action methods for state mutations                      ││
│  │  • @computed derived properties                             ││
│  │  • Business logic and validation                            ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                              │
│  dish_service.dart + IDishService.dart                          │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  • Interface-based design                                   ││
│  │  • HttpManager for network calls                            ││
│  │  • Error handling with showMessage                          ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## Key Findings

### Use Cases Identified: 10

1. **View Dish Details** (Priority: Critical)
   - Load dish from menu, home feed, or deep link
   - Display cover image, name, description, price, points
   - Show options and toppings if configured

2. **Select Dish Options** (Priority: Critical)
   - Single-choice selection per option group
   - Required validation with visual indicators
   - Auto-scroll to unselected required options

3. **Add/Remove Toppings** (Priority: High)
   - Multi-choice selection within groups
   - Minimum and maximum selection limits
   - Price calculation per topping

4. **Adjust Quantity** (Priority: High)
   - Increment/decrement with min 1
   - Inventory limit validation
   - Price multiplication

5. **Add Special Notes** (Priority: Medium)
   - Free text input for instructions
   - Attached to cart item

6. **Add Dish to Cart** (Priority: Critical)
   - Validation of required options
   - Validation of minimum toppings
   - Restaurant online status check
   - Navigation based on entry point

7. **Toggle Favorite Status** (Priority: Medium)
   - Optimistic UI update
   - API sync with rollback on failure

8. **Share Dish** (Priority: Low)
   - Deep link generation
   - System share sheet integration

9. **Edit Cart Item** (Priority: High)
   - Load existing selections
   - Modify and save changes

10. **Report Issue with Dish** (Priority: Low)
    - Navigate to report screen with context

### Edge Cases Identified: 15

| ID | Category | Impact | Likelihood |
|----|----------|--------|------------|
| EC-DISH-001 | Data | High | Medium | Dish Not Found / Invalid ID |
| EC-DISH-002 | Network | High | Medium | Network Failure During Load |
| EC-DISH-003 | State | Critical | Medium | Restaurant Offline During Add |
| EC-DISH-004 | Validation | Medium | High | Required Options Not Selected |
| EC-DISH-005 | Validation | Medium | High | Minimum Toppings Not Selected |
| EC-DISH-006 | Validation | Low | High | Maximum Toppings Exceeded |
| EC-DISH-007 | Data | High | Medium | Dish Out of Stock |
| EC-DISH-008 | Network | Low | Low | Favorite Update Failed |
| EC-DISH-009 | State | Medium | Medium | Deep Link with Active Cart |
| EC-DISH-010 | Data | Medium | Low | Price Changed During Session |
| EC-DISH-011 | Data | Medium | Low | Option/Topping Removed After Selection |
| EC-DISH-012 | Network | Low | Medium | Image Load Failure |
| EC-DISH-013 | State | Medium | Medium | Service Mode vs Regular Dish |
| EC-DISH-014 | State | Medium | Low | Vending Machine Mode |
| EC-DISH-015 | UI | Low | Medium | Keyboard Obscures Content |

### API Endpoints Used: 3

1. **GET /dish-detail**
   - Parameters: `dish_id: int`
   - Returns: `DishModel` with options and toppings

2. **GET /dishes-list**
   - Parameters: `dishes_ids: int[]`
   - Returns: `List<DishModel>`

3. **POST /fav-dish-update**
   - Body: `{ dish_id, restaurant_id, status }`
   - Returns: Success boolean

## Dependencies

### Features
- `cart` (MyCartViewModel for cart operations)
- `home_feed` (DishModel data structure)
- `menu_restaurant` (OptionModel, ToppingModel)
- `report_issue` (ReportIssueScreen)
- `helpers/tutorials` (Tutorial system)

### Core Services
- `HttpManager` - Network layer
- `NavigationService` - App navigation
- `SettingManager` - App configuration
- `DeepLinkManager` - Deep link handling
- `AnalyticsManager` - Event tracking
- `UserManager` - User preferences (language)

### Third-Party Libraries
- `flutter_mobx` - Reactive state management
- `get` (GetX) - Dependency injection
- `flutter_screenutil` - Responsive sizing
- `share_plus` - System sharing
- `widget_zoom` - Image zoom functionality
- `scrollable_positioned_list` - Scroll to item

## Recommendations

### UX Improvements
1. Add loading skeleton instead of spinner for better perceived performance
2. Consider caching dish details for instant back navigation
3. Add haptic feedback on option/topping selection
4. Improve error messages with actionable guidance

### Missing Error Handling
1. No explicit handling for dish deletion during view
2. Silent failure on favorite API errors (no user feedback)
3. No retry mechanism for failed dish loads

### Test Coverage Gaps
1. Need E2E tests for deep link → cart → checkout flow
2. Missing accessibility tests (screen reader, contrast)
3. No performance tests for large topping lists
4. RTL layout needs dedicated test coverage

### Code Quality
1. `add_cart_buttom.dart` has typo in filename (should be `button`)
2. Some widgets have deeply nested logic that could be extracted
3. Consider using sealed classes for option/topping selection states

---

## Quick Start: Documentation Portal

### Installation

```bash
cd dish-documentation-portal
npm install
```

### Development

```bash
npm run dev
# Navigate to http://localhost:5173
```

### Structure

```
src/
├── features/dish/          # Dish feature documentation
│   ├── DishFeature.tsx    # Main page component
│   ├── types.ts           # TypeScript interfaces
│   └── data/
│       ├── use-cases.ts   # 10 documented use cases
│       ├── edge-cases.ts  # 15 edge cases
│       └── test-cases.ts  # 35 test cases
├── components/             # Shared UI components
├── layouts/                # App layouts
├── lib/                    # Utilities and types
└── store/                  # Zustand state (QA persistence)
```

### Features

- ✅ Interactive use case visualization
- ✅ Filterable edge case matrix
- ✅ Persistent QA test checklist
- ✅ Export to JSON/CSV
- ✅ Dark mode design
- ✅ Responsive layout
- ✅ Keyboard accessible

---

*Generated: December 2024*
*Analyzed by: Feature Documentation Portal*

