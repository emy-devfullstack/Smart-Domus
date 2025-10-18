# Casa Inteligente - Automação Residencial 🏠

App PWA (Progressive Web App) para controle de automação residencial.

## 🌟 Funcionalidades

- **Controle de Iluminação**: Liga/desliga e ajusta a intensidade das luzes
- **Teto Retrátil**: Controle em 3 estados (Fechado, Meio Aberto, Aberto)
- **Configurações**: Tema claro/escuro, preferências de usuário
- **PWA**: Instalável no celular como um app nativo
- **Offline**: Funciona sem conexão com internet
- **Responsivo**: Design otimizado para mobile

## 📱 Como Instalar no Celular

### iPhone (Safari)
1. Abra o app no Safari
2. Toque no botão de compartilhar (quadrado com seta)
3. Role para baixo e selecione "Adicionar à Tela de Início"
4. Toque em "Adicionar"

### Android (Chrome)
1. Abra o app no Chrome
2. Toque no menu (três pontos no canto superior)
3. Selecione "Adicionar à tela inicial" ou "Instalar app"
4. Toque em "Adicionar"

Ou acesse a página `/install` no app para ver instruções detalhadas.

## 🚀 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 🛠 Tecnologias

- React 18 + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- React Router
- Vite PWA Plugin
- Lucide React (ícones)

## 🎨 Design System

O app utiliza um design system baseado em:
- Cores: Azul tecnológico (#3B82F6) e roxo (#8B5CF6)
- Gradientes suaves
- Animações fluidas
- Tema claro/escuro automático
- Tokens CSS para consistência

## 📂 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   ├── ui/           # Componentes UI (shadcn)
│   ├── ControlCard.tsx
│   └── PageHeader.tsx
├── pages/            # Páginas/rotas
│   ├── Index.tsx     # Tela principal
│   ├── Lighting.tsx  # Controle de iluminação
│   ├── Ceiling.tsx   # Controle do teto
│   ├── Settings.tsx  # Configurações
│   └── Install.tsx   # Instruções de instalação
├── lib/              # Utilitários
└── hooks/            # React hooks customizados
```

## 🌐 Deploy

O projeto pode ser facilmente deployado em:
- Vercel
- Netlify
- GitHub Pages
- Lovable (recomendado)

Basta fazer o build (`npm run build`) e fazer deploy da pasta `dist`.

## 📝 URL do Projeto

**Lovable**: https://lovable.dev/projects/27adb223-a3e9-4567-91d4-3e9bf622490a

## 🔐 Licença

Este é um projeto de automação residencial pessoal.
