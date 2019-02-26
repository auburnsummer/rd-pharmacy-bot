let randomFacts = [
    "Jamaican Blue Mountain: The Blue Mountains of Jamaica have a unique climate and volcanic soil advantageous for growing their famous high-quality coffee. The coffee undergoes a rigorous inspection process and is harvested in small quantities. This produces a rich coffee with a full aroma.",
    "Guatemalan SHB: Strictly Hard Bean (SHB) is a grade given to coffee grown at a high altitude of 4,500 feet above sea level. Thanks to the environment it’s grown in, the coffee produced has a citrus-like acidity with a fruity, chocolate flavor.",
    "Colombian Narino: The high altitude, rainy climate, and soil of the Columbian mountains creates a strong foundation for their high-quality coffee. Narino coffee has a creamy, viscous body that coats the mouth with fruity and nutty flavors"
]

exports.getRandomFact = () => {
    return randomFacts[Math.random() * randomFacts.length | 0]
}