import type { Scenario } from '../../../types'

export const restaurantScenario1: Scenario = {
  id: 'restaurant-1',
  titleIt: 'Primo giorno al ristorante',
  titleBn: 'রেস্টুরেন্টে প্রথম দিন',
  titleEn: 'First day at the restaurant',
  descriptionIt: 'Arrivi per il tuo primo giorno di lavoro come aiuto cucina / cameriere.',
  descriptionBn: 'তুমি রেস্টুরেন্টে প্রথম দিনের কাজের জন্য এসেছ।',
  category: 'restaurant',
  difficulty: 1,
  estimatedMinutes: 8,
  vocabularyIds: ['buongiorno', 'piacere', 'turno', 'grembiule'],
  steps: [
    {
      id: 's1',
      type: 'info',
      info: {
        titleIt: 'Scenario: Primo giorno',
        titleBn: 'সিনারিও: প্রথম দিন',
        bodyIt: 'Sei arrivato al ristorante alle 9:00. Il responsabile ti aspetta all’ingresso.',
        bodyBn: 'তুমি সকাল ৯টায় রেস্টুরেন্টে পৌঁছেছ। ম্যানেজার প্রবেশপথে তোমার জন্য অপেক্ষা করছে।',
      },
    },
    {
      id: 's2',
      type: 'dialogue',
      line: {
        id: 'l1',
        speaker: 'npc',
        textIt: 'Buongiorno! Tu sei il nuovo?',
        textBn: 'শুভ সকাল! তুমি কি নতুন?',
        textEn: 'Good morning! Are you the new one?',
      },
    },
    {
      id: 's3',
      type: 'choice',
      choices: [
        {
          id: 'c1',
          textIt: 'Sì, buongiorno! Sono Sajib, piacere.',
          textBn: 'হ্যাঁ, শুভ সকাল! আমি সাজিব, পরিচয় হতে পেরে ভালো লাগল।',
          textEn: 'Yes, good morning! I’m Sajib, nice to meet you.',
          isCorrect: true,
          feedbackIt: 'Perfetto! Molto educato e chiaro.',
          feedbackBn: 'দারুণ! খুব ভদ্র এবং স্পষ্ট।',
        },
        {
          id: 'c2',
          textIt: 'Ciao, sono qui per lavorare.',
          textBn: 'হাই, আমি কাজ করতে এসেছি।',
          isCorrect: false,
          feedbackIt: 'Troppo informale per il primo incontro con il responsabile. Meglio “Buongiorno”.',
          feedbackBn: 'ম্যানেজারের সাথে প্রথম দেখায় এটা খুব ইনফরমাল। “Buongiorno” বলা ভালো।',
        },
        {
          id: 'c3',
          textIt: 'Sì.',
          textBn: 'হ্যাঁ।',
          isCorrect: false,
          feedbackIt: 'Troppo corto. Presentati e saluta bene.',
          feedbackBn: 'খুব ছোট। নিজের পরিচয় দাও এবং ভালোভাবে সালাম দাও।',
        },
      ],
    },
    {
      id: 's4',
      type: 'dialogue',
      line: {
        id: 'l2',
        speaker: 'npc',
        textIt: 'Piacere, Sajib. Io sono Marco, il responsabile di sala. Oggi fai il turno del pranzo con noi.',
        textBn: 'আনন্দের বিষয়, সাজিব। আমি মার্কো, হলের দায়িত্বে আছি। আজ তুমি আমাদের সাথে লাঞ্চ শিফটে কাজ করবে।',
      },
    },
    {
      id: 's5',
      type: 'choice',
      choices: [
        {
          id: 'c4',
          textIt: 'Perfetto, sono pronto. Dove mi metto?',
          textBn: 'দারুণ, আমি রেডি। আমাকে কোথায় দাঁড়াতে হবে?',
          isCorrect: true,
          feedbackIt: 'Ottimo: mostri disponibilità e chiedi istruzioni.',
          feedbackBn: 'চমৎকার: তুমি প্রস্তুত বলেছ এবং নির্দেশনা চেয়েছ।',
        },
        {
          id: 'c5',
          textIt: 'Ok.',
          textBn: 'ঠিক আছে।',
          isCorrect: false,
          feedbackIt: 'Puoi essere un po’ più attivo. Chiedi cosa fare.',
          feedbackBn: 'আরেকটু সক্রিয় হতে পারো। কী করতে হবে জিজ্ঞাসা করো।',
        },
      ],
    },
    {
      id: 's6',
      type: 'info',
      info: {
        titleIt: 'Vocabolario utile',
        titleBn: 'দরকারি শব্দ',
        bodyIt: 'turno = শিফট / কাজের সময়\ngrembiule = এপ্রোন\nresponsabile = দায়িত্বে থাকা ব্যক্তি\nsala = হল / ডাইনিং এরিয়া',
        bodyBn: 'এগুলো মনে রাখো — রেস্টুরেন্টের কাজে খুব কাজে লাগে।',
      },
    },
    {
      id: 's7',
      type: 'dialogue',
      line: {
        id: 'l3',
        speaker: 'npc',
        textIt: 'Prima metti il grembiule. Poi ti mostro come si apparecchia un tavolo.',
        textBn: 'আগে এপ্রোন পরো। তারপর আমি তোমাকে টেবিল সাজাতে শেখাব।',
      },
    },
    {
      id: 's8',
      type: 'choice',
      choices: [
        {
          id: 'c6',
          textIt: 'Va bene, grazie. Dove trovo il grembiule?',
          textBn: 'ঠিক আছে, ধন্যবাদ। এপ্রোন কোথায় পাব?',
          isCorrect: true,
          feedbackIt: 'Eccellente: cortese e pratico.',
          feedbackBn: 'চমৎকার: ভদ্র এবং ব্যবহারিক।',
        },
        {
          id: 'c7',
          textIt: 'Non voglio mettere il grembiule.',
          textBn: 'আমি এপ্রোন পরতে চাই না।',
          isCorrect: false,
          feedbackIt: 'In un ristorante il grembiule è obbligatorio. Meglio collaborare.',
          feedbackBn: 'রেস্টুরেন্টে এপ্রোন বাধ্যতামূলক। সহযোগিতা করাই ভালো।',
        },
      ],
    },
  ],
}