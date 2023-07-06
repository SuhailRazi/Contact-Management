import { Router } from "express";
import { EventEmitter  } from "events";
import { getContacts,createContact, getContact, updateContact, deleteContact  } from "../controller/contactcontrol.js";

const bus = new EventEmitter();
bus.setMaxListeners(15);



const router = Router();

router.route("/").get(getContacts).post(createContact);


router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);



export default router;