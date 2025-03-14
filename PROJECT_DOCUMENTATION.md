# ChainSync - Supply Chain Management Platform

## Project Overview

ChainSync is a comprehensive supply chain management platform designed to help businesses manage their entire supply chain operations. The platform focuses on master data management, planning, and analytics, providing a unified interface with powerful tools for data visualization, analysis, and decision-making.

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS for consistent design
- **State Management**: React Hooks and Context API
- **Maps Integration**: Google Maps API for location visualization
- **Data Visualization**: Customized data grids and interactive maps
- **Authentication**: Role-based access control with secure session management
- **Deployment**: Docker containerization, Google Cloud Platform (GCP)

## Core Features

### 1. Master Data Management (MDM)
- **Location Master**
  - Geographic visualization with Google Maps
  - Internal and external location management
  - Location type classification
  - Address and timezone management
  - Status tracking and monitoring
  
- **Material Master**
  - Comprehensive material data management
  - Classification and attributes
  - Version control and change tracking
  - Import/Export capabilities

- **Customer Master**
  - Customer information management
  - Sales area configuration
  - Partner function management
  - Hierarchical relationships

- **Bill of Materials (BOM)**
  - Component and assembly management
  - Quantity specifications
  - Version control
  - Engineering and manufacturing BOMs

- **Routing & Work Centers**
  - Production process definition
  - Operation sequencing
  - Resource requirement planning
  - Work center capacity management

- **Production Version**
  - Material-plant assignments
  - BOM and routing linkage
  - Time-based version control
  - Plant-specific configurations

### 2. Planning Setup
- **Location Process Setup**: Configure and manage location-specific processes
- **BOM Time Phase**: Manage Bill of Materials with time-phased planning
  - Product family and group management
  - Time-phased inventory planning
  - Priority and exclusion settings
  - Down binning configuration
- **Resource Mapping**: Configure resource allocation and capacity
- **Yield Management**: Track and optimize yield percentages

### 3. Time Phase Planning
- Time-phased inventory projections
- Demand and supply visualization
- Buffer management

## Project Structure

### Key Directories
```
app/
├── mdm/                    # Master Data Management modules
│   ├── location/          # Location management
│   ├── material/          # Material master data
│   ├── customer/          # Customer management
│   ├── bom/              # Bill of Materials
│   ├── routing/          # Routing & work centers
│   └── components/       # Shared MDM components
├── planning-setup/        # Planning configuration
└── components/           # Global shared components
```

### UI Standards
- **Layout**
  - Consistent centered container (`max-w-7xl`)
  - Responsive padding system
  - Standardized spacing units
  
- **Components**
  - Reusable shadcn/ui components
  - Custom data grids
  - Interactive maps
  - Modal dialogs for detail views
  - Filter and search interfaces

- **Design System**
  - Primary color: Indigo
  - Secondary accents: Emerald, Amber, Blue
  - Consistent typography scale
  - Standardized border radiuses
  - Uniform shadow system

## Development Guidelines

### Code Style
- TypeScript with strict type checking
- Functional React components
- Custom hooks for shared logic
- Consistent naming conventions
- Comprehensive error handling

### Component Structure
- Page-level components in app directory
- Shared components in components directory
- Feature-specific components co-located with features
- Clear separation of concerns

### State Management
- React hooks for local state
- Context API for shared state
- Props for component communication
- Custom hooks for complex logic

## Getting Started

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
```bash
cp .env.example .env.local
```

Required environment variables:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Run development server:
```bash
npm run dev
```

## Deployment

### Prerequisites
- Docker 20.x or higher
- Node.js 18.x or higher
- Google Cloud SDK

### Docker Setup
1. Build the Docker image:
```bash
docker build -t chainsync:latest .
```

2. Run locally:
```bash
docker run -p 3000:3000 chainsync:latest
```

### GCP Deployment
1. Authenticate with GCP:
```bash
gcloud auth login
```

2. Configure Docker for GCP:
```bash
gcloud auth configure-docker
```

3. Tag and push the image:
```bash
docker tag chainsync:latest gcr.io/[PROJECT_ID]/chainsync:latest
docker push gcr.io/[PROJECT_ID]/chainsync:latest
```

4. Deploy to Cloud Run:
```bash
gcloud run deploy chainsync --image gcr.io/[PROJECT_ID]/chainsync:latest --platform managed
```

## Contributing

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit:
```bash
git add .
git commit -m "Description of changes"
```

3. Push changes and create PR:
```bash
git push origin feature/your-feature-name
```

4. Submit PR for review

## License

This project is licensed under the MIT License - see the LICENSE file for details. 