
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export const fetchGitHubStats = async (username, token) => {
    if (!token) {
        throw new Error("GitHub token not found");
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

    const response = await fetch(GITHUB_GRAPHQL_API, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { username } }),
    });

    const body = await response.json();

    if (body.errors) {
        throw new Error(body.errors[0].message);
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
            size, // keep size for sorting
        }))
        .sort((a, b) => b.size - a.size)
        .slice(0, 5); // Top 5 languages

    // Adjust "Others"
    const top5Size = languages.reduce((acc, lang) => acc + lang.size, 0);
    const othersPercentage = Math.round(((totalSize - top5Size) / totalSize) * 100);

    if (othersPercentage > 0) {
        languages.push({
            name: "Others",
            percentage: othersPercentage,
            color: "#8b5cf6", // Default purple
        });
    }

    // Process Contribution Calendar
    // The calendar data from API is nested in weeks -> contributionDays
    // We need to flatten it or pass it as is, but our component expects something specific?
    // Let's look at `GitHubStats.jsx` again.
    // It expects: `contributionData` as an array of weeks, where each week has days.
    // The API returns `weeks` array, each has `contributionDays`.
    // It matches well.

    const weeks = user.contributionsCollection.contributionCalendar.weeks.map(week =>
        week.contributionDays.map(day => ({
            count: day.contributionCount,
            date: day.date
        }))
    );
    
    // We typically want the last 52 weeks or so. The API returns the last year by default.

    return {
        totalRepos: user.repositories.totalCount,
        totalStars,
        totalCommits: user.contributionsCollection.totalCommitContributions,
        contributions: user.contributionsCollection.contributionCalendar.totalContributions,
        languages,
        contributionData: weeks
    };
};
