/**
 * Helper functions to generate JSON-LD structured data for better SEO
 */

export interface StructuredDataOptions {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  organizationName?: string;
  organizationLogo?: string;
}

/**
 * Generates schema.org Article structured data
 */
export function generateArticleStructuredData(options: StructuredDataOptions) {
  const {
    title,
    description,
    url,
    imageUrl,
    datePublished,
    dateModified,
    authorName = "Nerochaze",
    organizationName = "Nerochaze Tech",
    organizationLogo = "https://nerochaze.replit.app/logo.png"
  } = options;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": organizationName,
      "logo": {
        "@type": "ImageObject",
        "url": organizationLogo
      }
    },
    "url": url,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished
  };
}

/**
 * Generates schema.org SoftwareApplication structured data for projects
 */
export function generateProjectStructuredData(options: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  price?: string;
  category?: string;
  operatingSystem?: string;
  datePublished?: string;
  applicationCategory?: string;
}) {
  const {
    title,
    description,
    url,
    imageUrl,
    price,
    category,
    operatingSystem = "Web",
    datePublished,
    applicationCategory = "WebApplication"
  } = options;

  const data: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "description": description,
    "image": imageUrl,
    "url": url,
    "applicationCategory": applicationCategory || category,
    "operatingSystem": operatingSystem
  };

  if (datePublished) {
    data.datePublished = datePublished;
  }

  if (price) {
    data.offers = {
      "@type": "Offer",
      "price": price.replace(/[^\d.]/g, ''),
      "priceCurrency": "USD"
    };
  }

  return data;
}

/**
 * Generates schema.org BreadcrumbList structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Generates schema.org Organization structured data
 */
export function generateOrganizationStructuredData(options: {
  name: string;
  url: string;
  logo: string;
  description: string;
  socialLinks?: string[];
}) {
  const { name, url, logo, description, socialLinks = [] } = options;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url,
    "logo": logo,
    "description": description,
    "sameAs": socialLinks
  };
}

/**
 * Generates schema.org Person structured data
 */
export function generatePersonStructuredData(options: {
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  socialLinks?: string[];
  skills?: string[];
}) {
  const { 
    name, 
    url, 
    image, 
    jobTitle = "Full-Stack Developer", 
    description,
    socialLinks = [],
    skills = []
  } = options;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "url": url,
    "image": image,
    "jobTitle": jobTitle,
    "description": description,
    "sameAs": socialLinks,
    "knowsAbout": skills
  };
}