const express = require ("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
.route("/")
.get(wrapAsync(listingController.index))
 .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing))

//index route

  
     //new route 
     router.get("/new", isLoggedIn, listingController.renderNewForm);
   
     //Show Route 
     router.get("/:id", wrapAsync(listingController.showListing));

     // create route

//    router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing)
// );

//edit route 

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

//update route 
router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;