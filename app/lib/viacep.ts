import { ViaCepAddress } from '@/types/viacep';

export const fetchAddressByCep = async (
  cep: string
): Promise<ViaCepAddress | null> => {
  if (cep.length !== 8) {
    return null;
  }

  try {
    const encodedCep = encodeURIComponent(cep);
    const response = await fetch(
      `https://viacep.com.br/ws/${encodedCep}/json/`
    );
    const data: ViaCepAddress = await response.json();

    if (data.erro) {
      return null;
    } else {
      return data;
    }
  } catch (err) {
    console.error('Erro ao buscar CEP:', err);
    return null;
  }
};
