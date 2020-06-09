export default () => {
  return ([
    {
      field: 'descricao',
      method: 'isEmpty',
      validWhen: false,
      message: 'Descrição está incompleto ou faltando.'
    }])
}
