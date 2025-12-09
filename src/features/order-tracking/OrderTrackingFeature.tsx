import { useState } from 'react';
import {
  MapPin,
  Users,
  Shield,
  Workflow,
  Settings,
  Code2,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { orderTrackingUseCases } from './data/use-cases';
import { orderTrackingEdgeCases } from './data/edge-cases';
import { orderTrackingTestCases } from './data/test-cases';
import { cn } from '@/lib/utils';

type TabId = 'overview' | 'use-cases' | 'edge-cases' | 'flow-diagrams' | 'qa-tests' | 'implementation';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: Layers },
  { id: 'use-cases', label: 'Use Cases', icon: Users },
  { id: 'edge-cases', label: 'Edge Cases', icon: Shield },
  { id: 'flow-diagrams', label: 'Flow Diagrams', icon: Workflow },
  { id: 'qa-tests', label: 'QA Tests', icon: Settings },
  { id: 'implementation', label: 'Implementation', icon: Code2 },
];

const folderStructure = {
  name: 'order_tracking/',
  type: 'folder' as const,
  children: [
    {
      name: 'components/',
      type: 'folder' as const,
      children: [
        { name: 'order_tracking_screen.dart', type: 'file' as const, description: 'Main tracking screen UI' },
        { name: 'order_tracking_map.dart', type: 'file' as const, description: 'Google Maps widget with markers and route' },
        { name: 'order_tracking_bottom_sheet.dart', type: 'file' as const, description: 'Draggable bottom sheet with order info' },
        { name: 'order_status_section.dart', type: 'file' as const, description: 'Order status progress indicator' },
        { name: 'order_status_widget.dart', type: 'file' as const, description: 'Status widget with lottie animation' },
        { name: 'driver_info_section.dart', type: 'file' as const, description: 'Driver information with call button' },
        { name: 'delivery_address_section.dart', type: 'file' as const, description: 'Delivery address with change button' },
        { name: 'expected_time_section.dart', type: 'file' as const, description: 'Expected delivery time banner' },
        { name: 'total_price_section.dart', type: 'file' as const, description: 'Order total price display' },
        { name: 'delete_order_button.dart', type: 'file' as const, description: 'Delete order button' },
        { name: 'order_ended_overlay.dart', type: 'file' as const, description: 'Full-screen completion overlay' },
        { name: 'order_traking_appbar.dart', type: 'file' as const, description: 'App bar with back button' },
        { name: 'floating_tracking_button.dart', type: 'file' as const, description: 'Floating action button wrapper' },
        { name: 'order_logs_viewer.dart', type: 'file' as const, description: 'Debug logs viewer (dev only)' },
      ]
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        { name: 'order_tracking_resources.dart', type: 'file' as const, description: 'Combined order info and tracking data' },
        { name: 'map_config_resources.dart', type: 'file' as const, description: 'Map configuration data (markers, polylines, camera)' },
      ]
    },
    {
      name: 'state/',
      type: 'folder' as const,
      children: [
        { name: 'order_tracking_state.dart', type: 'file' as const, description: 'BLoC state for tracking screen' },
      ]
    },
    {
      name: 'order_tracking_viewmodel.dart',
      type: 'file' as const,
      description: 'BLoC ViewModel managing order tracking logic, WebSocket connections, and map updates',
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/user/orders/{orderId}', description: 'Fetch order details', params: ['orderId'] },
  { method: 'GET', path: '/user/orders/{orderId}/tracking', description: 'Fetch order tracking steps', params: ['orderId'] },
  { method: 'POST', path: '/user/orders/{billId}/update-address', description: 'Update order delivery address', params: ['billId', 'addressId'] },
];

export function OrderTrackingFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-500">Order Tracking</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Order Tracking Feature
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status="Stable" />
          <ArchitectureBadge type="BLoC" />
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
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'
                )}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Overview</CardTitle>
                <CardDescription>
                  Real-time order tracking with map visualization, driver location, and status updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">What This Feature Does</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    The Order Tracking feature allows customers to track their orders in real-time. It displays order status progress, 
                    shows the delivery route on a map, tracks driver location when order is out for delivery, and provides options 
                    to change delivery address or contact the driver. The feature uses WebSocket connections for real-time status 
                    updates and Socket.IO for driver location tracking.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Key Capabilities</h3>
                  <ul className="list-disc list-inside space-y-1 text-[var(--color-text-secondary)]">
                    <li>Real-time order status updates via WebSocket</li>
                    <li>Interactive map showing restaurant, customer, and driver locations</li>
                    <li>Route visualization between restaurant and delivery address</li>
                    <li>Driver location tracking with real-time updates</li>
                    <li>Order status progress indicator with visual steps</li>
                    <li>Change delivery address (when allowed)</li>
                    <li>Call driver directly from tracking screen</li>
                    <li>Order completion overlay with animation</li>
                    <li>Delete order option (when allowed)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Architecture</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    This feature uses <strong>BLoC (Business Logic Component)</strong> architecture pattern. The ViewModel 
                    (Cubit) manages state, WebSocket connections, and map updates. The UI is built with Flutter widgets, 
                    including Google Maps for map visualization and draggable bottom sheets for order information display.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Technical Highlights</h3>
                  <ul className="list-disc list-inside space-y-1 text-[var(--color-text-secondary)]">
                    <li>WebSocket integration for real-time order status updates</li>
                    <li>Socket.IO integration for driver location tracking</li>
                    <li>Google Maps Flutter plugin for map visualization</li>
                    <li>Route service integration for delivery route calculation</li>
                    <li>Draggable bottom sheet for order information</li>
                    <li>Lottie animations for status indicators</li>
                    <li>Automatic reconnection handling for WebSocket connections</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Folder Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <FolderTree data={folderStructure} />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'use-cases' && (
          <UseCaseSection useCases={orderTrackingUseCases} />
        )}

        {activeTab === 'edge-cases' && (
          <EdgeCaseSection edgeCases={orderTrackingEdgeCases} />
        )}

        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="order-tracking" />}

        {activeTab === 'qa-tests' && (
          <QATestingGuide
            featureName="Order Tracking"
            testCases={orderTrackingTestCases}
          />
        )}

        {activeTab === 'implementation' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>
                  REST API endpoints used by the Order Tracking feature
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                          'px-2 py-1 rounded text-xs font-mono font-semibold',
                          endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                        )}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm text-[var(--color-text-primary)]">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-2">{endpoint.description}</p>
                      {endpoint.params && endpoint.params.length > 0 && (
                        <div className="text-xs text-[var(--color-text-muted)]">
                          <strong>Parameters:</strong> {endpoint.params.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Files</CardTitle>
                <CardDescription>
                  Important files in the Order Tracking feature
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">ViewModel</h4>
                    <code className="text-sm text-[var(--color-text-secondary)]">order_tracking_viewmodel.dart</code>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                      BLoC ViewModel managing order tracking logic, WebSocket connections, map updates, and state management.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">State</h4>
                    <code className="text-sm text-[var(--color-text-secondary)]">state/order_tracking_state.dart</code>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                      BLoC state class with AsyncState for data fetching and SocketState for WebSocket connections.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Screen</h4>
                    <code className="text-sm text-[var(--color-text-secondary)]">order_tracking_screen.dart</code>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                      Main screen widget orchestrating map, bottom sheet, and overlay components.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Map Widget</h4>
                    <code className="text-sm text-[var(--color-text-secondary)]">components/order_tracking_map.dart</code>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                      Google Maps widget displaying restaurant, customer, and driver markers with route polylines.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>WebSocket Integration</CardTitle>
                <CardDescription>
                  Real-time communication setup for order tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Order Status WebSocket</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Uses OrderStatusSocketManager to receive real-time order status updates. Connects when order tracking 
                      screen opens and disconnects when screen closes. Automatically reconnects on connection loss.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Driver Location Socket.IO</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Uses DriverLocationSocketManager to receive driver location updates via Socket.IO. Connects when 
                      order reaches delivery stage and driver is assigned. Updates driver marker on map in real-time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

