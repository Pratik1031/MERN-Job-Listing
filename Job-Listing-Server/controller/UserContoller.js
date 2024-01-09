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
      return next(new ErrorHandler('user alrready exists', 409));
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const created_user = await userCollection.create({
      name,
      email,
      mobile,
      password: hashed_password,
    });
    return setCookie(res, created_user, 201, `${name} registered successfully`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    const password_match = await bcrypt.compare(password, user.password);
    if (password_match) {
      return setCookie(res, user, 200, `Welcome ${user.name}`);
    }

    return next(new ErrorHandler('Invaild Email or Password', 404));
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

const addJob = async (req, res) => {
  try {
    const {
      company_name,
      company_logo,
      job_position,
      monthly_salary,
      job_type,
      remote_office,
      location,
      job_description,
      about_company,
      skills,
      information,
    } = req.body;

    console.log(req.user._id);

    const job = await jobCollection.create({
      company_name,
      company_logo,
      job_position,
      monthly_salary,
      job_type,
      remote_office,
      location,
      job_description,
      about_company,
      skills,
      information,
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
    const {
      company_name,
      company_logo,
      job_position,
      monthly_salary,
      job_type,
      remote_office,
      location,
      job_description,
      about_company,
      skills,
      information,
    } = req.body;

    const updatedFields = {
      company_name,
      company_logo,
      job_position,
      monthly_salary,
      job_type,
      remote_office,
      location,
      job_description,
      about_company,
      skills,
      information,
    };

    const updatedJob = await jobCollection.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true }
    );
    console.log(updateJob);
    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
    });
  } catch (error) {
    next(new ErrorHandler('Internal server error', 500));
  }
};

const getSpecificJob = async (req, res, next) => {
  try {
    const { job_position, skills } = req.body;

    const jobs = await jobCollection.find({
      $or: [
        { job_position: { $eq: job_position } },
        { skills: { $in: skills } },
      ],
    });

    if (!jobs) {
      next(new ErrorHandler('Jobs not found', 404));
    }
    res.status(200).json({
      success: true,
      jobs,
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
  getSpecificJob,
};
