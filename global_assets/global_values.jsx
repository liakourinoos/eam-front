export const cities = [
    "Αθήνα",        // Athens
    "Θεσσαλονίκη",  // Thessaloniki
    "Πάτρα",        // Patras
    "Λάρισα"        // Larissa
];

export const area = [
    { city: "Αθήνα", areas: ["Γαλάτσι", "Ηλιούπολη"] },
    { city: "Θεσσαλονίκη", areas: ["Τούμπα", "Καλαμαριά"] },
    { city: "Πάτρα", areas: ["Ρίο", "Αγυιά"] },
    { city: "Λάρισα", areas: ["Νεάπολη", "Φιλιππούπολη"] }
];

export const geitonia = [
    { area: "Γαλάτσι", geitonies: ["Ρίζου", "Νερουλού", "Αλσούπολη"] },
    { area: "Ηλιούπολη", geitonies: ["Αλσούπολη", "Κυψέλη", "Πλατεία Παπαδιαμάντη"] },
    { area: "Τούμπα", geitonies: ["Άνω Τούμπα", "Κάτω Τούμπα", "Σταυρούπολη"] },
    { area: "Καλαμαριά", geitonies: ["Κέντρο Καλαμαριάς", "Κρήνη", "Βυζάντιο"] },
    { area: "Ρίο", geitonies: ["Άγιος Βασίλειος", "Πανεπιστήμιο", "Καστελλόκαμπος"] },
    { area: "Αγυιά", geitonies: ["Πλατεία Γεωργίου", "Ψηλαλώνια", "Συντριβάνι"] },
    { area: "Νεάπολη", geitonies: ["Πλατεία Ταχυδρομείου", "Άγιος Γεώργιος", "Ανάληψη"] },
    { area: "Φιλιππούπολη", geitonies: ["Άγιος Αχίλλειος", "Δένδρα", "Νέα Σμύρνη"] }
];


export const hours = [
     "07:00 ", "08:00 ", "09:00 ", "10:00 ", "11:00 ",
    "12:00 ", "13:00 ", "14:00 ", "15:00 ", "16:00 ", "17:00 ",
    "18:00 ", "19:00 ", "20:00 ", "21:00 ", "22:00 ", "23:00 ",
    "00:00", "01:00 ", "02:00 ", "03:00 ", "04:00 ", "05:00 ",
    "06:00 ",
  ];
export const days = ["ΔΕΥ", "ΤΡΙ", "ΤΕΤ", "ΠΕΜ", "ΠΑΡ", "ΣΑΒ", "ΚΥΡ"];

// Randomly predefined availability matrix (7 days x 24 hours)
export const availabilityMatrix = [
    // Each row corresponds to an hour (from 00:00 to 23:00)
    [false, true, false, false, true, true, false],  // 00:00 (Monday to Sunday availability)
    [false, true, false, false, true, true, false],  // 01:00
    [true, false, true, false, false, true, false],  // 02:00
    [false, true, false, true, false, false, false], // 03:00
    [false, false, true, true, false, false, true],  // 04:00
    [false, true, false, true, false, false, false], // 05:00
    [true, true, true, false, false, true, false],   // 06:00
    [false, true, false, true, true, false, true],   // 07:00
    [true, false, false, false, true, true, true],   // 08:00
    [false, true, true, true, false, true, true],    // 09:00
    [false, false, false, false, true, true, false], // 10:00
    [true, true, true, false, true, true, true],     // 11:00
    [true, false, true, true, true, true, false],    // 12:00
    [false, true, false, false, true, false, true],  // 13:00
    [false, false, true, false, false, false, true], // 14:00
    [true, true, false, true, false, true, true],    // 15:00
    [false, true, false, true, true, false, false],  // 16:00
    [false, false, true, true, true, false, false],  // 17:00
    [true, false, false, false, true, false, true],  // 18:00
    [false, true, true, true, false, true, true],    // 19:00
    [true, true, false, true, true, false, false],   // 20:00
    [true, false, true, false, true, true, false],   // 21:00
    [false, false, true, true, false, true, true],   // 22:00
    [true, true, false, false, true, false, false],  // 23:00
  ];