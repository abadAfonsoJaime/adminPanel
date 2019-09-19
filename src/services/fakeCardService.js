const cards = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Gana un viaje",
    description:
      "Participa en nuestro concurso de verano y podrás ganar un viaje a Canarias de 1 semana de duración con todos los gastos pagados",
    buttonText: "click aquí",
    landingPage: "https://www.google.es",
    isVisible: true
    //publishDate: "2018-08-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Consigue un premio",
    description:
      "Participa en nuestro concurso de verano  Canarias de 1 semana de duración con todos los gastos pagados",
    buttonText: "dame el premio",
    landingPage: "https://www.google.es",
    isVisible: true
    //publishDate: "2018-06-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Participa en el sorteo",
    description:
      "Participa en nuestro concurso de verano y podrás ganar un viaje a Canarias de todos los gastos pagados",
    buttonText: "Quiero participar",
    landingPage: "https://www.google.es",
    isVisible: true
    //publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    title: "Participa en el sorteo",
    description:
      "Participa en nuestro concurso de verano y podrás ganar un viaje a Canarias de 1 semana de duración con ",
    buttonText: "participar",
    landingPage: "https://www.google.es",
    isVisible: false
    //publishDate: "2018-02-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Gana un premio",
    description:
      "Participa en nuestro concurso de verano y podrás ganar un viaje a Canarias con todos los gastos pagados",
    buttonText: "dame el premio",
    landingPage: "https://www.google.es",
    isVisible: false
    //publishDate: "2018-03-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471836",
    title: "Gana un premio",
    description:
      "Participa en nuestro concurso de verano y podrás ganar un viaje a Canarias de 1 semana de duración con todos los gastos pagados",
    buttonText: "dame el premio",
    landingPage: "https://www.google.es",
    isVisible: true
    //publishDate: "2018-06-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471837",
    title: "Gana un viaje a Paris",
    description:
      "Participa en nuestro concurso de verano  Canarias de 1 semana de duración con todos los gastos pagados",
    buttonText: "click",
    landingPage: "https://www.google.es",
    isVisible: true
    //publishDate: "2018-07-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471838",
    title: "Consigue un cupón de Amazon",
    description:
      "Participa en nuestro concursoy podrás ganar 100€ para gastar en productos de Amazon",
    buttonText: "click",
    landingPage: "https://www.google.es",
    isVisible: true
    //publishDate: "2018-01-08T18:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471839",
    title: "Gana un viaje a Japón",
    description:
      "Participa en nuestro concurso y podrás ganar un viaje a Japón de 1 semana de duración con ",
    buttonText: "click",
    landingPage: "https://www.google.es",
    isVisible: false
    //publishDate: "2018-02-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471820",
    title: "Gana un viaje a México",
    description:
      "Participa en nuestro sorteo de un viaje a México con todos los gastos pagados",
    buttonText: "click",
    landingPage: "https://www.google.es",
    isVisible: false
    //publishDate: "2018-03-04T19:04:28.809Z"
  }
];

export function getCards() {
  return cards;
}

export function getCardById(id) {
  return cards.find(c => c._id === id);
}

export function saveCard(theCard) {
  let cardInDB = cards.find(c => c._id === theCard._id) || {};
  if (cardInDB) {
    const index = cards.indexOf(cardInDB);
    console.log(cardInDB);
    // cards[index].title = theCard.title;
    // cards[index].description = theCard.description;
    // cards[index].buttonText = theCard.buttonText;
    // cards[index].landingPage = theCard.landingPage;
    // cards[index].isVisible = theCard.isVisible;
  }

  if (!cardInDB._id) {
    cardInDB._id = Date.now().toString();
    cardInDB.title = theCard.title;
    cardInDB.description = theCard.description;
    cardInDB.buttonText = theCard.buttonText;
    cardInDB.landingPage = theCard.landingPage;
    cardInDB.isVisible = theCard.isVisible;
    cards.push(cardInDB);
  }
  return cardInDB;
}

export function deleteCard(id) {
  let cardInDB = cards.find(c => c._id === id);
  cards.splice(cards.indexOf(cardInDB), 1);
  return cardInDB;
}
