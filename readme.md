- Frontend com create-react-app:
- - material-ui
- - formik

- Backend com serverless framework
- - lambda/api gateway
- - express
- - dynamodb single table design

- CI - github actions
- - deploy do frontend no s3
- - deploy do backend com serverless framework

- Obs: fiz uma versão fake de usuario e senha, com o propósito de mockar o comportamento. Não tem criação de usuários em tela; Não tem senha criptografada; Não é persistido a "sessão" com cookies;
  Logar com:
- "email": "john@doe.com",
- "password": "123456"

### todo

- [ ] Criar um component para renderizar o preço corretamento. Ex: R\$ 140,00;
- [ ] Criar um dialog para adicionar um convidado;
- [ ] Poder deletar um evento;
- [ ] Poder editar um evento (date, title, desc etc..);
- [ ] Melhorar o fundo;
- [ ] testes no frontend, talvez com cypress, e colocar no CI;

## DynamoDB Single Table Entities

### User account

```
{
  hashkey: username
  sortkey: 'user'

  password: full password without encrypt
}
```

### Event

```
{
  hashkey: username
  sortkey: event-DateISO-main

  date: DateISO
  title: string
  description: string
  suggestedPayment: 10
  suggestedPaymentDrink: 20

  guests: [
    { id: 'hash', name: string, willDrink: true, paid }
  ]
}
```
