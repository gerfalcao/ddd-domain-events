# DDD - Domain Events (Customer)

Eventos implementados:

- **CustomerCreatedEvent**: dispara `EnviaConsoleLog1Handler` e `EnviaConsoleLog2Handler` quando um Customer é criado.
- **CustomerAddressChangedEvent**: dispara `EnviaConsoleLogHandler` quando o endereço do Customer é alterado.

## Como testar

Requisito: Node.js 16+

```bash
npm install
npm test
```

Para rodar apenas os testes dos eventos de Customer:

```bash
npx jest src/domain/service/customer.service.spec.ts
```

## Onde está o código

- Eventos: `src/domain/event/customer/`
- Handlers: `src/domain/event/customer/handler/`
- Disparo dos eventos: `src/domain/service/customer.service.ts`
- Testes: `src/domain/service/customer.service.spec.ts`
