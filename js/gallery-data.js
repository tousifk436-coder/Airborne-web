/* =========================================================
   AIRBORNE — GALLERY ITEMS
   ---------------------------------------------------------
   HOW TO ADD A NEW PHOTO
     1. Copy the photo into  images/gallery/   (e.g. g41.jpg)
     2. Add one line to the list below, for example:
        { type: "photo", src: "images/gallery/g41.jpg", title: "New helicopter", cats: "fleet" },

   HOW TO ADD A NEW VIDEO
     1. Copy the .mp4 into  videos/gallery/   (e.g. v10.mp4)
        (optional) add a cover image with the same name: v10.jpg
     2. Add one line, for example:
        { type: "video", src: "videos/gallery/v10.mp4", thumb: "videos/gallery/v10.jpg", title: "Joyride day", cats: "helipad" },

   FIELDS
     type  : "photo" or "video"                     (required)
     src   : path to the full photo / video file    (required)
     thumb : smaller preview image (optional — photos use src if left out;
             videos show a dark tile with a play icon if left out)
     title : caption shown on hover and in the viewer
     cats  : any of  fleet  helipad  adventure   — separate several with a space
             (Photos / Videos filters work automatically from "type")
     size  : "tall" or "wide" for a bigger tile (optional)

   Add as many items as you like — the gallery, filters and viewer update
   by themselves. New items can go at the top to show first.
   ========================================================= */
