export default () => {
  return ([
    {
      field: 'nome',
      method: 'isEmpty',
      validWhen: false,
      message: 'Nome está incompleto ou faltando.'
    },
    {
      field: 'login',
      method: 'isEmpty',
      validWhen: false,
      message: 'Login está incompleto ou faltando.'
    },
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'E-mail está incompleto ou faltando.'
    }])
}

export const minimum2Characters = (value) => value.length >= 2;

export const minimum2Letters = (value) => /(?=.*[a-zA-Z].*[a-zA-Z])/.test(value);

export const numbersOnly = (value) => /^(?!.*[a-zA-Z])/.test(value);

export const oneHyphenAllowedOnly = (value) => /^(.*-.*){2,}$/.test(value);

export const isDiacritic = (value) => /[À-ž]/.test(value);

export const singleBlockAddress = (value) => value.trim().split(' ').length >= 2;

export const sameCharacters = (value) => /^(.)\1+$/.test(value.toLowerCase().replace(/\s/g, ''));

export const invalidAreaCode = (value) => /^[1|0]/.test(value.trim());

export const sequentialNumber = (value) => "0123456789012345789".indexOf(value) >= 0 || "98765432109876543210".indexOf(value) >= 0;

const equalTo = (value, formSection, anotherFieldName, dataSource) =>
  (value && value.toLowerCase()) === (dataSource[formSection][anotherFieldName] && dataSource[formSection][anotherFieldName].toLowerCase());

