import React, { useState, useEffect } from 'react';
import { FarmData } from '../@types/FarmData';
import { AddressData } from '../@types/AddressData';
import { Button, Form, Input, Select, message, Spin, Card } from 'antd';

const { Option } = Select;

const FarmRegister: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Array<{ id: number; name: string }>>([]);

  // Carregar lista de clientes
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/clients');
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        }
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
        message.error('Erro ao carregar lista de clientes');
      }
    };

    fetchClients();
  }, []);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      // Primeiro, criar o endereço
      const addressData: Omit<AddressData, 'id'> = {
        street: values.street.trim(),
        number: values.number.trim(),
        cep: values.cep.replace(/\D/g, ''),
        neighborhood: values.neighborhood.trim(),
        city: values.city.trim(),
        state: values.state.trim()
      };

      console.log('Dados do endereço sendo enviados:', JSON.stringify(addressData, null, 2));

      const addressResponse = await fetch('http://localhost:8080/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(addressData),
      });

      const addressResult = await addressResponse.json();
      console.log('Resposta do cadastro de endereço:', JSON.stringify(addressResult, null, 2));

      if (!addressResponse.ok) {
        const error = addressResult.message || 'Erro ao cadastrar endereço';
        console.error('Erro na resposta do endereço:', error);
        throw new Error(error);
      }

      if (!addressResult || !addressResult.id) {
        console.error('Resposta inválida do cadastro de endereço:', addressResult);
        throw new Error('ID do endereço não retornado pela API');
      }

      // Verificar se o endereço foi realmente criado
      const checkAddressResponse = await fetch(`http://localhost:8080/api/addresses/${addressResult.id}`);
      if (!checkAddressResponse.ok) {
        console.error('Endereço não encontrado após criação');
        throw new Error('Erro ao verificar endereço criado');
      }

      // const foo = fooBar();
      // const bar = barFoo();

      // const [resFoo, resBar] = await Promise.all([foo, bar]);

      // Pequeno delay para garantir que o endereço esteja disponível
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Depois, criar a granja com o ID do endereço
      const farmData = {
        name: values.name.trim(),
        addressId: addressResult.id,
        clientId: values.clientId,
        employeesId: []
      };
      
      console.log('Dados da granja sendo enviados:', JSON.stringify(farmData, null, 2));
      
      const farmResponse = await fetch('http://localhost:8080/api/farms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(farmData),
      });

      const farmResult = await farmResponse.json();
      console.log('Resposta do cadastro de granja:', JSON.stringify(farmResult, null, 2));

      if (!farmResponse.ok) {
        // Se houver erro ao criar a granja, tentar deletar o endereço criado
        try {
          await fetch(`http://localhost:8080/api/addresses/${addressResult.id}`, {
            method: 'DELETE',
          });
          console.log('Endereço deletado após falha no cadastro da granja');
        } catch (deleteError) {
          console.error('Erro ao deletar endereço após falha no cadastro da granja:', deleteError);
        }

        const error = farmResult.message || 'Erro ao cadastrar granja';
        console.error('Erro na resposta da granja:', error);
        throw new Error(error);
      }

      message.success('Granja cadastrada com sucesso!');
      form.resetFields();
    } catch (error) {
      console.error('Erro detalhado:', error);
      message.error(error instanceof Error ? error.message : 'Erro ao cadastrar granja. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Cadastro de Granja</h1>
          <Spin spinning={loading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="space-y-4"
            >
              <Card title="Dados da Granja" className="mb-4">
                <Form.Item
                  name="name"
                  label="Nome da Granja"
                  rules={[{ required: true, message: 'Por favor, insira o nome da granja' }]}
                >
                  <Input className="rounded-md" />
                </Form.Item>

                <Form.Item
                  name="clientId"
                  label="Cliente"
                  rules={[{ required: true, message: 'Por favor, selecione o cliente' }]}
                >
                  <Select className="rounded-md">
                    {clients.map(client => (
                      <Option key={client.id} value={client.id}>{client.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Card>

              <Card title="Endereço" className="mb-4">
                <Form.Item
                  name="cep"
                  label="CEP"
                  rules={[
                    { required: true, message: 'Por favor, insira o CEP' },
                    { pattern: /^\d{8}$/, message: 'CEP deve conter 8 dígitos' }
                  ]}
                >
                  <Input className="rounded-md" maxLength={8} />
                </Form.Item>

                <Form.Item
                  name="street"
                  label="Rua"
                  rules={[{ required: true, message: 'Por favor, insira a rua' }]}
                >
                  <Input className="rounded-md" />
                </Form.Item>

                <Form.Item
                  name="number"
                  label="Número"
                  rules={[{ required: true, message: 'Por favor, insira o número' }]}
                >
                  <Input className="rounded-md" />
                </Form.Item>

                <Form.Item
                  name="neighborhood"
                  label="Bairro"
                  rules={[{ required: true, message: 'Por favor, insira o bairro' }]}
                >
                  <Input className="rounded-md" />
                </Form.Item>

                <Form.Item
                  name="city"
                  label="Cidade"
                  rules={[{ required: true, message: 'Por favor, insira a cidade' }]}
                >
                  <Input className="rounded-md" />
                </Form.Item>

                <Form.Item
                  name="state"
                  label="Estado"
                  rules={[{ required: true, message: 'Por favor, insira o estado' }]}
                >
                  <Select className="rounded-md">
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

              <Form.Item className="mb-0">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  className="w-full rounded-md"
                >
                  Cadastrar Granja
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default FarmRegister; 