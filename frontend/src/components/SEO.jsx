// src/components/SEO.jsx
import { useEffect } from 'react';

const SEO = ({ 
  title = "Wonder of Chhattisgarh",
  description = "Discover the natural beauty, rich culture, and heritage of Chhattisgarh. Explore tourist destinations and plan your perfect trip.",
  keywords = "Chhattisgarh tourism, tourist places, travel guide",
  image = "https://wonders-of-chhattisgarh.vercel.app/og-image.jpg",
  url = "https://wonders-of-chhattisgarh.vercel.app/",
  type = "website"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    updateMetaTag('description', description);
    
    // Update meta keywords
    updateMetaTag('keywords', keywords);
    
    // Update canonical URL
    updateLink('canonical', url);
    
    // Update Open Graph tags
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:image', image);
    updateMetaProperty('og:url', url);
    updateMetaProperty('og:type', type);
    
    // Update Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
  }, [title, description, keywords, image, url, type]);

  const updateMetaTag = (name, content) => {
    let element = document.querySelector(`meta[name="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const updateMetaProperty = (property, content) => {
    let element = document.querySelector(`meta[property="${property}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const updateLink = (rel, href) => {
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    element.setAttribute('href', href);
  };

  return null; // This component doesn't render anything
};

export default SEO;