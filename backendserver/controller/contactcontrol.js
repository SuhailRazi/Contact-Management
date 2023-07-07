import expressAsyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

//@desc GET ALL contacts
//@route GET  /api/contacts
//@access private


export const getContacts = expressAsyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
})

//@desc Create new contact
//@route POST /api/contact
//acces private

export const  createContact = expressAsyncHandler(async (req, res) => {
    console.log("The request is ", req.body);
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id
    });
    
    res.status(201).json(contact);
})

//@desc get one contact
//@route get /api/contact/:id
//acces private

export const  getContact = expressAsyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
})


//@desc update contact
//@route get /api/contact/:id
//acces private

export const updateContact = expressAsyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updatedContact);
})

//@desc delete contact
//@route delete /api/contact/:id
//acces private

export const deleteContact = expressAsyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400).json("Cannot delete");
    }
    await Contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact + "Removed");
})