window.GALLERY = [
  { type: "photo", src: "images/gallery/g35.jpg", thumb: "images/gallery/g35-thumb.jpg", title: "Bell 407 on our helipad", cats: "fleet helipad", size: "wide" },
  { type: "video", src: "videos/gallery/v08.mp4", thumb: "videos/gallery/v08.jpg", title: "Helicopter landing at the helipad", cats: "fleet helipad", size: "tall" },
  { type: "photo", src: "images/gallery/g07.jpg", thumb: "images/gallery/g07-thumb.jpg", title: "Hot air balloon night glow", cats: "adventure", size: "tall" },
  { type: "photo", src: "images/gallery/g12.jpg", thumb: "images/gallery/g12-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g38.jpg", thumb: "images/gallery/g38-thumb.jpg", title: "Agusta 109 Grand New · VT-GIM", cats: "fleet helipad", size: "wide" },
  { type: "video", src: "videos/gallery/v03.mp4", thumb: "videos/gallery/v03.jpg", title: "Hot air balloon lift-off", cats: "adventure", size: "tall" },
  { type: "photo", src: "images/gallery/g01.jpg", thumb: "images/gallery/g01-thumb.jpg", title: "Helicopter joyride guests", cats: "fleet", size: "tall" },
  { type: "photo", src: "images/gallery/g36.jpg", thumb: "images/gallery/g36-thumb.jpg", title: "Shivgarh helipad", cats: "helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g11.jpg", thumb: "images/gallery/g11-thumb.jpg", title: "Night balloon flight", cats: "adventure", size: "tall" },
  { type: "photo", src: "images/gallery/g34.jpg", thumb: "images/gallery/g34-thumb.jpg", title: "Robinson R44 with guests", cats: "fleet", size: "" },
  { type: "video", src: "videos/gallery/v01.mp4", thumb: "videos/gallery/v01.jpg", title: "Hot air balloon burner at night", cats: "adventure", size: "tall" },
  { type: "photo", src: "images/gallery/g13.jpg", thumb: "images/gallery/g13-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g08.jpg", thumb: "images/gallery/g08-thumb.jpg", title: "Hot air balloon at the fair", cats: "adventure", size: "tall" },
  { type: "photo", src: "images/gallery/g39.jpg", thumb: "images/gallery/g39-thumb.jpg", title: "VVIP cabin · VT-GIM", cats: "fleet", size: "wide" },
  { type: "video", src: "videos/gallery/v07.mp4", thumb: "videos/gallery/v07.jpg", title: "With the helicopter", cats: "fleet", size: "tall" },
  { type: "photo", src: "images/gallery/g37.jpg", thumb: "images/gallery/g37-thumb.jpg", title: "Shivgarh helipad, Lucknow", cats: "helipad", size: "tall" },
  { type: "photo", src: "images/gallery/g04.jpg", thumb: "images/gallery/g04-thumb.jpg", title: "Guests with the Robinson R44", cats: "fleet", size: "tall" },
  { type: "photo", src: "images/gallery/g06.jpg", thumb: "images/gallery/g06-thumb.jpg", title: "Climbing wall — adventure fest", cats: "adventure", size: "tall" },
  { type: "video", src: "videos/gallery/v05.mp4", thumb: "videos/gallery/v05.jpg", title: "Zorbing at the adventure fest", cats: "adventure", size: "wide" },
  { type: "photo", src: "images/gallery/g03.jpg", thumb: "images/gallery/g03-thumb.jpg", title: "Welcoming guests at the helipad", cats: "fleet", size: "tall" },
  { type: "photo", src: "images/gallery/g05.jpg", thumb: "images/gallery/g05-thumb.jpg", title: "On the flight line", cats: "", size: "tall" },
  { type: "video", src: "videos/gallery/v02.mp4", thumb: "videos/gallery/v02.jpg", title: "Balloon launch at the fair", cats: "adventure", size: "tall" },
  { type: "photo", src: "images/gallery/g09.jpg", thumb: "images/gallery/g09-thumb.jpg", title: "Balloon burner at night", cats: "adventure", size: "tall" },
  { type: "photo", src: "images/gallery/g10.jpg", thumb: "images/gallery/g10-thumb.jpg", title: "Charter guests with the crew", cats: "fleet", size: "tall" },
  { type: "photo", src: "images/gallery/g14.jpg", thumb: "images/gallery/g14-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "tall" },
  { type: "video", src: "videos/gallery/v04.mp4", thumb: "videos/gallery/v04.jpg", title: "Night balloon flight", cats: "adventure", size: "tall" },
  { type: "photo", src: "images/gallery/g15.jpg", thumb: "images/gallery/g15-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g16.jpg", thumb: "images/gallery/g16-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "tall" },
  { type: "photo", src: "images/gallery/g17.jpg", thumb: "images/gallery/g17-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g18.jpg", thumb: "images/gallery/g18-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g19.jpg", thumb: "images/gallery/g19-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g20.jpg", thumb: "images/gallery/g20-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g21.jpg", thumb: "images/gallery/g21-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g22.jpg", thumb: "images/gallery/g22-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "tall" },
  { type: "video", src: "videos/gallery/v06.mp4", thumb: "videos/gallery/v06.jpg", title: "Setting up an event ground", cats: "helipad", size: "tall" },
  { type: "photo", src: "images/gallery/g23.jpg", thumb: "images/gallery/g23-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "tall" },
  { type: "photo", src: "images/gallery/g24.jpg", thumb: "images/gallery/g24-thumb.jpg", title: "Helicopter on the helipad", cats: "fleet helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g25.jpg", thumb: "images/gallery/g25-thumb.jpg", title: "Pre-flight at the helipad", cats: "", size: "tall" },
  { type: "photo", src: "images/gallery/g26.jpg", thumb: "images/gallery/g26-thumb.jpg", title: "Boarding at the helipad", cats: "fleet helipad", size: "wide" },
  { type: "photo", src: "images/gallery/g27.jpg", thumb: "images/gallery/g27-thumb.jpg", title: "Helicopter joyride entrance", cats: "", size: "" },
  { type: "photo", src: "images/gallery/g28.jpg", thumb: "images/gallery/g28-thumb.jpg", title: "Event ground set-up", cats: "", size: "" },
  { type: "photo", src: "images/gallery/g29.jpg", thumb: "images/gallery/g29-thumb.jpg", title: "Flight desk on the move", cats: "", size: "" },
  { type: "photo", src: "images/gallery/g30.jpg", thumb: "images/gallery/g30-thumb.jpg", title: "Joyride registration desk", cats: "", size: "" },
  { type: "photo", src: "images/gallery/g31.jpg", thumb: "images/gallery/g31-thumb.jpg", title: "Helicopters on the field", cats: "fleet helipad", size: "tall" },
  { type: "photo", src: "images/gallery/g32.jpg", thumb: "images/gallery/g32-thumb.jpg", title: "Bell helicopter on the field", cats: "fleet helipad", size: "tall" },
  { type: "photo", src: "images/gallery/g33.jpg", thumb: "images/gallery/g33-thumb.jpg", title: "Helicopter line-up", cats: "fleet helipad", size: "tall" },
  { type: "video", src: "videos/gallery/v09.mp4", thumb: "videos/gallery/v09.jpg", title: "On the helipad field", cats: "helipad", size: "tall" },
  { type: "photo", src: "images/gallery/g40.jpg", thumb: "images/gallery/g40-thumb.jpg", title: "Agusta 109 Grand New", cats: "fleet", size: "wide" },
  { type: "photo", src: "images/gallery/g02.jpg", thumb: "images/gallery/g02-thumb.jpg", title: "Ready for take-off", cats: "fleet", size: "tall" },
];
