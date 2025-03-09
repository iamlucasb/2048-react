import {
  ref,
  set,
  push,
  get,
  child,
  DatabaseReference,
  DataSnapshot,
} from 'firebase/database';
import { database } from './config';

const SCORES_PATH = 'scores';

interface Score {
  id?: string;
  username: string;
  score: number;
  date: string | Date;
}

/**
 * Ajoute un nouveau score à la base de données
 * @param username - Le pseudo du joueur
 * @param score - Le score obtenu
 * @returns - L'ID du score créé
 */
export const addScore = async (
  username: string,
  score: number
): Promise<string | null> => {
  try {
    const scoresRef: DatabaseReference = ref(database, SCORES_PATH);
    const newScoreRef = push(scoresRef);

    await set(newScoreRef, {
      username,
      score,
      date: new Date().toISOString(),
    });

    return newScoreRef.key;
  } catch (error) {
    console.error("Erreur lors de l'ajout du score:", error);
    throw error;
  }
};

/**
 * Récupère les meilleurs scores
 * @param limitCount - Le nombre de scores à récupérer
 * @returns - Les scores triés par ordre décroissant
 */
export const getTopScores = async (
  limitCount: number = 5
): Promise<Score[]> => {
  try {
    // Valider que limitCount est un nombre positif
    const validLimit = Math.max(1, parseInt(limitCount.toString()) || 5);

    // Récupérer tous les scores
    const dbRef = ref(database);
    const snapshot: DataSnapshot = await get(child(dbRef, SCORES_PATH));
    const scores: Score[] = [];

    if (snapshot.exists()) {
      // Convertir l'objet en tableau
      snapshot.forEach((childSnapshot: DataSnapshot) => {
        const data = childSnapshot.val();
        scores.push({
          id: childSnapshot.key || undefined,
          ...data,
          // Assurer que la date est un objet Date
          date: data.date ? new Date(data.date) : new Date(),
        });
      });

      // Trier par score décroissant
      scores.sort((a, b) => b.score - a.score);

      // Limiter le nombre de résultats
      return scores.slice(0, validLimit);
    }

    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des scores:', error);
    return [];
  }
};
