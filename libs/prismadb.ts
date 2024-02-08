import { PrismaClient } from "@prisma/client";

//The declare global syntax in TypeScript is used to declare global variables that can be accessed throughout the entire project. In the context given, this is being used to declare a global variable named prisma that can either be an instance of PrismaClient or undefined.
declare global {
  //This block is a TypeScript declaration that informs the TypeScript compiler about a global variable named prisma of type PrismaClient | undefined. This doesn't actually create an instance of PrismaClient; it just tells TypeScript about the existence and type of the variable.
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient(); //globalThis is a standard built-in object that provides a way to access the global scope (the global object) across different environments, such as browsers, Node.js, and Web Workers. You do not need to declare globalThis yourself; it is already available for you to use in the global scope.

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
//The reason for only assigning PrismaClient to globalThis in non-production environments is due to the different nature of application reloads and database connection management during development vs. production.

// In a development environment, especially when using frameworks like Next.js, the application server might be restarted frequently due to hot reloading. Each time the server restarts, it could potentially instantiate a new PrismaClient. Since each PrismaClient instance maintains its own connection pool to the database, this can quickly lead to a large number of open connections, which can exhaust the database's allowed connections limit. To prevent this, the existing PrismaClient instance is stored in globalThis so it can be reused across reloads, as mentioned in 3.

// In production, however, the server does not restart on each change, and there is typically a more controlled deployment process. The application does not undergo the same frequent reloading process, so there's less risk of opening too many database connections. Therefore, each serverless function invocation can safely instantiate its own PrismaClient without worrying about exhausting database connections. This isolation ensures that each function execution has a fresh instance, which can help prevent issues related to connection state or pooling that might occur if the instance were shared. This production behavior is reflected in the check if (process.env.NODE_ENV !== "production"), ensuring that the reuse of PrismaClient instances is limited to development environments as stated in
export default client;
