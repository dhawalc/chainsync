# ChainSync - Supply Chain Management Platform

## Project Overview

ChainSync is a comprehensive supply chain management platform designed to help businesses manage their entire supply chain operations, from demand planning to inventory management, supplier relationships, and analytics. The platform provides a unified interface for all supply chain activities, with powerful tools for data visualization, analysis, and decision-making.

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **UI Components**: Custom components built with Tailwind CSS and shadcn/ui
- **State Management**: React Hooks and Context API
- **Data Visualization**: Charts and graphs for analytics
- **Authentication**: User authentication and role-based access control
- **Deployment**: Docker containerization, Google Cloud Platform (GCP)

## Core Features

### 1. Planning Setup
- **Location Process Setup**: Configure and manage location-specific processes
- **BOM Time Phase**: Manage Bill of Materials with time-phased planning
  - Product family and group management
  - Time-phased inventory planning
  - Priority and exclusion settings
  - Down binning configuration
- **Resource Mapping**: Configure resource allocation and capacity
- **Yield Management**: Track and optimize yield percentages

### 2. Master Data Management
- Product hierarchy management
- Location master data
- Material master data
- Resource configuration

### 3. Time Phase Planning
- Time-phased inventory projections
- Demand and supply visualization
- Buffer management

## Project Structure

### Key Pages and Components

1. **Planning Setup**
   - `app/planning-setup/location-process/page.tsx`
   - `app/planning-setup/bom-time-phase/page.tsx`
   - `app/planning-setup/resource-mapping/page.tsx`
   - `app/planning-setup/yield-management/page.tsx`

2. **UI Components**
   - Reusable shadcn/ui components
   - Custom table implementations
   - Responsive form elements
   - Interactive data grids

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

### CI/CD Pipeline
1. GitHub Actions workflow for automated testing
2. Automated builds on main branch updates
3. Staging deployment for feature validation
4. Production deployment with manual approval

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments
- Use consistent naming conventions

### UI/UX Standards
- Consistent color scheme across pages
- Responsive design for all screen sizes
- Dark mode support
- Accessible form controls
- Clear visual hierarchy

### Performance Optimization
- Lazy loading for large components
- Image optimization
- Code splitting
- Caching strategies
- Server-side rendering where appropriate

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

4. Run development server:
```bash
npm run dev
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