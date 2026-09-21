const imageModules = import.meta.glob(
  "../assets/images/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

/* =========================================================
   SALE IMAGE DETECTION

   These are the NEW SALE images you showed in the
   screenshots.

   logo + Illustration are always excluded.
========================================================= */

const SALE_KEYWORDS = [
  "traditional-temple-wedding",
  "aadhya-akalap",
  "pamela-richard",
  "blue-modern-wedding",
  "rhaenyra-daemon",
  "lakhem-anushka",
  "elegant-lavender",
  "pastel-floral",
  "lavender-butterfly",
  "purple-butterfly",
  "purple-lace",
  "lavender-lace",
  "maroon-save-the-date",
  "maroon-gold-save",
  "colorful-floral",
  "traditional-indian",
  "pastel-green",
  "navy-blue",
  "sh ivam-veronica",
  "shivam-veronica",
  "ayush-sakshi",
  "prem-priya",
  "red-gold-wedding",
  "maroon-gold-luxury",
  "maroon-gold-wedding",
  "maroon-gold-traditional",
  "maroon-gold-royal",
  "red-heart",
  "pink-scaloped",
  "pink-burgundy",
  "burgundy-ribbon",
  "maroon-floral",
  "maroon-save",
  "cream-gold",
  "cream-gold-paisley",
  "heart-themed",
  "vintage-black",
  "elegant-floral",
  "colorful-traditional",
  "elegant-botanical",
  "butterfly-floral",
  "floral-romantic",
];

/* =========================================================
   HELPERS
========================================================= */

function getFileName(path) {
  return path.split("/").pop() || "";
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeProductName(fileName) {
  return normalize(
    fileName.replace(/\.[^/.]+$/, "")
  )
    .split(" ")
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

function isSaleImage(fileName) {
  const text = fileName
    .toLowerCase()
    .replace(/[_-]+/g, " ");

  return SALE_KEYWORDS.some((keyword) =>
    text.includes(
      keyword.replace(/[_-]+/g, " ").toLowerCase()
    )
  );
}

function getTheme(fileName) {
  const text = normalize(fileName);

  if (
    /birthday|sweet 16|birth day/.test(text)
  ) {
    return "Birthday";
  }

  if (/engagement/.test(text)) {
    return "Engagement";
  }

  if (/anniversary/.test(text)) {
    return "Anniversary";
  }

  if (
    /housewarming|new home/.test(text)
  ) {
    return "Housewarming";
  }

  if (
    /hindu|temple|ganesha/.test(text)
  ) {
    return "Hindu";
  }

  if (
    /christian|church/.test(text)
  ) {
    return "Christian";
  }

  if (
    /muslim|nikah|islam/.test(text)
  ) {
    return "Muslim";
  }

  if (
    /floral|flora|flower|butterfly|botanical/.test(
      text
    )
  ) {
    return "Floral";
  }

  if (
    /lavender|purple|pastel|pink/.test(
      text
    )
  ) {
    return "Floral";
  }

  if (
    /luxury|premium|gold|royal/.test(text)
  ) {
    return "Luxury";
  }

  if (
    /save the date|save the date/.test(text)
  ) {
    return "Save the Date";
  }

  if (
    /traditional|maroon|navy|cream/.test(
      text
    )
  ) {
    return "Traditional";
  }

  return "Wedding";
}

function getColor(fileName) {
  const text =
    fileName.toLowerCase();

  if (
    /red|maroon|burgundy|heart/.test(text)
  ) {
    return "Red";
  }

  if (
    /purple|lavender|violet/.test(text)
  ) {
    return "Purple";
  }

  if (/pink|pastel/.test(text)) {
    return "Pink";
  }

  if (/blue|navy|cyan/.test(text)) {
    return "Blue";
  }

  if (/green|emerald/.test(text)) {
    return "Green";
  }

  if (/gold|cream|beige/.test(text)) {
    return "Gold";
  }

  if (/brown|tan/.test(text)) {
    return "Brown";
  }

  return "Mixed";
}

function getCardType(fileName) {
  const text =
    fileName.toLowerCase();

  if (text.includes("suite")) {
    return "Invitation Suite";
  }

  if (text.includes("ribbon")) {
    return "Ribbon";
  }

  if (text.includes("scroll")) {
    return "Scroll";
  }

  if (
    text.includes("laser") ||
    text.includes("cut")
  ) {
    return "Laser Cut";
  }

  return "Wedding Card";
}

/* =========================================================
   BUILD SALE COLLECTION
========================================================= */

const usedSources =
  new Set();

const saleProducts = Object.entries(
  imageModules
)
  .filter(([path, src]) => {
    const fileName =
      getFileName(path);

    const baseName =
      fileName
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .trim();

    /* Always exclude */
    if (
      baseName === "logo" ||
      baseName === "illustration"
    ) {
      return false;
    }

    /* Only screenshot-sale images */
    if (
      !isSaleImage(fileName)
    ) {
      return false;
    }

    /* No duplicate image */
    if (usedSources.has(src)) {
      return false;
    }

    usedSources.add(src);

    return true;
  })
  .map(
    ([path, src], index) => {
      const fileName =
        getFileName(path);

      /*
        Reference-style:
        everything in this collection
        displays 50% OFF.
      */
      const oldPrice =
        799 +
        ((index * 177) % 2401);

      const price =
        Math.round(
          oldPrice / 2
        );

      const theme =
        getTheme(fileName);

      return {
        id: `sale-${index + 1}`,

        name:
          makeProductName(
            fileName
          ),

        image: src,

        category: theme,

        theme,

        color:
          getColor(fileName),

        cardType:
          getCardType(fileName),

        price,

        oldPrice,

        salePercent: 50,

        badge: "50% OFF",

        rating: Number(
          (
            4.7 +
            ((index % 3) * 0.1)
          ).toFixed(1)
        ),

        reviews:
          42 +
          ((index * 17) % 180),

        isSale: true,

        description:
          `Elegant ${theme.toLowerCase()} invitation from the Cherish special offer collection.`,

        sourceFile:
          fileName,
      };
    }
  );

export const saleThemes = [
  "All",
  ...Array.from(
    new Set(
      saleProducts.map(
        (item) =>
          item.theme
      )
    )
  ),
];

export const saleColors = [
  "All",
  ...Array.from(
    new Set(
      saleProducts.map(
        (item) =>
          item.color
      )
    )
  ),
];

export const saleCardTypes = [
  "All",
  ...Array.from(
    new Set(
      saleProducts.map(
        (item) =>
          item.cardType
      )
    )
  ),
];

console.log(
  "Cherish Sale Products:",
  saleProducts.length
);

console.log(
  "Cherish Sale Images:",
  saleProducts.map(
    (item) =>
      item.sourceFile
  )
);

export default saleProducts;