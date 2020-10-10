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

  guests: number // somar/subtrair ao adicionar/remover da lista
}
```

### Event Guest

```
{
  hashkey: username
  sortkey: guest-DateISO-hash

  name
  paid: number
  drink: boolean
}
```
