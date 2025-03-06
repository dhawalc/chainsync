# ChainSync - Supply Chain Management Platform

## Project Overview

ChainSync is a comprehensive supply chain management platform designed to help businesses manage their entire supply chain operations, from demand planning to inventory management, supplier relationships, and analytics. The platform provides a unified interface for all supply chain activities, with powerful tools for data visualization, analysis, and decision-making.

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **UI Components**: Custom components built with Tailwind CSS and shadcn/ui
- **State Management**: React Hooks and Context API
- **Data Visualization**: Charts and graphs for analytics
- **Authentication**: User authentication and role-based access control

## Project Structure

### Core Pages

1. **Dashboard** (`/app/page.tsx`, `/app/dashboard/page.tsx`)
   - Main dashboard with overview of key metrics
   - Quick access to frequently used features
   - Status cards and summary statistics

2. **Landing Page** (`/app/landing/page.tsx`)
   - Public-facing landing page for the application
   - Features overview and value proposition
   - Call-to-action for sign-up/login

3. **Time Phase** (`/app/timephase/page.tsx`)
   - Time-phased inventory planning
   - Demand and supply visualization over time
   - Inventory projections and planning tools

4. **Hierarchy** (`/app/hierarchy/page.tsx`)
   - Product and location hierarchy management
   - Hierarchical data visualization
   - Drag-and-drop hierarchy editor

5. **Analysis Tools**
   - **Analysis Dashboard** (`/app/analysis/page.tsx`)
     - Central hub for all analysis tools
     - Cards for different analysis capabilities
   - **Explainability Grid** (`/app/analysis/explainability/page.tsx`)
     - Detailed view of supply commitments across BOM levels
     - Filtering and configuration options
   - **Performance Dashboard** (`/app/analysis/performance/page.tsx`)
     - KPI monitoring and performance metrics (placeholder)
   - **What-If Analysis** (`/app/analysis/what-if/page.tsx`)
     - Scenario planning and simulation tools (placeholder)

6. **Master Data Management**
   - **MDM Dashboard** (`/app/mdm/page.tsx`)
   - **Material Master** (`/app/mdm/material/page.tsx`)
   - **Customer Master** (`/app/mdm/customer/page.tsx`)
   - **Supplier Master** (`/app/mdm/supplier/page.tsx`)
   - **Location Master** (`/app/mdm/location/page.tsx`)
   - **MDM Integrations** (`/app/mdm/integrations/page.tsx`)
     - Master data integration configuration
     - Data quality settings
     - Integration logs and monitoring

7. **Integrations** (`/app/integrations/page.tsx`)
   - Integration management with external systems
   - Connection status monitoring
   - Sync capabilities with ERP, CRM, WMS, etc.

8. **Audit** (`/app/audit/page.tsx`)
   - Audit trail of system activities
   - User action logging
   - Compliance reporting

### Components

1. **Navigation**
   - **Navbar** (`/components/Navbar.tsx`)
     - Main navigation with dropdowns
     - User profile information
     - Access to all major sections

2. **UI Components**
   - **Card** (`/components/ui/card.tsx`)
   - **Button** (`/components/ui/button.tsx`)
   - **Dialog** (`/components/ui/dialog.tsx`)
   - **Select** (`/components/ui/select.tsx`)
   - **Checkbox** (`/components/ui/checkbox.tsx`)
   - **Badge** (`/components/ui/badge.tsx`)
   - **Input** (`/components/ui/input.tsx`)
   - **Textarea** (`/components/ui/textarea.tsx`)
   - **Label** (`/components/ui/label.tsx`)

3. **Analysis Components**
   - **FilterPanel** (`/app/analysis/explainability/components/FilterPanel.tsx`)
   - **LevelSelector** (`/app/analysis/explainability/components/LevelSelector.tsx`)
   - **GridTable** (`/app/analysis/explainability/components/GridTable.tsx`)
   - **DetailsDialog** (`/app/analysis/explainability/components/DetailsDialog.tsx`)
   - **NoteDialog** (`/app/analysis/explainability/components/NoteDialog.tsx`)

4. **Icons**
   - **LayersIcon** (`/components/icons/LayersIcon.tsx`)
   - Other icons from Heroicons library

### API Routes

1. **Hierarchy API**
   - **Reset Hierarchy** (`/app/api/hierarchy/reset/route.ts`)
     - Resets hierarchy data to default state

2. **Time Phase API**
   - **Time Phase Data** (`/app/api/timephase/route.ts`)
     - Provides time-phased inventory data

## Features

### 1. Supply Chain Visibility

- End-to-end visibility across the supply chain
- Multi-level BOM (Bill of Materials) exploration
- Inventory tracking at different levels

### 2. Demand Planning

- Forecast management and visualization
- Demand planning tools
- Time-phased inventory projections

### 3. Master Data Management

- Centralized management of materials, customers, suppliers, and locations
- Data quality monitoring and rules configuration
- Master data integration with external systems
- Change history tracking

### 4. Analytics and Reporting

- Performance dashboards with KPIs
- Explainability grid for supply commitments
- What-if analysis for scenario planning

### 5. Integration Capabilities

- Connections to ERP, CRM, WMS, and other systems
- Data synchronization
- Status monitoring of integrations
- Integration logs and error tracking

### 6. Audit and Compliance

- Comprehensive audit trail
- User action logging
- Compliance reporting

## UI Design Principles

1. **Consistency**
   - Consistent color scheme (indigo, emerald, gray)
   - Uniform card and component styling
   - Standardized typography and spacing

2. **Visual Hierarchy**
   - Clear section headers
   - Card-based layout for content organization
   - Visual indicators for status and importance

3. **Responsiveness**
   - Mobile-friendly design
   - Responsive grid layouts
   - Adaptive components

4. **Accessibility**
   - High contrast text
   - Clear visual indicators
   - Semantic HTML structure

## Future Enhancements

1. **Advanced Analytics**
   - Machine learning for demand forecasting
   - Anomaly detection
   - Predictive analytics

2. **Collaboration Tools**
   - Comments and notes on supply chain events
   - Shared dashboards and reports
   - Notification system

3. **Mobile Application**
   - Native mobile experience
   - Push notifications
   - Offline capabilities

4. **Extended Integrations**
   - IoT device integration
   - Blockchain for supply chain transparency
   - EDI capabilities

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chainsync.git
   ```

2. Install dependencies:
   ```bash
   cd chainsync
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the variables as needed

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributing

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```

3. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a pull request on GitHub.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 