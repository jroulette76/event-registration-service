import { Request, Response } from "express";
import * as eventService from "../services/eventService";
import { Attendee } from "../models/attendee";
import { Event } from "../models/events";

export const getEvents = (req: Request, res: Response): void => {
    const events: Event[] = eventService.getEvents();
    res.status(200).json({ message: "Get all events", data: events})
};

export const getEvent = (req: Request, res: Response) : void => {
    const { eventID } = req.params; 
    res.status(200).json({message: "Get Event", data: eventService.getEvent(eventID)})
};

export const createNewEvent = (req: Request, res: Response): void => {
    const newEvent: Event = req.body;
    eventService.createEvent(newEvent);
    res.status(201).json({ message: "Event created", data: newEvent}); 
};
