import * as z from 'zod';

export const SigninSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Email is invalid',
    }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export const SignupSchema = z.object({
  name: z.string().min(1, {
    message: 'Username is required'
  }).max(10, { message: 'User name is too long' }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Email is invalid',
    }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  userPhoto: z.string(),
  assessToken: z.string(),
  refreshToken: z.string(),
  subId: z.string(),
})

export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  userPhoto: z.string(),
  assessToken: z.string(),
  refreshToken: z.string(),
  subId: z.string(),
})


export const PostSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  detail: z.string().min(1, { message: 'Detail is required' }).max(3000),
  post_id: z.string().optional()
})

export const CommentSchema = z.object({
  content: z.string().min(1, { message: 'Content is required' }),
  comment_id: z.string().optional()
})