import { Monitor, Image, AlertCircle, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import type { VisualScreenReference, CommonUIElement } from '@/lib/enhanced-qa-types';

const keyScreens: VisualScreenReference[] = [
  {
    screenName: 'Dish Detail Page',
    screenshot: '/screenshots/dish-detail-annotated.png',
    annotations: [
      {
        element: 'Dish Name',
        location: 'Top of screen, large bold text',
        whatToCheck: 'Make sure the name matches what you searched for'
      },
      {
        element: 'Price',
        location: 'Below the dish photo',
        whatToCheck: 'Price should be clearly visible in large numbers'
      },
      {
        element: 'Add to Cart Button',
        location: 'Bottom of screen, green button',
        whatToCheck: 'Button should be green and say "Add to Cart" or "Add for $XX.XX"'
      },
      {
        element: 'Customization Options',
        location: 'Middle section with checkboxes',
        whatToCheck: 'Options like "Extra Cheese" or "No Onions" should be tappable'
      },
      {
        element: 'Quantity Selector',
        location: 'Bottom section, shows + and - buttons',
        whatToCheck: 'You should be able to increase or decrease the quantity'
      }
    ]
  },
  {
    screenName: 'Cart Page',
    screenshot: '/screenshots/cart-annotated.png',
    annotations: [
      {
        element: 'Dish List',
        location: 'Main area',
        whatToCheck: 'All dishes you added should appear here'
      },
      {
        element: 'Quantity',
        location: 'Next to each dish, shows a number',
        whatToCheck: 'Should match how many of each dish you added'
      },
      {
        element: 'Total Price',
        location: 'Bottom of screen, large bold text',
        whatToCheck: 'Math should be correct (add up all dish prices)'
      },
      {
        element: 'Checkout Button',
        location: 'Bottom of screen, large button',
        whatToCheck: 'Should be clearly visible and tappable'
      }
    ]
  }
];

const commonUIElements: CommonUIElement[] = [
  {
    element: 'Loading Spinner',
    description: 'A spinning circle animation',
    whenYouSeeIt: 'The app is fetching data from the server',
    howLongItShouldLast: 'Usually 1-3 seconds. If more than 10 seconds, report as slow performance',
    image: '/images/loading-spinner.png'
  },
  {
    element: 'Error Message',
    description: 'A red box with text',
    whenYouSeeIt: 'Something went wrong',
    whatToDo: 'Read the message, take a screenshot, and report the error',
    image: '/images/error-message.png'
  },
  {
    element: 'Success Notification',
    description: 'A green box that appears briefly at the top',
    whenYouSeeIt: 'An action completed successfully',
    howLongItShouldLast: '2-3 seconds, then disappears automatically',
    image: '/images/success-notification.png'
  },
  {
    element: 'Empty State',
    description: 'A screen with an icon and message saying "No items" or "Nothing here"',
    whenYouSeeIt: 'When there\'s no data to show (like an empty cart)',
    whatToDo: 'This is normal if you haven\'t added anything yet',
    image: '/images/empty-state.png'
  }
];

export function VisualGuide() {
  return (
    <div className="space-y-12 lg:space-y-16 bg-gradient-to-br from-purple-500/10 via-[var(--color-bg-primary)] to-pink-500/10 rounded-3xl border-2 border-purple-500/30 p-10 lg:p-16 xl:p-20 shadow-2xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border-2 border-purple-500/30 shadow-xl">
            <Image className="w-8 h-8 lg:w-10 lg:h-10 text-purple-400" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--color-text-primary)]">
            Visual Reference Guide
          </h2>
        </div>
        <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
          Use these visual references to know what you should see on each screen. If something looks different, take a screenshot and report it!
        </p>
      </div>

      {/* Key Screens */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <Monitor className="w-8 h-8 text-purple-400" />
          <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)]">
            Key Screens You'll See
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {keyScreens.map((screen) => (
            <div 
              key={screen.screenName} 
              className="bg-[var(--color-bg-secondary)] rounded-2xl border-2 border-[var(--color-border)] p-8 lg:p-10 shadow-xl"
            >
              <h4 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border-2 border-purple-500/30">
                  <Monitor className="w-5 h-5 text-purple-400" />
                </div>
                {screen.screenName}
              </h4>
              
              {/* Screenshot placeholder */}
              <div className="bg-[var(--color-bg-primary)] rounded-xl border-2 border-[var(--color-border)] p-8 mb-6 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <Image className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4 opacity-50" />
                  <p className="text-base lg:text-lg text-[var(--color-text-muted)]">
                    Screenshot: {screen.screenshot}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-2">
                    (Screenshot will be displayed here)
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-base lg:text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                  What to Check on This Screen:
                </p>
                {screen.annotations.map((annotation, idx) => (
                  <div 
                    key={idx}
                    className="bg-[var(--color-bg-primary)] rounded-xl border-2 border-[var(--color-border)] p-5 shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center border-2 border-purple-500/30 flex-shrink-0">
                        <span className="text-purple-400 font-bold text-sm">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg lg:text-xl font-bold text-[var(--color-text-primary)] mb-2">
                          {annotation.element}
                        </h5>
                        <p className="text-sm lg:text-base text-[var(--color-text-muted)] mb-2">
                          <strong>Location:</strong> {annotation.location}
                        </p>
                        <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                          <strong>Check:</strong> {annotation.whatToCheck}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common UI Elements */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <AlertCircle className="w-8 h-8 text-blue-400" />
          <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)]">
            Common UI Elements You'll See
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {commonUIElements.map((element, idx) => (
            <div 
              key={idx}
              className="bg-[var(--color-bg-secondary)] rounded-2xl border-2 border-[var(--color-border)] p-6 lg:p-8 shadow-xl"
            >
              <div className="flex items-start gap-4 mb-4">
                {element.element === 'Loading Spinner' && (
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin flex-shrink-0" />
                )}
                {element.element === 'Error Message' && (
                  <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
                )}
                {element.element === 'Success Notification' && (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                )}
                {element.element === 'Empty State' && (
                  <AlertCircle className="w-8 h-8 text-amber-400 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h4 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                    {element.element}
                  </h4>
                  <p className="text-base lg:text-lg text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                    {element.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-[var(--color-bg-primary)] rounded-lg p-4 border border-[var(--color-border)]">
                  <p className="text-sm font-semibold text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">
                    When You See It:
                  </p>
                  <p className="text-base text-[var(--color-text-primary)]">
                    {element.whenYouSeeIt}
                  </p>
                </div>
                
                {element.howLongItShouldLast && (
                  <div className="bg-blue-500/10 rounded-lg p-4 border-2 border-blue-500/20">
                    <p className="text-sm font-semibold text-blue-400 mb-1 uppercase tracking-wider">
                      How Long It Should Last:
                    </p>
                    <p className="text-base text-[var(--color-text-primary)]">
                      {element.howLongItShouldLast}
                    </p>
                  </div>
                )}
                
                {element.whatToDo && (
                  <div className="bg-emerald-500/10 rounded-lg p-4 border-2 border-emerald-500/20">
                    <p className="text-sm font-semibold text-emerald-400 mb-1 uppercase tracking-wider">
                      What to Do:
                    </p>
                    <p className="text-base text-[var(--color-text-primary)]">
                      {element.whatToDo}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl border-2 border-amber-500/30 p-8 lg:p-10">
        <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-amber-400" />
          Pro Tip
        </h3>
        <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed">
          If you see something on your screen that doesn't match these descriptions, or if something looks wrong or confusing, 
          <strong className="text-[var(--color-text-primary)]"> take a screenshot and report it!</strong> Even if it's not listed 
          in the test steps, your observations are valuable.
        </p>
      </div>
    </div>
  );
}


