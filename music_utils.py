import math
from fractions import Fraction

musical_range = [
        'C0', 'C#0', 'D0', 'D#0', 'E0', 'F0', 'F#0', 'G0', 'G#0', 'A0', 'A#0', 'B0', 'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', 'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', 'C8', 'C#8', 'D8', 'D#8', 'E8', 'F8', 'F#8', 'G8', 'G#8', 'A8', 'A#8', 'B8'
        ]

musical_range_frequencies = {
    'C0': 16.35, 'C#0': 17.32, 'D0': 18.35, 'D#0': 19.45, 'E0': 20.60, 'F0': 21.83, 'F#0': 23.12, 'G0': 24.50, 'G#0': 25.96, 'A0': 27.50, 'A#0': 29.14, 'B0': 30.87, 'C1': 32.70, 'C#1': 34.65, 'D1': 36.71, 'D#1': 38.89, 'E1': 41.20, 'F1': 43.65, 'F#1': 46.25, 'G1': 49.00, 'G#1': 51.91, 'A1': 55.00, 'A#1': 58.27, 'B1': 61.74, 'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47, 'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77, 'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'G6': 1567.98, 'G#6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53, 'C7': 2093.00, 'C#7': 2217.46, 'D7': 2349.32, 'D#7': 2489.02, 'E7': 2637.02, 'F7': 2793.83, 'F#7': 2959.96, 'G7': 3135.96, 'G#7': 3322.44, 'A7': 3520.00, 'A#7': 3729.31, 'B7': 3951.07, 'C8': 4186.01, 'C#8': 4434.92, 'D8': 4698.63, 'D#8': 4978.03, 'E8': 5274.04, 'F8': 5587.65, 'F#8': 5919.91, 'G8': 6271.93, 'G#8': 6644.88, 'A8': 7040.00, 'A#8': 7458.62, 'B8': 7902.13
}

enharmonic_equivalents = {
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
}

interval_semitone_to_name_dict = {
    0: 'P1',
    1: 'm2',
    2: 'M2',
    3: 'm3',
    4: 'M3',
    5: 'P4',
    6: 'd5',
    7: 'P5',
    8: 'm6',
    9: 'M6',
    10: 'm7',
    11: 'M7',
    12: 'P8',
    13: 'm9',
    14: 'M9',
    15: 'm10',
    16: 'M10',
    17: 'P11',
    18: 'A11',
    19: 'P12',
    20: 'm13',
    21: 'M13',
    22: 'm14',
    23: 'M14',
    24: 'P15'
    }

interval_name_to_semitones_dict = {
    'P1': 0,
    'm2': 1,
    'M2': 2,
    'm3': 3,
    'M3': 4,
    'P4': 5,
    'd5': 6,
    'P5': 7,
    'A5': 8,
    'm6': 8,
    'M6': 9,
    'm7': 10,
    'M7': 11,
    'P8': 12,
    'm9': 13,
    'M9': 14,
    'm10': 15,
    'M10': 16,
    'P11': 17,
    'A11': 18,
    'P12': 19,
    'm13': 20,
    'M13': 21,
    'm14': 22,
    'M14': 23,
    'P15': 24
    }

interval_ratio_dict = {
    'P1': {'just': 1, 'equal': 1},
    'm2': {'just': 16/15, 'equal': 2**(1/12)},
    'M2': {'just': 9/8, 'equal': 2**(2/12)},
    'm3': {'just': 6/5, 'equal': 2**(3/12)},
    'M3': {'just': 5/4, 'equal': 2**(4/12)},
    'P4': {'just': 4/3, 'equal': 2**(5/12)},
    'A4': {'just': 45/32, 'equal': 2**(6/12)},
    'd5': {'just': 64/45, 'equal': 2**(6/12)},
    'P5': {'just': 3/2, 'equal': 2**(7/12)},
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
}

interval_volume_dict = {
    'P1': 1,
    'm2': 0.3,
    'M2': 0.4,
    'm3': 0.7,
    'M3': 0.7,
    'P4': 0.6,
    'A4': 0.35,
    'd5': 0.4,
    'P5': 0.75,
    'm6': 0.5,
    'M6': 0.5,
    'm7': 0.4,
    'M7': 0.4,
    'P8': 0.5,
    'm9': 0.2,
    'M9': 0.2,
    'm10': 0.3,
    'M10': 0.3,
    'P11': 0.25,
    'A11': 0.3,
    'd12': 0.5,
    'P12': 0.5,
    'm13': 0.2,
    'M13': 0.3,
    'm14': 0.4,
    'M14': 0.4,
    'P15': 0.3
}

