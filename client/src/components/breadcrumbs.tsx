import React from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs component for SEO-friendly navigation
 */
export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-1 text-sm ${className}`}>
      <ol className="flex items-center space-x-1">
        <li className="flex items-center">
          <Link href="/" className="text-gray-400 hover:text-cyan-400 flex items-center">
            <Home size={16} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={16} className="text-gray-500" />
            {item.isCurrent ? (
              <span aria-current="page" className="ml-1 text-cyan-400 font-medium">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="ml-1 text-gray-400 hover:text-cyan-400">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Helper function to generate breadcrumb items based on current path
 */
export function useBreadcrumbs(): BreadcrumbItem[] {
  const [location] = useLocation();
  const pathSegments = location.split('/').filter(Boolean);
  
  // Start with empty breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [];
  
  if (pathSegments.length === 0) {
    // On homepage, don't show breadcrumbs
    return [];
  }
  
  // Generate breadcrumb items based on URL segments
  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    
    // Special case for dynamic segments like IDs or slugs
    if (segment.match(/^[0-9]+$/)) {
      if (pathSegments[index - 1] === 'project') {
        label = 'Project Details';
      } else {
        label = 'Item Details';
      }
    }
    
    breadcrumbs.push({
      label,
      href: currentPath,
      isCurrent: isLast
    });
  });
  
  return breadcrumbs;
}