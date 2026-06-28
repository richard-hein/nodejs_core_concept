// Controllers
const User = require("./controllers/user");
const Video = require("./controllers/video");

module.exports = (server) => {
  // ------------------------------------------------ //
  // ************ USER ROUTES ************* //
  // ------------------------------------------------ //

  // Log a user in and give them a token
  server.post("/api/login", User.logUserIn);

  // Log a user out
  server.delete("/api/logout", User.logUserOut);

  // Send user info
  server.get("/api/user", User.sendUserInfo);

  // Update a user info
  server.put("/api/user", User.updateUser);

  // ------------------------------------------------ //
  // ************ VIDEO ROUTES ************* //
  // ------------------------------------------------ //

  // Return the list of all the videos that a logged in user has uploaded
  server.get("/api/videos", Video.getVideos);

  // Upload a video file
  server.post("/api/upload-video", Video.uploadVideo);

  // Extract the audio for a video file (can only be done once per video)
  server.patch("/api/video/extract-audio", Video.extractAudio);

  // Resize a video file (creates a new video file)
  server.put("/api/video/resize", Video.resizeVideo);

  // Return a video asset to the client
  server.get("/get-video-asset", Video.getVideoAsset);
};
