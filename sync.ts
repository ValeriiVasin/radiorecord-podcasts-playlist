import fs from 'fs';
import { getRadioRecordPodcast } from './functions/src/radiorecord';

(async () => {
  fs.writeFileSync(
    './feed.json',
    JSON.stringify(await getRadioRecordPodcast(), null, 2)
  );
})();
