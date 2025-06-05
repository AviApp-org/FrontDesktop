// import React from 'react';
// import { Table, Button, Tag, Card, Empty } from 'antd';
// import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
// import { DailyReportData } from '../../@types/DailyReportData';
// import { WeeklyReportData } from '../../@types/WeeklyReportData';
// import { ReportsListProps } from './types';


// export const ReportsList: React.FC<ReportsListProps> = ({
//   type,
//   dailyReports,
//   weeklyReports,
//   isLoading,
//   onReportSelect,
//   onExport
// }) => {
//   // Colunas para relatórios diários
//   const dailyColumns = [
//     {
//       title: 'Data',
//       dataIndex: 'date',
//       key: 'date',
//       render: (date: string) => new Date(date).toLocaleDateString('pt-BR'),
//       sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
//     },
//     {
//       title: 'Total de Ovos',
//       dataIndex: 'totalEggsCollected',
//       key: 'totalEggsCollected',
//       render: (value: number) => value?.toLocaleString('pt-BR') || '0',
//       sorter: (a: any, b: any) => (a.totalEggsCollected || 0) - (b.totalEggsCollected || 0),
//     },
//     {
//       title: 'Aves Vivas',
//       dataIndex: 'totalBirds',
//       key: 'totalBirds',
//       render: (value: number) => value?.toLocaleString('pt-BR') || '0',
//       sorter: (a: any, b: any) => (a.totalBirds || 0) - (b.totalBirds || 0),
//     },
//     {
//       title: 'Produção (%)',
//       dataIndex: 'production',
//       key: 'production',
//       render: (value: number) => `${(value || 0).toFixed(2)}%`,
//       sorter: (a: any, b: any) => (a.production || 0) - (b.production || 0),
//     },
//     {
//       title: 'Mortalidade (%)',
//       dataIndex: 'mortality',
//       key: 'mortality',
//       render: (value: number) => {
//         const mortality = value || 0;
//         return (
//           <Tag color={mortality > 5 ? 'red' : mortality > 2 ? 'orange' : 'green'}>
//             {mortality.toFixed(2)}%
//           </Tag>
//         );
//       },
//       sorter: (a: any, b: any) => (a.mortality || 0) - (b.mortality || 0),
//     },
//     {
//       title: 'Ovos Mercado',
//       dataIndex: 'marketEggs',
//       key: 'marketEggs',
//       render: (value: number) => (value || 0).toLocaleString('pt-BR'),
//     },
//     {
//       title: 'Ovos Incubação',
//       dataIndex: 'incubateEggs',
//       key: 'incubateEggs',
//       render: (value: number) => (value || 0).toLocaleString('pt-BR'),
//     },
//     {
//       title: 'Ações',
//       key: 'actions',
//       width: 200,
//       render: (_: any, record: DailyReportData) => (
//         <div className="flex space-x-1">
//           <Button
//             type="text"
//             icon={<EyeOutlined />}
//             onClick={() => onReportSelect(record)}
//             size="small"
//             title="Ver Detalhes"
//           />
//           <Button
//             type="text"
//             icon={<DownloadOutlined />}
//             onClick={() => onExport(record.date, 'pdf')}
//             size="small"
//             title="Baixar PDF"
//           />
//           <Button
//             type="text"
//             icon={<DownloadOutlined />}
//             onClick={() => onExport(record.date, 'excel')}
//             size="small"
//             title="Baixar Excel"
//           />
//         </div>
//       ),
//     },
//   ];

