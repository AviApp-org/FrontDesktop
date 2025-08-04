export interface AviaryData {
  id: number;                        
  name: string;
  initialAmountOfRoosters: number;
  initialAmountOfChickens: number;
  batchId: number;                    
  currentAmountOfRooster?: number | null;   
  currentAmountOfChickens?: number | null;  
}