max_cents_adjustment_dict = {
    'P1': 0,
    'm2': 32,
    'M2': 32,
    'm3': 32,
    'M3': 32,
    'P4': 20,
    'A4': 32,
    'd5': 32,
    'P5': 32,
    'm6': 32,
    'M6': 32,
    'm7': 32,
    'M7': 32,
    'P8': 0,
    'm9': 32,
    'M9': 32,
    'm10': 32,
    'M10': 32,
    'P11': 20,
    'A11': 32,
    'd12': 32,
    'P12': 0,
    'm13': 32,
    'M13': 32,
    'm14': 32,
    'M14': 32,
    'P15': 0
}

chord_by_interval_dict = {
'':['M3','P5'],
' Major':['M3','P5'],
'm':['m3','P5'],
'5':['P5'],
'+':['M3','A5'],
'°':['m3','d5'],
'dim':['m3','d5'],
'sus4':['P4','P5'],
'sus2':['M2','P5'],

'6':['M3','P5','M6'],
'6/9':['M3','P5','M6','M9'],
'm6':['m3','P5','M6'],
'mb6':['m3','P5','m6'],
'm6/9':['m3','P5','M6','M9'],

'm7':['m3','P5','m7'],
'dim7':['m3','d5','d7'],
'dim7':['m3','d5','M6'],
'°7':['m3','d5','M6'],
'm7b5':['m3','d5','m7'],
'ø7':['m3','d5','m7'],
'm(maj7)':['m3','P5','M7'],
'°(maj7)':['m3','d5','M7'],

'7':['M3','P5','m7'],
'maj7':['M3','P5','M7'],
'maj7#11':['M3','P5','M7','A11'],

'7b5':['M3','d5','m7'],
'7b9':['M3','P5','m7','m9'],
'7#9':['M3','P5','m7','A9'],
'7b5#9':['M3','d5','m7','A9'],
'7#11':['M3','P5','m7','A11'],

'7#5':['M3','A5','m7'],
'+7':['M3','A5','m7'],
'aug7':['M3','A5','m7'],
'7b9#5':['M3','A5','m7','m9'],
'7#9#5':['M3','A5','m7','A9'],
'+7b9':['M3','A5','m7','m9'],
'+7#9':['M3','A5','m7','A9'],
'7sus4':['P4','P5','m7'],

'add9':['M3','P5','M9'],
'+9':['M3','A5','m7','M9'],
'maj9':['M3','P5','M7','M9'],
'm9':['m3','P5','m7','M9'],
'9':['M3','P5','m7','M9'],
'm9b5':['m3','d5','m7','M9'],
'm9(maj7)':['m3','P5','M7','M9'],
'9#5':['M3','A5','m7','M9'],
'9b5':['M3','d5','m7','M9'],
'9sus4':['P4','P5','m7','M9'],
'9#11':['M3','P5','m7','M9','A11'],

'maj11':['M3','P5','M7','M9','P11'],
'm11':['m3','P5','m7','M9','P11'],
'11':['M3','P5','m7','M9','P11'],

'maj13':['M3','P5','M7','M9','M13'],
'm13':['m3','P5','m7','M9','P11','M13'],
'13':['M3','P5','m7','M9','M13'],
'13#11':['M3','P5','m7','M9', 'A11', 'M13'],
'13sus4':['P4','P5','m7','M9','M13']
}

