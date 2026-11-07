import type { Scenario } from '../../../types'

export const restaurantScenario2: Scenario = {
  id: 'restaurant-2',
  titleIt: 'Ordine e allergeni',
  titleBn: 'অর্ডার ও অ্যালার্জি',
  titleEn: 'Order and allergens',
  descriptionIt: 'Prendi un ordine e gestisci una richiesta di allergeni.',
  descriptionBn: 'অর্ডার নাও এবং অ্যালার্জির অনুরোধ সামলাও।',
  category: 'restaurant',
  difficulty: 2,
  estimatedMinutes: 6,
  steps: [
    {
      id: 'a1',
      type: 'info',
      info: {
        titleIt: '🍝 Nuovo cliente al tavolo',
        titleBn: 'টেবিলে নতুন গ্রাহক',
        bodyIt: 'Il cliente vuole ordinare. Ascolta bene e rispondi in modo chiaro.',
        bodyBn: 'গ্রাহক অর্ডার করতে চায়। ভালো করে শোনো এবং স্পষ্ট উত্তর দাও।',
      },
    },
    {
      id: 'a2',
      type: 'dialogue',
      line: {
        id: 'l1',
        speaker: 'npc',
        textIt: 'Vorrei i spaghetti al pomodoro, per favore.',
        textBn: 'স্প্যাগেটি আল পোমোদোরো চাই, দয়া করে।',
      },
    },
    {
      id: 'a3',
      type: 'choice',
      choices: [
        {
          id: 'c1',
          textIt: 'Perfetto. Desidera anche qualcosa da bere?',
          textBn: 'দারুণ। কিছু পানীয়ও নেবেন?',
          isCorrect: true,
          feedbackIt: 'Ottimo: confermi e proponi il bere.',
          feedbackBn: 'চমৎকার: নিশ্চিত করে পানীয়ও অফার করেছ।',
        },
        {
          id: 'c2',
          textIt: 'No, non abbiamo pasta.',
          textBn: 'না, আমাদের পাস্তা নেই।',
          isCorrect: false,
          feedbackIt: 'Non è vero e non aiuta il cliente.',
          feedbackBn: 'সত্য নয় এবং গ্রাহককে সাহায্য করে না।',
        },
      ],
    },
    {
      id: 'a4',
      type: 'dialogue',
      line: {
        id: 'l2',
        speaker: 'npc',
        textIt: 'Sono allergico ai frutti di mare. C’è pesce nel sugo?',
        textBn: 'আমার সামুদ্রিক খাবারে অ্যালার্জি। সসে মাছ আছে কি?',
      },
    },
    {
      id: 'a5',
      type: 'choice',
      choices: [
        {
          id: 'c3',
          textIt: 'Controllo subito in cucina e le dico.',
          textBn: 'এক্ষুনি রান্নাঘরে চেক করে বলছি।',
          isCorrect: true,
          feedbackIt: 'Perfetto: prendi sul serio l’allergia.',
          feedbackBn: 'দারুণ: অ্যালার্জিকে সিরিয়াসলি নিয়েছ।',
        },
        {
          id: 'c4',
          textIt: 'Non lo so, non è un problema.',
          textBn: 'জানি না, সমস্যা নেই।',
          isCorrect: false,
          feedbackIt: 'Le allergie sono sempre importanti. Meglio controllare.',
          feedbackBn: 'অ্যালার্জি সবসময় গুরুত্বপূর্ণ। চেক করাই ভালো।',
        },
      ],
    },
    {
      id: 'a6',
      type: 'dialogue',
      line: {
        id: 'l3',
        speaker: 'npc',
        textIt: 'Grazie. Allora una bottiglia d’acqua naturale.',
        textBn: 'ধন্যবাদ। তাহলে এক বোতল সাধারণ পানি।',
      },
    },
    {
      id: 'a7',
      type: 'choice',
      choices: [
        {
          id: 'c5',
          textIt: 'Subito. Porto l’acqua e poi i spaghetti.',
          textBn: 'এক্ষুনি। আগে পানি আনছি, তারপর স্প্যাগেটি।',
          isCorrect: true,
          feedbackIt: 'Chiaro e professionale.',
          feedbackBn: 'স্পষ্ট এবং পেশাদার।',
        },
        {
          id: 'c6',
          textIt: 'Ok.',
          textBn: 'ঠিক আছে।',
          isCorrect: false,
          feedbackIt: 'Troppo corto. Meglio ripetere l’ordine.',
          feedbackBn: 'খুব ছোট। অর্ডার আবার বলা ভালো।',
        },
      ],
    },
  ],
}
