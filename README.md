# ListManager - Gerenciador de Lista

> Frontend desenvolvido em [Next.js](https://nextjs.org) para a disciplina de **Fundamentos de DevOps**

Este projeto é o frontend de uma aplicação de gerenciamento de tarefas, desenvolvido como trabalho prático para aplicar conceitos de DevOps, controle de versão e boas práticas de desenvolvimento.

## 📋 Sobre o Projeto

O ListManager é uma Landing Page moderna e responsiva que apresenta um produto de gerenciamento de listas. O frontend foi construído com tecnologias modernas como Next.js 16, React 19 e Tailwind CSS, seguindo as melhores práticas de desenvolvimento e padrões de controle de versão.

## 🚀 Como Começar

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repo>
cd my-app
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse [http://localhost:3000](http://localhost:3000) para visualizar o projeto

### Comandos Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
```

## 📝 Padrões de Desenvolvimento

### Conventional Commits

Este projeto segue a convenção de commits padronizada para manter um histórico claro e organizado. Cada commit deve seguir o seguinte padrão:

```
<tipo>(<escopo>): <descrição>
```

#### Tipos de Commit

- **feat**: Para novas funcionalidades ou melhorias
  - Exemplo: `feat(navbar): adicionar menu responsivo`

- **fix**: Para correções de bugs
  - Exemplo: `fix(hero): corrigir espaçamento do título`

- **chore**: Para tarefas de manutenção ou refatoração
  - Exemplo: `chore: atualizar dependências`

- **docs**: Para alterações na documentação
  - Exemplo: `docs: atualizar README com instruções`

- **style**: Para alterações de estilo ou formatação
  - Exemplo: `style: formatar código com prettier`

- **refactor**: Para refatorações de código
  - Exemplo: `refactor: simplificar lógica do componente`

- **test**: Para adições ou alterações em testes
  - Exemplo: `test: adicionar testes unitários`

- **ci**: Para alterações em configurações de CI/CD
  - Exemplo: `ci: configurar GitHub Actions`

### Padrão de Branches

O projeto utiliza o seguinte padrão de branches:

| Branch | Propósito |
|--------|-----------|
| `master` | Branch principal - código pronto para produção |
| `develop` | Branch de desenvolvimento - testes e integração |
| `feature/<nome-da-feature>` | Branches para novas funcionalidades |
| `fix/<nome-do-fix>` | Branches para correção de bugs |

#### Fluxo de Branches

1. **Novas funcionalidades**: Crie a partir de `develop` com `feature/nome-da-feature`
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/minha-nova-feature
   ```

2. **Correção de bugs**: Crie a partir de `develop` com `fix/nome-do-fix`
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b fix/corrigir-bug
   ```

3. **Merge em develop**: Após conclusão, crie um Pull Request para merge em `develop`

4. **Merge em master**: Apenas código testado e aprovado em `develop` vai para `master`

## 🛠️ Stack Tecnológico

- **Next.js 16.1.6** - Framework React com SSR
- **React 19.2.3** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Lucide React** - Ícones

## 📚 Recursos Adicionais

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

## 📄 Licença

Este projeto é desenvolvido para fins educacionais na disciplina de Fundamentos de DevOps.
