import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tech Academy API",
      version: "1.0.0",
      description: "Documentação da API do projeto Tech Academy",
    },
  },
  apis: ["openapi.yaml", "./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;