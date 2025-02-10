// src/types/express.d.ts

declare global {
    namespace Express {
      interface user1 {
        idUserToken: number;
        idlojaToken: number;
        permissoesToken: string[]; // Array de permissões
      }
  
       interface user {
         user?: user1; // Adiciona o campo `user` ao objeto Request
       }
    }
  }
  
  export {}; // Necessário para transformar o arquivo em um módulo e evitar conflitos.
  