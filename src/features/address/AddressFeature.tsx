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
  Smartphone,
  Folder,
  GitBranch,
  Search,
  Navigation,
  CheckCircle,
  AlertTriangle,
  Zap,
  Globe,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { addressUseCases } from './data/use-cases';
import { addressEdgeCases } from './data/edge-cases';
import { addressTestCases } from './data/test-cases';
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
  name: 'address/',
  type: 'folder' as const,
  children: [
    {
      name: 'view_model/',
      type: 'folder' as const,
      children: [
        { name: 'map_viewmodel.dart', type: 'file' as const, description: 'MobX ViewModel managing map logic, location selection, address saving' },
      ]
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        { name: 'map_model.dart', type: 'file' as const, description: 'Map configuration model with polygons, restrictions, field visibility' },
        { name: 'osm_address_model.dart', type: 'file' as const, description: 'OpenStreetMap address data model' },
        { name: 'osm_location_details_model.dart', type: 'file' as const, description: 'Location details from reverse geocoding' },
        { name: 'search_location_model.dart', type: 'file' as const, description: 'Search result location model' },
      ]
    },
    {
      name: 'service/',
      type: 'folder' as const,
      children: [
        { name: 'map_service.dart', type: 'file' as const, description: 'API service for fetching polygons, location details, search' },
        { name: 'IMapService.dart', type: 'file' as const, description: 'Map service interface' },
      ]
    },
    {
      name: 'widget/',
      type: 'folder' as const,
      children: [
        { name: 'location_search_widget.dart', type: 'file' as const, description: 'Location search input with results list' },
        { name: 'new_address_details_view.dart', type: 'file' as const, description: 'Address details form screen' },
      ]
    },
    {
      name: 'data/',
      type: 'folder' as const,
      children: [
        { name: 'local/address_local_data_source.dart', type: 'file' as const, description: 'Local storage for address data' },
        { name: 'repository/address_repository.dart', type: 'file' as const, description: 'Address data repository (currently commented out)' },
      ]
    },
    {
      name: 'add_address_view.dart',
      type: 'file' as const,
      description: 'Main map screen UI with Google Maps integration',
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/polygons', description: 'Fetch delivery area polygons and map configuration', params: [] },
  { method: 'GET', path: 'https://nominatim.beeorder.com/reverse', description: 'Get address details from coordinates (reverse geocoding)', params: ['lat', 'lon', 'zoom', 'addressdetails'] },
  { method: 'GET', path: 'https://nominatim.beeorder.com/search', description: 'Search for locations by name', params: ['q', 'format', 'limit'] },
  { method: 'PUT', path: '/add-address', description: 'Save new address', params: ['address data (JSON)'] },
  { method: 'POST', path: '/update-address', description: 'Update existing address', params: ['address data (JSON)'] },
  { method: 'POST', path: '/vote-for-address', description: 'Notify for out of delivery area location', params: ['lat', 'lng'] },
];

