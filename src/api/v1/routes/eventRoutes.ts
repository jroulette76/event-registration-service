import { Router } from "express";
import express from "express";

import {
    getEvents,
    getEvent,
    createNewEvent,
    updateExistingEvent,
    deleteExistingEvent,
} from "../controllers/eventController";

const router : Router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", createNewEvent);

router.put("/:id", updateExistingEvent);

router.delete("/:id", deleteExistingEvent);

export default router;
