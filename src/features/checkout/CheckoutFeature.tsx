import { useState } from 'react';
import { 
  ShoppingCart, 
  Folder, 
  GitBranch, 
  Code2, 
  Settings,
  Database,
  Globe,
  Layers,
  Users,
  Shield,
  Zap,
  CreditCard,
  Gift,
  Clock,
  MapPin,
  Receipt,
  Ticket,
  ChevronRight,
  Smartphone,
  Workflow
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { Accordion, AccordionItem } from '@/components/Accordion';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { checkoutUseCases } from './data/use-cases';
import { checkoutEdgeCases } from './data/edge-cases';
import { checkoutTestCases } from './data/test-cases';
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
  name: 'checkout/',
  type: 'folder' as const,
  children: [
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        { name: 'active_vouchers_model.dart', type: 'file' as const, description: 'Available vouchers' },
        { name: 'bill_calc_model.dart', type: 'file' as const, description: 'Bill calculation result' },
        { name: 'bill_data_raw_model.dart', type: 'file' as const, description: 'Bill row items' },
        { name: 'checkout_params.dart', type: 'file' as const, description: 'Checkout screen params' },
        { name: 'checkout_response.dart', type: 'file' as const, description: 'Order creation response' },
        { name: 'delivery_fee_options.dart', type: 'file' as const, description: 'Delivery fee choices' },
        { name: 'delivery_type_model.dart', type: 'file' as const, description: 'Delivery type options' },
        { name: 'gift_order_model.dart', type: 'file' as const, description: 'Gift order data' },
        { name: 'info_icon.dart', type: 'file' as const, description: 'Info tooltip data' },
        { name: 'multi_order_check_response.dart', type: 'file' as const, description: 'Active orders check' },
        { name: 'order_banks.dart', type: 'file' as const, description: 'Payment methods' },
        { name: 'restaurant_voucher.dart', type: 'file' as const, description: 'Auto-apply voucher' },
        { name: 'tips_model.dart', type: 'file' as const, description: 'Driver tips options' },
        { name: 'voucher_validate_response.dart', type: 'file' as const, description: 'Voucher validation' },
      ],
    },
    {
      name: 'service/',
      type: 'folder' as const,
      children: [
        { name: 'ICheckoutService.dart', type: 'file' as const, description: 'Service interface' },
        { name: 'checkout_service.dart', type: 'file' as const, description: 'API implementation' },
      ],
    },
    {
      name: 'view/',
      type: 'folder' as const,
      children: [
        { name: 'checkout_view.dart', type: 'file' as const, description: 'Main checkout screen' },
      ],
    },
    {
      name: 'viewmodel/',
      type: 'folder' as const,
      children: [
        { name: 'checkout_controller.dart', type: 'file' as const, description: 'GetX controller' },
        { name: 'checkout_viewmodel.dart', type: 'file' as const, description: 'Main business logic' },
        { name: 'checkout_viewmodel.g.dart', type: 'file' as const, description: 'Generated MobX' },
      ],
    },
    {
      name: 'widget/',
      type: 'folder' as const,
      children: [
        { name: 'app_bar_bottom_sheet.dart', type: 'file' as const, description: 'App bar extension' },
        { name: 'checkout_body_widget.dart', type: 'file' as const, description: 'Main body layout' },
        { name: 'delivery_fee_selector_widget.dart', type: 'file' as const, description: 'Fee selection' },
        { name: 'delivery_type_selector_widget.dart', type: 'file' as const, description: 'Type selection' },
        { name: 'warning_message_bottom_sheet.dart', type: 'file' as const, description: 'Warning display' },
        {
          name: 'address_checkout_widget/',
          type: 'folder' as const,
          children: [
            { name: 'address_checkout_widget.dart', type: 'file' as const, description: 'Address display' },
            { name: 'address_text.dart', type: 'file' as const, description: 'Address text format' },
          ],
        },
        {
          name: 'bill_details/',
          type: 'folder' as const,
          children: [
            { name: 'bill_data_row_widget.dart', type: 'file' as const, description: 'Bill row item' },
            { name: 'order_price_widget.dart', type: 'file' as const, description: 'Price breakdown' },
            { name: 'point_row_widget.dart', type: 'file' as const, description: 'Points display' },
            { name: 'price_row_widget.dart', type: 'file' as const, description: 'Price row' },
            { name: 'tips_selector_widget.dart', type: 'file' as const, description: 'Tips selection' },
          ],
        },
        {
          name: 'delivery_instruction/',
          type: 'folder' as const,
          children: [
            { name: 'add_delivery_instructions_bottom_sheet.dart', type: 'file' as const, description: 'Instructions entry' },
            { name: 'delivery_instruction_card_widget.dart', type: 'file' as const, description: 'Instructions display' },
          ],
        },
        {
          name: 'delivery_time_widgets/',
          type: 'folder' as const,
          children: [
            { name: 'box_select_widget.dart', type: 'file' as const, description: 'Selection box' },
            { name: 'delivery_time_widget.dart', type: 'file' as const, description: 'Time selection' },
          ],
        },
        {
          name: 'gift_order/',
          type: 'folder' as const,
          children: [
            { name: 'gift_toggle_widget.dart', type: 'file' as const, description: 'Gift order form' },
          ],
        },
        {
          name: 'loading_widgets/',
          type: 'folder' as const,
          children: [
            { name: 'bill_details_shimmer.dart', type: 'file' as const, description: 'Bill loading' },
            { name: 'delivery_time_shimmer.dart', type: 'file' as const, description: 'Time loading' },
            { name: 'payment_method_shimmer.dart', type: 'file' as const, description: 'Payment loading' },
          ],
        },
        {
          name: 'order_summary/',
          type: 'folder' as const,
          children: [
            { name: 'order_summary_bottom_sheet.dart', type: 'file' as const, description: 'Summary display' },
            { name: 'order_summary_data.dart', type: 'file' as const, description: 'Summary data model' },
          ],
        },
        {
          name: 'payments_widget/',
          type: 'folder' as const,
          children: [
            { name: 'epayment_page.dart', type: 'file' as const, description: 'Payment gateway' },
            { name: 'online_payment_success_widget.dart', type: 'file' as const, description: 'Success screen' },
            { name: 'payment_method_selector_widget.dart', type: 'file' as const, description: 'Method selection' },
            { name: 'payment_success.dart', type: 'file' as const, description: 'Success handling' },
          ],
        },
        {
          name: 'pickup_widgets/',
          type: 'folder' as const,
          children: [
            { name: 'pickup_warning_widget.dart', type: 'file' as const, description: 'Pickup info' },
            { name: 'restaurant_map_widget.dart', type: 'file' as const, description: 'Pickup location map' },
          ],
        },
        {
          name: 'voucher_apply/',
          type: 'folder' as const,
          children: [
            { name: 'apply_voucher_bottom_sheet.dart', type: 'file' as const, description: 'Voucher entry' },
            { name: 'show_add_voucher_dialog_body.dart', type: 'file' as const, description: 'Voucher dialog' },
            { name: 'tier_info_widget.dart', type: 'file' as const, description: 'Loyalty tier' },
            { name: 'voucher_body_card_widget.dart', type: 'file' as const, description: 'Voucher card' },
            { name: 'voucher_bottom_sheet.dart', type: 'file' as const, description: 'Voucher list' },
            { name: 'voucher_card_widget.dart', type: 'file' as const, description: 'Individual voucher' },
            { name: 'voucher_group_list_widget.dart', type: 'file' as const, description: 'Voucher group' },
            { name: 'voucher_info_row.dart', type: 'file' as const, description: 'Voucher details' },
          ],
        },
        {
          name: 'confirmation_widgets/',
          type: 'folder' as const,
          children: [
            { name: 'confirmation_timer_bottom_sheet.dart', type: 'file' as const, description: 'Confirm with timer' },
          ],
        },
      ],
    },
  ],
};

