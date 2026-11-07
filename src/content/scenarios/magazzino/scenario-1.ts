import type { Scenario } from '../../../types'

export const magazzinoScenario1: Scenario = {
  id: 'magazzino-1',
  titleIt: 'Arrivo in magazzino',
  titleBn: 'ম্যাগাজিনে প্রথম দিন',
  titleEn: 'First day in the warehouse',
  descriptionIt: 'Presentati, sposta i pacchi e fai attenzione alla sicurezza.',
  descriptionBn: 'পরিচয় দাও, প্যাকেট সরান, নিরাপত্তা মানুন।',
  category: 'magazzino',
  difficulty: 1,
  estimatedMinutes: 5,
  vocabularyIds: ['pacco', 'scaffale', 'attenzione', 'bagnato'],
  steps: [
    {
      id: 'm1',
      type: 'info',
      info: {
        titleIt: '📦 Scenario: Magazzino',
        titleBn: 'ম্যাগাজিন সিনারিও',
        bodyIt: 'È il tuo primo giorno. Il capo ti parla. Rispondi in modo chiaro e collaborativo.',
        bodyBn: 'আজ প্রথম দিন। বস কথা বলছে। স্পষ্ট ও সহযোগিতামূলক উত্তর দাও।',
      },
    },
    {
      id: 'm2',
      type: 'dialogue',
      line: {
        id: 'l1',
        speaker: 'npc',
        textIt: 'Sei nuovo? Come ti chiami?',
        textBn: 'তুমি নতুন? তোমার নাম কী?',
      },
    },
    {
      id: 'm3',
      type: 'choice',
      choices: [
        {
          id: 'c1',
          textIt: 'Mi chiamo Sajib, piacere.',
          textBn: 'আমার নাম সাজিব, আনন্দিত।',
          isCorrect: true,
          feedbackIt: 'Perfetto: ti presenti e sei educato.',
          feedbackBn: 'দারুণ: নিজের পরিচয় দিয়েছ এবং ভদ্র।',
        },
        {
          id: 'c2',
          textIt: 'Sì, il pranzo è pronto.',
          textBn: 'হ্যাঁ, দুপুরের খাবার তৈরি।',
          isCorrect: false,
          feedbackIt: 'Non risponde alla domanda.',
          feedbackBn: 'প্রশ্নের উত্তর হয়নি।',
        },
        {
          id: 'c3',
          textIt: 'Domani piove.',
          textBn: 'কাল বৃষ্টি হবে।',
          isCorrect: false,
          feedbackIt: 'Fuori tema.',
          feedbackBn: 'বিষয়ের বাইরে।',
        },
      ],
    },
    {
      id: 'm4',
      type: 'dialogue',
      line: {
        id: 'l2',
        speaker: 'npc',
        textIt: 'Porta questi pacchi allo scaffale tre.',
        textBn: 'এই প্যাকেটগুলো তিন নম্বর শেলফে নিয়ে যাও।',
      },
    },
    {
      id: 'm5',
      type: 'choice',
      choices: [
        {
          id: 'c4',
          textIt: 'Va bene, subito!',
          textBn: 'ঠিক আছে, এক্ষুনি!',
          isCorrect: true,
          feedbackIt: 'Chiaro e pronto a lavorare.',
          feedbackBn: 'স্পষ্ট এবং কাজ করতে প্রস্তুত।',
        },
        {
          id: 'c5',
          textIt: 'Il carrello è rosso.',
          textBn: 'ট্রলিটা লাল।',
          isCorrect: false,
          feedbackIt: 'Non risponde all’ordine.',
          feedbackBn: 'অর্ডারের উত্তর নয়।',
        },
      ],
    },
    {
      id: 'm6',
      type: 'dialogue',
      line: {
        id: 'l3',
        speaker: 'npc',
        textIt: 'Attenzione! Il pavimento è bagnato.',
        textBn: 'সাবধান! মেঝে ভেজা।',
      },
    },
    {
      id: 'm7',
      type: 'choice',
      choices: [
        {
          id: 'c6',
          textIt: 'Grazie, faccio attenzione.',
          textBn: 'ধন্যবাদ, আমি সাবধান থাকব।',
          isCorrect: true,
          feedbackIt: 'Sicurezza prima di tutto. Bravo.',
          feedbackBn: 'নিরাপত্তা সবচেয়ে গুরুত্বপূর্ণ।',
        },
        {
          id: 'c7',
          textIt: 'Non è un problema mio.',
          textBn: 'এটা আমার সমস্যা না।',
          isCorrect: false,
          feedbackIt: 'In magazzino la sicurezza è di tutti.',
          feedbackBn: 'ম্যাগাজিনে নিরাপত্তা সবার দায়িত্ব।',
        },
      ],
    },
  ],
}
