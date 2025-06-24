import React from 'react';
import { Card, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ReportFiltersProps } from './types';
const { Option } = Select;

// ✅ Atualizar a interface para incluir batches
interface ExtendedReportFiltersProps extends ReportFiltersProps {
  batches: any[];
}

export const ReportFilters: React.FC<ExtendedReportFiltersProps> = ({
  reportType,
  selectedDate,
  batchId,
  loading,
  batches, // ✅ NOVO
  onReportTypeChange,
  onDateChange,
  onBatchChange,
  onSearch
}) => {
  const getDateLabel = () => {
    if (reportType === 'Semanal') {
      return '📅 Data de Início da Semana';
    }
    if (reportType === 'Mensal') {
      return '📅 Data de Início do Mês';
    }
    return '📅 Data';
  };

  const getSearchButtonText = () => {
    if (reportType === 'Semanal') {
      return 'Buscar Semana (7 dias)';
    }
    if (reportType === 'Mensal') {
      return 'Buscar Mês (30 dias)';
    }
    return 'Buscar Relatório';
  };

  // ✅ Função melhorada para formatar data com backspace funcionando
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cursorPosition = e.target.selectionStart || 0;
    
    // Se o usuário está apagando (backspace), permitir apagar as barras também
    if (inputValue.length < selectedDate.length) {
      // Está apagando - remover formatação e deixar só números
      const numbersOnly = inputValue.replace(/\D/g, '');
      
      // Reformatar com as barras
      let formatted = numbersOnly;
      if (numbersOnly.length >= 3) {
        formatted = numbersOnly.substring(0, 2) + '/' + numbersOnly.substring(2);
      }
      if (numbersOnly.length >= 5) {
        formatted = formatted.substring(0, 5) + '/' + formatted.substring(5, 9);
      }
      
      onDateChange(formatted);
      return;
    }
    
    // Formatação normal (digitando)
    let value = inputValue.replace(/\D/g, ''); // Remove tudo que não é número
    
    // Adiciona as barras automaticamente
    if (value.length >= 3) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length >= 6) {
      value = value.substring(0, 5) + '/' + value.substring(5, 9);
    }
    
    // Limita a 10 caracteres (DD/MM/YYYY)
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    
    onDateChange(value);
  };

  // ✅ Handler para teclas especiais (Delete, Backspace, etc.)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir teclas de navegação e edição
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ];
    
    if (allowedKeys.includes(e.key)) {
      return; // Permitir essas teclas
    }
    
    // Permitir Ctrl+A, Ctrl+C, Ctrl+V, etc.
    if (e.ctrlKey || e.metaKey) {
      return;
    }
    
    // Só permitir números
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  // ✅ Validação simples da data
  const isValidDate = (dateString: string): boolean => {
    if (!dateString || dateString.length !== 10) return false;
    
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);
    
    if (!match) return false;
    
    const [, day, month, year] = match;
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    return (
      dayNum >= 1 && dayNum <= 31 &&
      monthNum >= 1 && monthNum <= 12 &&
      yearNum >= 2020 && yearNum <= 2030
    );
  };

  const dateIsValid = isValidDate(selectedDate);

  return (
    <Card className="mb-6" title="">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Tipo de Relatório */}
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Relatório</label>
          <Select
            value={reportType}
            onChange={onReportTypeChange}
            style={{ width: 120 }}
          >
            <Option value="Diário">📅 Diário</Option>
            <Option value="Semanal">📊 Semanal</Option>
            <Option value="Mensal">📈 Mensal</Option>
          </Select>
        </div>

        {/* Lote - ATUALIZADO para usar lotes dinâmicos */}
        <div>
          <label className="block text-sm font-medium mb-1">Lote</label>
          <Select
            value={batchId}
            onChange={onBatchChange}
            style={{ width: 120 }}
            placeholder="Selecione..."
            loading={loading}
            notFoundContent={loading ? "Carregando..." : "Nenhum lote encontrado"}
          >
            {batches && batches.length > 0 ? (
              batches.map(batch => (
                <Option key={batch.id} value={batch.id.toString()}>
                  {batch.name}
                </Option>
              ))
            ) : (
              <Option disabled value="">
                Nenhum lote disponível
              </Option>
            )}
          </Select>
        </div>

        {/* Data - Input de texto melhorado */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {getDateLabel()}
          </label>
          <input
            type="text"
            value={selectedDate}
            onChange={handleDateChange}
            onKeyDown={handleKeyDown}
            placeholder="DD/MM/YYYY"
            className={`border rounded px-3 py-2 ${
              selectedDate && !dateIsValid 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300'
            }`}
            style={{ width: '120px' }}
            maxLength={10}
          />
        </div>

        {/* Botão de Busca */}
        <div style={{ paddingTop: '24px' }}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={onSearch}
            loading={loading}
            disabled={!selectedDate || !dateIsValid}
          >
            {getSearchButtonText()}
          </Button>
        </div>
      </div>

      {/* Informações adicionais */}
      {selectedDate && dateIsValid && reportType !== 'Diário' && (
        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <div className="text-sm text-blue-800">
            <strong>ℹ️ Como funciona:</strong>
            <ul className="mt-1 ml-4 list-disc">
              <li>
                {reportType === 'Semanal' 
                  ? 'Mostra 7 dias consecutivos a partir da data selecionada'
                  : 'Mostra 30 dias consecutivos a partir da data selecionada'
                }
              </li>
              <li>Use as setas para navegar entre os dias</li>
              <li>Clique nos pontos para ir diretamente para um dia específico</li>
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};
