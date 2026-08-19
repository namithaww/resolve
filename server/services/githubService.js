const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function getRepository() {
  const response = await octokit.rest.repos.get({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
  });

  return response.data;
}

async function getRepositoryContents(path = "") {
  const response = await octokit.rest.repos.getContent({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    path,
    ref: process.env.GITHUB_BRANCH,
  });

  return response.data;
}

module.exports = {
  getRepository,
  getRepositoryContents,
};