const apiEndpoints = [
  { method: 'GET', path: '/calc-order', description: 'Calculate order bill with delivery, tax, tips, and discounts', params: ['restaurant_id', 'lat', 'lng', 'bill_total', 'e_payment', 'e_tips', 'voucher', 'bank_id'] },
  { method: 'POST', path: '/create-order', description: 'Submit order to restaurant', params: ['lat', 'lng', 'address_id', 'e_payment', 'bank_id', 'voucher_code', 'note', 'time_type'] },
  { method: 'GET', path: '/validate-voucher', description: 'Check if voucher code is valid for restaurant', params: ['voucher', 'restaurant_id'] },
  { method: 'GET', path: '/order-banks', description: 'Get available payment methods', params: ['currency', 'isVending'] },
  { method: 'GET', path: '/order-tips', description: 'Get tip amount options', params: ['bank_id'] },
  { method: 'GET', path: '/order-notes', description: 'Get delivery instruction options', params: ['market'] },
  { method: 'GET', path: '/delivery-fee-options', description: 'Get delivery fee tiers', params: ['restaurant_id', 'bill_total'] },
  { method: 'GET', path: '/fetch-info-icon', description: 'Get bill explanation tooltips', params: [] },
  { method: 'GET', path: '/check-current-orders', description: 'Check for active orders', params: [] },
  { method: 'POST', path: '/ticketing/create-reservation', description: 'Create ticket/reservation order', params: ['lat', 'lng', 'uuid', 'e_payment', 'bank_id'] },
];

