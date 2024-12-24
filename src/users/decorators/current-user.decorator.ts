import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //s
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
