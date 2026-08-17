import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { PROJECTS } from "@/lib/data/projects";

const BASE_URL = "https://www.soumyashipower.in";

export default function sitemap() {
  const staticRoutes = [
    { url: `${BASE_URL}`,                            lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${BASE_URL}/about`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/solutions`,                   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/solutions/solar-rooftop`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/solutions/ev-charging`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/solutions/wind-power`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/solutions/industrial-power`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/industries`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/projects`,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/blog`,                        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE_URL}/careers`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`,                     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`,               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms`,                        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
