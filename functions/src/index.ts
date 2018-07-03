import { getRadioRecordPodcast } from './radiorecord';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const saveToDatabase = async (items: PodcastItem[]) => {
  await admin.database().ref('/items').set(items);
}

export const update = functions.https.onRequest(async function onRequest(
  request,
  response
) {
  try {
    const { items } = await getRadioRecordPodcast();
    await saveToDatabase(items);
    response.send('OK');
  } catch (error) {
    response.status(503).send('NOT OK');
  }
});
