### useful links

- http://churras-planner.s3-website-sa-east-1.amazonaws.com/login

- Frontend com create-react-app:
- - material-ui
- - formik

- Backend com serverless framework
- - deploy no lambda
- - express
- - dynamodb single table design

- Obs: fiz uma versão fake de usuario e senha, com o propósito de mockar o comportamento. Não tem criação de usuários em tela; Não tem senha criptografada; Não é persistido a "sessão" com cookies;
  Logar com:
- "email": "rodrigonehring@gmail.com",
- "password": "123456"

### Coisas que faltaram:

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
