// Simple Fraction class for exact ratio calculations
class Fraction {
    constructor(numerator, denominator = 1) {
        if (denominator === 0) throw new Error("Denominator cannot be zero");
        const gcd = this._gcd(Math.abs(numerator), Math.abs(denominator));
        this.numerator = numerator / gcd;
        this.denominator = denominator / gcd;
        if (this.denominator < 0) {
            this.numerator = -this.numerator;
            this.denominator = -this.denominator;
        }
    }

    _gcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    limitDenominator(maxDenominator) {
        if (this.denominator <= maxDenominator) return this;
        
        let bestNum = 0;
        let bestDen = 1;
        let bestError = Infinity;
        
        for (let den = 1; den <= maxDenominator; den++) {
            const num = Math.round((this.numerator * den) / this.denominator);
            const error = Math.abs((num / den) - (this.numerator / this.denominator));
            if (error < bestError) {
                bestNum = num;
                bestDen = den;
                bestError = error;
            }
        }
        
        return new Fraction(bestNum, bestDen);
    }

    asIntegerRatio() {
        return [this.numerator, this.denominator];
    }

    valueOf() {
        return this.numerator / this.denominator;
    }
}

// Helper function to create Fraction from number
function createFraction(value, maxDenominator = null) {
    if (typeof value === 'number') {
        const fraction = new Fraction(Math.round(value * 1000000), 1000000);
        return maxDenominator ? fraction.limitDenominator(maxDenominator) : fraction;
    }
    return value;
}

// GCD and LCM functions
function gcd(...numbers) {
    if (numbers.length === 0) return 0;
    if (numbers.length === 1) return Math.abs(numbers[0]);
    
    let result = Math.abs(numbers[0]);
    for (let i = 1; i < numbers.length; i++) {
        result = _gcdPair(result, Math.abs(numbers[i]));
        if (result === 1) return 1;
    }
    return result;
}

