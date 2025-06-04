import React from 'react';
import { Button, Form, Input, Select, Spin, Card } from 'antd';
import { FarmFormProps } from './types';

const { Option } = Select;

export const FarmForm: React.FC<FarmFormProps> = ({
  formData,
  formErrors,
  isSubmitting,
  clients,
  onInputChange,
  onSubmit
}) => {
  const handleFinish = async () => {
    await onSubmit();
  };

  const handleSelectChange = (name: string) => (value: any) => {
    onInputChange({ target: { name, value } });
  };

  return (
    <Spin spinning={isSubmitting}>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-4"
      >
        {/* Dados da Granja */}
        <Card title="Dados da Granja" className="mb-4">
          <Form.Item
            label="Nome da Granja"
            validateStatus={formErrors.name ? 'error' : ''}
            help={formErrors.name}
          >
            <Input 
              name="name"
              value={formData.name}
              onChange={onInputChange}
              className="rounded-md"
              placeholder="Digite o nome da granja"
              disabled={isSubmitting}
            />
          </Form.Item>

          <Form.Item
            label="Cliente"
            validateStatus={formErrors.clientId ? 'error' : ''}
            help={formErrors.clientId}
          >
            <Select 
              value={formData.clientId}
              onChange={handleSelectChange('clientId')}
              className="rounded-md"
              placeholder="Selecione o cliente"
              disabled={isSubmitting}
            >
              {clients.map(client => (
                <Option key={client.id} value={client.id}>
                  {client.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>

        {/* Endereço */}
        <Card title="Endereço" className="mb-4">
          <Form.Item
            label="CEP"
            validateStatus={formErrors.cep ? 'error' : ''}
            help={formErrors.cep}
          >
            <Input 
              name="cep"
              value={formData.cep}
              onChange={onInputChange}
              className="rounded-md"
              maxLength={8}
              placeholder="Digite apenas números"
              disabled={isSubmitting}
            />
          </Form.Item>

          <Form.Item
            label="Rua"
            validateStatus={formErrors.street ? 'error' : ''}
            help={formErrors.street}
          >
            <Input 
              name="street"
              value={formData.street}
              onChange={onInputChange}
              className="rounded-md"
              placeholder="Digite o nome da rua"
              disabled={isSubmitting}
            />
          </Form.Item>

          <Form.Item
            label="Número"
            validateStatus={formErrors.number ? 'error' : ''}
            help={formErrors.number}
          >
            <Input 
              name="number"
              value={formData.number}
              onChange={onInputChange}
              className="rounded-md"
              placeholder="Digite o número"
              disabled={isSubmitting}
            />
          </Form.Item>

          <Form.Item
            label="Bairro"
            validateStatus={formErrors.neighborhood ? 'error' : ''}
            help={formErrors.neighborhood}
          >
            <Input 
              name="neighborhood"
              value={formData.neighborhood}
              onChange={onInputChange}
              className="rounded-md"
              placeholder="Digite o bairro"
              disabled={isSubmitting}
            />
          </Form.Item>

          <Form.Item
            label="Cidade"
            validateStatus={formErrors.city ? 'error' : ''}
            help={formErrors.city}
          >
            <Input 
              name="city"
              value={formData.city}
              onChange={onInputChange}
              className="rounded-md"
              placeholder="Digite a cidade"
              disabled={isSubmitting}
            />
          </Form.Item>

          <Form.Item
            label="Estado"
            validateStatus={formErrors.state ? 'error' : ''}
            help={formErrors.state}
          >
            <Select 
              value={formData.state}
              onChange={handleSelectChange('state')}
              className="rounded-md"
              placeholder="Selecione o estado"
              disabled={isSubmitting}
            >
              <Option value="AC">Acre</Option>
              <Option value="AL">Alagoas</Option>
              <Option value="AP">Amapá</Option>
              <Option value="AM">Amazonas</Option>
              <Option value="BA">Bahia</Option>
              <Option value="CE">Ceará</Option>
              <Option value="DF">Distrito Federal</Option>
              <Option value="ES">Espírito Santo</Option>
              <Option value="GO">Goiás</Option>
              <Option value="MA">Maranhão</Option>
              <Option value="MT">Mato Grosso</Option>
              <Option value="MS">Mato Grosso do Sul</Option>
              <Option value="MG">Minas Gerais</Option>
              <Option value="PA">Pará</Option>
              <Option value="PB">Paraíba</Option>
              <Option value="PR">Paraná</Option>
              <Option value="PE">Pernambuco</Option>
              <Option value="PI">Piauí</Option>
              <Option value="RJ">Rio de Janeiro</Option>
              <Option value="RN">Rio Grande do Norte</Option>
              <Option value="RS">Rio Grande do Sul</Option>
              <Option value="RO">Rondônia</Option>
              <Option value="RR">Roraima</Option>
              <Option value="SC">Santa Catarina</Option>
              <Option value="SP">São Paulo</Option>
              <Option value="SE">Sergipe</Option>
              <Option value="TO">Tocantins</Option>
            </Select>
          </Form.Item>
        </Card>

        {formErrors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {formErrors.submit}
          </div>
        )}

        {formErrors.clients && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md mb-4">
            {formErrors.clients}
          </div>
        )}

        <Form.Item className="mb-0">
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={isSubmitting}
            className="btn-primary-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Granja'}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};