
import fetch from 'node-fetch';

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export const getGitHubStats = async (req, res) => {
    const { username } = req.query;
    const targetUsername = username || process.env.VITE_GITHUB_USERNAME || 'kedardhotre';
    const token = process.env.VITE_GITHUB_TOKEN; // Use env var from backend (.env)

    if (!token) {
        return res.status(500).json({ message: "GitHub Token not configured on server" });
    }

    const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
          totalCount
          nodes {
            stargazerCount
            languages(first: 10) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
        contributionsCollection {
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch(GITHUB_GRAPHQL_API, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, variables: { username: targetUsername } }),
        });

        const body = await response.json();

        if (body.errors) {
            console.error("GitHub API Error", body.errors);
            return res.status(400).json({ message: body.errors[0].message });
        }

        const user = body.data.user;
        const repos = user.repositories.nodes;

        // Calculate Total Stars
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazerCount, 0);

        // Calculate Language Usage
        const languageMap = {};
        let totalSize = 0;

        repos.forEach((repo) => {
            repo.languages.edges.forEach(({ size, node }) => {
                if (languageMap[node.name]) {
                    languageMap[node.name].size += size;
                } else {
                    languageMap[node.name] = { size, color: node.color };
                }
                totalSize += size;
            });
        });

        const languages = Object.entries(languageMap)
            .map(([name, { size, color }]) => ({
                name,
                percentage: Math.round((size / totalSize) * 100),
                color,
                size,
            }))
            .sort((a, b) => b.size - a.size)
            .slice(0, 5);

        const top5Size = languages.reduce((acc, lang) => acc + lang.size, 0);
        const othersPercentage = Math.round(((totalSize - top5Size) / totalSize) * 100);

        if (othersPercentage > 0) {
            languages.push({
                name: "Others",
                percentage: othersPercentage,
                color: "#8b5cf6",
            });
        }

        const weeks = user.contributionsCollection.contributionCalendar.weeks.map(week =>
            week.contributionDays.map(day => ({
                count: day.contributionCount,
                date: day.date
            }))
        );

        res.json({
            totalRepos: user.repositories.totalCount,
            totalStars,
            totalCommits: user.contributionsCollection.totalCommitContributions,
            contributions: user.contributionsCollection.contributionCalendar.totalContributions,
            languages,
            contributionData: weeks
        });

    } catch (error) {
        console.error("Backend GitHub Fetch Error:", error);
        res.status(500).json({ message: "Failed to fetch GitHub stats" });
    }
};
