/**
 * LBBC Website — API Utilities
 * Handles robust path resolution for local API endpoints
 */

export const getApiUrl = (path: string): string => {
  // If we're in production on Hostinger, we might be in a subfolder or 
  // need to handle relative paths differently depending on how the node app is proxied.
  
  // Standard case: API is at /api/... on the current domain
  let origin = window.location.origin;
  if (!origin || origin === 'null') {
    origin = window.location.protocol + '//' + window.location.host;
  }

  // Check if we are running in a subfolder (Hostinger often does this for node apps)
  const pathname = window.location.pathname;
  
  // If the path already starts with /api, use it as is relative to root
  if (path.startsWith('/api')) {
    return origin + path;
  }

  // Otherwise, if we're on a deep route like /directory or /events, 
  // we want to hit /api/... not /directory/api/...
  // But if the whole app is in a subfolder like /lbbc/, we need to preserve that.
  
  // Best guess: use root-relative API path
  return origin + '/api/' + (path.startsWith('/') ? path.substring(1) : path);
};

export const getStaticDataUrl = (path: string): string => {
  let origin = window.location.origin;
  if (!origin || origin === 'null') {
    origin = window.location.protocol + '//' + window.location.host;
  }
  return origin + '/data/' + (path.startsWith('/') ? path.substring(1) : path);
};
