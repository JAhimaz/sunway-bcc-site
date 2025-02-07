import express from "express";
import Job from "@/models/Job";
import Company from "@/models/Company";
import Error from "@libs/error";
import Success from "@libs/success";

const GetAllJobsRoute = express.Router();

GetAllJobsRoute.get("/", async (req, res) => {

  let { page } = req.query; 
  const pageSizeInt = 10;

  try {
    const pageInt = parseInt(page as string) || 1;

    const jobs = await Job.aggregate([
      {
        $facet: {
          metadata: [{ $count: 'totalCount'}],
          data: [{ $skip: (pageInt - 1) * pageSizeInt }, { $limit: pageSizeInt }]
        }
      }
    ])

    
    const metadata = {
      totalCount: jobs[0].metadata[0].totalCount || 0,
      page: pageInt,
      // Calculate if there is a next page
      nextPage: jobs[0].metadata[0].totalCount > pageInt * pageSizeInt ? pageInt + 1 : null,
      pageCount: Math.ceil(jobs[0].metadata[0].totalCount / pageSizeInt),
    }

    // Find jobs with the company id // eg: "companyId": "678e6d1406ab655da92f1f1b",
    const jobsWithCompanyData = await Promise.all(jobs[0].data.map(async (job: any) => {
      const company = await Company.findById(job.companyId);
      return {
        ...job,
        company
      }
    }));

    return Success(res, 200, "JOBS_FOUND", "Jobs found successfully", {
      jobs: jobsWithCompanyData,
      metadata
    });



  } catch (error) {
    return Error(res, 500, "SERVER_ERROR", "An error occured on the server", error);
  }
})

export default GetAllJobsRoute;