import { defineConfig } from "astro/config";

const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "goldcity-birthday-test";
const defaultBase =
  repositoryName.endsWith(".github.io") ? "/" : `/${repositoryName}`;
const siteUrl =
  process.env.SITE_URL ??
  `https://${process.env.GITHUB_REPOSITORY_OWNER ?? "example"}.github.io`;
const basePath = process.env.BASE_PATH ?? defaultBase;

export default defineConfig({
  site: siteUrl,
  base: basePath,
  output: "static",
  trailingSlash: "always",
});

