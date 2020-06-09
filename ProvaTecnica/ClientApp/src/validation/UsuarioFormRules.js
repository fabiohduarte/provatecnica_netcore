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
    },
    {
      field: 'perfil',
      method: 'isEmpty',
      validWhen: false,
      message: 'Perfil está incompleto ou faltando.'
    }])
}