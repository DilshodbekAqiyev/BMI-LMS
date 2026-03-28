import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import { AuthRequest } from "../types/custom";

// upload course
export const uploadCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });
      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    createCourse(data, res, next);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// edit course
export const editCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    const thumbnail = data.thumbnail;
    if (thumbnail) {
      await cloudinary.v2.uploader.destroy(thumbnail.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const courseId = req.params.id;

    const course = await CourseModel.findByIdAndUpdate(
      courseId,
      { $set: data },
      { new: true },
    );

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get single course --- without purchasing
export const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const courseId = req.params.id;

    const isCacheExist = await redis.get(courseId as string);
    if (isCacheExist) {
      const course = JSON.parse(isCacheExist);
      res.status(200).json({
        success: true,
        course,
      });
    } else {
      const course = await CourseModel.findById(courseId).select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links",
      );

      await redis.set(courseId as string, JSON.stringify(course));

      res.status(200).json({
        success: true,
        course,
      });
    }
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get all courses --- without purchasing
export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isCacheExist = await redis.get("allCourses");
    console.log("hitting redis");
    if (isCacheExist) {
      const courses = JSON.parse(isCacheExist);
      res.status(200).json({
        success: true,
        courses,
      });
    } else {
      const courses = await CourseModel.find().select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links",
      );

      await redis.set("allCourses", JSON.stringify(courses));
      console.log("hitting mongodb");

      res.status(200).json({
        success: true,
        courses,
      });
    }
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get course content -- only for valid user
export const getCourseByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userCourseList = req.user?.courses;

    const courseId = req.params.id;

    const courseExists = userCourseList?.find(
      (course: any) => course._id.toString() === courseId,
    );

    if (!courseExists) {
      return next(
        new ErrorHandler("You are not eligible to access this course", 404),
      );
    }

    const course = await CourseModel.findById(courseId);

    const content = course?.courseData;

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};
