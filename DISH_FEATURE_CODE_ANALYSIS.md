# DISH Feature Code Analysis

## Files Read:

### ViewModel
- `dish/viewmodel/dish_page_viewmodel.dart` (516 lines)
  - **Purpose**: Core business logic for dish page
  - **Key Methods**:
    - `initDish()` - Initializes dish data, handles default options, fetches full dish details
    - `calculatePrice()` - Calculates total price including options, toppings, quantity
    - `incrementQuantity()` / `decrementQuantity()` - Quantity management (min: 1)
    - `addTopping()` / `removeTopping()` - Topping selection
    - `changeOption()` - Option selection
    - `scrollToSpecificOption()` - Auto-scrolls to first unselected required option
    - `scrollToSpecificTopping()` - Auto-scrolls to required topping group
    - `updateFavouriteStatus()` - Toggles favorite status
    - `isOptionRequired()` - Checks if option is selected

### View
- `dish/view/dish_page_view.dart` (297 lines)
  - **Purpose**: Main dish detail screen UI
  - **Key Features**:
    - Deep link handling (navigates to splash if from launch)
    - Restaurant initialization from home feed
    - Tutorial support
    - Report issue widget (conditional)

### Services
- `dish/services/dish_service.dart` (121 lines)
  - **Purpose**: API calls for dish data
  - **Key Methods**:
    - `fetchDish(int dishId)` - Gets full dish details
    - `updateDishFave()` - Updates favorite status
    - `fetchDishesList()` - Batch fetch dishes
    - **Error Handling**: Shows toast messages via `showMessage()`

### Widgets
- `dish/widget/add_cart_buttom.dart` (181 lines)
  - **Purpose**: Add to Cart button with validation
  - **Key Logic**:
    - Button enabled only if `selectedQuantity > 0` AND not over inventory limit
    - Validates options/toppings before adding
    - Shows toast "restaurant_offline" if restaurant offline
    - Navigation logic based on `fromHome` flag

- `dish/widget/options_dish_widget.dart` (538 lines)
  - **Purpose**: Options selection UI with auto-scroll
  - **Key Features**:
    - Auto-scroll to first unselected option
    - Red highlight for required unselected options
    - "option_required" badge shown when not selected
    - Default option pre-selection (isDefault == 1)
    - Radio button behavior (single selection per group)

- `dish/widget/topping_widget.dart` (485 lines)
  - **Purpose**: Toppings selection UI
  - **Key Features**:
    - Grouped by `groupId`
    - Min/max selection limits (selectMin, selectLimit)
    - "topping_required" badge for required groups
    - Error dialog: "you_cant_select_more_than" + selectLimit
    - + button (unselected) / checkmark (selected)

- `dish/widget/quantity_selector_widget.dart` (84 lines)
  - **Purpose**: Quantity selector with inventory limits
  - **Key Logic**:
    - Minimum quantity: 1 (cannot go below)
    - Maximum: `dishModel.quantity` (inventory limit)
    - + button disabled/grayed when over limit
    - Uses `isOverQuantity()` check

- `dish/widget/dish_bottom_sheet.dart` (65 lines)
  - **Purpose**: Bottom sheet with quantity selector and Add to Cart button
  - **Conditional**: Only shown if `dinInRestarunat == false` OR `isVending == true`

### Params
- `dish/params/dish_page_params.dart` (37 lines)
  - **Purpose**: Parameters for navigating to dish page
  - **Key Fields**: dish, cartObject, basket, fromHome, fromRestaurant, restaurantStatus, isMarket, isGrid, fromService

---

## User-Facing Features Found:

1. **Load Dish Details** - `initDish()` in viewmodel:289
   - Fetches full dish data if `withData == true`
   - Pre-selects default options (isDefault == 1)
   - Generates topping group keys for scrolling

2. **Select Required Options** - `changeOption()` in viewmodel:449
   - Radio button selection (one per group)
   - Auto-scrolls to unselected option if trying to add to cart
   - Red highlight for required unselected options

3. **Select Toppings** - `addTopping()` / `removeTopping()` in viewmodel:443,455
   - Multiple selection per group
   - Min/max limits enforced
   - Error dialog if exceeding limit

4. **Change Quantity** - `incrementQuantity()` / `decrementQuantity()` in viewmodel:431,437
   - Minimum: 1 (enforced by `max(1, quantity - 1)`)
   - Maximum: inventory limit (`dishModel.quantity`)
   - Price recalculates automatically

