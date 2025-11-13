export const palette = {
  // Fundo geral da aplicação
  background: {
    primary: '#000000', // Fundo absoluto
    secondary: '#0B0B0B', // Fundo de containers grandes
    tertiary: '#131313', // Superfícies internas (cards, seções)
  },

  // Superfícies e containers
  surface: {
    primary: '#141414', // Cards principais, blocos de conteúdo
    secondary: '#1E1E1E', // Inputs, botões secundários, modal backgrounds
    tertiary:"#C2ACFC",
    border: '#2E2E2E', // Bordas sutis, linhas divisórias
  },

  // Texto
  text: {
    primary: '#FFFFFF', // Texto principal (títulos, corpo)
    secondary: '#A6A6A6', // Texto secundário (labels, subtítulos)
    tertiary: '#6E6E6E', // Texto de apoio / desabilitado
    placeholder: '#5C5C5C', // Placeholders de input
  },

  // Estados e feedback (tons acinzentados com nuance para contraste)
  states: {
    success: '#B8B8B8', // Leve destaque (sem cor vibrante)
    warning: '#999999',
    error: '#d20f39',
    info: '#AAAAAA',
  },

  // Botões e interações
  button: {
    primary: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      hover: '#2A2A2A',
      disabled: '#111111',
    },
    secondary: {
      background: '#131313',
      text: '#FFFFFF',
      hover: '#1E1E1E',
      disabled: '#0D0D0D',
    },
    ghost: {
      background: 'transparent',
      text: '#FFFFFF',
      hoverBackground: '#1A1A1A',
      disabled: '#0F0F0F',
    },
  },

  // Sombras / elevação
  shadow: {
    low: '0px 4px 12px rgba(0, 0, 0, 0.45)',
    medium: '0px 8px 24px rgba(0, 0, 0, 0.55)',
    high: '0px 16px 32px rgba(0, 0, 0, 0.65)',
  },
};
