// import React from 'react';
// import Card from '../Card';
// import { ReportTypeSelectorProps } from './types'; 

// const ReportTypeSelector: React.FC<ReportTypeSelectorProps> = ({
//   selectedType,
//   onTypeChange
// }) => {
//   const types = [
//     { key: 'detalhado', label: 'Detalhado' },
//     { key: 'diario', label: 'Diário' },
//     { key: 'semanal', label: 'Semanal' }
//   ] as const;

//   return (
//     <Card>
//       <div className="flex space-x-4 mb-6">
//         {types.map(({ key, label }) => (
//           <button
//             key={key}
//             onClick={() => onTypeChange(key)}
//             className={`btn-${selectedType === key ? 'primary' : 'secondary'}`}
//           >
//             {label}
//           </button>
//         ))}
//       </div>
//     </Card>
//   );
// };

// export default ReportTypeSelector;
