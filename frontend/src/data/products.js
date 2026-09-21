const imageModules = import.meta.glob(
  "../assets/images/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const categoryOrder = [
  "Hindu",
  "Christian",
  "Muslim",
  "Wedding",
  "Birthday",
  "Engagement",
  "Anniversary",
  "Housewarming",
  "Traditional",
  "Floral",
  "Luxury",
  "Save the Date",
  "Other Celebrations",
];

const categoryInfo = {
  All: {
    title: "All Invitations",
    shortTitle: "Every Celebration",
    quote:
      "A little piece of joy, beautifully wrapped in your story.",
    description:
      "Explore every invitation design in our collection, from timeless weddings to joyful celebrations.",
    icon: "✦",
  },

  Hindu: {
    title: "Hindu Wedding Invitations",
    shortTitle: "Tradition & Blessings",
    quote:
      "Tradition, blessings and a beautiful beginning.",
    description:
      "Celebrate sacred moments with traditional Indian wedding invitation designs.",
    icon: "🪷",
  },

  Christian: {
    title: "Christian Wedding Invitations",
    shortTitle: "Love & Faith",
    quote:
      "May love, faith and joy fill your new beginning.",
    description:
      "Elegant invitation designs for Christian wedding celebrations.",
    icon: "✝",
  },

  Muslim: {
    title: "Muslim Wedding Invitations",
    shortTitle: "Grace & Blessings",
    quote:
      "A celebration of love, grace and beautiful blessings.",
    description:
      "Graceful invitation designs for meaningful Muslim wedding celebrations.",
    icon: "☪",
  },

  Wedding: {
    title: "Wedding Invitations",
    shortTitle: "Beautiful Beginnings",
    quote:
      "Together is a beautiful place to be.",
    description:
      "Discover beautiful wedding invitation designs created for unforgettable celebrations.",
    icon: "💍",
  },

  Birthday: {
    title: "Birthday Invitations",
    shortTitle: "Celebrate Your Day",
    quote:
      "Make a wish, celebrate the moment, remember it forever.",
    description:
      "Fun, elegant and memorable birthday invitation designs for every age.",
    icon: "🎂",
  },

  Engagement: {
    title: "Engagement Invitations",
    shortTitle: "The Beginning",
    quote:
      "From this day, a lifetime of togetherness begins.",
    description:
      "Beautiful engagement invitations for the first chapter of forever.",
    icon: "💎",
  },

  Anniversary: {
    title: "Anniversary Invitations",
    shortTitle: "Love Through The Years",
    quote:
      "Still choosing each other, year after year.",
    description:
      "Celebrate beautiful milestones with elegant anniversary invitation designs.",
    icon: "🥂",
  },

  Housewarming: {
    title: "Housewarming Invitations",
    shortTitle: "A New Beginning",
    quote:
      "New walls, new memories, a beautiful new chapter.",
    description:
      "Warm and welcoming invitation designs for your new home celebration.",
    icon: "🏡",
  },

  Traditional: {
    title: "Traditional Invitations",
    shortTitle: "Timeless Elegance",
    quote:
      "Timeless details for traditions worth celebrating.",
    description:
      "Classic designs inspired by rich traditions and timeless celebrations.",
    icon: "👑",
  },

  Floral: {
    title: "Floral Invitations",
    shortTitle: "Blooming Love",
    quote:
      "Let every bloom tell a little part of your story.",
    description:
      "Soft floral designs filled with romance, beauty and delicate details.",
    icon: "🌸",
  },

  Luxury: {
    title: "Luxury Invitations",
    shortTitle: "Premium Celebrations",
    quote:
      "For celebrations that deserve an extraordinary beginning.",
    description:
      "Premium invitation designs created for sophisticated celebrations.",
    icon: "✨",
  },

  "Save the Date": {
    title: "Save the Date",
    shortTitle: "A Day To Remember",
    quote:
      "A beautiful first announcement for a day worth remembering.",
    description:
      "Make your special date unforgettable with an elegant first announcement.",
    icon: "📅",
  },

  "Other Celebrations": {
    title: "Other Celebrations",
    shortTitle: "More Beautiful Moments",
    quote:
      "Beautiful designs for every celebration.",
    description:
      "Explore the rest of our celebration-inspired invitation collection.",
    icon: "🎉",
  },
};

/* =========================================
   HELPERS
========================================= */

function getFileName(path) {
  return path.split("/").pop() || "";
}

function getBaseName(fileName) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .trim();
}

function cleanWords(value) {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");
}

