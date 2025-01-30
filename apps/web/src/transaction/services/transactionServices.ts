import { FormValues, Transaction } from "../models/transactions";

const baseUrl = 'http://localhost:3001';
const userId = '2399a08b-e3e0-46cd-8b6e-fbb343738fb7';

export const getFormValues = (form: HTMLFormElement): FormValues => {
  const values: FormValues = {};
  
  // Iterar sobre todos los elementos del formulario
  Array.from(form.elements).forEach((element) => {
    if (!(element instanceof HTMLElement) || !element.hasAttribute('name')) return;

    const { name, type } = element as HTMLInputElement;
    
    // Evitar elementos sin nombre o disabled
    if (!name || (element as HTMLInputElement).disabled) return;

    switch (type) {
      case 'checkbox':
        values[name] = (element as HTMLInputElement).checked;
        break;
      
      case 'radio':
        if ((element as HTMLInputElement).checked) {
          values[name] = (element as HTMLInputElement).value;
        }
        break;
      
      case 'select-multiple': {
        const options = Array.from((element as HTMLSelectElement).options)
          .filter(option => option.selected)
          .map(option => option.value);
        values[name] = options;
        break;
      }
      
      default:
        values[name] = (element as HTMLInputElement).value;
        break;
    }
  });

  return values;
};

export const addNewTransaction = async (transaction: Transaction): Promise<boolean> => {
  const response = await fetch(`${baseUrl}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      ...transaction,
    }),
  });

  if (!response.ok) {
    return false;
  }

  return true;
};