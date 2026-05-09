import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { Curriculo } from "@/data/curriculos";

const COLLECTION = "curriculos";

type CurriculoInput = Omit<Curriculo, "id" | "createdAt" | "updatedAt">;

export async function criarCurriculo(dados: CurriculoInput): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...dados,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function listarCurriculos(): Promise<Curriculo[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Curriculo));
}

export async function buscarCurriculoPorId(id: string): Promise<Curriculo | null> {
  const docRef = doc(db, COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Curriculo;
}

export async function atualizarCurriculo(
  id: string,
  dados: Partial<CurriculoInput>
): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, { ...dados, updatedAt: serverTimestamp() });
}

export async function excluirCurriculo(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
