### useful links

- http://churras-planner.s3-website-sa-east-1.amazonaws.com/login

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
