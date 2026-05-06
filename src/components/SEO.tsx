import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://lbbc.org.uk';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.png`;

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
}

export const SEO = ({ title, description, canonical, type = 'website', image }: SEOProps) => {
  const fullTitle = `${title} | LBBC`;
  const siteDescription = description || "The premier network for bilateral UK-Libya commercial partnership. Fostering trade, investment, and strategic dialogue.";
  const ogImage = image || DEFAULT_OG_IMAGE;
  const canonicalUrl = canonical ? `${SITE_URL}/#/${canonical}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />

      {/* Open Graph */}
      <meta property="og:site_name" content="LBBC — Libya British Business Council" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={ogImage} />

      {canonical && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};
