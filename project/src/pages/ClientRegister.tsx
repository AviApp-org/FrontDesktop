import React, { useState } from 'react';
import { ClientData, ClientStatus } from '../@types/ClientData';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, message, Spin } from 'antd';

const { Option } = Select;

// Função para validar CNPJ
const isValidCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  if (cnpj.length !== 14) return false;
  
  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  
  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== Number(digitos.charAt(0))) return false;
  
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== Number(digitos.charAt(1))) return false;
  
  return true;
};

const ClientRegister: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Omit<ClientData, 'id'>) => {
    try {
      setLoading(true);
      const clientData = {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        cnpj: values.cnpj.replace(/\D/g, ''),
        phone: values.phone.replace(/\D/g, ''),
        status: values.status
      };
      
      console.log('Dados sendo enviados:', JSON.stringify(clientData, null, 2));
      
      const response = await fetch('http://localhost:8080/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      const data = await response.json();
      console.log('Resposta completa da API:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        if (data.errors && data.errors.length > 0) {
          console.error('Erros de validação:', data.errors);
          throw new Error(data.errors[0].defaultMessage || data.errors[0].message || 'Erro ao cadastrar cliente');
        }
        throw new Error(data.message || 'Erro ao cadastrar cliente');
      }

      message.success('Cliente cadastrado com sucesso!');
      form.resetFields();
      form.setFieldsValue({ status: ClientStatus.ACTIVE });
    } catch (error) {
      console.error('Erro detalhado:', error);
      message.error(error instanceof Error ? error.message : 'Erro ao cadastrar cliente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Cadastro de Cliente</h1>
          <Spin spinning={loading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ status: ClientStatus.ACTIVE }}
              className="space-y-4"
            >
              <Form.Item
                name="name"
                label="Nome"
                rules={[{ required: true, message: 'Por favor, insira o nome do cliente' }]}
              >
                <Input className="rounded-md" />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  { required: true, message: 'Por favor, insira o e-mail do cliente' },
                  { type: 'email', message: 'Por favor, insira um e-mail válido' }
                ]}
              >
                <Input className="rounded-md" />
              </Form.Item>

              <Form.Item
                name="cnpj"
                label="CNPJ"
                rules={[
                  { required: true, message: 'Por favor, insira o CNPJ do cliente' },
                  { len: 14, message: 'O CNPJ deve ter 14 dígitos' },
                  { pattern: /^\d{14}$/, message: 'O CNPJ deve conter apenas números' },
                  {
                    validator: (_, value) => {
                      if (value && !isValidCNPJ(value)) {
                        return Promise.reject('CNPJ inválido');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input maxLength={14} className="rounded-md" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Telefone"
                rules={[{ required: true, message: 'Por favor, insira o telefone do cliente' }]}
              >
                <Input className="rounded-md" />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Por favor, selecione o status do cliente' }]}
              >
                <Select className="rounded-md">
                  <Option value={ClientStatus.ACTIVE}>Ativo</Option>
                  <Option value={ClientStatus.INACTIVE}>Inativo</Option>
                </Select>
              </Form.Item>

              <Form.Item className="mb-0">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  className="w-full rounded-md"
                >
                  Cadastrar Cliente
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default ClientRegister; 