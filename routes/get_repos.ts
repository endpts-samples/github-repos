import type { Route } from "@endpts/types";

interface Repo {
  full_name: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
}

export default {
  method: "GET",
  path: "/:username/repos",
  async handler(req) {
    const { username } = req.params;
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();

    return Response.json(
      repos.map((repo: Repo) => ({
        name: repo.full_name,
        url: repo.html_url,
        stars: repo.stargazers_count,
        watchers: repo.watchers_count,
        forks: repo.forks_count,
        open_issues: repo.open_issues_count,
        language: repo.language,
      }))
    );
  },
} satisfies Route;
