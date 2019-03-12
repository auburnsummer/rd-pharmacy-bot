let randomFacts = [
    "Jamaican Blue Mountain: Grown only in the high mountains to the north-east of Kingston, Jamaica, Blue Mountain coffee is renowned for its mild and creamy flavour. Hence, it's a popular choice for a daily drink.",
    "Guatemalan SHB: Coffee grown at an altitude of at least 1350 metres. Thanks to the environment it’s grown in, the coffee produced has a citrus-like acidity with a fruity, chocolate flavour.",
    "Maragogipe: Emerging spontaneiously from the Bahia region of Brazil, Maragogipe coffee beans are abnormally large, giving them the nickname \"Elephant Beans\". It is dried naturally before use, and produces a less acidic coffee than other varieties.",
    "Ethiopia Guji: Produced from the Guji region in southern Ethiopia, Guji beans are very carefully washed on raised beds before dying. The result is a coffee with a light, more floral flavour.",
    "Kenya Karatina AA: Kenya's famous coffee auction system is unique and leads to some of the world's most elegant coffee. Karatina AA is one of those: a rich, syrupy, and sweet coffee. The AA refers to the coffee only consisting of 'A' type beans, which are larger.",
    "Kenya AB: A product of Kenya's famous coffee auction system. AB refers to a mix of 'A' and 'B'-grade coffee beans; B-grade beans are slightly smaller. Although not as valuable as AA, it's still a premium coffee in its own right.",
    "Hawaiian Kona: Grown only on the slopes of the Kona districts in Hawaii, Kona is highly prized. Due to it's rarity, it is mostly blended with other coffee beans. A 100% Kona roast is a rare treat with fruit and cocoa flavours.",
    "Panama Baru Geisha: Produced from the rare Geisha tree in the Boqeute region of Panama, Baru Geisha is produced in very small lots and is dried inside the fruit before removing the bean. It has distinctive floral and chocolate tones."
]

exports.getRandomFact = () => {
    return randomFacts[Math.random() * randomFacts.length | 0]
}