export function AddressFeature() {
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
              <span className="text-blue-500">Address</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Address Feature
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status="Stable" />
          <ArchitectureBadge type="MVVM" />
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={addressUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={addressEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="address" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={addressTestCases} featureName="Address" />}
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
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-blue-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Address</strong> feature allows customers to add, view, and manage their delivery addresses. 
            Customers use an interactive map to select their exact location, then fill in address details like title, area, street, and building information.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The feature shows <strong className="text-[var(--color-text-primary)]">delivery areas</strong> on the map with colored shapes, helping customers 
            know where delivery is available. Customers can <strong className="text-[var(--color-text-primary)]">search for locations</strong> by name, 
            use their <strong className="text-[var(--color-text-primary)]">current GPS location</strong>, or manually move the map to select an address. 
            The app checks if the selected location is within delivery areas and shows visual feedback with pin colors.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">address auto-fill</strong> from map location, 
            <strong className="text-[var(--color-text-primary)]"> zoom level validation</strong> to ensure accurate location selection, 
            <strong className="text-[var(--color-text-primary)]"> out-of-area notifications</strong> to request delivery expansion, and 
            <strong className="text-[var(--color-text-primary)]"> form validation</strong> to ensure complete address information.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-blue-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All customers who need to add or manage delivery addresses
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Interactive map selection, delivery area visualization, location search, address management
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Profile addresses section, checkout flow, home screen, order placement
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Interactive Map', description: 'Google Maps integration with drag-to-select location', color: 'text-blue-500' },
              { icon: Navigation, title: 'Current Location', description: 'Quick button to move map to GPS location', color: 'text-green-500' },
              { icon: Search, title: 'Location Search', description: 'Search for addresses and places by name', color: 'text-purple-500' },
              { icon: CheckCircle, title: 'Delivery Area Check', description: 'Visual feedback showing delivery availability with colored areas', color: 'text-orange-500' },
              { icon: AlertTriangle, title: 'Out of Area Handling', description: 'Notify option for locations outside delivery zones', color: 'text-red-500' },
              { icon: Zap, title: 'Auto-Fill Address', description: 'Automatic address field filling from map location', color: 'text-pink-500' },
              { icon: Globe, title: 'Zoom Validation', description: 'Requires zoom level 16+ for accurate location selection', color: 'text-teal-500' },
              { icon: Shield, title: 'Form Validation', description: 'Validates all required fields before saving address', color: 'text-indigo-500' },
              { icon: Folder, title: 'Address Management', description: 'Save, view, and manage multiple delivery addresses', color: 'text-yellow-500' },
            ].map((feature, idx) => (
              <div key={idx} className="info-box flex-col">
                <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
                <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">{feature.title}</h4>
                <p className="text-base text-[var(--color-text-secondary)]">{feature.description}</p>
              </div>
            ))}
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
          <CardDescription className="text-base">MVVM architecture with MobX state management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8 border border-[var(--color-border)]">
            <FolderTree data={folderStructure} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ImplementationTab() {
  return (
    <div className="space-y-8">
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-blue-500" />
            </div>
            API Endpoints
          </CardTitle>
          <CardDescription className="text-base">All API endpoints used by the Address feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <span className={cn(
                      'px-2 py-1 rounded text-xs font-mono font-semibold',
                      endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                      endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                      endpoint.method === 'PUT' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-red-500/20 text-red-400'
                    )}>
                      {endpoint.method}
                    </span>
                    <div className="flex-1">
                      <code className="text-[var(--color-primary)] font-mono text-sm">{endpoint.path}</code>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">{endpoint.description}</p>
                      {endpoint.params.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-[var(--color-text-muted)] mb-1">Parameters:</p>
                          <div className="flex flex-wrap gap-1">
                            {endpoint.params.map((param, i) => (
                              <span key={i} className="px-2 py-0.5 bg-[var(--color-bg-primary)] rounded text-xs text-[var(--color-text-secondary)] font-mono border border-[var(--color-border)]">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            Key Implementation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="info-box">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Location Status Detection
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  App checks if selected location is inside delivery polygons, within distance restriction, and compares with user GPS location. 
                  Three statuses: pinAndLocationInArea (blue pin), inPolygonOutOfZone (far from GPS), outOfDeliveryArea (red pin).
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  map_viewmodel.dart:579-617
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Debounced Location Search
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Search uses 500ms debounce timer to avoid excessive API calls. Timer cancels previous search when user types new character. 
                  Search only triggers after user stops typing for 500ms.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  map_viewmodel.dart:488-502
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Zoom Level Validation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  App requires zoom level 16 or higher before allowing location confirmation. This ensures accurate location selection. 
                  Button shows "Zoom in more" when zoom is less than 16, and "Confirm pin location" when zoom is sufficient.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  map_viewmodel.dart:254-261, add_address_view.dart:258-259
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Form Field Validation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Required fields: Title (max 20 chars), Area (max 20 chars), Street (max 30 chars), Details (max 150 chars). 
                  Phone is optional but must be valid format if provided (starts with 0, 10 digits). Validation runs on form submit.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  new_address_details_view.dart:155-296, validators.dart:51-77
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Navigation className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Address Auto-Fill from Location
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  When map camera stops moving, app fetches address details from coordinates using reverse geocoding. 
                  Area and Street fields auto-fill if data is available. Feature can be disabled via mapModel.enableAddressFromLocation.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  map_viewmodel.dart:443-455, add_address_view.dart:113-120
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Out of Delivery Area Notification
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  When location is outside delivery area, button shows "Notify" option. Tapping sends location coordinates to server 
                  for future delivery expansion consideration. Button disables after successful notification to prevent duplicate requests.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  map_viewmodel.dart:416-441, add_address_view.dart:250-253
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-teal-500" />
            </div>
            State Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">MobX Observable State</h4>
              <ul className="list-disc list-inside text-base text-[var(--color-text-secondary)] space-y-2">
                <li><code className="text-[var(--color-primary)]">marker</code> - Pin marker position and icon</li>
                <li><code className="text-[var(--color-primary)]">userLocation</code> - Current GPS location</li>
                <li><code className="text-[var(--color-primary)]">polygons</code> - Delivery area polygons</li>
                <li><code className="text-[var(--color-primary)]">circles</code> - Delivery radius circles</li>
                <li><code className="text-[var(--color-primary)]">mapModel</code> - Map configuration (restrictions, field visibility)</li>
                <li><code className="text-[var(--color-primary)]">osmLocationDetails</code> - Address details from reverse geocoding</li>
                <li><code className="text-[var(--color-primary)]">searchLocations</code> - Search results list</li>
                <li><code className="text-[var(--color-primary)]">allowedZoom</code> - Whether zoom level is sufficient</li>
                <li><code className="text-[var(--color-primary)]">showInfoWindow</code> - Whether to show status message above pin</li>
                <li><code className="text-[var(--color-primary)]">locationLoading</code> - Loading state for location fetch</li>
                <li><code className="text-[var(--color-primary)]">newAddressLoading</code> - Loading state for address save</li>
                <li><code className="text-[var(--color-primary)]">polygonsLoading</code> - Loading state for polygons fetch</li>
                <li><code className="text-[var(--color-primary)]">isSearching</code> - Loading state for search</li>
                <li><code className="text-[var(--color-primary)]">voteButtonEnabled</code> - Whether notify button is enabled</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">Text Controllers</h4>
              <ul className="list-disc list-inside text-base text-[var(--color-text-secondary)] space-y-2">
                <li><code className="text-[var(--color-primary)]">titleController</code> - Address title input</li>
                <li><code className="text-[var(--color-primary)]">areaController</code> - Area name input</li>
                <li><code className="text-[var(--color-primary)]">streetController</code> - Street name input</li>
                <li><code className="text-[var(--color-primary)]">detailsController</code> - Address details input</li>
                <li><code className="text-[var(--color-primary)]">phoneController</code> - Phone number input</li>
                <li><code className="text-[var(--color-primary)]">searchController</code> - Location search input</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">Key Actions</h4>
              <ul className="list-disc list-inside text-base text-[var(--color-text-secondary)] space-y-2">
                <li><code className="text-[var(--color-primary)]">getUserLocation()</code> - Gets current GPS location and centers map</li>
                <li><code className="text-[var(--color-primary)]">changeMarkerPosition()</code> - Updates pin position and checks location status</li>
                <li><code className="text-[var(--color-primary)]">getLocationStatus()</code> - Determines if location is in delivery area</li>
                <li><code className="text-[var(--color-primary)]">getAddressFromLocation()</code> - Fetches address details from coordinates</li>
                <li><code className="text-[var(--color-primary)]">performSearch()</code> - Debounced location search</li>
                <li><code className="text-[var(--color-primary)]">newAddress()</code> - Saves new address to server</li>
                <li><code className="text-[var(--color-primary)]">updateAddress()</code> - Updates existing address</li>
                <li><code className="text-[var(--color-primary)]">voteForAddress()</code> - Sends notification for out-of-area location</li>
                <li><code className="text-[var(--color-primary)]">checkZoomStatus()</code> - Validates zoom level</li>
                <li><code className="text-[var(--color-primary)]">fetchPolygons()</code> - Loads delivery area boundaries</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


