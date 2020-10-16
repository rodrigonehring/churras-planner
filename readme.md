### useful links

- http://churras-planner.s3-website-sa-east-1.amazonaws.com/login

### Coisas que faltaram:

- [ ] Criar um component para renderizar o preço corretamento. Ex: R\$ 140,00;
- [ ] Criar um dialog para adicionar um convidado;
- [ ] Poder deletar um evento;
- [ ] Poder editar um evento (date, title, desc etc..);
- [ ] Melhorar o fundo;

## DynamoDB Single Table Entities

### User account

```
{
  hashkey: username
  sortkey: 'user'

  password: simple crypt hash
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
  obs: string

  suggestedPayment: 10
  suggestedPaymentDrink: 20

  guests: [
    { id: 'hash', name: string, willDrink: true, paid }
  ]
}
```
