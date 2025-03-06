# Estrutura do Projeto - Bíblia AI

Este documento descreve a estrutura do projeto Bíblia AI e as responsabilidades de cada pasta.

## Visão Geral

O projeto Bíblia AI é uma aplicação web desenvolvida com Next.js que permite aos usuários consultar versículos da Bíblia e obter explicações geradas por IA. A estrutura do projeto foi organizada para facilitar a manutenção, escalabilidade e separação de responsabilidades.

## Estrutura de Diretórios

```
src/
├── actions/         # Server Actions para busca de dados
├── app/             # Estrutura de rotas do Next.js
│   └── api/         # Endpoints da API
├── components/      # Componentes de UI
│   ├── features/    # Componentes específicos de funcionalidades
│   │   └── bible/   # Componentes relacionados à Bíblia
│   ├── layout/      # Componentes de layout
│   └── ui/          # Componentes de UI reutilizáveis
├── core/            # Núcleo da aplicação
│   ├── api/         # Configuração de API
│   │   ├── client/  # Clientes de API
│   │   └── endpoints/ # Endpoints da API
│   └── types/       # Definições de tipos TypeScript
│       ├── api/     # Tipos relacionados à API
│       └── entities/ # Tipos de entidades do domínio
├── hooks/           # Hooks personalizados do React
│   ├── mutations/   # Hooks para mutações de dados
│   └── queries/     # Hooks para consultas de dados
├── providers/       # Provedores de contexto
├── services/        # Serviços de negócio
└── styles/          # Estilos globais
```

## Responsabilidades

### Core

O diretório `core` contém os elementos fundamentais da aplicação:

- **types**: Definições de tipos TypeScript para entidades do domínio e API.
- **api**: Configurações de API, incluindo clientes e endpoints.

### Services

O diretório `services` encapsula a lógica de negócio e a comunicação com APIs externas:

- Implementa a lógica para buscar dados da Bíblia.
- Gerencia a comunicação com a API da Groq para explicações de IA.
- Abstrai a complexidade das chamadas de API.

### Actions

O diretório `actions` contém Server Actions do Next.js para busca de dados:

- Implementa funções para buscar livros, versículos e explicações.
- Utiliza os serviços para obter dados.
- Fornece uma interface para os componentes do cliente.

### Hooks

O diretório `hooks` contém hooks personalizados do React:

- **queries**: Hooks para busca de dados.
- **mutations**: Hooks para mutação de dados.

### Components

O diretório `components` contém componentes de UI organizados por tipo e funcionalidade:

- **ui**: Componentes básicos reutilizáveis (botões, inputs, etc.).
- **layout**: Componentes de layout (header, footer, etc.).
- **features**: Componentes específicos de funcionalidades, como a consulta à Bíblia.

### Providers

O diretório `providers` contém provedores de contexto para compartilhamento de estado global:

- Gerencia temas (claro/escuro).
- Compartilha estado entre componentes.

### App

O diretório `app` contém a estrutura de rotas do Next.js:

- Define as páginas da aplicação.
- Implementa endpoints de API.

### Styles

O diretório `styles` contém estilos globais da aplicação:

- Define variáveis CSS globais.
- Configura estilos base.

## Fluxo de Dados

1. O usuário interage com um componente na interface.
2. O componente utiliza um hook para buscar ou modificar dados.
3. O hook chama uma action do servidor.
4. A action utiliza um serviço para obter dados.
5. O serviço se comunica com APIs externas.
6. Os dados retornam pelo mesmo caminho até o componente.
7. O componente renderiza os dados.

## Convenções de Nomenclatura

- **Componentes**: kebab-case para arquivos, PascalCase para nomes de componentes.
- **Tipos e Interfaces**: PascalCase.
- **Funções e Variáveis**: camelCase.
- **Constantes**: UPPER_SNAKE_CASE.

## Tecnologias Principais

- **Next.js**: Framework React para renderização do lado do servidor.
- **TypeScript**: Superset tipado de JavaScript.
- **Tailwind CSS**: Framework CSS utilitário.
- **Groq API**: API de IA para geração de explicações.
- **ABíbliaDigital API**: API para consulta de versículos da Bíblia.
