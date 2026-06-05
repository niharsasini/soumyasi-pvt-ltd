export default function sitemap() {
  return [
    { url: "https://soumyasipower.com",                          lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: "https://soumyasipower.com/about",                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://soumyasipower.com/solutions",                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: "https://soumyasipower.com/solutions/ev-charging",    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://soumyasipower.com/industries",               lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://soumyasipower.com/projects",                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: "https://soumyasipower.com/blog",                     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: "https://soumyasipower.com/careers",                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://soumyasipower.com/contact",                  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.8 },
    { url: "https://soumyasipower.com/privacy-policy",           lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: "https://soumyasipower.com/terms",                    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
