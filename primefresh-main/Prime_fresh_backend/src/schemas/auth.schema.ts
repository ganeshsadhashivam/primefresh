import { object, string, TypeOf, z } from 'zod';
export const loginUserSchema = object({
  body: object({
    uid: string({
      required_error: 'uid is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});


  export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];