5. **Add to Cart** - `addToCart()` in MyCartViewModel (called from add_cart_buttom.dart:113)
   - Validates all required options selected
   - Validates required toppings selected
   - Checks restaurant status (must be ONLINE unless isBusy)
   - Shows toast if restaurant offline
   - Navigation varies by context (home feed vs restaurant menu)

6. **Edit Cart Item** - `updateCart()` in MyCartViewModel (called from add_cart_buttom.dart:115)
   - Pre-loads existing selections
   - Updates quantity and selections

7. **Toggle Favorite** - `updateFavouriteStatus()` in viewmodel:471
   - API call to update favorite status
   - Reverts UI if API fails

8. **Auto-Scroll to Missing Options** - `scrollToSpecificOption()` in viewmodel:170
   - Scrolls to first unselected required option
   - Highlights option in red
   - 600ms animation duration

9. **Auto-Scroll to Missing Toppings** - `scrollToSpecificTopping()` in viewmodel:104
   - Scrolls to required topping group
   - Shows "topping_required" badge

10. **Price Calculation** - `calculatePrice()` in viewmodel:384
    - Base price × quantity
    - Adds option prices × quantity
    - Adds topping prices × quantity
    - Calculates points (loyalty points)

11. **Deep Link Support** - `dish_page_view.dart:91-99`
    - Handles deep links from app launch
    - Navigates to splash if from launch
    - Clears deep link state

12. **Report Issue** - `DishReportWidget` in dish_page_view.dart:244
    - Conditional widget (shown if `SettingManager.instance.showReport == true`)
    - Navigates to report issue screen

---

## Validation Rules Discovered:

