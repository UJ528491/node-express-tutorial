import Job from "../models/Job";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  // const job = await Job.findById(req.params.id);
  const {
    params: { id: jobID },
    user: { userID },
  } = req;
  const job = await Job.findOne({
    _id: jobID,
    createdBy: userID,
  });
  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const {
    params: { id: jobID },
    user: { userID },
    body: { company, position },
  } = req;
  if (!company || !position) {
    throw new BadRequestError("Company and position fields cannot be empty");
  }
  const job = await Job.findOneAndUpdate(
    {
      _id: jobID,
      createdBy: userID,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    params: { id: jobID },
    user: { userID },
  } = req;
  const job = await Job.findOneAndDelete({
    _id: jobID,
    createdBy: userID,
  });
  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).send();
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
