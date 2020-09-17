const CronJob = require('cron').CronJob;

const getTimeExpression = (hh, mm) => {
  const hour12 = !hh || hh == 12 ? 12 : hh % 12;
  let first, middle, last;

  if (mm < 10){
    first = hour12;
    middle = 'o';
    last = mm == 0 ? 'clock' : mm;
  } else if (mm == 15 || mm == 45) {
    first = 'quarter';
    middle = mm == 15 ? 'past' : 'to';
    last = mm == 15 ? hour12 : hour12 + 1;
  } else if (mm < 30) {
    first = mm;
    middle = 'past';
    last = hour12;
  } else if (mm == 30) {
    first = 'half';
    middle = 'past';
    last = hour12;
  } else {
    first = 60 - mm;
    middle = 'to';
    last = 1 + hour12;
  }

  return `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${first}%20${middle}%20${last}`;
}

const job = new CronJob('0 */30 * * * *', () => {
  const audioSpeaker = document.getElementById('speak');
  const getNow = Date.now();
  const hh = new Date(getNow).getHours();
  const mm = new Date(getNow).getMinutes();

  audioSpeaker.src = getTimeExpression(hh, mm);
  const promise = audioSpeaker.play();
  if (promise !== undefined) {
    promise.then(_ => {
      // Autoplay started!
    }).catch(error => {
  	  audioSpeaker.controls = true;
    });
  }
}, null, true, 'America/Los_Angeles');
job.start();
