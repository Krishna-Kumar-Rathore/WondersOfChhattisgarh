// frontend/src/utils/analytics.js
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID; // Replace with your actual ID

// Initialize Google Analytics
export const initGA = () => {
  // Load gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_title: document.title,
      page_location: window.location.href,
    });
  `;
  document.head.appendChild(script2);
};

// Track page views
export const trackPageView = (url, title) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (action, category = 'engagement', label = '', value = 0) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};