# BambooHR MCP Apps

## Overview
18 standalone React MCP apps built for the BambooHR MCP server. Each app is self-contained with its own directory structure and can be run independently.

## Apps Built

### Employee Management
1. **employee-dashboard** (Port 3000)
   - Overview with headcount, new hires, turnover stats
   - Recent time off requests and active goals
   - Key metrics and activity cards

2. **employee-detail** (Port 3001)
   - Full employee profile with job info
   - Compensation details and review dates
   - Custom fields and contact information

3. **employee-directory** (Port 3002)
   - Searchable/filterable employee grid
   - Filter by department and status
   - Contact information display

### Time Off Management
4. **time-off-calendar** (Port 3003)
   - Visual calendar of time-off requests
   - Monthly view with navigation
   - Color-coded status (approved/pending/denied)

5. **time-off-requests** (Port 3004)
   - Request list with approve/deny actions
   - Status badges (pending/approved/denied)
   - Filterable by status

6. **time-off-balances** (Port 3005)
   - Balance overview per employee/policy
   - Vacation, sick, and personal day tracking
   - Progress bars showing usage

### Reporting & Analytics
7. **report-builder** (Port 3006)
   - Custom report configuration interface
   - Drag-and-drop field selection
   - Export format options (CSV/Excel/PDF)

8. **headcount-analytics** (Port 3015)
   - Headcount trends over time
   - Department breakdown
   - Growth rate calculations

9. **turnover-report** (Port 3016)
   - Turnover metrics and analysis
   - Voluntary vs involuntary breakdown
   - Exit reasons and department risk levels

### Benefits & Payroll
10. **benefits-overview** (Port 3007)
    - Benefits plans with enrollment counts
    - Coverage statistics
    - Plan comparisons

11. **benefits-enrollment** (Port 3008)
    - Employee enrollment details
    - Plan selections by employee
    - Enrollment status tracking

12. **payroll-dashboard** (Port 3009)
    - Pay stub overview
    - Deduction summary and breakdown
    - YTD earnings and tax documents

### Development & Goals
13. **goal-tracker** (Port 3010)
    - Employee goals with progress bars
    - Status tracking (on track/at risk/completed)
    - Goals grouped by employee

14. **training-catalog** (Port 3011)
    - Training courses with completion tracking
    - Course ratings and difficulty levels
    - Enrollment statistics

15. **training-progress** (Port 3012)
    - Per-employee training status
    - Completion rates
    - Hours completed tracking

### Organization & Onboarding
16. **file-manager** (Port 3013)
    - Employee documents browser
    - File categorization
    - Upload/download functionality (UI)

17. **org-chart** (Port 3014)
    - Organizational hierarchy visualization
    - Expandable/collapsible tree view
    - Direct reports display

18. **new-hires** (Port 3017)
    - Recent hires onboarding tracker
    - Onboarding progress tracking
    - Scheduled vs in-progress status

## Technical Details

### Structure
Each app directory contains:
- `App.tsx` - Main React component
- `index.html` - HTML entry point with Tailwind CDN
- `vite.config.ts` - Vite configuration with unique port

### Theme
- Dark theme using Tailwind CSS
- Primary colors: `#0f172a` (slate-900) and `#1e293b` (slate-800)
- Gradient accents: blue-to-purple for progress indicators
- Color-coded status badges

### Components
- Self-contained apps with inline shared components
- Card component for consistent layout
- Client-side state management with React hooks
- Lucide React icons throughout

### Development
To run any app:
```bash
cd src/ui/react-app/{app-name}
npm install
npm run dev
```

Each app runs on its own port (3000-3017) to avoid conflicts.

## Total Stats
- **18 apps** created
- **54 files** (3 per app)
- **~3,626 lines** of code
- **Dark theme** throughout
- **Responsive design** with Tailwind CSS
