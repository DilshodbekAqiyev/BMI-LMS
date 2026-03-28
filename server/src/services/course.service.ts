import { NextFunction, Response } from "express";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";
import CourseModel from "../models/course.model";

// create course
export const createCourse = CatchAsyncErrors(
  async (data: any, res: Response, next: NextFunction) => {
    const course = await CourseModel.create(data);

    res.status(201).json({
      success: true,
      course,
    });
  },
);