function _gcdPair(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(...numbers) {
    if (numbers.length === 0) return 0;
    if (numbers.length === 1) return Math.abs(numbers[0]);
    
    let result = Math.abs(numbers[0]);
    for (let i = 1; i < numbers.length; i++) {
        result = Math.abs(result * numbers[i]) / _gcdPair(result, Math.abs(numbers[i]));
    }
    return result;
}

// Data structures
const musical_range = [
    'C0', 'C#0', 'D0', 'D#0', 'E0', 'F0', 'F#0', 'G0', 'G#0', 'A0', 'A#0', 'B0', 'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', 'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', 'C8', 'C#8', 'D8', 'D#8', 'E8', 'F8', 'F#8', 'G8', 'G#8', 'A8', 'A#8', 'B8'
];

const musical_range_frequencies = {
    'C0': 16.35, 'C#0': 17.32, 'D0': 18.35, 'D#0': 19.45, 'E0': 20.60, 'F0': 21.83, 'F#0': 23.12, 'G0': 24.50, 'G#0': 25.96, 'A0': 27.50, 'A#0': 29.14, 'B0': 30.87, 'C1': 32.70, 'C#1': 34.65, 'D1': 36.71, 'D#1': 38.89, 'E1': 41.20, 'F1': 43.65, 'F#1': 46.25, 'G1': 49.00, 'G#1': 51.91, 'A1': 55.00, 'A#1': 58.27, 'B1': 61.74, 'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47, 'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77, 'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'G6': 1567.98, 'G#6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53, 'C7': 2093.00, 'C#7': 2217.46, 'D7': 2349.32, 'D#7': 2489.02, 'E7': 2637.02, 'F7': 2793.83, 'F#7': 2959.96, 'G7': 3135.96, 'G#7': 3322.44, 'A7': 3520.00, 'A#7': 3729.31, 'B7': 3951.07, 'C8': 4186.01, 'C#8': 4434.92, 'D8': 4698.63, 'D#8': 4978.03, 'E8': 5274.04, 'F8': 5587.65, 'F#8': 5919.91, 'G8': 6271.93, 'G#8': 6644.88, 'A8': 7040.00, 'A#8': 7458.62, 'B8': 7902.13
};

const enharmonic_equivalents = {
    'C': ['B#', 'Dbb'],
    'C#': ['Db', 'B##'],
    'C##': ['D', 'Ebbb'],
    'Cb': ['B', 'Dbbb', 'A##'],
    'Cbb': ['Bb', 'A#'],
    'D': ['C##', 'Ebb'],
    'D#': ['Eb', 'Fbb'],
    'D##': ['E', 'Fb'],
    'Db': ['C#', 'Ebbb'],
    'Dbb': ['C', 'B#'],
    'E': ['D##', 'Fb'],
    'E#': ['F', 'Gbb'],
    'E##': ['F#', 'Gb'],
    'Eb': ['D#', 'Fbb'],
    'Ebb': ['D', 'C##'],
    'F': ['E#', 'Gbb'],
    'F#': ['Gb', 'E##'],
    'F##': ['G', 'Abb'],
    'Fb': ['E', 'Gbbb'],
    'Fbb': ['Eb', 'D#'],
    'G': ['F##', 'Abb'],
    'G#': ['Ab', 'F###'],
    'G##': ['A', 'Bbb'],
    'Gb': ['F#', 'Abbb'],
    'Gbb': ['F', 'E#'],
    'A': ['G##', 'Bbb'],
    'A#': ['Bb', 'Cbb'],
    'A##': ['B', 'Cb'],
    'Ab': ['G#', 'Bbbb'],
    'Abb': ['G', 'F##'],
    'B': ['A##', 'Cb'],
    'B#': ['C', 'Dbb'],
    'B##': ['C#', 'Db'],
    'Bb': ['A#', 'Cbb'],
    'Bbb': ['A', 'G##']
};

const interval_semitone_to_name_dict = {
    0: 'P1', 1: 'm2', 2: 'M2', 3: 'm3', 4: 'M3', 5: 'P4', 6: 'd5', 7: 'P5', 8: 'm6', 9: 'M6', 10: 'm7', 11: 'M7', 12: 'P8', 13: 'm9', 14: 'M9', 15: 'm10', 16: 'M10', 17: 'P11', 18: 'A11', 19: 'P12', 20: 'm13', 21: 'M13', 22: 'm14', 23: 'M14', 24: 'P15'
};

const interval_name_to_semitones_dict = {
    'P1': 0, 'm2': 1, 'M2': 2, 'm3': 3, 'M3': 4, 'P4': 5, 'A4': 6, 'd5': 6, 'P5': 7, 'A5': 8, 'm6': 8, 'M6': 9, 'm7': 10, 'M7': 11, 'P8': 12, 'm9': 13, 'M9': 14, 'A9': 15, 'm10': 15, 'M10': 16, 'P11': 17, 'A11': 18, 'P12': 19, 'm13': 20, 'M13': 21, 'm14': 22, 'M14': 23, 'P15': 24
};

const interval_ratio_dict = {
    'P1': {'just': 1, 'equal': 2**(1/12)**0},
    'm2': {'just': 16/15, 'equal': 2**(1/12)},
    'M2': {'just': 9/8, 'equal': 2**(2/12)},
    'm3': {'just': 6/5, 'equal': 2**(3/12)},
    'M3': {'just': 5/4, 'equal': 2**(4/12)},
    'P4': {'just': 4/3, 'equal': 2**(5/12)},
    'A4': {'just': 45/32, 'equal': 2**(6/12)},
    'd5': {'just': 64/45, 'equal': 2**(6/12)},
    'P5': {'just': 3/2, 'equal': 2**(7/12)},
    'A5': {'just': 8/5, 'equal': 2**(8/12)},
    'm6': {'just': 8/5, 'equal': 2**(8/12)},
    'M6': {'just': 5/3, 'equal': 2**(9/12)},
    'm7': {'just': 16/9, 'equal': 2**(10/12)},
    'M7': {'just': 15/8, 'equal': 2**(11/12)},
    'P8': {'just': 2, 'equal': 2**(12/12)},
    'm9': {'just': 32/15, 'equal': 2**(13/12)},
    'M9': {'just': 9/4, 'equal': 2**(14/12)},
    'm10': {'just': 12/5, 'equal': 2**(15/12)},
    'M10': {'just': 5/2, 'equal': 2**(16/12)},
    'P11': {'just': 8/3, 'equal': 2**(17/12)},
    'A11': {'just': 45/16, 'equal': 2**(18/12)},
    'd12': {'just': 64/27, 'equal': 2**(18/12)},
    'P12': {'just': 3, 'equal': 2**(19/12)},
    'm13': {'just': 16/5, 'equal': 2**(20/12)},
    'M13': {'just': 10/3, 'equal': 2**(21/12)},
    'm14': {'just': 32/9, 'equal': 2**(22/12)},
    'M14': {'just': 30/8, 'equal': 2**(23/12)},
    'P15': {'just': 4, 'equal': 2**(24/12)}
};

const interval_just_ratio_dict = {
    'P1': [1, 1], 'm2': [15, 16], 'M2': [8, 9], 'm3': [5, 6], 'M3': [4, 5], 'P4': [3, 4], 'A4': [32, 45], 'd5': [45, 64], 'P5': [2, 3], 'A5': [5, 8], 'm6': [5, 8], 'M6': [3, 5], 'm7': [9, 16], 'M7': [8, 15], 'P8': [1, 2]
};

const interval_volume_dict = {
    'P1': 1, 'm2': 0.3, 'M2': 0.4, 'm3': 0.7, 'M3': 0.7, 'P4': 0.6, 'A4': 0.35, 'd5': 0.4, 'P5': 0.75, 'm6': 0.5, 'M6': 0.5, 'm7': 0.4, 'M7': 0.4, 'P8': 0.5, 'm9': 0.2, 'M9': 0.2, 'm10': 0.3, 'M10': 0.3, 'P11': 0.25, 'A11': 0.3, 'd12': 0.5, 'P12': 0.5, 'm13': 0.2, 'M13': 0.3, 'm14': 0.4, 'M14': 0.4, 'P15': 0.3
};

const max_cents_adjustment_dict = {
    'P1': 0, 'm2': 32, 'M2': 32, 'm3': 32, 'M3': 32, 'P4': 20, 'A4': 32, 'd5': 32, 'P5': 32, 'm6': 32, 'M6': 32, 'm7': 32, 'M7': 32, 'P8': 0, 'm9': 32, 'M9': 32, 'm10': 32, 'M10': 32, 'P11': 20, 'A11': 32, 'd12': 32, 'P12': 0, 'm13': 32, 'M13': 32, 'm14': 32, 'M14': 32, 'P15': 0
};

const chord_by_interval_dict = {
    '': ['M3','P5'], ' Major': ['M3','P5'], 'm': ['m3','P5'], '5': ['P5'], '+': ['M3','A5'], '°': ['m3','d5'], 'dim': ['m3','d5'], 'sus4': ['P4','P5'], 'sus2': ['M2','P5'],
    'add2': ['M2','M3','P5'], 'add4': ['M3','P4','P5'], 'add6': ['M3','P5','M6'], 'madd2': ['M2','m3','P5'], 'madd4': ['m3','P4','P5'], 'madd6': ['m3','P5','M6'], 'madd9': ['m3','P5','M9'], 'madd11': ['m3','P5','P11'], 'madd13': ['m3','P5','M13'], '5add9': ['P5','M9'], '6': ['M3','P5','M6'], '6/9': ['M3','P5','M6','M9'], 'm6': ['m3','P5','M6'], 'mb6': ['m3','P5','m6'], 'm6/9': ['m3','P5','M6','M9'], '+add2': ['M2','M3','A5'], '°add9': ['m3','d5','M9'], '°add11': ['m3','d5','P11'],
    'm7': ['m3','P5','m7'], 'm7add2': ['M2','m3','P5','m7'], 'm7add4': ['m3','P4','P5','m7'], 'm7add6': ['m3','P5','M6','m7'], 'dim7': ['m3','d5','d7'], '°7': ['m3','d5','M6'], 'm7b5': ['m3','d5','m7'], 'ø7': ['m3','d5','m7'], 'mmaj7': ['m3','P5','M7'], 'mmaj7add2': ['M2','m3','P5','M7'], 'mmaj7add4': ['m3','P4','P5','M7'], 'mmaj7add6': ['m3','P5','M6','M7'], '°maj7': ['m3','d5','M7'],
    '7': ['M3','P5','m7'], 'maj7': ['M3','P5','M7'], 'maj7add2': ['M2','M3','P5','M7'], 'maj7add2b5': ['M2','M3','d5','M7'], 'maj7add2#11': ['M2','M3','P5','M7','A11'], 'maj7add4': ['M3','P4','P5','M7'], 'maj7add6': ['M3','P5','M6','M7'], 'maj7add6b5': ['M3','d5','M6','M7'], 'maj7add6#11': ['M3','P5','M6','M7','A11'], 'maj7#11': ['M3','P5','M7','A11'], 'maj7b5': ['M3','d5','M7'], 'maj7sus2': ['M2','P5','M7'], 'maj7sus2add4': ['M2','P4','P5','M7'], 'maj7sus2add6': ['M2','P5','M6','M7'], 'maj7sus4': ['P4','P5','M7'], 'maj7sus4add2': ['M2','P4','P5','M7'], '7b5': ['M3','d5','m7'], '7b9': ['M3','P5','m7','m9'], '7#9': ['M3','P5','m7','A9'], '7b5#9': ['M3','d5','m7','A9'], '7#11': ['M3','P5','m7','A11'], '7sus2': ['M2','P5','m7'], '7sus2add4': ['M2','P4','P5','m7'], '7sus2add6': ['M2','P5','M6','m7'], '7sus4': ['P4','P5','m7'], '7sus4add2': ['M2','P4','P5','m7'], '7sus4add6': ['P4','P5','M6','m7'],
    '7#5': ['M3','A5','m7'], '+7': ['M3','A5','m7'], '+7add2': ['M2','M3','A5','m7'], '+maj7': ['M3','A5','M7'], '+maj7add2': ['M2','M3','A5','M7'], 'aug7': ['M3','A5','m7'], '7b9#5': ['M3','A5','m7','m9'], '7#9#5': ['M3','A5','m7','A9'], '+7b9': ['M3','A5','m7','m9'], '+7#9': ['M3','A5','m7','A9'], '+7#11': ['M3','A5','m7','A9','A11'], '7b13': ['M3','P5','m7','m13'], '7alt': ['M3','P5','m7','A9','m13'],
    'add9': ['M3','P5','M9'], '+9': ['M3','A5','m7','M9'], '+9#11': ['M3','A5','m7','M9','A11'], '+add9': ['M3','A5','M9'], '+maj9': ['M3','A5','M7','M9'], 'maj9': ['M3','P5','M7','M9'], 'maj9b5': ['M3','d5','M7','M9'], 'maj9#11': ['M3','P5','M7','M9','A11'], 'm9': ['m3','P5','m7','M9'], '9': ['M3','P5','m7','M9'], 'm9b5': ['m3','d5','m7','M9'], 'm9maj7': ['m3','P5','M7','M9'], '9#5': ['M3','A5','m7','M9'], '9b5': ['M3','d5','m7','M9'], '9sus4': ['P4','P5','m7','M9'], '9#11': ['M3','P5','m7','M9','A11'], '°9': ['m3','d5','M6','M9'], '°maj9': ['m3','d5','M7','M9'], 'ø9': ['m3','d5','m7','M9'],
    'maj11': ['M3','P5','M7','M9','P11'], 'm11': ['m3','P5','m7','M9','P11'], 'm11maj7': ['m3','P5','M7','M9','P11'], '11': ['M3','P5','m7','M9','P11'], '°11': ['m3','d5','M6','M9','P11'], '°maj11': ['m3','d5','M7','M9','P11'], 'ø11': ['m3','d5','m7','M9','P11'],
    'maj13': ['M3','P5','M7','M9','M13'], 'maj13#11': ['M3','P5','M7','M9','A11','M13'], 'maj13b5': ['M3','d5','M7','M9','M13'], 'm13': ['m3','P5','m7','M9','P11','M13'], 'm13maj7': ['m3','P5','M7','M9','P11','M13'], '13': ['M3','P5','m7','M9','M13'], '13b5': ['M3','d5','m7','M9','M13'], '13b9': ['M3','d5','m7','m9','M13'], '13#9': ['M3','d5','m7','A9','M13'], '13#11': ['M3','P5','m7','M9','A11','M13'], '13alt': ['M3','P5','m7','A9','m13'], '13sus4': ['P4','P5','m7','M9','M13']
};

const chord_by_name_dict = {
    '': 'major', 'm': 'minor', '5': 'power cord', '+': 'augmented', 'dim': 'diminished', 'sus4': 'suspended 4th', 'sus2': 'suspended 2nd',
    '6': 'major add 6th', '6/9': 'major add 6th & 9th', 'm6': 'minor add 6th', 'mb6': 'minor add flat 6th', 'm6/9': 'minor add 6th & 9th',
    'm7': 'minor 7th', 'dim7': 'diminished 7th', 'm7b5': 'minor 7th flat five', 'm(maj7)': 'minor major 7th',
    '7': 'dominant 7th', 'maj7': 'major 7th', 'maj7#11': 'major 7th sharp eleven',
    '7b5': 'seventh flat five', '7b9': 'seventh flat nine', '7#9': 'seventh sharp nine', '7b5#9': 'dominant 7th, flat 5th, sharp 9th', '7#11': 'dominant 7th, sharp 11th',
    '7#5': 'dominant augmented 7th', '+7': 'dominant 7th, sharp 5th', 'aug7': 'augmented 7th', '7b9#5': 'augmented 7th flat nine', '7#9#5': 'augmented 7th sharp nine', '+7b9': 'dominant 7th, sharp 5th, flat 9th', '+7#9': 'dominant 7th, sharp 5th, sharp 9th', '7sus4': 'seventh suspended 4th',
    'add9': 'major add 9th', '+9': '9th, sharp 5th', 'maj9': 'major 9th', 'm9': 'minor 9th', '9': 'dominant 9th', 'm9b5': 'minor 9th, flat 5th', 'm9(maj7)': 'minor 9th (major 7)', '9#5': 'dominant 9th sharp 5th', '9b5': 'dominant 9th flat 5th', '9sus4': 'dominant 9th suspended 4th', '9#11': 'dominant 9th sharp 11th',
    'maj11': 'major 11th', 'm11': 'minor 11th', '11': '11th',
    'maj13': 'major 13th', 'm13': 'minor 13th', '13': '13th', '13sus4': '13th suspended 4th'
};

const pitch_letters = 'CDEFGAB';

// Functions
function frequency_from_pitch(pitch) {
    return Math.round(musical_range_frequencies[pitch]);
}

function musical_range_compatable(pitch_with_octave) {
    if (musical_range.includes(pitch_with_octave)) {
        return pitch_with_octave;
    }
    const pitch_parts = split_letter_octave(pitch_with_octave);
    const enharmonics = enharmonic_equivalents[pitch_parts[0]] || [];
    for (const enharmonic of enharmonics) {
        const candidate = enharmonic + String(pitch_parts[1]);
        if (musical_range.includes(candidate)) {
            return candidate;
        }
    }
    return pitch_with_octave;
}

function pitches_from_interval(pitch, interval) {
    const pitches = [pitch];
    const pitch_index = musical_range.indexOf(musical_range_compatable(pitch));
    const interval_semitones = interval_name_to_semitones_dict[interval];
    pitches.push(musical_range[pitch_index + interval_semitones]);
    return pitches;
}

function interval_semitones_from_pitches(pitch1, pitch2) {
    return Math.abs(musical_range.indexOf(musical_range_compatable(pitch2)) - musical_range.indexOf(musical_range_compatable(pitch1)));
}

function interval_name_from_pitches(pitch1, pitch2) {
    return interval_semitone_to_name_dict[interval_semitones_from_pitches(pitch1, pitch2)];
}

function interval_name_from_semitones(semitones) {
    return interval_semitone_to_name_dict[semitones];
}

function interval_semitones_from_name(interval_name) {
    return interval_name_to_semitones_dict[interval_name];
}

function cents_to_ratio(cents) {
    return 2 ** (cents / 1200);
}

function ratio_to_cents(ratio) {
    return 1200 * (Math.log(ratio) / Math.log(2));
}

function cents_delta_from_ratios(ratio1, ratio2) {
    return Math.round(ratio_to_cents(ratio1) - ratio_to_cents(ratio2));
}

function intonate_single_pitch(pitch, pitch_list, context = 'inside') {
    function set_pitch_outside(pitch, pitch_list) {
        let added_pitch_octave = parseInt(pitch_list[pitch_list.length - 1].slice(-1)) + 1;
        if (added_pitch_octave > 8) {
            added_pitch_octave = 8;
        }
        return pitch + String(added_pitch_octave);
    }
    
    function set_pitch_inside(pitch, pitch_list) {
        let inside_pitch = null;
        const start_index = musical_range.indexOf(pitch_list[0]);
        const end_index = musical_range.indexOf(pitch_list[pitch_list.length - 1]) + 1;
        for (let i = start_index; i < end_index; i++) {
            const n = musical_range[i];
            if (pitch === n.slice(0, -1)) {
                inside_pitch = n;
                break;
            }
        }
        return inside_pitch;
    }
        
    let inside_possible = true;
    let outside_possible = false;
    const cleaned_pitch_list = [];
    for (const p of pitch_list) {
        if (p.includes('b')) {
            cleaned_pitch_list.push(musical_range_compatable(p));
        } else {
            cleaned_pitch_list.push(p);
        }
    }

    const pitch_list_no_octave = cleaned_pitch_list.map(p => p.slice(0, -1));
    let added_pitch = null;

    if (!pitch_list_no_octave.includes(pitch)) {
        outside_possible = true;
        added_pitch = set_pitch_inside(pitch, cleaned_pitch_list);
        inside_possible = added_pitch !== null;
        if (context !== 'inside' || !inside_possible) {
            added_pitch = set_pitch_outside(pitch, cleaned_pitch_list);
        }
        cleaned_pitch_list.push(added_pitch);
    }

    const intonated_pitches = just_intonate(cleaned_pitch_list);
    let pitch_index;
    if (added_pitch) {
        pitch_index = Object.keys(intonated_pitches[0]).indexOf(added_pitch);
    } else {
        pitch_index = pitch_list_no_octave.indexOf(pitch);
    }
    const pitch_adjustment = intonated_pitches[0][Object.keys(intonated_pitches[0])[pitch_index]][1];

    if (pitch_adjustment === "") {
        return ["0 cents", inside_possible, outside_possible];
    } else {
        return [pitch_adjustment + " cents", inside_possible, outside_possible];
    }
}

function split_letter_octave(pitch) {
    for (let index = 0; index < pitch.length; index++) {
        if (/\d/.test(pitch[index])) {
            return [pitch.slice(0, index), parseInt(pitch.slice(index))];
        }
    }
    return [pitch, 4]; // Default octave if not found
}

function rewrite_chord_pitches(chord_pitches, chord_interval_list) {
    function check_letter_difference(pitch1, pitch2, interval_index = 0) {
        let letter_difference = (pitch_letters.indexOf(pitch2[0]) - pitch_letters.indexOf(pitch1[0])) + 1;
        while (letter_difference < 0) {
            letter_difference += 7;
        }
        let interval_difference;
        if (interval_index === 0) {
            interval_difference = split_letter_octave(chord_interval_list[0])[1];
        } else {
            interval_difference = Math.abs((split_letter_octave(chord_interval_list[interval_index])[1] - split_letter_octave(chord_interval_list[interval_index - 1])[1])) + 1;
        }

        return letter_difference === interval_difference;
    }
    
    function count_accidentals(spelling, accidental_type) {
        return spelling.filter(s => s.includes(accidental_type)).length;
    }

    function choose_best_spelling(spelling_list) {
        // Step 1: Remove spellings with the most double accidentals
        if (spelling_list.some(spelling => spelling.some(s => s.includes('##') || s.includes('bb')))) {
            const min_double_accidentals = Math.min(...spelling_list.map(spelling => 
                count_accidentals(spelling, '##') + count_accidentals(spelling, 'bb')
            ));
            spelling_list = spelling_list.filter(spelling => 
                count_accidentals(spelling, '##') + count_accidentals(spelling, 'bb') === min_double_accidentals
            );
        }

        // Step 2: Choose the spelling with the fewest single accidentals
        const min_single_accidentals_spelling = spelling_list.reduce((best, current) => {
            const currentCount = count_accidentals(current, '#') + count_accidentals(current, 'b');
            const bestCount = count_accidentals(best, '#') + count_accidentals(best, 'b');
            return currentCount < bestCount ? current : best;
        });
        
        return min_single_accidentals_spelling;
    }
    
    const potential_spellings = [];
    const root_letter = split_letter_octave(chord_pitches[0])[0];
    const root_list = [root_letter].concat(enharmonic_equivalents[root_letter] || []);

    for (const possible_root of root_list) {
        const temp_list = [possible_root + chord_pitches[0].slice(-1)];
        let valid = true;
        for (let i = 0; i < chord_pitches.length - 1; i++) {
            const next_note_letter = split_letter_octave(chord_pitches[i + 1])[0];
            const next_note_list = [next_note_letter].concat(enharmonic_equivalents[next_note_letter] || []);
            let found = false;
            for (const next_note of next_note_list) {
                if (check_letter_difference(temp_list[i], next_note, i)) {
                    temp_list.push(next_note + String(split_letter_octave(chord_pitches[i + 1])[1]));
                    found = true;
                    break;
                }
            }
            if (!found) {
                valid = false;
                break;
            }
        }

        if (valid && temp_list.length === chord_pitches.length) {
            potential_spellings.push(temp_list);
        }
    }

    if (potential_spellings.length === 1) {
        return potential_spellings[0];
    } else {
        return choose_best_spelling(potential_spellings);
    }
}

function pitches_from_chord_symbol(chord_symbol) {
    let cleaned_chord_symbol = chord_symbol;
    const replacements = [['(', ''], [')', '']];
    for (const [char, replacement] of replacements) {
        if (cleaned_chord_symbol.includes(char)) {
            // Escape special regex characters
            const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            cleaned_chord_symbol = cleaned_chord_symbol.replace(new RegExp(escapedChar, 'g'), replacement);
        }
    }
    const chord_pitches = [];
    let slash = null;
    if (cleaned_chord_symbol.includes("/") && !/\d$/.test(cleaned_chord_symbol)) {
        chord_symbol = chord_symbol.split("/")[0];
        [cleaned_chord_symbol, slash] = cleaned_chord_symbol.split("/");
    }

    let root, quality_symbol;
    if (cleaned_chord_symbol.length >= 2 && (cleaned_chord_symbol[1] === "#" || cleaned_chord_symbol[1] === "b")) {
        root = cleaned_chord_symbol.slice(0, 2) + "4";
        quality_symbol = cleaned_chord_symbol.slice(2);
    } else {
        root = cleaned_chord_symbol[0] + "4";
        quality_symbol = cleaned_chord_symbol.slice(1);
    }

    chord_pitches.push(root);
    const intervals = chord_by_interval_dict[quality_symbol] || [];
    for (const interval of intervals) {
        const interval_semitones = interval_semitones_from_name(interval);
        if (root.includes("b")) {
            chord_pitches.push(musical_range[musical_range.indexOf(musical_range_compatable(root)) + interval_semitones]);
        } else {
            chord_pitches.push(musical_range[musical_range.indexOf(root) + interval_semitones]);
        }
    }

    const corrected_chord_pitches = rewrite_chord_pitches(chord_pitches, intervals).map(c => c.slice(0, -1));
    let updated_chord_symbol = chord_symbol;
    if (corrected_chord_pitches[0] !== root.slice(0, -1)) {
        updated_chord_symbol = corrected_chord_pitches[0] + quality_symbol;
    }

    if (slash) {
        corrected_chord_pitches.unshift(slash);
        chord_pitches.unshift(slash + "3");
        updated_chord_symbol += "/" + slash;
    }

    const pitch_string = corrected_chord_pitches.join('  ');
    return [pitch_string, chord_pitches, updated_chord_symbol];
}

function construct_chord_symbol(components) {
    const quality_dict = {
        "": "",
        "major": "",
        "minor": "m",
        "augmented": "+",
        "diminished": "°",
        "power": "5",
        "sus2": "sus2",
        "sus4": "sus4"
    };
    const sevenths_dict = {
        "": "",
        "nat7": "maj7",
        "m7": "7",
        "bb7": "°7"
    };
    
    const [root, quality, seventh, extension, alteration, slash] = components;

    let first = root;
    let second = quality_dict[quality];
    let third = sevenths_dict[seventh];
    let fourth = extension;
    let fifth = alteration !== "" ? "(" + alteration + ")" : "";

    if (["C#", "D#", "F#", "G#", "A#"].includes(root) && ["major", "augmented", "sus2", "sus4"].includes(quality)) {
        first = (enharmonic_equivalents[root] || [root])[0];
    }

    if (quality === "major" && seventh === "" && extension === "" && alteration === "" && slash === "") {
        return first + " Major";
    }

    if (quality === "major" && ["add2", "add4", "add6"].includes(extension)) {
        second = "";
    }
    
    if (quality === "minor" && seventh === "nat7") {
        third = "(maj7)";
    }

    if (quality === "diminished") {
        if (seventh === "m7") {
            second = "ø";
        } else if (seventh === "bb7") {
            third = "7";
        }
    }

    if (quality === "power" && extension === "9") {
        fourth = "(add9)";
    }

    if (quality.includes("sus") && seventh !== "") {
        second = sevenths_dict[seventh];
        third = "(" + quality + ")";
    }

    if (extension.includes("add")) {
        fourth = "(" + extension + ")";
    }

    if (seventh === "" && extension.includes("add6")) {
        fourth = extension.replace("add", "");
    }

    if (!["major", "minor", "sus2", "sus4"].includes(quality) && seventh === "nat7") {
        third = "(" + third + ")";
    }

    if (["9", "11", "13"].includes(extension) && quality !== "minor") {
        third = "";
        if (seventh === "nat7") {
            fourth = quality === "major" ? "maj" + extension : "(maj" + extension + ")";
        }
        if (seventh === "") {
            fourth = "(add" + extension + ")";
        }
    } else if (["9", "11", "13"].includes(extension) && quality === "minor") {
        third = "";
        if (seventh === "nat7") {
            third = extension;
            fourth = "(maj7)";
        }
        if (seventh === "") {
            fourth = "(add" + extension + ")";
        }
    }

    if (alteration && extension.includes(alteration)) {
        third = sevenths_dict[seventh];
        fourth = "";
    }

    let chord = first + second + third + fourth + fifth;
    if (slash) {
        chord += slash;
    }
        
    return chord;
}

function get_available_options(components) {
    const [root, quality, seventh, extension, alteration, slash] = components;

    let available_qualities = ["major", "minor", "augmented", "diminished", "dominant", "power", "sus2", "sus4"];
    let available_sevenths = ["nat7", "m7", "bb7"];
    let available_extensions = ["add2", "add4", "add6", "6/9", "9", "11", "13"];
    let available_alterations = ["b5", "b6", "b9", "#9", "#11", "b13", "alt"];
    let available_slashes = ["/C", "/C#", "/D", "/D#", "/E", "/F", "/F#", "/G", "/G#", "/A", "/A#", "/B"];

    if (quality === "major") {
        available_sevenths = ["nat7", "m7"];
        available_extensions = ["add2", "add4", "add6", "6/9", "9"];
        available_alterations = ["b5"];
        if (seventh === "m7") {
            available_extensions = ["9", "13"];
            available_alterations = ["b5", "b9", "#9", "#11", "b13", "alt"];
        } else if (seventh === "nat7") {
            available_extensions = ["add2", "add4", "add6", "9", "11", "13"];
            if (["add4", "11"].includes(extension)) {
                available_alterations = [];
            }
        }
    } else if (quality === "minor") {
        available_sevenths = ["nat7", "m7"];
        available_extensions = ["add2", "add4", "add6", "6/9", "9"];
        available_alterations = extension === "" ? ["b6"] : [];
        if (seventh !== "") {
            available_extensions = ["add2", "add4", "add6", "9", "11", "13"];
            available_alterations = [];
        }
    } else if (quality === "augmented") {
        available_sevenths = ["nat7", "m7"];
        available_extensions = ["add2", "9"];
        available_alterations = seventh !== "nat7" ? ["b9", "#9", "#11"] : ["#11"];
    } else if (quality === "diminished") {
        available_sevenths = ["nat7", "m7", "bb7"];
        available_extensions = seventh !== "m7" ? ["9", "11"] : ["9", "11", "13"];
        available_alterations = [];
    } else if (quality === "power") {
        available_sevenths = [];
        available_extensions = ["9"];
        available_alterations = [];
    } else if (quality === "sus2") {
        available_sevenths = ["nat7", "m7"];
        available_extensions = ["add4", "add6"];
        available_alterations = ["#11"];
    } else if (quality === "sus4") {
        available_sevenths = ["nat7", "m7"];
        available_extensions = seventh !== "nat7" ? ["add2", "add6"] : ["add2"];
        available_alterations = seventh !== "nat7" ? ["b9"] : [];
    }
    
    if (root !== "") {
        available_slashes = available_slashes.filter(s => s !== "/" + root);
    }

    return {
        "qualities": available_qualities,
        "sevenths": available_sevenths,
        "extensions": available_extensions,
        "alterations": available_alterations,
        "slashes": available_slashes
    };
}

function get_interval_ratio(pitch1, pitch2, temperment = 'equal') {
    let multiplier = 1;
    let new_interval_semitones = interval_semitones_from_pitches(pitch1, pitch2);
    while (new_interval_semitones > 24) {
        new_interval_semitones -= 12;
        multiplier *= 2;
    }
    const new_interval = interval_name_from_semitones(new_interval_semitones);
    const ratio_value = interval_ratio_dict[new_interval][temperment] * multiplier;
    const fraction = createFraction(ratio_value, 1000);
    const interval_ratio = fraction.asIntegerRatio();

    return [interval_ratio, new_interval, multiplier];
}

function freqs_from_ratios(chord_ratio_list, starting_freq = 262) {
    const chord_pitches = {};
    const freq_values = Object.values(musical_range_frequencies);
    const start_pitch = Object.keys(musical_range_frequencies)[freq_values.indexOf(starting_freq)];
    chord_pitches[start_pitch] = String(starting_freq) + " Hz";
    for (let i = 1; i < chord_ratio_list.length; i++) {
        const new_freq = Math.round(starting_freq * (chord_ratio_list[i] / chord_ratio_list[0]));
        const new_pitch = Object.keys(musical_range_frequencies)[freq_values.indexOf(new_freq)];
        chord_pitches[new_pitch] = String(new_freq) + " Hz";
    }
    return chord_pitches;
}

function simplify_ratios(chord_ratios, index, interval_type, adjustment_limit = 0.1, max_cents_adjustment = max_cents_adjustment_dict) {
    const chord_ratios_upscaled = chord_ratios.map(c => c * 100);
    const original_value = chord_ratios_upscaled[index];
    let best_adjustment = 0;
    let best_simplified_list = [...chord_ratios];

    for (let i = -600; i <= 600; i++) {
        const adjusted_value = original_value + i;
        if (Math.abs(adjusted_value / chord_ratios_upscaled[0] - original_value / chord_ratios_upscaled[0]) > adjustment_limit) {
            continue;
        }
        const temp_list = [...chord_ratios_upscaled];
        temp_list[index] = adjusted_value;
        const gcd_value = gcd(...temp_list);
        const simplified_list = temp_list.map(val => Math.floor(val / gcd_value));

        // Calculate the tuning adjustment for the current note
        const cents_adjustment = cents_delta_from_ratios(simplified_list[index] / simplified_list[0], interval_ratio_dict[interval_type]['equal']);
        
        // If the adjustment exceeds the max_adjustment limit, skip this iteration
        if (Math.abs(cents_adjustment) > max_cents_adjustment[interval_type]) {
            continue;
        }

        // Check if the new list is genuinely simpler than the best one found so far
        if (Math.max(...simplified_list) < Math.max(...best_simplified_list) && 
            Math.max(...simplified_list) < Math.max(...temp_list) && 
            new Set(simplified_list).size === chord_ratios_upscaled.length) {
            best_adjustment = i;
            best_simplified_list = simplified_list;
        }
    }

    // If no genuine simplification was found, return the original list
    if (best_adjustment === 0) {
        return chord_ratios_upscaled;
    }

    return best_simplified_list;
}

function rewrite_pitch_list_octaves(pitch_list) {
    // Just reorder/sort the pitches by their position in musical_range
    // No octave adjustments, no transposition - just sorting
    return [...pitch_list].sort((a, b) => musical_range.indexOf(a) - musical_range.indexOf(b));
}

function rewrite_pitch_list_enharmonics(pitch_list) {
    const rewritten_pitch_list = [];
    for (const p of pitch_list) {
        if (p.includes('-') || p.includes('b')) {
            rewritten_pitch_list.push(musical_range_compatable(p));
        } else {
            rewritten_pitch_list.push(p);
        }
    }
    return rewritten_pitch_list;
}

function reduce_chord_ratios(chord_ratios_list, new_interval_ratio) {
    // Extract the first element of the chord_ratios_list which represents the denominator of the first ratio
    const current_denominator = chord_ratios_list[0];
    
    // Calculate the LCM of the current denominator and the denominator of the new_interval_ratio
    const ratio_lcm = lcm(current_denominator, new_interval_ratio[1]);
    
    // Calculate the multipliers for both the chord_ratios_list and the new_interval_ratio
    const multiplier1 = ratio_lcm / current_denominator;
    const multiplier2 = ratio_lcm / new_interval_ratio[1];
    
    // If the chord_ratios_list needs to be scaled
    let scaled_list = chord_ratios_list;
    if (multiplier1 !== 1) {
        scaled_list = chord_ratios_list.map(item => Math.floor(item * multiplier1));
    }
    
    // Scale the numerator of the new_interval_ratio and append it to the chord_ratios_list
    const scaled_numerator = Math.floor(new_interval_ratio[0] * multiplier2);
    scaled_list.push(scaled_numerator);
    
    // Check if the entire list can be scaled down
    const gcd_value = gcd(...scaled_list);
    if (gcd_value > 1) {
        scaled_list = scaled_list.map(val => Math.floor(val / gcd_value));
    }
    
    return scaled_list;
}

function write_freq_and_vol_for_adjustments(adjustment_dict) {
    // Get the starting pitch - this should be the first key in the dictionary
    // which is sorted_pitches[0] from just_intonate, preserving the original pitch name
    const starting_pitch = Object.keys(adjustment_dict)[0];
    
    // Use the original pitch's frequency from musical_range_frequencies
    // This ensures we use the correct octave (e.g., C4 = 262Hz, not C5 = 523Hz)
    const starting_freq = musical_range_frequencies[starting_pitch];
    
    if (!starting_freq) {
        console.error(`Starting frequency not found for pitch: ${starting_pitch}`);
        return adjustment_dict;
    }
    
    for (const [chord_tone, adjustment] of Object.entries(adjustment_dict)) {
        let adjusted_freq;
        
        // For the starting pitch (unison), use the base frequency directly
        if (chord_tone === starting_pitch) {
            // For unison, the frequency is just the starting frequency
            // The adjustment is already 0 for the starting pitch
            adjusted_freq = Math.round(starting_freq);
        } else {
            // Use the actual pitch names from the dictionary keys (sorted_pitches)
            // These are the original pitches selected by the user
            const [interval_ratio, interval_type, multiplier] = get_interval_ratio(starting_pitch, chord_tone, 'just');
            
            const equal_temperament_cents = ratio_to_cents(interval_ratio_dict[interval_type]['equal'] * multiplier);
            const adjusted_cents = equal_temperament_cents + adjustment;
            adjusted_freq = Math.round(cents_to_ratio(adjusted_cents) * starting_freq);
        }
        
        const sign = adjustment > 0 ? "+" : "";
        if (chord_tone === starting_pitch) {
            adjustment_dict[chord_tone] = [String(adjusted_freq) + " Hz", '', interval_volume_dict['P1'] || 1];
        } else {
            const [interval_ratio, interval_type, multiplier] = get_interval_ratio(starting_pitch, chord_tone, 'just');
            adjustment_dict[chord_tone] = [String(adjusted_freq) + " Hz", sign + String(adjustment), interval_volume_dict[interval_type]];
        }
    }

    return adjustment_dict;
}

function quality_or_interval_to_chord_tones_cents(component) {
    let chord_intervals, chord_pitches;
    
    if (Object.values(chord_by_name_dict).includes(component)) {
        const chord_symbol = Object.keys(chord_by_name_dict)[Object.values(chord_by_name_dict).indexOf(component)];
        chord_pitches = pitches_from_chord_symbol("C" + chord_symbol)[1];
        chord_intervals = chord_by_interval_dict[chord_symbol];
    } else if (Object.keys(interval_name_to_semitones_dict).includes(component)) {
        chord_intervals = [component];
        chord_pitches = pitches_from_interval('C4', component);
    } else {
        return "Invalid input";
    }

    const interval_cents = [0];
    const cents_corrections = [];
    for (let i = 0; i < chord_intervals.length; i++) {
        interval_cents.push(Math.floor(ratio_to_cents(interval_ratio_dict[chord_intervals[i]]['equal'])));
    }

    const intonated_dict = just_intonate(chord_pitches)[0];
    for (const [pitch, info] of Object.entries(intonated_dict)) {
        if (info[1] === "") {
            cents_corrections.push(0);
        } else {
            cents_corrections.push(parseInt(info[1]));
        }
    }

    return interval_cents.map((val, i) => val + cents_corrections[i]);
}

function cents_list_to_chord_ratios(cents_list, denom = 10) {
    if (cents_list[0] !== 0) {
        return "The first element of the cents_list must be 0";
    }

    const chord_ratios = [];
    for (let i = 1; i < cents_list.length; i++) {
        const ratio_value = cents_to_ratio(cents_list[i] - cents_list[0]);
        const fraction = createFraction(ratio_value, denom);
        const interval_ratio = fraction.asIntegerRatio();
        if (chord_ratios.length === 0) {
            chord_ratios.push(interval_ratio[1], interval_ratio[0]);
        } else {
            // reduce_chord_ratios returns the modified array, so we need to assign it back
            const updated_ratios = reduce_chord_ratios([...chord_ratios], interval_ratio);
            // Update chord_ratios with the returned value
            chord_ratios.length = 0;
            chord_ratios.push(...updated_ratios);
        }
    }
    return chord_ratios;
}

function just_intonate(pitch_list, adjustment_margin = 0.1) {
    const sorted_pitches = [...pitch_list].sort((a, b) => musical_range.indexOf(a) - musical_range.indexOf(b));
    let chord_tuning = {[sorted_pitches[0]]: 0};
    let chord_ratios = [];
    
    if (sorted_pitches.length === 1) {
        chord_tuning = {[sorted_pitches[0]]: [String(Math.floor(frequency_from_pitch(sorted_pitches[0]))) + ' Hz', '', 1]};
        return [chord_tuning, ''];
    }
    
    const cleaned_pitch_list = rewrite_pitch_list_octaves(rewrite_pitch_list_enharmonics(sorted_pitches));
    
    // Since rewrite_pitch_list_octaves now just sorts, cleaned_pitch_list should match sorted_pitches
    // But we use cleaned_pitch_list for interval calculations to handle enharmonics correctly
    // and use sorted_pitches for the keys to preserve original pitch names
    for (let n = 1; n < cleaned_pitch_list.length; n++) {
        const [interval_ratio, interval_type, multiplier] = get_interval_ratio(cleaned_pitch_list[0], cleaned_pitch_list[n], 'just');
        // If it's the first ratio, simply add it
        if (chord_ratios.length === 0) {
            chord_ratios.push(interval_ratio[1], interval_ratio[0]);
        } else {
            // Get the updated chord_ratios with the new interval
            let updated_ratios = reduce_chord_ratios([...chord_ratios], interval_ratio);
            
            // Simplify the updated_ratios with the new interval
            for (let i = updated_ratios.length - 1; i >= 1; i--) {
                updated_ratios = simplify_ratios(updated_ratios, i, interval_type, adjustment_margin);
            }
            
            chord_ratios = updated_ratios;
        }

        // Use sorted_pitches[n] as the key to preserve original pitch names
        // This ensures the mapping back to the original keys works correctly
        const adjustment = Math.floor(cents_delta_from_ratios(chord_ratios[n] / chord_ratios[0], interval_ratio_dict[interval_type]['equal'] * multiplier));
        chord_tuning[sorted_pitches[n]] = adjustment;
    }
    
    // Pass the original pitch names to write_freq_and_vol_for_adjustments
    // The function will use the original pitch names to calculate frequencies correctly
    chord_tuning = write_freq_and_vol_for_adjustments(chord_tuning);

    // Scale down the chord_ratios list by their GCD
    const gcd_value = gcd(...chord_ratios);
    chord_ratios = chord_ratios.map(val => Math.floor(val / gcd_value));
    const chord_ratio_string = chord_ratios.join(':');
    return [chord_tuning, chord_ratio_string];
}

