import { useState } from 'react';
import { 
  UtensilsCrossed, 
  Folder, 
  GitBranch, 
  Code2, 
  ShoppingCart, 
  Heart, 
  Share2,
  Settings,
  Database,
  Globe,
  Layers,
  ChevronRight,
  Users,
  Shield,
  Smartphone,
  Zap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, StatCard } from '@/components/Card';
import { Accordion, AccordionItem } from '@/components/Accordion';
import { Badge, ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { dishUseCases } from './data/use-cases';
import { dishEdgeCases } from './data/edge-cases';
import { dishTestCases } from './data/test-cases';
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
  name: 'dish/',
  type: 'folder' as const,
  children: [
    {
      name: 'params/',
      type: 'folder' as const,
      children: [
        { name: 'dish_page_params.dart', type: 'file' as const, description: 'Navigation parameters' },
      ],
    },
    {
      name: 'services/',
      type: 'folder' as const,
      children: [
        { name: 'IDishService.dart', type: 'file' as const, description: 'Service interface' },
        { name: 'dish_service.dart', type: 'file' as const, description: 'API implementation' },
      ],
    },
    {
      name: 'view/',
      type: 'folder' as const,
      children: [
        { name: 'dish_page_view.dart', type: 'file' as const, description: 'Main screen' },
      ],
    },
    {
      name: 'viewmodel/',
      type: 'folder' as const,
      children: [
        { name: 'dish_page_viewmodel.dart', type: 'file' as const, description: 'Business logic' },
        { name: 'dish_page_viewmodel.g.dart', type: 'file' as const, description: 'Generated code' },
      ],
    },
    {
      name: 'widget/',
      type: 'folder' as const,
      children: [
        { name: 'add_cart_buttom.dart', type: 'file' as const, description: 'Add to cart button' },
        { name: 'cover_dish_widget.dart', type: 'file' as const, description: 'Hero image' },
        { name: 'dish_bottom_sheet.dart', type: 'file' as const, description: 'Bottom sheet' },
        { name: 'dish_note_widget.dart', type: 'file' as const, description: 'Notes input' },
        { name: 'dish_page_appbar.dart', type: 'file' as const, description: 'App bar' },
        { name: 'extra_note_widget.dart', type: 'file' as const, description: 'Notes container' },
        { name: 'options_dish_widget.dart', type: 'file' as const, description: 'Options (radio)' },
        { name: 'price_point_container.dart', type: 'file' as const, description: 'Price display' },
        { name: 'quantity_icon_widget.dart', type: 'file' as const, description: '+/- buttons' },
        { name: 'quantity_selector_widget.dart', type: 'file' as const, description: 'Qty selector' },
        { name: 'title_descrption_text.dart', type: 'file' as const, description: 'Title & desc' },
        { name: 'topping_widget.dart', type: 'file' as const, description: 'Toppings (multi)' },
      ],
    },
  ],
};

