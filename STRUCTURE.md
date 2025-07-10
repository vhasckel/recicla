# Estrutura do Projeto Recicla Next.js

Este documento descreve a estrutura de pastas do projeto, organizada seguindo as melhores práticas do Next.js 13+ com App Router.

## Estrutura Principal

```
src/app/
├── (main)/                    # Grupo de rotas públicas
│   ├── about/
│   │   └── page.tsx          # Página "Sobre"
│   ├── products/
│   │   ├── [productId]/
│   │   │   ├── _components/
│   │   │   │   └── ProductDetails.tsx
│   │   │   └── page.tsx      # Página de detalhes do produto
│   │   └── page.tsx          # Lista de produtos (pontos de coleta)
│   ├── layout.tsx            # Layout para páginas públicas
│   └── page.tsx              # Página inicial
├── (dashboard)/              # Grupo de rotas do dashboard
│   ├── collection-points/
│   │   ├── new/
│   │   │   └── page.tsx      # Novo ponto de coleta
│   │   └── page.tsx          # Lista de pontos de coleta
│   ├── dashboard/
│   │   ├── _components/
│   │   │   └── StatsCard.tsx
│   │   └── page.tsx          # Dashboard principal
│   ├── profile/
│   │   └── page.tsx          # Perfil do usuário
│   ├── settings/
│   │   └── page.tsx          # Configurações
│   └── layout.tsx            # Layout do dashboard (com sidebar, header)
├── (auth)/                   # Grupo de rotas de autenticação
│   ├── login/
│   │   └── page.tsx          # Página de login
│   ├── register/
│   │   └── page.tsx          # Página de registro
│   └── layout.tsx            # Layout simples para autenticação
├── api/                      # Route Handlers (APIs do backend)
│   └── user/
│       └── route.ts          # API de usuários
├── layout.tsx                # Layout raiz (obrigatório)
├── globals.css               # Estilos globais
└── favicon.ico
```

## Grupos de Rotas

### (main) - Páginas Públicas

- **Layout**: Simples, sem autenticação
- **Páginas**: Home, About, Products (pontos de coleta)
- **Acesso**: Público

### (dashboard) - Área Autenticada

- **Layout**: Completo com sidebar, header e chatbot
- **Páginas**: Dashboard, Collection Points, Profile, Settings
- **Acesso**: Requer autenticação

### (auth) - Autenticação

- **Layout**: Minimalista, centralizado
- **Páginas**: Login, Register
- **Acesso**: Público

## Estrutura de Suporte

### 📁 **Components** - Componentes React

```
app/components/
├── common/                   # Componentes comuns reutilizáveis
├── features/                 # Componentes específicos de features
│   ├── auth/                # Componentes de autenticação
│   ├── collection-points/   # Componentes de pontos de coleta
│   ├── dashboard/           # Componentes do dashboard
│   └── profile/             # Componentes de perfil
├── layout/                  # Componentes de layout (header, sidebar, etc.)
├── ui/                      # Componentes de UI base (button, input, etc.)
├── chatbot/                 # Componentes do chatbot
└── multi-select/            # Componente de seleção múltipla
```

### 📁 **Lib** - Bibliotecas e Serviços

```
app/lib/
├── api/                     # APIs externas
│   ├── api.ts              # Configuração base do axios
│   ├── authApi.ts          # API de autenticação
│   ├── userApi.ts          # API de usuários
│   ├── chatApi.ts          # API do chatbot
│   └── index.ts            # Exportações centralizadas
├── schemas/                 # Schemas de validação (Zod)
│   ├── schemas.ts          # Schemas de formulários
│   └── index.ts            # Exportações centralizadas
├── services/               # Serviços externos
│   ├── viacep.ts           # Serviço de busca de CEP
│   ├── geocoding.ts        # Serviço de geocodificação
│   └── index.ts            # Exportações centralizadas
└── database.ts             # Configuração do banco de dados
```

### 📁 **Hooks** - Hooks Customizados

```
app/hooks/
├── useDashboardView.ts     # Hook para gerenciar views do dashboard
├── useUserLocation.ts      # Hook para localização do usuário
├── useCollectionPointForm.ts # Hook para formulário de ponto de coleta
├── useLogin.ts             # Hook para autenticação
├── useSignupForm.ts        # Hook para formulário de registro
├── useChat.ts              # Hook para chat
├── useUpdateSearchParams.ts # Hook para atualizar parâmetros de URL
├── useMediaQuery.ts        # Hook para media queries
└── useForm.ts              # Hook para formulários
```

### 📁 **Types** - Tipos TypeScript

```
app/types/
├── forms.ts                # Tipos de formulários
├── message.ts              # Tipos de mensagens
├── viacep.ts               # Tipos do serviço ViaCEP
├── user.ts                 # Tipos de usuário
├── map.ts                  # Tipos de mapas
├── input.ts                # Tipos de inputs
├── impact-metric.ts        # Tipos de métricas
├── components.ts           # Tipos de componentes
├── collection-point.ts     # Tipos de pontos de coleta
├── api.ts                  # Tipos de APIs
├── leaflet.d.ts            # Definições do Leaflet
└── index.ts                # Exportações centralizadas
```

### 📁 **Constants** - Constantes da Aplicação

```
app/constants/
├── navigation.ts           # Links de navegação
├── materials.ts            # Lista de materiais recicláveis
└── metrics.ts              # Métricas e configurações
```

### 📁 **Contexts** - Contextos React

```
app/contexts/
└── CollectionPointsContext.tsx # Contexto para pontos de coleta
```

### 📁 **Data** - Dados Mock

```
app/data/
└── mockCollectionPoints.ts # Dados mock de pontos de coleta
```

### 📁 **Utils** - Utilitários

```
app/utils/
├── text.ts                 # Utilitários de texto
└── utils.ts                # Utilitários gerais (cn function)
```

## Adaptações Realizadas

### 1. **Pontos de Coleta como "Produtos"**

- A funcionalidade de pontos de coleta foi adaptada para funcionar como "produtos"
- Mantida toda a lógica existente
- Adicionada página de detalhes individual

### 2. **Estrutura de Autenticação**

- Login e registro movidos para grupo (auth)
- Layout específico para telas de autenticação

### 3. **Dashboard Reorganizado**

- Todas as páginas autenticadas movidas para grupo (dashboard)
- Mantida funcionalidade existente
- Adicionadas páginas de configurações

### 4. **APIs e Serviços Reorganizados**

- APIs separadas por domínio em `lib/api/`
- Schemas de validação organizados em `lib/schemas/`
- Serviços externos em `lib/services/`
- Configuração de banco movida para `lib/`

### 5. **Componentes Organizados**

- Separação clara entre UI, layout e features
- Componentes específicos em `_components/`
- Componentes reutilizáveis em `components/`

## Benefícios da Nova Estrutura

1. **Organização**: Separação clara entre áreas públicas e privadas
2. **Manutenibilidade**: Código mais organizado e fácil de manter
3. **Escalabilidade**: Estrutura preparada para crescimento
4. **Performance**: Layouts específicos para cada contexto
5. **SEO**: Melhor controle sobre metadados por seção
6. **Reutilização**: Componentes e utilitários bem organizados
7. **Tipagem**: Tipos TypeScript bem estruturados

## Próximos Passos

1. Atualizar links de navegação para as novas rotas
2. Implementar middleware de autenticação
3. Adicionar mais APIs conforme necessário
4. Expandir funcionalidades do dashboard
5. Implementar testes para a nova estrutura
