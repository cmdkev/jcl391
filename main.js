/* eslint-disable no-unused-vars */
const SECOND = 1000;
const MINUTE = 60000;
const RANDOM_OFFSET = Math.floor(Math.random() * 21000);
const rand = () => Math.floor(Math.random() * 21000);
function prepYouTube({link, time}) {
  return {
    url: `https://www.youtube.com/embed/${link}?rel=0;&autoplay=1&mute=1`,
    timeToDisplay: time,
    type: 'page'
  };
}
// WANT TO ADD SOMETHING NEW?
// FIND A SIMILAR ITEM, video/page/image, COPY IT. DOESN"T MATTER WHERE IT GOES.
// INSERT IT AS APPROPRIATE INTO THE ADDRESSES ARRAY BELOW

const CODE_FUZZER = {
  url:
    'https://github.com/uchicago-vis-pl-lab/vis-pl-lab/raw/master/assets/code-fuzzer.jpg',
  timeToDisplay: 0.5 * MINUTE,
  type: 'image'
};

// const BALLOONS = prepYouTube({
//   link: 'ENUibJRdlkk',
//   time: MINUTE * 2 + 10 * SECOND
// });
const CAMPFIRE = prepYouTube({
  link: 'sWtEYPva4A0',
  time: MINUTE * 1
})

const addresses = [
  CODE_FUZZER,
  CAMPFIRE
];
//  SOME EXAMPLES:
// const LLVM_ART = {
//   url:
//     'https://github.com/uchicago-vis-pl-lab/vis-pl-lab/raw/master/assets/llvm-art.jpg',
//   timeToDisplay: 0.5 * MINUTE,
//   type: 'image'
// };
// const DALLE_STUFF = [
//   'future-calc',
//   'dalle-logo-1',
//   'dalle-logo-2',
//   'dalle-logo-3',
//   'dalle-logo-4',
//   'ai-image-1',
//   'ai-image-2',
//   'ai-image-3',
//   'ai-image-4',
//   'ai-image-5',
//   'ai-image-6',
// ].map(x => ({  url:
//     `https://github.com/uchicago-vis-pl-lab/vis-pl-lab/raw/master/assets/${x}.png`,
//   timeToDisplay: 0.75 * MINUTE,
//   type: 'image'}))
// ---
// const FORUM_EXPLORER = {
//   url:
//     'https://github.com/uchicago-vis-pl-lab/vis-pl-lab/raw/master/assets/forum-explorer-ff-short.mp4',
//   timeToDisplay: SECOND * 31,
//   type: 'video'
// };
// ---
// const WEATHER_CHANNEL_AD = {
//   url: 'https://www.youtube.com/embed/X05DrscHFZQ?rel=0;&autoplay=1&mute=1',
//   timeToDisplay: 7 * MINUTE + 20 * SECOND,
//   type: 'page'
// };
// ---
// const BAD_GOVERNMENT = {
//   url: `https://www.youtube.com/embed/kY9P7ruzOy4?rel=0;&autoplay=1&mute=1&start=${RANDOM_OFFSET}`,
//   timeToDisplay: 1.0 * MINUTE,
//   type: 'page'
// };
// ---
// const TRAIN_LINES = [
//   // {link: 'PPbTYFAFAic', time: 4.0 * MINUTE, color: 'CALIFORNIA'},
//   {link: 'm9geCp5I0Ho', time: MINUTE * 16 + SECOND * 49, color: 'purple'},
//   // {link: '6bU5n93Jp1k', time: MINUTE * 11 + SECOND * 28, color: 'brown'}
//   // {link: 'RHTUDwud5Ag', time: MINUTE * 13 + SECOND * 22, color: 'blue'},
//   {link: 'YygD5TDWbBI', time: MINUTE * 3 + SECOND * 50, color: 'yellow'},
//   // {link: 'Wseu1CTuxrs', time: MINUTE * 10, color: 'red'}
// ]
//   .map(prepYouTube)
//   .filter(() => Math.random() > 0.5);
// ---