chord_by_name_dict = {
'':'major',
'm':'minor',
'5':'power cord',
'+':'augmented',
'dim':'diminished',
'sus4':'suspended 4th',
'sus2':'suspended 2nd',

'6':'major add 6th',
'6/9':'major add 6th & 9th',
'm6':'minor add 6th',
'mb6':'minor add flat 6th',
'm6/9':'minor add 6th & 9th',

'm7':'minor 7th',
'dim7':'diminished 7th',
'm7b5':'minor 7th flat five',
'm(maj7)':'minor major 7th',

'7':'dominant 7th',
'maj7':'major 7th',
'maj7#11':'major 7th sharp eleven',

'7b5':'seventh flat five',
'7b9':'seventh flat nine',
'7#9':'seventh sharp nine',
'7b5#9':'dominant 7th, flat 5th, sharp 9th',
'7#11':'dominant 7th, sharp 11th',

'7#5':'dominant augmented 7th',
'+7':'dominant 7th, sharp 5th',
'aug7':'augmented 7th',
'7b9#5':'augmented 7th flat nine',
'7#9#5':'augmented 7th sharp nine',
'+7b9':'dominant 7th, sharp 5th, flat 9th',
'+7#9':'dominant 7th, sharp 5th, sharp 9th',
'7sus4':'seventh suspended 4th',

'add9':'major add 9th',
'+9':'9th, sharp 5th',
'maj9':'major 9th',
'm9':'minor 9th',
'9':'dominant 9th',
'm9b5':'minor 9th, flat 5th',
'm9(maj7)':'minor 9th (major 7)',
'9#5':'dominant 9th sharp 5th',
'9b5':'dominant 9th flat 5th',
'9sus4':'dominant 9th suspended 4th',
'9#11':'dominant 9th sharp 11th',

'maj11':'major 11th',
'm11':'minor 11th',
'11':'11th',

'maj13':'major 13th',
'm13':'minor 13th',
'13':'13th',
'13sus4':'13th suspended 4th'
}

pitch_letters = 'CDEFGAB'

def frequency_from_pitch(pitch):
    return round(musical_range_frequencies[pitch], 0)

def musical_range_compatable(pitch_with_octave):
    if pitch_with_octave in musical_range:
        return pitch_with_octave
    pitch_parts = split_letter_octave(pitch_with_octave)
    for enharmonic in enharmonic_equivalents[pitch_parts[0]]:
        if enharmonic + str(pitch_parts[1]) in musical_range:
            return enharmonic + str(pitch_parts[1])

def interval_semitones_from_pitches(pitch1, pitch2):
    return abs(musical_range.index(musical_range_compatable(pitch2)) - musical_range.index(musical_range_compatable(pitch1)))

def interval_name_from_pitches(pitch1, pitch2):
    return interval_semitone_to_name_dict[interval_semitones_from_pitches(pitch1, pitch2)]

def interval_name_from_semitones(semitones):
    return interval_semitone_to_name_dict[semitones]

def interval_semitones_from_name(interval_name):
    return interval_name_to_semitones_dict[interval_name]

def cents_to_ratio(cents):
    ratio = 2 ** (cents / 1200)
    return ratio
    
def ratio_to_cents(ratio):
    cents = 1200 * math.log(ratio, 2)
    return cents

def cents_delta_from_ratios(ratio1, ratio2):
    return round(ratio_to_cents(ratio1) - ratio_to_cents(ratio2), 0)

def intonate_single_pitch(pitch, pitch_list, context='inside'):
    def set_pitch_outisde(pitch, pitch_list):
        added_pitch_octave = int(pitch_list[-1][-1]) + 1
        if added_pitch_octave > 8:
            added_pitch_octave = 8
        return pitch + str(added_pitch_octave)
    
    def set_pitch_inside(pitch, pitch_list):
        inside_pitch = None
        for n in musical_range[musical_range.index(pitch_list[0]):musical_range.index(pitch_list[-1]) + 1]:
            if pitch == n[:-1]:
                inside_pitch = n
                break
        return inside_pitch
        
    inside_possible = True
    outside_possible = False
    cleaned_pitch_list = []
    for p in pitch_list:
        if 'b' in p:
            cleaned_pitch_list.append(musical_range_compatable(p))
        else:
            cleaned_pitch_list.append(p)

    pitch_list_no_octave = [p[:-1] for p in cleaned_pitch_list]
    added_pitch = None

    if pitch not in pitch_list_no_octave:
        outside_possible = True
        added_pitch = set_pitch_inside(pitch, cleaned_pitch_list)
        inside_possible = False if not added_pitch else True
        if context != 'inside' or not inside_possible:
            added_pitch = set_pitch_outisde(pitch, cleaned_pitch_list)
        cleaned_pitch_list.append(added_pitch)

    intonated_pitches = just_intonate(cleaned_pitch_list)
    if added_pitch:
        pitch_index = list(intonated_pitches[0].keys()).index(added_pitch)
    else:
        pitch_index = pitch_list_no_octave.index(pitch)
    pitch_adjustment = intonated_pitches[0][list(intonated_pitches[0].keys())[pitch_index]][1]

    if pitch_adjustment == "":
        return "0 cents", inside_possible, outside_possible
    else:
        return pitch_adjustment + " cents", inside_possible, outside_possible
    
