import { prismaTeste } from 'src/database/prisma/prisma-client';

async function main() {
  const functionalities = [
    // ENTIDADE: TEST
    {
      name: 'Criar Teste',
      abbreviations: 'C',
      tag: 'test',
      endpoints: [{ path: '/test', method: 'POST' }],
    },
    {
      name: 'Listar Testes',
      abbreviations: 'R',
      tag: 'test',
      endpoints: [
        { path: '/test', method: 'GET' },
        { path: '/test/:id', method: 'GET' },
      ],
    },
    {
      name: 'Atualizar Teste',
      abbreviations: 'U',
      tag: 'test',
      endpoints: [{ path: '/test/:id', method: 'PATCH' }],
    },
    {
      name: 'Deletar Teste',
      abbreviations: 'D',
      tag: 'test',
      endpoints: [{ path: '/test/:id', method: 'DELETE' }],
    },

    // ENTIDADE: EXECUTIONS
    {
      name: 'Executar/Visualizar Execuções',
      abbreviations: 'CR',
      tag: 'executions',
      endpoints: [
        { path: '/executions/:testId', method: 'POST' },
        { path: '/executions/show-test/:testId', method: 'GET' },
      ],
    },

    // ENTIDADE: USERS
    {
      name: 'Gerenciar Usuários',
      abbreviations: 'CRUD',
      tag: 'users',
      endpoints: [
        { path: '/users', method: 'POST' },
        { path: '/users', method: 'GET' },
        { path: '/users/:id', method: 'GET' },
        { path: '/users/:id', method: 'PATCH' },
        { path: '/users/:id', method: 'DELETE' },
      ],
    },

    // ENTIDADE: AUTH
    {
      name: 'Autenticação',
      abbreviations: 'R',
      tag: 'auth',
      endpoints: [{ path: '/auth/signin', method: 'POST' }],
    },
  ];

  console.log(`SEEDER INICIADO ☑️`);

  for (const f of functionalities) {
    await prismaTeste.functionalities.upsert({
      where: { name: f.name },
      update: {},
      create: f,
    });
  }

  console.log(`SEEDER FINALIZADO ☑️`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaTeste.$disconnect();
  });
