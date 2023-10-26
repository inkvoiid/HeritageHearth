import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  infoArray: string[] = [
    'Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.',
    'The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.',
    'A day on Venus is longer than a year on Venus. Venus has an extremely slow rotation, taking about 243 Earth days to complete one rotation, while its orbit around the Sun takes only about 225 Earth days.',
    'Octopuses have three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body.',
    "Bananas are berries, but strawberries aren't. In botanical terms, bananas qualify as berries, while strawberries are considered aggregate fruits.",
    'The Eiffel Tower can be 15 cm taller during the summer due to the expansion of the iron structure in the heat.',
    "The original name of Bank of America was 'Bank of Italy' when it was founded in San Francisco in 1904 to serve the needs of immigrants.",
    'Cows have best friends and can become stressed when separated from them.',
    "The world's largest desert is not the Sahara but Antarctica. While most people associate deserts with hot, sandy places, a desert is technically defined by its low precipitation levels.",
    "In Japan, there is a practice called 'forest bathing' or 'shinrin-yoku,' which involves spending time in nature to improve physical and mental well-being.",
    'The Great Wall of China is not visible from space without aid. This common myth is not true. Astronauts can see it, but only with the help of binoculars or a zoom lens.',
    "A group of flamingos is called a 'flamboyance.'",
    'Honeybees can recognize human faces. They can remember and distinguish between different human faces, which is a remarkable ability for insects.',
    "The unicorn is Scotland's national animal. It has been a symbol of the country since the 12th century.",
    'Polar bears are nearly undetectable by infrared cameras because they are so well insulated. Their thick fur and blubber keep them warm, making them almost invisible in thermal imaging.',
    'The average person will spend six months of their life waiting for red lights to turn green.',
    "The longest hiccuping spree on record lasted 68 years. Charles Osborne began hiccuping in 1922 and didn't stop until 1990.",
    'The oldest known sample of the smallpox virus was found in the teeth of a 17th-century child buried in Lithuania.',
    'There are more possible iterations of a game of chess than there are atoms in the known universe.',
    "The world's oldest known living tree is a Great Basin bristlecone pine named 'Methuselah.' It's over 4,800 years old.",
    "A group of porcupines is called a 'prickle.'",
    'Cleopatra, the last Pharaoh of Egypt, was born closer to the construction of the first Pizza Hut than the Great Pyramid of Giza.',
  ];

  randomInfo: string = '';

  constructor() {
    this.randomInfo =
      this.infoArray[Math.floor(Math.random() * this.infoArray.length)];
  }
}