def split_letter_octave(pitch):
    for index, letter in enumerate(pitch, 0):
        if letter.isdigit():
            return pitch[:index], int(pitch[index:])
        
def rewrite_chord_pitches(chord_pitches, chord_interval_list):
    def check_letter_difference(pitch1, pitch2, interval_index=0):
        letter_difference = (pitch_letters.index(pitch2[0]) - pitch_letters.index(pitch1[0])) + 1
        while letter_difference < 0:
            letter_difference += 7
        if interval_index == 0:
            interval_difference = split_letter_octave(chord_interval_list[0])[1]
        else:
            interval_difference = abs((split_letter_octave(chord_interval_list[interval_index])[1] - split_letter_octave(chord_interval_list[interval_index - 1])[1]) + 1)

        return letter_difference == interval_difference
    
    def count_accidentals(spelling, accidental_type):
        return sum(accidental_type in s for s in spelling)

    def choose_best_spelling(spelling_list):
        # Step 1: Remove spellings with the most double accidentals
        if any('##' in s or 'bb' in s for spelling in spelling_list for s in spelling):
            min_double_accidentals = min(count_accidentals(spelling, '##') + count_accidentals(spelling, 'bb') for spelling in spelling_list)
            spelling_list = [spelling for spelling in spelling_list if count_accidentals(spelling, '##') + count_accidentals(spelling, 'bb') == min_double_accidentals]

        # Step 2: Choose the spelling with the fewest single accidentals
        min_single_accidentals_spelling = min(spelling_list, key=lambda spelling: count_accidentals(spelling, '#') + count_accidentals(spelling, 'b'))
        
        return min_single_accidentals_spelling
    
    potential_spellings = []
    root_list = [split_letter_octave(chord_pitches[0])[0]] + enharmonic_equivalents[split_letter_octave(chord_pitches[0])[0]]

    for possible_root in root_list:
        temp_list = [possible_root + chord_pitches[0][-1]]
        for i in range(0, len(chord_pitches) - 1):
            next_note_list = [split_letter_octave(chord_pitches[i + 1])[0]] + enharmonic_equivalents[split_letter_octave(chord_pitches[i + 1])[0]]
            for next_note in next_note_list:
                if check_letter_difference(temp_list[i], next_note, i):
                    temp_list.append(next_note + str(split_letter_octave(chord_pitches[i + 1])[1]))
                    break
            else:
                break

        if len(temp_list) == len(chord_pitches):
            potential_spellings.append(temp_list)

    if len(potential_spellings) == 1:
        return potential_spellings[0]
    else:
        return choose_best_spelling(potential_spellings)

def pitches_from_chord_symbol(chord_symbol):
    chord_pitches = []
    slash = None
    if "/" in chord_symbol:
        chord_symbol, slash = chord_symbol.split("/")

    if "#" in chord_symbol or "b" in chord_symbol[:2]:
        root = chord_symbol[:2] + "4"
        quality_symbol = chord_symbol[2:]
    else:
        root = chord_symbol[0] + "4"
        quality_symbol = chord_symbol[1:]

    chord_pitches.append(root)
    for interval in chord_by_interval_dict[quality_symbol]:
        interval_semitones = interval_semitones_from_name(interval)
        if "b" in root:
            chord_pitches.append(musical_range[musical_range.index(musical_range_compatable(root)) + interval_semitones])
        else:
            chord_pitches.append(musical_range[musical_range.index(root) + interval_semitones])

    corrected_chord_pitches = [c[:-1] for c in rewrite_chord_pitches(chord_pitches, chord_by_interval_dict[quality_symbol])]
    if corrected_chord_pitches[0] != root[:-1]:
        chord_symbol = corrected_chord_pitches[0] + quality_symbol

    if slash:
        corrected_chord_pitches.insert(0, slash)
        chord_pitches.insert(0, slash  + "3")
        chord_symbol += "/" + slash

    pitch_string = '  '.join(corrected_chord_pitches)
    return pitch_string, chord_pitches, chord_symbol

