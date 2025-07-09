import { useState, useReducer, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useCollectionPoints } from '@/contexts/CollectionPointsContext';
import { CollectionPointFormData } from '@/types/forms';
import { CollectionPoint } from '@/types/collection-point';
import { fetchAddressByCep } from '@/lib/viacep';
import { geocodeAddress } from '@/lib/geocoding';
import { collectionPointSchema } from '@/lib/schemas';

const CEP_DEBOUNCE_DELAY = 800;
const SUCCESS_REDIRECT_DELAY = 2000;

type State = {
  isSubmitting: boolean;
  isCepLoading: boolean;
  error: string | null;
  cepError: string | null;
  success: string | null;
};

type Action =
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; message: string }
  | { type: 'SUBMIT_ERROR'; message: string }
  | { type: 'CEP_LOOKUP_START' }
  | { type: 'CEP_LOOKUP_SUCCESS' }
  | { type: 'CEP_LOOKUP_ERROR'; message: string }
  | { type: 'RESET_MESSAGES' };

const initialReducerState: State = {
  isSubmitting: false,
  isCepLoading: false,
  error: null,
  cepError: null,
  success: null,
};

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, error: null, success: null };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, success: action.message };
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, error: action.message };
    case 'CEP_LOOKUP_START':
      return { ...state, isCepLoading: true, cepError: null };
    case 'CEP_LOOKUP_SUCCESS':
      return { ...state, isCepLoading: false };
    case 'CEP_LOOKUP_ERROR':
      return { ...state, isCepLoading: false, cepError: action.message };
    case 'RESET_MESSAGES':
      return { ...state, error: null, cepError: null, success: null };
    default:
      return state;
  }
}

const initialFormData: CollectionPointFormData = {
  cep: '',
  city: '',
  neighborhood: '',
  street: '',
  number: '',
  materials: [],
};

type FormErrors = Partial<Record<keyof CollectionPointFormData, string>>;

export function useCollectionPointForm() {
  const [formData, setFormData] =
    useState<CollectionPointFormData>(initialFormData);
  const [state, dispatch] = useReducer(formReducer, initialReducerState);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addCollectionPoint } = useCollectionPoints();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  useEffect(() => {
    const initialCep = searchParams.get('cep');
    const initialMaterials = searchParams.get('materials');

    if (initialCep || initialMaterials) {
      setFormData((prev) => ({
        ...prev,
        cep: initialCep
          ? initialCep.replace(/\D/g, '').substring(0, 8)
          : prev.cep,
        materials: initialMaterials
          ? initialMaterials.split(',').filter(Boolean)
          : prev.materials,
      }));
    }
  }, [searchParams]);

  // efeito para buscar endereço pelo CEP com debounce
  useEffect(() => {
    const cep = formData?.cep;
    if (!cep || cep.length !== 8) {
      dispatch({ type: 'RESET_MESSAGES' });
      return;
    }

    let isActive = true;

    const handler = setTimeout(async () => {
      dispatch({ type: 'CEP_LOOKUP_START' });
      const addressData = await fetchAddressByCep(cep);

      if (isActive) {
        if (addressData) {
          dispatch({ type: 'CEP_LOOKUP_SUCCESS' });
          setFormData((prev) => ({
            ...prev,
            city: addressData.localidade || '',
            neighborhood: addressData.bairro || '',
            street: addressData.logradouro || '',
          }));
        } else {
          dispatch({
            type: 'CEP_LOOKUP_ERROR',
            message: 'CEP não encontrado.',
          });
        }
      }
    }, CEP_DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
      isActive = false;
    };
  }, [formData.cep]);

  // efeito para redirecionar após sucesso
  useEffect(() => {
    if (!state.success) return;

    const timer = setTimeout(() => {
      router.push('/collection-points');
    }, SUCCESS_REDIRECT_DELAY);

    return () => clearTimeout(timer);
  }, [state.success, router]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (state.isSubmitting) return;

      setErrors({});

      const validationResult = collectionPointSchema.safeParse(formData);

      if (!validationResult.success) {
        const fieldErrors = validationResult.error.flatten().fieldErrors;

        const formattedErrors = Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]])
        );
        setErrors(formattedErrors as FormErrors);

        dispatch({
          type: 'SUBMIT_ERROR',
          message: 'Por favor, corrija os erros no formulário.',
        });
        return;
      }

      // se a validação passou, usamos os dados validados e transformados
      const validData = validationResult.data;
      dispatch({ type: 'SUBMIT_START' });

      try {
        const fullAddressString = `${validData.number ? validData.number + ', ' : ''}${validData.street}, ${validData.neighborhood}, ${validData.city}, ${validData.cep}`;
        const coords = await geocodeAddress(fullAddressString);

        if (!coords) {
          throw new Error(
            'Não foi possível encontrar as coordenadas. Verifique o endereço.'
          );
        }

        const newPoint: CollectionPoint = {
          id: uuidv4(),
          name: `Ponto em ${validData.neighborhood}`,
          lat: coords.lat,
          lng: coords.lng,
          ...validData,
        };

        addCollectionPoint(newPoint);
        dispatch({
          type: 'SUBMIT_SUCCESS',
          message: 'Ponto cadastrado com sucesso! Redirecionando...',
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro desconhecido.';
        dispatch({ type: 'SUBMIT_ERROR', message: errorMessage });
      }
    },
    [formData, state.isSubmitting, addCollectionPoint, router]
  );

  return {
    formData,
    state,
    handleInputChange,
    handleSubmit,
    setFormData,
  };
}
