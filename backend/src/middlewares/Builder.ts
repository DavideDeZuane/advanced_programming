import { Request, Response, NextFunction, RequestHandler } from 'express';

// Interfaccia per il builder di middleware
interface MiddlewareBuilder {
  use(middleware: RequestHandler): MiddlewareBuilder;
  build(): RequestHandler;
}

// Implementazione del builder di middleware
class MiddlewareChainBuilder implements MiddlewareBuilder {
  private middlewareChain: RequestHandler[];

  constructor() {
    this.middlewareChain = [];
  }

  use(middleware: RequestHandler): MiddlewareBuilder {
    this.middlewareChain.push(middleware);
    return this;
  }

  build(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      this.middlewareChain.forEach((middleware) => {
        middleware(req, res, next);
      });
    };
  }
}

export default MiddlewareChainBuilder;