function getProductName(fileName) {
  const baseName = getBaseName(fileName);

  const cleaned = cleanWords(baseName);

  return titleCase(cleaned)
    .replace(
      /\b(Chatgpt Image Sep 19 2026 03 23 55 Pm)\b/i,
      "Special Celebration Invitation"
    );
}

/* =========================================
   CATEGORY DETECTION
   IMPORTANT:
   One image gets ONE primary category.
   Therefore no image duplication.
========================================= */

function detectCategory(fileName) {
  const text = fileName
    .toLowerCase()
    .replace(/[_-]+/g, " ");

  /* Birthday first */
  if (
    /birthday|birth day|birthday party|sweet-16|sweet 16/.test(
      text
    )
  ) {
    return "Birthday";
  }

  /* Housewarming */
  if (
    /housewarming|house warming|new home|new-home|home celebration/.test(
      text
    )
  ) {
    return "Housewarming";
  }

  /* Anniversary */
  if (
    /anniversary/.test(text)
  ) {
    return "Anniversary";
  }

  /* Engagement */
  if (
    /engagement|engaged/.test(text)
  ) {
    return "Engagement";
  }

  /* Save the date */
  if (
    /save.*date|save-date|save the date|ve-the-date/.test(
      text
    )
  ) {
    return "Save the Date";
  }

  /* Religious categories */
  if (
    /hindu|hindhu|tamil brahmin|brahmin/.test(
      text
    )
  ) {
    return "Hindu";
  }

  if (
    /christian|christ/.test(text)
  ) {
    return "Christian";
  }

  if (
    /muslim|islam|nikah|nikkah/.test(text)
  ) {
    return "Muslim";
  }

  /* Traditional */
  if (
    /traditional|royal|peacock|golden|ganesha|kerala|south indian|south-indian/.test(
      text
    )
  ) {
    return "Traditional";
  }

  /* Floral */
  if (
    /floral|flora|flower|leaf|garden|botanical/.test(
      text
    )
  ) {
    return "Floral";
  }

  /* Luxury */
  if (
    /luxury|premium|emerald|royal blue|royal-blue|gold/.test(
      text
    )
  ) {
    return "Luxury";
  }

  /* General wedding */
  if (
    /wedding|wed|bride|groom|invitation|invite|ceremony|marriage|love story|love-story|card/.test(
      text
    )
  ) {
    return "Wedding";
  }

  return "Other Celebrations";
}

/* =========================================
   LOAD IMAGES
========================================= */

const seenSources = new Set();

const loadedImages = Object.entries(
  imageModules
)
  .map(([path, src]) => ({
    path,
    src,
    fileName: getFileName(path),
  }))
  .filter(
    (item) => {
      const base =
        getBaseName(
          item.fileName
        ).toLowerCase();

      /*
        Only these two are excluded
        from the product catalogue.
      */
      return (
        base !== "logo" &&
        base !== "illustration"
      );
    }
  )
  .filter((item) => {
    /*
      Avoid displaying exactly the same
      loaded source more than once.
    */
    if (seenSources.has(item.src)) {
      return false;
    }

    seenSources.add(item.src);

    return true;
  });

/* =========================================
   CREATE PRODUCTS
========================================= */

const products = loadedImages.map(
  (item, index) => {
    const category =
      detectCategory(
        item.fileName
      );

    const id =
      `${item.fileName
        .toLowerCase()
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}-${index}`;

    const price =
      299 +
      ((index * 137) % 1400);

    const oldPrice =
      price +
      250 +
      ((index * 53) % 500);

    const rating =
      Number(
        (
          4.6 +
          ((index % 4) * 0.1)
        ).toFixed(1)
      );

    const reviews =
      24 +
      ((index * 17) % 180);

    let badge = "Featured";

    if (index % 9 === 0) {
      badge = "Bestseller";
    } else if (index % 7 === 0) {
      badge = "Premium";
    } else if (index % 5 === 0) {
      badge = "New";
    } else if (index % 3 === 0) {
      badge = "Popular";
    }

    return {
      id,
      name:
        getProductName(
          item.fileName
        ),
      category,
      price,
      oldPrice,
      rating,
      reviews,
      image: item.src,
      description:
        categoryInfo[
          category
        ]?.description ||
        "Beautifully crafted invitation design for your special celebration.",
      badge,
      sourceFile:
        item.fileName,
    };
  }
);

/* =========================================
   AVAILABLE CATEGORIES
========================================= */

const availableCategories =
  categoryOrder.filter(
    (category) =>
      products.some(
        (product) =>
          product.category ===
          category
      )
  );

export const categories = [
  "All",
  ...availableCategories,
];

export const categoryMeta = {
  ...categoryInfo,
};

export default products;