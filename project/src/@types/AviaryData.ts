export interface AviaryData {
  id?: number;                        // ✅ Mudado para number
  name: string;
  initialAmountOfRoosters: number;
  initialAmountOfChickens: number;
  batchId: number;                    // ✅ Mudado para number
  currentAmountOfRooster?: number | null;   // ✅ Novo campo
  currentAmountOfChickens?: number | null;  // ✅ Novo campo
}

