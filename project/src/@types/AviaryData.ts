export interface AviaryData {
  id?: number;                        // ✅ Mudado para number
  name: string;
  initialAmountOfRoosters: number;
  initialAmountOfChickens: number;
  batchId: number;                    // ✅ Mudado para number
  currentAmountOfRooster?: number | null;   // ✅ Novo campo
  currentAmountOfChickens?: number | null;  // ✅ Novo campo
  
  // Campos opcionais (podem não existir no backend):
  waterQuantity?: number;
  temperature?: {
    max: number;
    min: number;
  };
  eggs?: {
    total: number;
    cracked: number;
    dirtyNest: number;
    small: number;
    incubatable: number;
    broken: number;
    deformed: number;
    thinShell: number;
    eliminated: number;
    market: number;
  };
}

// ✅ Tipo específico para criação
export interface CreateAviaryData {
  name: string;
  initialAmountOfRoosters: number;
  initialAmountOfChickens: number;
  batchId: number;
}