export function DishFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] p-10 lg:p-16 xl:p-20 shadow-xl">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6bTEwIDEwdjZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 rounded-3xl" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        
        <div className="relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-4 text-base lg:text-lg text-[var(--color-text-muted)] mb-12 lg:mb-16 animate-fade-in font-medium">
            <span className="hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer">Features</span>
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            <span className="text-[var(--color-primary)] font-semibold">Dish</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16 lg:gap-20">
            {/* Title and Description */}
            <div className="flex-1 animate-fade-in">
              <div className="flex items-center gap-8 mb-10 lg:mb-12">
                <div className="icon-container w-20 h-20 lg:w-24 lg:h-24 rounded-2xl shadow-2xl">
                  <UtensilsCrossed className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--color-text-primary)] mb-4">
                    Dish Feature
                  </h1>
                  <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
                    <StatusBadge status="Stable" />
                    <ArchitectureBadge type="MVVM" />
                    <Badge variant="outline">MobX State</Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mb-12 lg:mb-16 text-center lg:text-left">
                The Dish feature allows users to view detailed information about a menu item, 
                customize it with options and toppings, adjust quantity, add special notes, 
                and add the configured item to their shopping cart.
              </p>

              {/* Key Features */}
              <div className="flex flex-wrap gap-4 lg:gap-6">
                {[
                  { icon: ShoppingCart, label: 'Add to Cart' },
                  { icon: Settings, label: 'Options & Toppings' },
                  { icon: Heart, label: 'Favorites' },
                  { icon: Share2, label: 'Share' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="feature-tag">
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8 lg:w-80 animate-fade-in stagger-2">
              <StatCard value={dishUseCases.length} label="Use Cases" />
              <StatCard value={dishEdgeCases.length} label="Edge Cases" />
              <StatCard value={dishTestCases.length} label="Test Cases" />
              <StatCard value={17} label="Source Files" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-20 z-10 glass rounded-2xl border-2 border-[var(--color-border)] p-6 lg:p-8 shadow-xl">
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
      <div className="bg-[var(--color-bg-secondary)] rounded-3xl border-2 border-[var(--color-border)] p-10 lg:p-16 xl:p-20 shadow-xl">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'use-cases' && <UseCaseSection useCases={dishUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={dishEdgeCases} />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={dishTestCases} featureName="dish" />}
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
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            When a customer wants to order a specific food item, they tap on it from the restaurant menu 
            or home feed. This opens the <strong className="text-[var(--color-text-primary)]">Dish Page</strong> where 
            they can see a beautiful photo of the food, its name, description, and price.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Before adding to cart, customers can customize their order: choose a size (small, medium, large), 
            add extra toppings (cheese, bacon), set how many they want, and even write special instructions 
            like "no onions please." The app shows the updated total price as they make selections.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            They can also save the dish as a favorite for quick reordering later, or share it with friends 
            via a link that opens directly to this dish.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-emerald-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                End customers ordering food from restaurants
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Easy customization and clear pricing before ordering
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Menu, Home Feed, Cart Edit, Deep Links
              </p>
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
          <CardDescription className="text-base">MVVM architecture with 17 source files</CardDescription>
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
                title: 'Features',
                items: ['cart (MyCartViewModel)', 'home_feed (DishModel)', 'menu_restaurant (Options)', 'report_issue'],
              },
              {
                title: 'Core Services',
                items: ['HttpManager', 'NavigationService', 'SettingManager', 'DeepLinkManager', 'AnalyticsManager'],
              },
              {
                title: 'Libraries',
                items: ['flutter_mobx', 'get (GetX)', 'flutter_screenutil', 'share_plus', 'widget_zoom'],
              },
            ].map((group) => (
              <div key={group.title} className="info-box flex-col">
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">{group.title}</h4>
                <ul className="space-y-4">
                  {group.items.map(dep => (
                    <li key={dep} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                      <ChevronRight className="w-4 h-4 text-[var(--color-primary)]" />
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
                path: '/dish-detail',
                description: 'Fetch complete dish details with options and toppings',
                params: ['dish_id: int'],
              },
              {
                method: 'GET',
                path: '/dishes-list',
                description: 'Fetch multiple dishes by IDs',
                params: ['dishes_ids: int[]'],
              },
              {
                method: 'POST',
                path: '/fav-dish-update',
                description: 'Toggle dish favorite status',
                params: ['dish_id: int', 'restaurant_id: int', 'status: boolean'],
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
                  <code className="text-xl text-[var(--color-primary)] font-mono">{endpoint.path}</code>
                </div>
                <p className="text-base text-[var(--color-text-secondary)] mb-5">{endpoint.description}</p>
                <div className="flex flex-wrap gap-3">
                  {endpoint.params.map(param => (
                    <code key={param} className="text-sm bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                      {param}
                    </code>
                  ))}
                </div>
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
                name: 'DishModel',
                file: 'home_feed/model/dish_model.dart',
                fields: ['id', 'name', 'description', 'price', 'oldPrice', 'imagePath', 'restaurantId', 'options', 'toppings', 'points', 'favoriteDish'],
              },
              {
                name: 'OptionModel',
                file: 'menu_restaurant/model/option_model.dart',
                fields: ['name', 'opts: OptModel[]'],
              },
              {
                name: 'OptModel',
                file: 'menu_restaurant/model/opt_model.dart',
                fields: ['id', 'name', 'price', 'isDefault', 'points'],
              },
              {
                name: 'ToppingModel',
                file: 'menu_restaurant/model/topping_model.dart',
                fields: ['id', 'name', 'price', 'groupId', 'groupName', 'selectMin', 'selectLimit', 'points'],
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
              <span className="font-semibold text-xl">ViewModel Methods</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: 'initDish()', desc: 'Initialize dish with options and toppings' },
              { name: 'calculatePrice()', desc: 'Recalculate total price' },
              { name: 'incrementQuantity()', desc: 'Increase quantity by 1' },
              { name: 'decrementQuantity()', desc: 'Decrease quantity (min 1)' },
              { name: 'addTopping()', desc: 'Add topping to selection' },
              { name: 'removeTopping()', desc: 'Remove topping from selection' },
              { name: 'changeOption()', desc: 'Select an option choice' },
              { name: 'changeNote()', desc: 'Update special notes' },
              { name: 'updateFavouriteStatus()', desc: 'Toggle favorite status' },
              { name: 'scrollToSpecificOption()', desc: 'Auto-scroll to unselected option' },
            ].map((method, idx) => (
              <div key={idx} className="flex items-start gap-5 bg-[var(--color-bg-tertiary)] rounded-xl p-5 border border-[var(--color-border)]">
                <code className="text-sm text-[var(--color-primary)] font-mono bg-[var(--color-bg-primary)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                  {method.name}
                </code>
                <span className="text-base text-[var(--color-text-secondary)]">{method.desc}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Accessibility & Performance */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-500" />
              </div>
              <span className="font-semibold text-xl">Accessibility & Performance</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="info-box flex-col success">
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">Accessibility Features</h4>
              <ul className="space-y-4">
                {[
                  { icon: '✅', text: 'RTL Support (Arabic layout)' },
                  { icon: '✅', text: 'Color Contrast WCAG AA' },
                  { icon: '✅', text: 'Respects system font size' },
                  { icon: '✅', text: '44px touch targets' },
                  { icon: '⚠️', text: 'Basic screen reader support' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                    <span className="text-lg">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="info-box flex-col warning">
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">Performance Notes</h4>
              <ul className="space-y-4">
                {[
                  { icon: '✅', text: 'MobX limits widget rebuilds' },
                  { icon: '✅', text: 'Image caching enabled' },
                  { icon: '✅', text: 'Lazy loading (withData flag)' },
                  { icon: '⚠️', text: 'Large images may pressure memory' },
                  { icon: '⚠️', text: 'Many options may cause rebuilds' },
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
