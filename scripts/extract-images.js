const fs = require("fs"),
      request = require('request'),
      carddb = require("../assets/carddb.json"),
      slugify = require("slugify");

const download = (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    if (err) {
      console.log("Oopsie woopsie socket died 😢", err);
      return;
    }
    if(res) {
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(uri).pipe(fs.createWriteStream(`images/cards/${filename}.jpg`)).on('close', callback);
    }
  });
};

carddb.map(card => {
  let i = 1;
  card.card_images.map(img => {
    if (img.image_url) {
      download(img.image_url, `${card.id}-${i}`, () => {
        console.log(`Saved ${card.name} ${i}`);
      });
      i++;
    }
  });
});
