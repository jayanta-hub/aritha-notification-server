import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UsersCustomValidation = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToRpc().getData().body;
    console.log('🚀 ~ request:', request.userType);
    return validateRequest(request.userType);
  },
);
function validateRequest(userType) {
  switch (userType) {
    case 'SUPERADMIN':
      return 'smdcs';
    case 'ORGADMIN':
      return 'sld';
    case 'ORGUSER':
      return 'skdc';
    default:
      return new Error('Invalid request');
  }
}