export function CheckoutFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-emerald-500">Checkout</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Checkout Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={checkoutUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={checkoutEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="checkout" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={checkoutTestCases} featureName="checkout" />}
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
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-emerald-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            When a customer has added items to their cart and is ready to order, they come to the 
            <strong className="text-[var(--color-text-primary)]"> Checkout</strong> screen. This is 
            where they review their order, choose how to pay, add tips for the driver, and confirm 
            everything is correct before placing their order.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The checkout shows a complete breakdown of the bill including subtotal, delivery fees, 
            taxes, and any discounts from vouchers. Customers can choose between cash on delivery 
            or online payment methods, and for online payments, they can add optional tips for the driver.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include scheduling orders for later, sending orders as gifts to someone 
            else, applying voucher codes for discounts, and adding delivery instructions like 
            "Leave at door" or "Call when arriving".
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-emerald-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Customers ready to complete their food order
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Secure payment, vouchers, tips, gift orders, scheduling
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Cart screen "Proceed to Checkout" button
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Receipt, title: 'Bill Calculation', description: 'Real-time calculation of subtotal, delivery, tax, tips, and discounts', color: 'text-emerald-500' },
              { icon: CreditCard, title: 'Multiple Payment Methods', description: 'Cash on delivery and various online payment options', color: 'text-blue-500' },
              { icon: Ticket, title: 'Voucher Support', description: 'Apply promo codes with instant validation and discount', color: 'text-purple-500' },
              { icon: Gift, title: 'Gift Orders', description: 'Send food as a gift with recipient details', color: 'text-pink-500' },
              { icon: Clock, title: 'Scheduled Orders', description: 'Choose ASAP or schedule for a specific time', color: 'text-amber-500' },
              { icon: MapPin, title: 'Address Management', description: 'Select delivery address or view pickup location', color: 'text-red-500' },
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
          <CardDescription className="text-base">MVVM architecture with 45+ source files</CardDescription>
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
                items: ['cart (MyCartViewModel)', 'profile/my_address', 'restaurant_list', 'home_feed/loyalty', 'home_feed/voucher_list', 'helpers/survey', 'helpers/tutorials'],
              },
              {
                title: 'Core Services',
                items: ['HttpManager', 'NavigationService', 'UserManager', 'SettingManager', 'AnalyticsManager', 'NotificationManager', 'LocaleManager'],
              },
              {
                title: 'Libraries',
                items: ['flutter_mobx', 'get (GetX)', 'confetti', 'geolocator', 'google_maps_flutter', 'tutorial_coach_mark', 'firebase_messaging'],
              },
            ].map((group) => (
              <div key={group.title} className="info-box flex-col">
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">{group.title}</h4>
                <ul className="space-y-4">
                  {group.items.map(dep => (
                    <li key={dep} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                      <ChevronRight className="w-4 h-4 text-emerald-500" />
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
            {apiEndpoints.map((endpoint, idx) => (
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
                  <code className="text-xl text-emerald-400 font-mono">{endpoint.path}</code>
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
                name: 'BillCalcModel',
                file: 'checkout/model/bill_calc_model.dart',
                fields: ['subTotal', 'netTotal', 'tax', 'eTips', 'delivery', 'discount', 'warningMessage', 'deliveryTypes[]'],
              },
              {
                name: 'CheckoutResponse',
                file: 'checkout/model/checkout_response.dart',
                fields: ['success', 'checkoutLink', 'billId'],
              },
              {
                name: 'GiftOrderModel',
                file: 'checkout/model/gift_order_model.dart',
                fields: ['isGiftOrder', 'recipientName', 'recipientPhone', 'deliveryAddress'],
              },
              {
                name: 'OrderBank',
                file: 'checkout/model/order_banks.dart',
                fields: ['id', 'name', 'image', 'active'],
              },
              {
                name: 'TipsModel',
                file: 'checkout/model/tips_model.dart',
                fields: ['value', 'display'],
              },
              {
                name: 'VoucherValidateResponse',
                file: 'checkout/model/voucher_validate_response.dart',
                fields: ['success', 'message'],
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
              { name: 'calcBill()', desc: 'Calculate total with all components' },
              { name: 'createOrder()', desc: 'Submit order to server' },
              { name: 'createTicket()', desc: 'Create ticketing/reservation' },
              { name: 'validateVoucher()', desc: 'Check voucher validity' },
              { name: 'validateCodeVoucher()', desc: 'Validate typed voucher code' },
              { name: 'changeSelectedPayment()', desc: 'Switch payment method' },
              { name: 'changeSelectedTip()', desc: 'Update tip amount' },
              { name: 'changeSelectedDeliveryFee()', desc: 'Change delivery fee option' },
              { name: 'toggleGiftOrder()', desc: 'Enable/disable gift mode' },
              { name: 'fetchBanks()', desc: 'Load payment methods' },
              { name: 'fetchTips()', desc: 'Load tip options' },
              { name: 'showOrderConfirmation()', desc: 'Display order summary' },
              { name: 'checkForCurrentOrders()', desc: 'Check active orders' },
              { name: 'showConfirmationMessage()', desc: 'Address distance warning' },
            ].map((method, idx) => (
              <div key={idx} className="flex items-start gap-5 bg-[var(--color-bg-tertiary)] rounded-xl p-5 border border-[var(--color-border)]">
                <code className="text-sm text-emerald-400 font-mono bg-[var(--color-bg-primary)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                  {method.name}
                </code>
                <span className="text-base text-[var(--color-text-secondary)]">{method.desc}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Checkout Flow */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Layers className="w-6 h-6 text-amber-500" />
              </div>
              <span className="font-semibold text-xl">Checkout Flow</span>
            </div>
          }
        >
          <div className="space-y-4">
            {[
              { step: 1, title: 'Initialize', desc: 'Load payment methods, vouchers, tips, delivery options' },
              { step: 2, title: 'Calculate Bill', desc: 'API call with all parameters to get price breakdown' },
              { step: 3, title: 'User Selections', desc: 'Payment method, tips, voucher, delivery time, gift info' },
              { step: 4, title: 'Send Order Tap', desc: 'Validate all fields, check for active orders' },
              { step: 5, title: 'Show Warnings', desc: 'Display bill warning or far address warning if needed' },
              { step: 6, title: 'Order Summary', desc: 'Show confirmation bottom sheet with all details' },
              { step: 7, title: 'Create Order', desc: 'API call to submit order' },
              { step: 8, title: 'Payment', desc: 'Cash: Show success. Online: Open payment gateway' },
              { step: 9, title: 'Complete', desc: 'Clear cart, navigate to order tracking' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-[var(--color-bg-tertiary)] rounded-xl p-5 border border-[var(--color-border)]">
                <span className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">{item.title}</h4>
                  <p className="text-base text-[var(--color-text-secondary)]">{item.desc}</p>
                </div>
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
                  { icon: '✅', text: 'Large touch targets (44px+)' },
                  { icon: '✅', text: 'Clear error messages' },
                  { icon: '✅', text: 'Form validation feedback' },
                  { icon: '✅', text: 'Respects system font size' },
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
                  { icon: '✅', text: 'Parallel API calls on init' },
                  { icon: '✅', text: 'MobX limits widget rebuilds' },
                  { icon: '✅', text: 'Shimmer loading states' },
                  { icon: '✅', text: 'Bill caching during session' },
                  { icon: '⚠️', text: 'Multiple recalculations on changes' },
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



