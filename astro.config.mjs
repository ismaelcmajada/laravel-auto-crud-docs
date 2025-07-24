// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Laravel AutoCrud Documentation",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Laravel AutoCrud",
          items: [
            {
              label: "Overview",
              slug: "index",
            },
            {
              label: "Field Definitions",
              slug: "fields",
            },
            {
              label: "Relationships",
              slug: "relationships",
            },
            {
              label: "Validation",
              slug: "validation",
            },
            {
              label: "Custom Search",
              slug: "custom-search",
            },
            {
              label: "Event Hooks",
              slug: "hooks",
            },
            {
              label: "API Reference",
              slug: "api",
            },
            {
              label: "Examples",
              slug: "examples",
            },
          ],
        },
      ],
    }),
  ],
})
