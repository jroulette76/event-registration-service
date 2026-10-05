import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as eventService from "../services/eventService";
import type { Event } from "../models/events";
import type { Attendee } from "../models/attendee";

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const event: Event[] = await eventService.getEvent();
    res.status(HTTP_STATUS.OK).json({
      message: "Event retrieved successfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events: Event[] = await eventService.getAllEvents();
    res.status(HTTP_STATUS.OK).json({
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

export const createNewEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Basic validation - check for required fields
    if (!req.body.name) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Event name is required",
      });
    } else if (!req.body.description) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Event description is required",
      });
    } else {
      // Extract only the fields we need
      const { name, description } = req.body;

      const EventData = { name, description };

      const newEvent: Event = await eventService.createNewEvent(EventData);
      res.status(HTTP_STATUS.CREATED).json({
        message: "Event created successfully",
        data: newEvent,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateExistingEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Extract update fields
    const { name, description } = req.body;

    // Create update data object with only the fields that can be updated
    const updateData = { name, description };

    const updatedEvent: Event = await eventService.updateExistingEvent(id, updateData);
    res.status(HTTP_STATUS.OK).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExistingEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await eventService.deleteExistingEvent(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};