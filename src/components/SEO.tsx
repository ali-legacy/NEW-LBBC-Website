import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  type?: string;
}

export const SEO = ({ title, description, canonical, type = 'website' }: SEOProps) => {
  const fullTitle = `${title} | LBBC`;
  const siteDescription = description || "The premier network for bilateral UK-Libya commercial partnership. Fostering trade, investment, and strategic dialogue.";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={siteDescription} />
      {canonical && <link rel="canonical" href={`https://lbbc.org.uk/#${canonical}`} />}
      <meta property="og:type" content={type} />
    </Helmet>
  );
};
