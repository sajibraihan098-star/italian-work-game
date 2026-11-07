import type { Scenario } from '../../../types'

export const fabbricaScenario1: Scenario = {
  id: 'fabbrica-1',
  titleIt: 'Alla pressa in fabbrica',
  titleBn: 'ফ্যাক্টরিতে প্রেস মেশিনে',
  titleEn: 'At the press in the factory',
  descriptionIt: 'Sicurezza, casco, e risposte chiare al capoturno.',
  descriptionBn: 'নিরাপত্তা, হেলমেট, এবং স্পষ্ট উত্তর।',
  category: 'fabbrica',
  difficulty: 1,
  estimatedMinutes: 5,
  vocabularyIds: ['casco', 'guanti', 'pressa', 'fermare'],
  steps: [
    {
      id: 'f1',
      type: 'info',
      info: {
        titleIt: '🏭 Scenario: Fabbrica',
        titleBn: 'ফ্যাক্টরি সিনারিও',
        bodyIt: 'Lavori vicino alle macchine. La sicurezza è la cosa più importante.',
        bodyBn: 'মেশিনের কাছে কাজ। নিরাপত্তা সবচেয়ে গুরুত্বপূর্ণ।',
      },
    },
    {
      id: 'f2',
      type: 'dialogue',
      line: {
        id: 'l1',
        speaker: 'npc',
        textIt: 'Questa è la pressa. Metti il casco.',
        textBn: 'এটা প্রেস মেশিন। হেলমেট পরো।',
      },
    },
    {
      id: 'f3',
      type: 'choice',
      choices: [
        {
          id: 'c1',
          textIt: 'Sì, certo. Dove sono i guanti?',
          textBn: 'জি, অবশ্যই। গ্লাভস কোথায়?',
          isCorrect: true,
          feedbackIt: 'Ottimo: collabori e chiedi ciò che serve.',
          feedbackBn: 'দারুণ: সহযোগিতা করেছ এবং দরকারি জিনিস জিজ্ঞাসা করেছ।',
        },
        {
          id: 'c2',
          textIt: 'Non mi piace il caffè.',
          textBn: 'আমি কফি পছন্দ করি না।',
          isCorrect: false,
          feedbackIt: 'Fuori tema. Qui si parla di sicurezza.',
          feedbackBn: 'বিষয়ের বাইরে। এখানে নিরাপত্তার কথা।',
        },
      ],
    },
    {
      id: 'f4',
      type: 'dialogue',
      line: {
        id: 'l2',
        speaker: 'npc',
        textIt: 'Se senti un rumore strano, ferma la macchina.',
        textBn: 'অদ্ভুত শব্দ শুনলে মেশিন থামাও।',
      },
    },
    {
      id: 'f5',
      type: 'choice',
      choices: [
        {
          id: 'c3',
          textIt: 'Ho capito: fermo la macchina.',
          textBn: 'বুঝেছি: আমি মেশিন থামাব।',
          isCorrect: true,
          feedbackIt: 'Chiaro e sicuro.',
          feedbackBn: 'স্পষ্ট এবং নিরাপদ।',
        },
        {
          id: 'c4',
          textIt: 'Aumento la velocità.',
          textBn: 'আমি গতি বাড়াই।',
          isCorrect: false,
          feedbackIt: 'Pericoloso. Si deve fermare.',
          feedbackBn: 'বিপজ্জনক। থামানো উচিত।',
        },
      ],
    },
    {
      id: 'f6',
      type: 'dialogue',
      line: {
        id: 'l3',
        speaker: 'npc',
        textIt: 'Quanti pezzi hai finito?',
        textBn: 'কয়টা পিস শেষ করেছ?',
      },
    },
    {
      id: 'f7',
      type: 'choice',
      choices: [
        {
          id: 'c5',
          textIt: 'Ho finito duecento pezzi.',
          textBn: 'আমি দুইশো পিস শেষ করেছি।',
          isCorrect: true,
          feedbackIt: 'Risposta chiara e precisa.',
          feedbackBn: 'স্পষ্ট এবং সঠিক উত্তর।',
        },
        {
          id: 'c6',
          textIt: 'Non lo so.',
          textBn: 'আমি জানি না।',
          isCorrect: false,
          feedbackIt: 'Meglio contare e rispondere con un numero.',
          feedbackBn: 'গুণে সংখ্যা দিয়ে উত্তর দেওয়া ভালো।',
        },
      ],
    },
  ],
}
