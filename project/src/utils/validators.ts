// Função para validar CNPJ
export const validateCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    
    if (cleanCNPJ.length !== 14) return false;
    
    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
    
    return validateCNPJDigits(cleanCNPJ);
  };
  
  const validateCNPJDigits = (cnpj: string): boolean => {
    // Validação do primeiro dígito verificador
    let sum = 0;
    let weight = 5;
    
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(cnpj[12]) !== firstDigit) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    weight = 6;
    
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    
    remainder = sum % 11;
    let secondDigit = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cnpj[13]) === secondDigit;
  };
  
  // Função para validar CPF (já existe no projeto, mantendo consistência)
  export const isValidCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    return validateCPFDigits(cleanCPF);
  };
  
  const validateCPFDigits = (cpf: string): boolean => {
    // Validação dos dígitos verificadores do CPF
    for (let t = 9; t < 11; t++) {
      let d = 0;
      for (let c = 0; c < t; c++) {
        d += Number(cpf[c]) * ((t + 1) - c);
      }
      d = ((10 * d) % 11) % 10;
      if (Number(cpf[t]) !== d) return false;
    }
    return true;
  };
  
  
// Função para formatar CPF
export const formatCPF = (cpf: string): string => {
  const cleanCPF = cpf.replace(/[^\d]/g, '');
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Função para formatar telefone
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};
