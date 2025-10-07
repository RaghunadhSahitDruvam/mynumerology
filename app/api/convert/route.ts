import { NextRequest, NextResponse } from 'next/server';

// Numerology constants
// Group 1 (Pythagorean)
const G1 = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  "-": 0, "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
};

// Group 2 (Chaldean)
const G2 = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7,
  "-": 0, "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
};

// Group 3 (Custom/Alternative)
const G3 = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 10, K: 11, L: 12, M: 13, N: 14, O: 15, P: 16, Q: 17, R: 18,
  S: 19, T: 20, U: 21, V: 22, W: 23, X: 24, Y: 25, Z: 26,
  "-": 0, "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
};

// Helper function to calculate word value
function wordCount(word: string, group: Record<string, number>): number {
  let sum = 0;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    sum += group[letter] || 0;
  }
  return sum;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: "Name parameter is required" }, { status: 400 });
  }

  const upperName = name.trim().toUpperCase();
  const wordsArray = upperName.split(" ");

  let content_g1 = "";
  let content_g2 = "";
  let content_g3 = "";
  let content_g1_tot = "<tr>";
  let content_g2_tot = "<tr>";
  let content_g3_tot = "<tr>";
  let content_g1_wrd = "<tr>";
  let content_g2_wrd = "<tr>";
  let content_g3_wrd = "<tr>";

  let G1SUM = 0, G2SUM = 0, G3SUM = 0;
  let G1VSUM = 0, G2VSUM = 0, G3VSUM = 0;
  let G1NETSUM = 0, G2NETSUM = 0, G3NETSUM = 0;

  let n = wordsArray.length - 1;

  for (let key = 0; key < wordsArray.length; key++) {
    const word = wordsArray[key];
    let G1WSUM = 0, G2WSUM = 0, G3WSUM = 0;

    for (let k = 0; k < word.length; k++) {
      const letter = word[k];

      // Check if letter is a vowel or a number
      // Numbers are treated as consonants, so they only affect the total sum, not vowel sum
      if (["-", "A", "E", "I", "O", "U"].includes(letter)) {
        G1VSUM += G1[letter] || 0;
        G2VSUM += G2[letter] || 0;
        G3VSUM += G3[letter] || 0;
      }

      G1WSUM += G1[letter] || 0;
      G2WSUM += G2[letter] || 0;
      G3WSUM += G3[letter] || 0;
    }

    G1SUM += G1WSUM;
    G2SUM += G2WSUM;
    G3SUM += G3WSUM;

    G1NETSUM = G1SUM - G1VSUM;
    G2NETSUM = G2SUM - G2VSUM;
    G3NETSUM = G3SUM - G3VSUM;

    if (key !== wordsArray.length - 1) {
      content_g1 += "<tr>";
      let tot1 = 0;

      for (let k = 0; k < wordsArray.length; k++) {
        if (k >= n - 1) {
          tot1 += wordCount(wordsArray[k], G1);
        }

        if (k >= n) {
          content_g1 += `<td>${tot1}</td>`;
        } else {
          content_g1 += "<td>&nbsp;</td>";
        }
      }

      content_g1 += "</tr>";
      content_g2 += "<tr>";
      let tot2 = 0;

      for (let k = 0; k < wordsArray.length; k++) {
        if (k >= n - 1) {
          tot2 += wordCount(wordsArray[k], G2);
        }

        if (k >= n) {
          content_g2 += `<td>${tot2}</td>`;
        } else {
          content_g2 += "<td>&nbsp;</td>";
        }
      }

      content_g2 += "</tr>";
      content_g3 += "<tr>";
      let tot3 = 0;

      for (let k = 0; k < wordsArray.length; k++) {
        if (k >= n - 1) {
          tot3 += wordCount(wordsArray[k], G3);
        }

        if (k >= n) {
          content_g3 += `<td>${tot3}</td>`;
        } else {
          content_g3 += "<td>&nbsp;</td>";
        }
      }

      content_g3 += "</tr>";
    }

    content_g1_tot += `<td>${G1WSUM}</td>`;
    content_g2_tot += `<td>${G2WSUM}</td>`;
    content_g3_tot += `<td>${G3WSUM}</td>`;
    content_g1_wrd += `<td>${word}</td>`;
    content_g2_wrd += `<td>${word}</td>`;
    content_g3_wrd += `<td>${word}</td>`;

    n--;
  }

  const result = {
    name_g1_block: content_g1 + content_g1_tot + "</tr>" + content_g1_wrd + "</tr>",
    name_g2_block: content_g2 + content_g2_tot + "</tr>" + content_g2_wrd + "</tr>",
    name_g3_block: content_g3 + content_g3_tot + "</tr>" + content_g3_wrd + "</tr>",
    tot_letters: upperName.replace(/\s+/g, "").length,
    g1tot: G1SUM,
    g2tot: G2SUM,
    g3tot: G3SUM,
    g1vtot: G1VSUM,
    g2vtot: G2VSUM,
    g3vtot: G3VSUM,
    g1nettot: G1NETSUM,
    g2nettot: G2NETSUM,
    g3nettot: G3NETSUM,
    dob_tot: 0,
  };

  // Handle date of birth if provided
  const dob = searchParams.get('dob');
  if (dob) {
    const dobDigits = dob.replace(/-/g, "").split("");
    const dobSum1 = dobDigits.reduce(
      (sum, digit) => sum + parseInt(digit, 10),
      0
    );
    const dobSum2 = dobSum1
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    result.dob_tot = dobSum2;
  }

  return NextResponse.json(result);
}