// EXAMPLES USING prepYouTube
// const COLORS_OF_THE_YEAR = [
//   // {link: 'TSCN_-gIbVg', time: 1 * MINUTE + 17 * SECOND, color: 'blue'},
//   // {link: '8zC75u81VKg', time: 1 * MINUTE + 9 * SECOND, color: 'greenery'}
//   {link: 'DpOjWPKT0QM', time: 0.25 * MINUTE, color: 'pink'}
// ].map(prepYouTube);
// ---
// const AIR_LINE_SAFTY_VIDEOS = [
//   {link: 'VTU8hdMb8hE', time: MINUTE * 3 + SECOND * 11}
// ].map(prepYouTube);
// ---
// const BALLOONS = prepYouTube({
//   link: 'ENUibJRdlkk',
//   time: MINUTE * 2 + 10 * SECOND
// });
// ---
// const BEARS = {
//   // note: the stuff after the ? enables the live-stream
//   url: 'https://www.youtube.com/embed/qWlU7hWEl8c?rel=0;&autoplay=1&mute=1',
//   timeToDisplay: 2 * MINUTE,
//   type: 'page'
// };

const pagesToCheckBase = ['index.html', 'main.css', 'main.js'];
const checkIntervalSeconds = 30;
let lastVersion = '';
function refreshIfNeeded() {
  let thisVersion = new Blob();

  function checkPages(pagesToCheck) {
    // head element
    const pageToCheck = pagesToCheck[0];
    // rest of list
    pagesToCheck = pagesToCheck.slice(1);

    fetch(pageToCheck)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
      })
      .then(pageText => {
        thisVersion += pageText;
        if (pagesToCheck.length > 0) {
          checkPages(pagesToCheck);
        } else {
          if (lastVersion.length === 0) {
            lastVersion = thisVersion;
          } else if (lastVersion !== thisVersion) {
            location.reload(true);
          }
          setTimeout(refreshIfNeeded, checkIntervalSeconds * SECOND);
        }
      });
  }

  checkPages(pagesToCheckBase);
}
// Load up the initial version to compare against.
refreshIfNeeded();

let idx = Math.floor(Math.random() * addresses.length);
const slider = document.getElementById('progress-bar-foreground');
function setPage() {
  // const nextAddress = addresses[Math.floor(Math.random() * addresses.length)];
  const nextAddress = addresses[idx];
  // preemptively deactivate everything
  const frame = document.getElementById('content-frame');
  const picHolder = document.getElementById('pic-holder');
  const videoHolder = document.getElementById('video-holder');
  frame.setAttribute('src', '');
  videoHolder.setAttribute('src', '');
  frame.setAttribute('class', 'hide-holder');
  picHolder.setAttribute('class', 'hide-holder');
  videoHolder.setAttribute('class', 'hide-holder');

  switch (nextAddress.type) {
    default:
    case 'image':
      picHolder.setAttribute('class', 'show-holder');
      picHolder.setAttribute(
        'style',
        `background-image:url(${nextAddress.url})`
      );
      break;
    case 'page':
      frame.setAttribute('class', 'show-holder');
      frame.setAttribute('src', nextAddress.url);
      break;
    case 'video':
      videoHolder.setAttribute('class', 'show-holder');
      videoHolder.setAttribute('src', nextAddress.url);
      break;
    case 'animation':
      frame.setAttribute('class', 'show-holder');
      frame.setAttribute('src', nextAddress.url +
        '?' + (new URLSearchParams(nextAddress.params)).toString());
      break;
  }
  let percentDone = 0;
  const updateSpeed = SECOND * 0.5;
  const stepSize = (updateSpeed / nextAddress.timeToDisplay) * 100;
  const updater = setInterval(() => {
    percentDone += stepSize;
    slider.setAttribute('style', `left: ${percentDone}%;`);
  }, updateSpeed);
  setTimeout(() => {
    idx = (idx + 1) % addresses.length;
    clearInterval(updater);
    slider.setAttribute('style', 'left: 0;');
    setPage();
  }, nextAddress.timeToDisplay);
}
setPage();
