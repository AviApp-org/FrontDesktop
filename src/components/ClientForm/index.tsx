import React from 'react';
import { Button, Form, Input, Select, Spin } from 'antd';
import { ClientStatus } from '../../@types/enums/enumClientStatus';
import { ClientFormProps } from './types';

const { Option } = Select;

export const ClientForm: React.FC<ClientFormProps> = ({
  formData,
  formErrors,
  isSubmitting,
  onInputChange,
  onSubmit
}) => {
  const handleFinish = async () => {
    await onSubmit();
  };

  return (
    <Spin spinning={isSubmitting}>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-4"
      >
        <Form.Item 
          label="Nome" 
          validateStatus={formErrors.name ? 'error' : ''}
          help={formErrors.name}
        >
          <Input 
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className="rounded-md"
            placeholder="Digite o nome do cliente"
            disabled={isSubmitting}
          />
        </Form.Item>

        <Form.Item 
          label="E-mail"
          validateStatus={formErrors.email ? 'error' : ''}
          help={formErrors.email}
        >
          <Input 
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            className="rounded-md"
            placeholder="Digite o e-mail do cliente"
            disabled={isSubmitting}
          />
        </Form.Item>

        <Form.Item 
          label="CNPJ"
          validateStatus={formErrors.cnpj ? 'error' : ''}
          help={formErrors.cnpj}
        >
          <Input 
            name="cnpj"
            value={formData.cnpj}
            onChange={onInputChange}
            maxLength={14}
            className="rounded-md"
            placeholder="Digite apenas os números do CNPJ"
            disabled={isSubmitting}
          />
        </Form.Item>

        <Form.Item 
          label="Telefone"
          validateStatus={formErrors.phone ? 'error' : ''}
          help={formErrors.phone}
        >
          <Input 
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            className="rounded-md"
            placeholder="Digite o telefone do cliente"
            disabled={isSubmitting}
          />
        </Form.Item>

        <Form.Item 
          label="Status"
          validateStatus={formErrors.status ? 'error' : ''}
          help={formErrors.status}
        >
          <Select 
            value={formData.status}
            onChange={(value) => onInputChange({ target: { name: 'status', value } })}
            className="rounded-md"
            placeholder="Selecione o status"
            disabled={isSubmitting}
          >
            <Option value={ClientStatus.ACTIVE}>Ativo</Option>
            <Option value={ClientStatus.INACTIVE}>Inativo</Option>
          </Select>
        </Form.Item>

        {formErrors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {formErrors.submit}
          </div>
        )}

        <Form.Item className="mb-0">
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={isSubmitting}
            className="w-full rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Cliente'}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
