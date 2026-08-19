const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getRepository,
  getRepositoryContents,
} = require("../services/githubService");

const router = express.Router();

router.get(
  "/repository",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    try {
      const repository = await getRepository();

      res.json({
        repository: {
          name: repository.name,
          fullName: repository.full_name,
          private: repository.private,
          defaultBranch: repository.default_branch,
          url: repository.html_url,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to access GitHub repository",
      });
    }
  }
);

router.get(
  "/contents",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    try {
      const contents = await getRepositoryContents(req.query.path || "");

      res.json({
        contents,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to retrieve repository contents",
      });
    }
  }
);

module.exports = router;