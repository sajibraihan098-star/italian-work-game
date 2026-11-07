import type { Scenario } from '../../../types'

export const restaurantScenario1: Scenario = {
  id: 'restaurant-1',
  titleIt: 'Primo giorno al ristorante',
  titleBn: 'রেস্টুরেন্টে প্রথম দিন',
  titleEn: 'First day at the restaurant',
  descriptionIt: 'Arrivi e servi i primi clienti. Impara saluti, tavolo e conto.',
  descriptionBn: 'কাজ শুরু + গ্রাহক সেবা শেখো।',
  category: 'restaurant',
  difficulty: 1,
  estimatedMinutes: 6,
  vocabularyIds: ['tavolo', 'conto', 'prego', 'carta', 'contanti'],
  steps: [
    {
      id: 'r1',
      type: 'info',
      info: {
        titleIt: '🍝 Scenario: Ristorante',
        titleBn: 'রেস্টুরেন্ট সিনারিও',
        bodyIt: 'Sei il nuovo cameriere. Un cliente arriva. Rispondi in modo educato e utile.',
        bodyBn: 'তুমি নতুন ওয়েটার। একজন গ্রাহক এসেছে। ভদ্র ও সাহায্যকারী হয়ে উত্তর দাও।',
      },
    },
    {
      id: 'r2',
      type: 'dialogue',
      line: {
        id: 'l1',
        speaker: 'npc',
        textIt: 'Buonasera! Un tavolo per due, per favore.',
        textBn: 'শুভ সন্ধ্যা! দুজনের একটি টেবিল চাই।',
      },
    },
    {
      id: 'r3',
      type: 'choice',
      choices: [
        {
          id: 'c1',
          textIt: 'Buonasera! Prego, da questa parte.',
          textBn: 'শুভ সন্ধ্যা! আসুন, এদিকে।',
          isCorrect: true,
          feedbackIt: 'Perfetto! Educato e chiaro.',
          feedbackBn: 'দারুণ! ভদ্র এবং স্পষ্ট।',
        },
        {
          id: 'c2',
          textIt: 'Arrivederci!',
          textBn: 'বিদায়!',
          isCorrect: false,
          feedbackIt: 'Arrivederci si usa quando qualcuno se ne va.',
          feedbackBn: 'Arrivederci তখন বলে যখন কেউ চলে যায়।',
        },
        {
          id: 'c3',
          textIt: 'Il conto, grazie.',
          textBn: 'বিল দিন।',
          isCorrect: false,
          feedbackIt: 'Troppo presto per il conto. Prima siedi il cliente.',
          feedbackBn: 'বিলের জন্য এখনও তাড়াতাড়ি। আগে গ্রাহককে বসাও।',
        },
      ],
    },
    {
      id: 'r4',
      type: 'dialogue',
      line: {
        id: 'l2',
        speaker: 'npc',
        textIt: 'Cosa mi consiglia?',
        textBn: 'আপনি কী সাজেস্ট করেন?',
      },
    },
    {
      id: 'r5',
      type: 'choice',
      choices: [
        {
          id: 'c4',
          textIt: 'Oggi abbiamo la lasagna, è ottima.',
          textBn: 'আজ আমাদের লাজানিয়া আছে, দারুণ।',
          isCorrect: true,
          feedbackIt: 'Ottima risposta: dai un consiglio concreto.',
          feedbackBn: 'চমৎকার: স্পষ্ট সাজেশন দিয়েছ।',
        },
        {
          id: 'c5',
          textIt: 'Sono le otto.',
          textBn: 'এখন আটটা বাজে।',
          isCorrect: false,
          feedbackIt: 'Non risponde alla domanda.',
          feedbackBn: 'প্রশ্নের উত্তর হয়নি।',
        },
        {
          id: 'c6',
          textIt: 'Il bagno è là.',
          textBn: 'টয়লেট ওখানে।',
          isCorrect: false,
          feedbackIt: 'Non c’entra con il cibo.',
          feedbackBn: 'খাবারের সাথে সম্পর্ক নেই।',
        },
      ],
    },
    {
      id: 'r6',
      type: 'dialogue',
      line: {
        id: 'l3',
        speaker: 'npc',
        textIt: 'Il conto, per favore.',
        textBn: 'বিলটা দিন, দয়া করে।',
      },
    },
    {
      id: 'r7',
      type: 'choice',
      choices: [
        {
          id: 'c7',
          textIt: 'Subito! Contanti o carta?',
          textBn: 'এক্ষুনি! ক্যাশ নাকি কার্ড?',
          isCorrect: true,
          feedbackIt: 'Professionale e utile.',
          feedbackBn: 'পেশাদার এবং দরকারি।',
        },
        {
          id: 'c8',
          textIt: 'Buon appetito!',
          textBn: 'ভালো খাওয়া হোক!',
          isCorrect: false,
          feedbackIt: 'Si dice all’inizio del pasto, non alla fine.',
          feedbackBn: 'এটা খাবার শুরুতে বলে, শেষে নয়।',
        },
      ],
    },
    {
      id: 'r8',
      type: 'info',
      info: {
        titleIt: 'Vocabolario utile',
        titleBn: 'দরকারি শব্দ',
        bodyIt: 'il tavolo = টেবিল\nil conto = বিল\nprego = স্বাগতম / আসুন\ncarta = কার্ড\ncontanti = নগদ',
        bodyBn: 'এগুলো মনে রাখো — রেস্টুরেন্টে প্রতিদিন লাগে।',
      },
    },
  ],
}
