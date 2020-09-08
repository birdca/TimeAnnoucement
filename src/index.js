const CronJob = require('cron').CronJob;

const job = new CronJob('0 0 * * * *', () => {
  const audioSpeaker = document.getElementById('speak');
  const hr = new Date(Date.now()).getHours();

  audioSpeaker.src = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${hr}+o%27clock`;
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
