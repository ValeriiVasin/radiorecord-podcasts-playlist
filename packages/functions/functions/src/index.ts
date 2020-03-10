import { getRadioRecordPodcast } from "./radiorecord";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const saveToDatabase = async (items: PodcastItem[]) => {
  await admin
    .database()
    .ref("/items")
    .set(items);
};

// http://localhost:5000/itunes-podcasts/us-central1/hello
export const hello = functions.https.onRequest(async function onRequest(
  _,
  response
) {
  response.status(200).send("OK");
});

export const update = functions.https.onRequest(async function onRequest(
  request,
  response
) {
  const key = request.query.key;

  if (key !== functions.config().podcasts.key) {
    response.status(403).send("NOT ALLOWED");
    return;
  }

  try {
    const { items } = await getRadioRecordPodcast();
    await saveToDatabase(items);
    response.send("OK");
  } catch (error) {
    response.status(503).send("NOT OK");
  }
});
