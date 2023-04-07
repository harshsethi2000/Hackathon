const axios = require("axios");

async function msCreateRooms(name, description) {
  let data = JSON.stringify({
    name: name,
    description: description,
    template_id: "642f010fc5062b7f2eb9e9b7",
    region: "IN",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.100ms.live/v2/rooms",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjQyZWZlMGRlYmQ3NmUxZjg5YWQ0OWY3IiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJpYXQiOjE2ODA4MDI3NjgsIm5iZiI6MTY4MDgwMjc2OCwiZXhwIjoxNjgwODg5MTY4LCJqdGkiOiIyMzNhMzVmYy0yOWVjLTRjODEtYmU3OC1hNmE5YmJhOGJjZGEifQ.MmROV2an1ffhl8ewDg-3dJSlEdazMAMFvYKjZCoaXkg",
      "Content-Type": "application/json",
    },
    data: data,
  };

  console.log(config);
  try {
    const response = await axios(config);
    return response?.data;
  } catch (err) {
    //console.error(err);
    throw err;
  }
}

async function startLiveStream(room_id, room_code) {
  let data = JSON.stringify({
    meeting_url: `https://purushottam-videoconf-2257.app.100ms.live/preview/${room_code}`,
    recording: {
      hls_vod: true,
      single_file_per_layer: true,
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://api.100ms.live/v2/live-streams/room/${room_id}/start`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjQyZWZlMGRlYmQ3NmUxZjg5YWQ0OWY3IiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJpYXQiOjE2ODA4MDI3NjgsIm5iZiI6MTY4MDgwMjc2OCwiZXhwIjoxNjgwODg5MTY4LCJqdGkiOiIyMzNhMzVmYy0yOWVjLTRjODEtYmU3OC1hNmE5YmJhOGJjZGEifQ.MmROV2an1ffhl8ewDg-3dJSlEdazMAMFvYKjZCoaXkg",
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios(config);
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createCodes(room_id) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://api.100ms.live/v2/room-codes/room/${room_id}`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjQyZWZlMGRlYmQ3NmUxZjg5YWQ0OWY3IiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJpYXQiOjE2ODA4MDI3NjgsIm5iZiI6MTY4MDgwMjc2OCwiZXhwIjoxNjgwODg5MTY4LCJqdGkiOiIyMzNhMzVmYy0yOWVjLTRjODEtYmU3OC1hNmE5YmJhOGJjZGEifQ.MmROV2an1ffhl8ewDg-3dJSlEdazMAMFvYKjZCoaXkg",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { msCreateRooms, startLiveStream, createCodes };