def construct_chord_symbol(components):
    quality_dict = {
        "": "",
        "major": "",
        "minor": "m",
        "augmented": "+",
        "diminished": "°",
        "power": "5",
        "sus2": "sus2",
        "sus4": "sus4"
    }
    sevenths_dict = {
        "": "",
        "nat7": "maj7",
        "m7": "7",
        "bb7": "°7"
    }
    
    root, quality, seventh, extension, alteration, slash = components

    first = root
    second = quality_dict[quality]
    third = sevenths_dict[seventh]
    fourth = extension
    fifth = "(" + alteration + ")" if alteration != "" else ""

    if root in ["C#", "D#", "F#", "G#", "A#"] and quality in ["major", "augmented", "sus2", "sus4"]:
        first = enharmonic_equivalents[root][0]

    if quality == "major" and seventh == "" and extension == "" and alteration == "" and slash == "":
        return first + " Major"

    if quality == "major" and extension in ["add2", "add4", "add6"]:
        second = ""
    
    if quality == "minor" and seventh == "nat7":
        third = "(maj7)"

    if quality == "diminished":
        if seventh == "m7":
            second = "ø"
        elif seventh == "bb7":
            third = "7"

    if quality == "power" and extension == "9":
        fourth = "(add9)"

    if "sus" in quality and seventh != "":
        second = sevenths_dict[seventh]
        third = "(" + quality + ")"

    if "add" in extension:
        fourth = "(" + extension + ")"

    if quality not in ["major", "minor", "sus2", "sus4"] and seventh == "nat7":
        third = "(" + third + ")"

    if extension in ["9", "11", "13"] and quality != "minor":
        third = ""
        if seventh == "nat7":
            fourth = "maj" + extension if quality == "major" else "(maj" + extension + ")"
        if seventh == "":
            fourth = "(add" + extension + ")"

    elif extension in ["9", "11", "13"] and quality == "minor":
        third = ""
        if seventh == "nat7":
            third = extension
            fourth = "(maj7)"
        if seventh == "":
            fourth = "(add" + extension + ")"

    if alteration and extension in alteration:
        third = sevenths_dict[seventh]
        fourth = ""

    chord = first + second + third + fourth + fifth
    if slash:
        chord += slash
        
    return chord

def get_available_options(components):
    root, quality, seventh, extension, alteration, slash = components

    available_qualities = ["major", "minor", "augmented", "diminished", "dominant", "power", "sus2", "sus4"]
    available_sevenths = ["nat7", "m7", "bb7"]
    available_extensions = ["add2", "add4", "add6", "6/9", "9", "11", "13"]
    available_alterations = ["b5", "b6", "b9", "#9", "#11", "b13", "alt"]
    available_slashes = ["/C", "/C#", "/D", "/D#", "/E", "/F", "/F#", "/G", "/G#", "/A", "/A#", "/B"]

    force_on = {
        "roots": [],
        "qualities": [],
        "extensions": [],
        "alterations": [],
        "slashes": []
    }
    force_off = {
        "roots": [],
        "qualities": [],
        "extensions": [],
        "alterations": [],
        "slashes": []
    }

    if root == "" and quality != "" and extension != "" and alteration != "":
        force_on['roots'] = ["C"]

    if quality == "major":
        available_sevenths = ["nat7", "m7"]
        available_extensions = ["add2", "add4", "add6", "6/9", "9", "13"]
        available_alterations = ["b5", "#11"]
        if seventh == "m7":
            available_extensions = ["9", "13"]
            available_alterations = ["b5", "b9", "#9", "#11", "b13", "alt"]
    elif quality == "minor":
        available_sevenths = ["nat7", "m7"]
        available_extensions = ["add2", "add4", "add6", "6/9", "9", "11", "13"]
        if seventh == "m7":
            available_extensions.remove("6/9")
        available_alterations = ["b6"]
    elif quality == "augmented":
        available_sevenths = ["nat7", "m7"]
        available_extensions = ["add2", "9"]
        available_alterations = ["b9", "#9", "#11", "b13"] if seventh != "nat7" else ["#11"]
    elif quality == "diminished":
        available_sevenths = ["nat7", "m7", "bb7"]
        available_extensions = ["9", "11"] if seventh != "m7" else ["9", "11", "13"]
        available_alterations = []
    elif quality == "power":
        available_sevenths = []
        available_extensions = ["9"]
        available_alterations = []
    elif quality == "sus2":
        available_sevenths = ["nat7", "m7"]
        available_extensions = ["add4", "add6"]
        available_alterations = ["#11"]
    elif quality == "sus4":
        available_sevenths = ["nat7", "m7"]
        available_extensions = ["add2", "add6"] if seventh != "nat7" else ["add2"]
        available_alterations = ["b9"] if seventh != "nat7" else []
    
    if root != "":
        available_slashes.remove("/" + root)

    return {
        "qualities": available_qualities,
        "sevenths": available_sevenths,
        "extensions": available_extensions,
        "alterations": available_alterations,
        "slashes": available_slashes
    }

