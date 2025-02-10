import express from "express";
import Job from "@/models/Job";
import Company from "@/models/Company";
import Error from "@libs/error";
import Success from "@libs/success";

const GetAllJobsRoute = express.Router();

GetAllJobsRoute.get("/", async (req, res) => {
  let { page, sortByDate, search } = req.query;
  const pageSizeInt = 10;

  try {
    const pageInt = parseInt(page as string) || 1;
    const sortDirection = sortByDate === "asc" ? 1 : -1;

    // Convert search query to regex for partial match
    let searchFilter: any = {};
    if (search) {
      const regex = new RegExp(search.toString(), "i"); // Case-insensitive partial match
      searchFilter = {
        $or: [
          { jobTitle: { $regex: regex } },
        ]
      };
    }

    // Step 1: Filter first (before aggregation)
    const filteredJobs = await Job.find(searchFilter)
      .sort({ createdAt: sortDirection })
      .skip((pageInt - 1) * pageSizeInt)
      .limit(pageSizeInt);

    // Step 2: Get total count for pagination
    const totalCount = await Job.countDocuments(searchFilter);

    const metadata = {
      totalCount,
      page: pageInt,
      nextPage: totalCount > pageInt * pageSizeInt ? pageInt + 1 : null,
      pageCount: Math.ceil(totalCount / pageSizeInt)
    };

    // Step 3: Attach company data
    const jobsWithCompanyData = await Promise.all(
      filteredJobs.map(async (job) => {
        const company = await Company.findById(job.companyId);
        return { ...job.toObject(), company };
      })
    );

    return Success(res, 200, "JOBS_FOUND", "Jobs found successfully", {
      jobs: jobsWithCompanyData,
      metadata
    });
  } catch (error) {
    return Error(res, 500, "SERVER_ERROR", "An error occurred on the server", error);
  }
});

export default GetAllJobsRoute;
