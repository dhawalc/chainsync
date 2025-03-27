# ChainSync Development Standards

## Page Structure
1. All pages should use the container class with max width:
```tsx
<div className="container mx-auto py-6 max-w-[1200px]">
```

2. Standard page header structure:
```tsx
<div className="space-y-1">
  <h1 className="text-2xl font-semibold tracking-tight">Page Title</h1>
  <p className="text-muted-foreground text-sm">Description text</p>
</div>
```

## Component Standards

### Action Buttons
1. Primary action button (e.g., "New" buttons):
```tsx
<Button className="gap-2 bg-blue-600 hover:bg-blue-700">
  <Icon className="h-4 w-4" />
  Button Text
</Button>
```

2. Secondary action buttons:
```tsx
<Button variant="outline" className="gap-2">
  <Icon className="h-4 w-4" />
  Button Text
</Button>
```

### Search and Filter Section
1. Standard search input:
```tsx
<div className="relative flex-1 sm:flex-none">
  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
  <Input
    placeholder="Search..."
    className="pl-8 w-full sm:w-[300px]"
  />
</div>
```

2. Filter dropdowns:
```tsx
<Select value={selectedValue} onValueChange={setSelectedValue}>
  <SelectTrigger className="w-full sm:w-[130px]">
    <SelectValue placeholder="All Types" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Types</SelectItem>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

Important Rules for Select Components:
- Never use empty string as a value for SelectItem
- Use 'all' or similar meaningful string for the default "show all" option
- Initialize state with the default value: `useState<string>('all')`
- Handle the default value in filter logic: `selectedValue === 'all' || item.value === selectedValue`

### Data Tables
1. Use the DataTable component from @/components/ui/data-table
2. Wrap tables in a Card component:
```tsx
<Card>
  <CardHeader>
    <CardTitle className="text-lg font-medium">List Title</CardTitle>
  </CardHeader>
  <CardContent>
    <DataTable columns={columns} data={data} />
  </CardContent>
</Card>
```

### Status Badges
```tsx
<Badge 
  variant={status === 'active' ? 'default' : 'secondary'}
  className={status === 'active' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-muted'}
>
  {status.charAt(0).toUpperCase() + status.slice(1)}
</Badge>
```

## Layout Rules
1. Use flex-col on mobile and flex-row on larger screens:
```tsx
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
```

2. Consistent spacing:
- Between sections: gap-6
- Between items in a section: gap-4
- Between related items: gap-2

## File Structure
1. Page components should be in app/[section]/[feature]/page.tsx
2. Shared components should be in components/[category]/[ComponentName].tsx
3. UI components should be in components/ui/[component-name].tsx

## State Management
1. Use local state for simple component state
2. Use URL parameters for shareable/bookmarkable state
3. Filter logic should be handled in the component level

## Naming Conventions
1. Components: PascalCase (e.g., SupplierMaster)
2. Files: kebab-case (e.g., supplier-master.tsx)
3. Functions: camelCase (e.g., handleFilter)
4. Constants: UPPER_SNAKE_CASE (e.g., MAX_ITEMS)

## API Integration
1. Environment variables:
   - Production keys should be in secret manager
   - Development keys should be in .env.local
2. API endpoints should be centralized in a service layer

## Responsive Design
1. Use sm: breakpoint for mobile-first design
2. Standard breakpoints:
   - sm: 640px
   - md: 768px
   - lg: 1024px
   - xl: 1280px

## Performance
1. Use memo for complex components
2. Lazy load large components
3. Optimize images using next/image
4. Use proper key props for lists

## Accessibility
1. Use semantic HTML elements
2. Include proper ARIA labels
3. Ensure keyboard navigation works
4. Maintain color contrast ratios

This document should be updated as new patterns and standards are established. 