def get_interval_ratio(pitch1, pitch2, temperment='equal'):
    multiplier = 1
    new_interval_semitones = interval_semitones_from_pitches(pitch1, pitch2)
    while new_interval_semitones > 24:
        new_interval_semitones -= 12
        multiplier *= 2
    new_interval = interval_name_from_semitones(new_interval_semitones)
    interval_ratio = Fraction(interval_ratio_dict[new_interval][temperment]).limit_denominator(1000).as_integer_ratio()

    return interval_ratio, new_interval, multiplier

def freqs_from_ratios(chord_ratio_list, starting_freq = 262):
    chord_pitches = {}
    start_pitch = musical_range_frequencies[list(musical_range_frequencies.values()).index(starting_freq)]
    chord_pitches[start_pitch] = str(starting_freq) + " Hz"
    for i in range(1, len(chord_ratio_list)):
        new_freq = round(starting_freq * (chord_ratio_list[i] / chord_ratio_list[0]))
        new_pitch = musical_range_frequencies[list(musical_range_frequencies.values()).index(new_freq)]
        chord_pitches[new_pitch] = str(new_freq) + " Hz"
    return chord_pitches

def simplify_ratios(chord_ratios, index, interval_type, adjustment_limit=0.1, max_cents_adjustment=max_cents_adjustment_dict):
    chord_ratios_upscaled = [c * 100 for c in chord_ratios.copy()]
    original_value = chord_ratios_upscaled[index]
    best_adjustment = 0
    best_simplified_list = chord_ratios.copy()

    for i in range(-600, 601):  # Adjustments from -6 to 6
        adjusted_value = original_value + i
        if abs(adjusted_value / chord_ratios_upscaled[0] - original_value / chord_ratios_upscaled[0]) > adjustment_limit:
            continue
        temp_list = chord_ratios_upscaled.copy()
        temp_list[index] = adjusted_value
        gcd_value = math.gcd(*temp_list)
        simplified_list = [int(val / gcd_value) for val in temp_list]

        # Calculate the tuning adjustment for the current note
        cents_adjustment = cents_delta_from_ratios(simplified_list[index] / simplified_list[0], interval_ratio_dict[interval_type]['equal'])
        
        # If the adjustment exceeds the max_adjustment limit, skip this iteration
        if abs(cents_adjustment) > max_cents_adjustment[interval_type]:
            continue

        # Check if the new list is genuinely simpler than the best one found so far
        if max(simplified_list) < max(best_simplified_list) and max(simplified_list) < max(temp_list) and len(set(simplified_list)) == len(chord_ratios_upscaled):
            best_adjustment = i
            best_simplified_list = simplified_list

    # If no genuine simplification was found, return the original list
    if best_adjustment == 0:
        return chord_ratios_upscaled

    return best_simplified_list

def rewrite_pitch_list_octaves(pitch_list):
    new_pitch_list = []
    new_pitch_list.append(pitch_list[0])
    
    # Bring notes closer
    for i in range(len(pitch_list) - 1):
        current_pitch = new_pitch_list[i]
        next_pitch = pitch_list[i + 1]
        current_interval = interval_semitones_from_pitches(current_pitch, next_pitch)
        if current_interval > 12:
            new_pitch_list.append(musical_range[musical_range.index(next_pitch) - (12 * int(current_interval / 12))])
        else:
            new_pitch_list.append(next_pitch)
    
    # Calculate the average octave
    avg_octave = sum([int(p[-1]) for p in new_pitch_list]) / len(new_pitch_list)
    
    # Transpose to majority octave 4
    if avg_octave != 4:
        transpose_amount = (4 - int(new_pitch_list[0][-1])) * 12
        new_pitch_list = [musical_range[musical_range.index(pitch) + transpose_amount] for pitch in new_pitch_list]
    
    return new_pitch_list

