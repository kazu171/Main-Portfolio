// JSON-LD injection component with XSS protection
// Source: https://nextjs.org/docs/app/guides/json-ld

interface JsonLdProps {
  data: object
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Replace < with unicode to prevent XSS
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
