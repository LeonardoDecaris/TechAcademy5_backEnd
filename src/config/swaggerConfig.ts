import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tech Academy 5",
      version: "1.0.0",
      description: "Documentação HarmonicSounds/Tech Academy 5",
    },
  },
  apis: ["openapi.yaml", "./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;