def rewrite_pitch_list_enharmonics(pitch_list):
    rewritten_pitch_list = []
    for p in pitch_list:
        if '-' in p or 'b' in p:
            rewritten_pitch_list.append(musical_range_compatable(p))
        else:
            rewritten_pitch_list.append(p)
    return rewritten_pitch_list

def rewrite_chord_ratios(chord_ratios_list, new_interval_ratio):
    # Extract the first element of the chord_ratios_list which represents the denominator of the first ratio
    current_denominator = chord_ratios_list[0]
    
    # Calculate the LCM of the current denominator and the denominator of the new_interval_ratio
    ratio_lcm = math.lcm(current_denominator, new_interval_ratio[1])
    
    # Calculate the multipliers for both the chord_ratios_list and the new_interval_ratio
    multiplier1 = ratio_lcm / current_denominator
    multiplier2 = ratio_lcm / new_interval_ratio[1]
    
    # If the chord_ratios_list needs to be scaled
    if multiplier1 != 1:
        chord_ratios_list = [int(item * multiplier1) for item in chord_ratios_list]
    
    # Scale the numerator of the new_interval_ratio and append it to the chord_ratios_list
    scaled_numerator = int(new_interval_ratio[0] * multiplier2)
    chord_ratios_list.append(scaled_numerator)
    
    # Check if the entire list can be scaled down
    gcd_value = math.gcd(*chord_ratios_list)
    if gcd_value > 1:
        chord_ratios_list = [int(val / gcd_value) for val in chord_ratios_list]
    
    return chord_ratios_list

def write_freq_and_vol_for_adjustments(adjustment_dict):
    starting_pitch = list(adjustment_dict.keys())[0]
    starting_freq = musical_range_frequencies[starting_pitch]
    
    for chord_tone, adjustment in adjustment_dict.items():
        interval_ratio, interval_type, multiplier = get_interval_ratio(starting_pitch, chord_tone, 'just')
        adjusted_cents = ratio_to_cents(interval_ratio_dict[interval_type]['equal'] * multiplier) + adjustment
        adjusted_freq = int(round(float(cents_to_ratio(adjusted_cents) * starting_freq), 0))
        
        sign = "+" if adjustment > 0 else ""
        if chord_tone == starting_pitch:
            adjustment_dict[chord_tone] = [f"{adjusted_freq} Hz", '', interval_volume_dict[interval_type]]
        else:
            adjustment_dict[chord_tone] = [f"{adjusted_freq} Hz", f"{sign}{adjustment}", interval_volume_dict[interval_type]]

    return adjustment_dict

def just_intonate(pitch_list, adjustment_margin=0.1):
    pitch_list = sorted(pitch_list, key=lambda x: musical_range.index(x))
    chord_tuning = {pitch_list[0]: 0}
    chord_ratios = []
    if len(pitch_list) == 1:
        chord_tuning = {pitch_list[0]: [str(int(frequency_from_pitch(pitch_list[0]))) + ' Hz', '', 1]}
        return chord_tuning, ''
    
    cleaned_pitch_list = rewrite_pitch_list_octaves(rewrite_pitch_list_enharmonics(pitch_list))
    for n in range(1, len(cleaned_pitch_list)):
        interval_ratio, interval_type, multiplier = get_interval_ratio(cleaned_pitch_list[0], cleaned_pitch_list[n], temperment='just')
        # If it's the first ratio, simply add it
        if len(chord_ratios) == 0:
            chord_ratios.extend([interval_ratio[1], interval_ratio[0]])
        else:
            # Get the updated chord_ratios with the new interval
            updated_ratios = rewrite_chord_ratios(chord_ratios, interval_ratio)
            
            # Simplify the updated_ratios with the new interval
            for i in reversed(range(1, len(updated_ratios))):
                updated_ratios = simplify_ratios(updated_ratios, i, interval_type, adjustment_margin)
            
            chord_ratios = updated_ratios

        chord_tuning[pitch_list[n]] = int(cents_delta_from_ratios(chord_ratios[n] / chord_ratios[0], interval_ratio_dict[interval_type]['equal']))
        
    chord_tuning = write_freq_and_vol_for_adjustments(chord_tuning)

    # Scale down the chord_ratios list by their GCD
    gcd_value = math.gcd(*chord_ratios)
    chord_ratios = [int(val / gcd_value) for val in chord_ratios]
    chord_ratio_string = ':'.join([str(r) for r in chord_ratios])
    return chord_tuning, chord_ratio_string

