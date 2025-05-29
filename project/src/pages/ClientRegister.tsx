import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, message, Spin } from 'antd';
import { ClientData,} from '../@types/ClientData';
import { ClientStatus } from '../Enums';
import { validateCNPJ } from '../utils/validators';
import { clientService } from '../services/clientService';
import { showErrorMessage } from '../utils/errorHandler';

const { Option } = Select;

interface ClientFormData extends Omit<ClientData, 'id'> {}

const FORM_RULES = {
  name: [{ required: true, message: 'Por favor, insira o nome do cliente' }],
  email: [
    { required: true, message: 'Por favor, insira o e-mail do cliente' },
    { type: 'email' as const, message: 'Por favor, insira um e-mail válido' }
  ],
  cnpj: [
    { required: true, message: 'Por favor, insira o CNPJ do cliente' },
    { len: 14, message: 'O CNPJ deve ter 14 dígitos' },
    { pattern: /^\d{14}$/, message: 'O CNPJ deve conter apenas números' },
    {
      validator: (_: any, value: string) => {
        if (value && !validateCNPJ(value)) {
          return Promise.reject('CNPJ inválido');
        }
        return Promise.resolve();
      }
    }
  ],
  phone: [{ required: true, message: 'Por favor, insira o telefone do cliente' }],
  status: [{ required: true, message: 'Por favor, selecione o status do cliente' }]
};

const INITIAL_VALUES = {
  status: ClientStatus.ACTIVE
};

const ClientRegister: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const sanitizeFormData = (values: ClientFormData): ClientFormData => ({
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    cnpj: values.cnpj.replace(/\D/g, ''),
    phone: values.phone.replace(/\D/g, ''),
    status: values.status
  });

  const handleSubmit = async (values: ClientFormData) => {
    try {
      setLoading(true);
      const sanitizedData = sanitizeFormData(values);
      
      await clientService.create(sanitizedData);
      
      message.success('Cliente cadastrado com sucesso!');
      handleFormReset();
    } catch (error) {
      const errorMessage = showErrorMessage(error);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFormReset = () => {
    form.resetFields();
    form.setFieldsValue(INITIAL_VALUES);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <PageHeader />
          <ClientForm
            form={form}
            loading={loading}
            onSubmit={handleSubmit}
            initialValues={INITIAL_VALUES}
          />
        </div>
      </div>
    </div>
  );
};

const PageHeader: React.FC = () => (
  <h1 className="text-2xl font-semibold text-gray-800 mb-6">
    Cadastro de Cliente
  </h1>
);

interface ClientFormProps {
  form: any;
  loading: boolean;
  onSubmit: (values: ClientFormData) => Promise<void>;
  initialValues: typeof INITIAL_VALUES;
}

const ClientForm: React.FC<ClientFormProps> = ({
  form,
  loading,
  onSubmit,
  initialValues
}) => (
  <Spin spinning={loading}>
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
      className="space-y-4"
    >
      <FormFields />
      <SubmitButton loading={loading} />
    </Form>
  </Spin>
);

const FormFields: React.FC = () => (
  <>
    <Form.Item name="name" label="Nome" rules={FORM_RULES.name}>
      <Input className="rounded-md"/>
    </Form.Item>
    <Form.Item name="email" label="E-mail" rules={FORM_RULES.email}>
      <Input className="rounded-md"/>
    </Form.Item>
    <Form.Item name="cnpj" label="CNPJ" rules={FORM_RULES.cnpj}>
      <Input 
        maxLength={14} 
        className="rounded-md" 
        placeholder=""
      />
    </Form.Item>
    <Form.Item name="phone" label="Telefone" rules={FORM_RULES.phone}>
      <Input className="rounded-md"  />
    </Form.Item>
  </>
);
const SubmitButton: React.FC<{ loading: boolean }> = ({ loading }) => (
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
);

export default ClientRegister;
