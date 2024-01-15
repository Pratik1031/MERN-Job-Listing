const userCollection = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const setCookie = require('../utils/Cookie');
const { ErrorHandler } = require('../middlewares/ErrorMiddleWare');
const jobCollection = require('../model/JobModel');

const checkRoute = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Api is Working',
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    const user = await userCollection.findOne({ email });

    if (user) {
      return next(new ErrorHandler('user already exists', 409));
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const created_user = await userCollection.create({
      name,
      email,
      mobile,
      password: hashed_password,
    });

    const words = name.split(' ');
    const trimmedName = words.slice(0, 1).join(' ');

    return setCookie(
      res,
      created_user,
      201,
      `${trimmedName} registered successfully`
    );
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userCollection.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorHandler('Invalid email or password', 404));
    }

    const password_match = await bcrypt.compare(password, user.password);

    const words = user.name.split(' ');
    const trimmedName = words.slice(0, 1).join(' ');

    if (password_match) {
      return setCookie(res, user, 200, `Welcome ${trimmedName}`);
    }

    return next(new ErrorHandler('Invalid email or password', 404));
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

const addJob = async (req, res, next) => {
  try {
    const job = await jobCollection.create({
      ...req.body,
      job_position: req.body.job_position.toLowerCase(),
      skills: req.body.skills
        .split(/\s*,\s*/)
        .map((skill) => skill.trim().toLowerCase()),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Job added successfully',
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const skillsArray =
      typeof req.body.skills === 'string'
        ? req.body.skills
            .split(/\s*,\s*/)
            .map((skill) => skill.trim().toLowerCase())
        : req.body.skills;

    const updatedJob = await jobCollection.findByIdAndUpdate(
      id,
      { ...req.body, skills: skillsArray, user: user._id },
      { new: true }
    );

    if (!updatedJob) {
      return next(new ErrorHandler('Job Not Found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

const searchJob = async (req, res, next) => {
  try {
    const { job_position, skills } = req.body;

    let query = {};

    if (skills.length > 0 && job_position === '') {
      query = {
        skills: { $in: skills },
      };
    } else {
      query = {
        $or: [
          { job_position: new RegExp(job_position, 'i') },
          { skills: { $in: skills } },
        ],
      };
    }

    const jobs = await jobCollection.find(query).select('-user');

    if (!jobs) {
      return next(new ErrorHandler('Jobs not found', 404));
    }
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

const getSpecificJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await jobCollection.findById(id).select('-user');

    if (!job) {
      return next(new ErrorHandler('Jobs not found', 404));
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

const getAllJobs = async (req, res, next) => {
  const jobs = await jobCollection.find({});
  if (!jobs) {
    return next(new errorMiddleware('No Jobs Found', 404));
  }
  res.status(200).json({
    success: true,
    jobs,
  });
};

const getMyProfile = async (req, res, next) => {
  const profile = await userCollection.findById(req.user._id).select('-_id');
  if (!profile) {
    return next(new errorMiddleware('Profile not found', 404));
  }
  res.status(200).json({
    success: true,
    profile,
  });
};

const logout = (req, res, next) => {
  try {
    res
      .status(200)
      .cookie('token', '', {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
        secure: process.env.NODE_ENV === 'Development' ? false : true,
      })
      .json({
        success: true,
        message: 'logged out',
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  checkRoute,
  register,
  login,
  addJob,
  updateJob,
  searchJob,
  getSpecificJob,
  logout,
  getAllJobs,
  getMyProfile,
};