//   // Colunas para relatórios semanais
//   const weeklyColumns = [
//     {
//       title: 'Lote',
//       dataIndex: 'batch',
//       key: 'batch',
//       render: (batch: string) => batch || 'N/A',
//     },
//     {
//       title: 'Período',
//       key: 'period',
//       render: (_: any, record: WeeklyReportData) => (
//         <div>
//           <div className="font-medium">
//             {new Date(record.startDate).toLocaleDateString('pt-BR')}
//           </div>
//           <div className="text-gray-500 text-xs">
//             até {new Date(record.endDate).toLocaleDateString('pt-BR')}
//           </div>
//         </div>
//       ),
//       sorter: (a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
//     },
//     {
//       title: 'Dias de Relatório',
//       dataIndex: 'dailyReports',
//       key: 'dailyReportsCount',
//       render: (dailyReports: DailyReportData[]) => dailyReports?.length || 0,
//     },
//     {
//       title: 'Média de Ovos/Dia',
//       dataIndex: 'dailyReports',
//       key: 'avgEggs',
//       render: (dailyReports: DailyReportData[]) => {
//         if (!dailyReports || dailyReports.length === 0) return '0';
//         const avg = dailyReports.reduce((sum, report) => sum + (report.totalEggsCollected || 0), 0) / dailyReports.length;
//         return avg.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
//       },
//     },
//     {
//       title: 'Média Produção (%)',
//       dataIndex: 'dailyReports',
//       key: 'avgProduction',
//       render: (dailyReports: DailyReportData[]) => {
//         if (!dailyReports || dailyReports.length === 0) return '0.00%';
//         const avg = dailyReports.reduce((sum, report) => sum + (report.production || 0), 0) / dailyReports.length;
//         return `${avg.toFixed(2)}%`;
//       },
//     },
//     {
//       title: 'Média Mortalidade (%)',
//       dataIndex: 'dailyReports',
//       key: 'avgMortality',
//       render: (dailyReports: DailyReportData[]) => {
//         if (!dailyReports || dailyReports.length === 0) {
//           return <Tag color="gray">0.00%</Tag>;
//         }
//         const avg = dailyReports.reduce((sum, report) => sum + (report.mortality || 0), 0) / dailyReports.length;
//         return (
//           <Tag color={avg > 5 ? 'red' : avg > 2 ? 'orange' : 'green'}>
//             {avg.toFixed(2)}%
//           </Tag>
//         );
//       },
//     },
//     {
//       title: 'Ações',
//       key: 'actions',
//       width: 200,
//       render: (_: any, record: WeeklyReportData) => (
//         <div className="flex space-x-1">
//           <Button
//             type="text"
//             icon={<EyeOutlined />}
//             onClick={() => onReportSelect(record)}
//             size="small"
//             title="Ver Detalhes"
//           />
//           <Button
//             type="text"
//             icon={<DownloadOutlined />}
//             onClick={() => onExport(`${record.startDate}_${record.endDate}`, 'pdf')}
//             size="small"
//             title="Baixar PDF"
//           />
//           <Button
//             type="text"
//             icon={<DownloadOutlined />}
//             onClick={() => onExport(`${record.startDate}_${record.endDate}`, 'excel')}
//             size="small"
//             title="Baixar Excel"
//           />
//         </div>
//       ),
//     },
//   ];

//   // Renderizar tabela diária
//   const renderDailyTable = () => (
//     <Table
//       columns={dailyColumns}
//       dataSource={dailyReports || []}
//       loading={isLoading}
//       rowKey={(record) => record.date || `daily-${Math.random()}`}
//       pagination={{
//         pageSize: 10,
//         showSizeChanger: true,
//         showQuickJumper: true,
//         showTotal: (total, range) => 
//           `${range[0]}-${range[1]} de ${total} relatórios`,
//         pageSizeOptions: ['10', '20', '50', '100'],
//       }}
//       locale={{
//         emptyText: (
//           <Empty
//             description="Nenhum relatório encontrado"
//             image={Empty.PRESENTED_IMAGE_SIMPLE}
//           />
//         ),
//       }}
//       scroll={{ x: 1000 }}
//       size="small"
//     />
//   );

//   // Renderizar tabela semanal
//   const renderWeeklyTable = () => (
//     <Table
//       columns={weeklyColumns}
//       dataSource={weeklyReports || []}
//       loading={isLoading}
//       rowKey={(record) => `${record.startDate}_${record.endDate}` || `weekly-${Math.random()}`}
//       pagination={{
//         pageSize: 10,
//         showSizeChanger: true,
//         showQuickJumper: true,
//         showTotal: (total, range) => 
//           `${range[0]}-${range[1]} de ${total} relatórios`,
//         pageSizeOptions: ['10', '20', '50', '100'],
//       }}
//       locale={{
//         emptyText: (
//           <Empty
//             description="Nenhum relatório encontrado"
//             image={Empty.PRESENTED_IMAGE_SIMPLE}
//           />
//         ),
//       }}
//       scroll={{ x: 1000 }}
//       size="small"
//     />
//   );

//   const tableData = type === 'daily' ? (dailyReports || []) : (weeklyReports || []);

//   return (
//     <Card 
//       title={`Relatórios ${type === 'daily' ? 'Diários' : 'Semanais'}`}
//       extra={
//         <Tag color="blue">
//           {tableData.length} relatório{tableData.length !== 1 ? 's' : ''} encontrado{tableData.length !== 1 ? 's' : ''}
//         </Tag>
//       }
//       className="shadow-sm"
//     >
//       {type === 'daily' ? renderDailyTable() : renderWeeklyTable()}
//     </Card>
//   );
// };