1. **Quantity Minimum** - Location: `dish_page_viewmodel.dart:438`
   - Rule: `quantity = max(1, quantity - 1)`
   - Error: No explicit error message (button just doesn't decrease below 1)
   - UI: - button becomes ineffective at quantity 1

2. **Quantity Maximum (Inventory)** - Location: `quantity_selector_widget.dart:50-62`
   - Rule: `isOverQuantity()` check
   - Error: No error message (button disabled/grayed)
   - UI: + button disabled when at inventory limit

3. **Required Options** - Location: `add_cart_buttom.dart:89-94`
   - Rule: `checkToppingOptionsAvaliblity()` returns 0 if missing
   - Error: Auto-scrolls to option (no explicit error message)
   - UI: Red highlight, "option_required" badge

4. **Required Toppings** - Location: `add_cart_buttom.dart:95-97`
   - Rule: `checkToppingOptionsAvaliblity()` returns groupId if missing
   - Error: Auto-scrolls to topping group
   - UI: "topping_required" badge, red highlight

5. **Topping Selection Limit** - Location: `topping_widget.dart:265-277`
   - Rule: `selectLimit` enforced
   - Error: Dialog message: "you_cant_select_more_than" + selectLimit
   - UI: Dialog shown, topping not added

6. **Restaurant Status** - Location: `add_cart_buttom.dart:125-137`
   - Rule: Must be ONLINE (unless isBusy)
   - Error: Toast message: "restaurant_offline".locale
   - UI: Toast shown, cart still added (for later)

7. **Button Enabled State** - Location: `add_cart_buttom.dart:60-70`
   - Rule: `selectedQuantity > 0` AND `!isOverQuantity()`
   - Error: Button disabled (no error message)
   - UI: Button grayed out

8. **Default Option Pre-Selection** - Location: `dish_page_viewmodel.dart:348-356`
   - Rule: Options with `isDefault == 1` are auto-selected
   - No validation needed (automatic)

---

## Business Logic Identified:

### Price Calculation (viewmodel:384-420)
- Base: `dishModel.price × quantity`
- Options: `option.price × quantity` (for each selected option)
- Toppings: `topping.price × quantity` (for each selected topping)
- Points: Calculated similarly (base + options + toppings) × quantity

### Option Selection (viewmodel:449-452)
- Single selection per option group (radio button behavior)
- Stored in `selectedOptions` map (key: option.name, value: OptModel)
- Price updates immediately on selection

### Topping Selection (viewmodel:443-458)
- Multiple selection per topping group
- Stored in `selectedToppings` list
- Min/max limits per group (selectMin, selectLimit)
- Price updates immediately on add/remove

### Quantity Management (viewmodel:431-440)
- Minimum enforced: 1
- Maximum: inventory limit (`dishModel.quantity`)
- Price recalculates on change

### Navigation Logic (add_cart_buttom.dart:139-173)
- From home feed: Navigate to restaurant menu
- From restaurant menu: Pop back (or go to cart if editing)
- Deep link from launch: Navigate to splash
- Service mode: Pop back, reset quantity to 1

---

## UI States:

### Loading States:
- `dishLoading` - Shows `BeeLoaderWidget` while fetching dish details
- `dataLoading` - General data loading state

### Selection States:
- **Options**: 
  - Unselected: Empty circle, red text/container if required
  - Selected: Filled circle with primary color
  - Highlighted: Red border, red background, bold text (when scrolled to)

- **Toppings**:
  - Unselected: + button (white background, black icon)
  - Selected: Checkmark (primary color background, white icon)
  - Required group: "topping_required" badge shown

- **Quantity**:
  - Normal: Black - and + buttons
  - At max: + button grayed out
  - At min: - button still works but doesn't go below 1

### Button States:
- **Add to Cart**:
  - Enabled: Shows price, clickable
  - Disabled: Grayed out (quantity 0 or over limit)
  - Loading: Not explicitly shown (but navigation happens)

### Error States:
- Restaurant offline: Toast message at bottom
- Topping limit: Dialog popup
- Missing options/toppings: Auto-scroll with highlight

---

## Error Messages (Exact Text from Code):

1. **Restaurant Offline** - `add_cart_buttom.dart:128`
   - Message: `'restaurant_offline'.locale`
   - Type: Toast (bottom of screen, gray background, black text)
   - Duration: `Toast.LENGTH_SHORT`

2. **Topping Limit Exceeded** - `topping_widget.dart:270-277`
   - Message: `'you_cant_select_more_than'.locale + " " + selectLimit.toString()`
   - Type: Dialog (showMessageDialog)
   - Example: "You can't select more than 3"

3. **Required Option Badge** - `options_dish_widget.dart:200`
   - Text: `'option_required'.locale`
   - Display: Badge shown when option not selected

4. **Required Topping Badge** - `topping_widget.dart:141`
   - Text: `'topping_required'.locale`
   - Display: Badge shown when topping group has selectMin > 0 and not met

---

## Navigation Flows:

1. **From Restaurant Menu** → Dish Page → Back to Menu (or Cart if editing)
2. **From Home Feed** → Dish Page → Restaurant Menu (after add to cart)
3. **From Deep Link** → Dish Page → Splash (if from launch)
4. **From Cart (Edit)** → Dish Page → Cart (after update)

---

## Test Coverage Analysis:

### Features with Test Cases: ✅
- Load dish from menu (TC-DISH-001)
- Load via deep link (TC-DISH-002)
- Load from home feed (TC-DISH-003)
- Select required option (TC-DISH-004)
- Change option selection (TC-DISH-005)
- Auto-scroll to missing option (TC-DISH-006)
- Default option pre-selection (TC-DISH-007)
- Add topping (TC-DISH-008)
- Remove topping (TC-DISH-009)
- Topping maximum limit (TC-DISH-010)
- Required topping validation (TC-DISH-011)
- Increment quantity (TC-DISH-012)
- Decrement quantity minimum (TC-DISH-013)
- Quantity inventory limit (TC-DISH-014)
- Add to cart success (TC-DISH-015)
- Add to cart - missing options (TC-DISH-016)
- Add to cart - restaurant offline (TC-DISH-017)
- Edit cart item (TC-DISH-018)

### Missing Test Cases: ❌
1. **Toggle Favorite Dish** - Feature exists (`updateFavouriteStatus()`), no test case
2. **Price Calculation with Options/Toppings** - Feature exists (`calculatePrice()`), no dedicated test
3. **Deep Link Navigation Handling** - Feature exists (dish_page_view.dart:91-99), no test case
4. **Report Issue Widget** - Feature exists (DishReportWidget), no test case
5. **Service Mode Add to Cart** - Feature exists (add_cart_buttom.dart:100-110), no test case
6. **Quantity Button Disabled States** - Feature exists (quantity_selector_widget.dart:49-63), no test case
7. **Button Enabled/Disabled Logic** - Feature exists (add_cart_buttom.dart:60-70), no test case

---

## Key Implementation Details for Test Cases:

1. **Option Auto-Scroll**: Uses `OptionScrollController` singleton, 600ms animation, red highlight for 2 seconds
2. **Topping Auto-Scroll**: Uses `scrollToSpecificTopping()`, 300ms animation, shows "topping_required" badge
3. **Price Display**: Shows on Add to Cart button when `selectedQuantity > 0`
4. **Button Text**: "add_cart".locale (new) or "edit_cart".locale (editing)
5. **Default Options**: Auto-selected on `initDish()` if `isDefault == 1`
6. **Inventory Check**: `isOverQuantity()` considers current cart quantity + new quantity
7. **Restaurant Status**: Checked AFTER adding to cart (cart still added, toast shown)

