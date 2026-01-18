/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import { Link, useFetcher, useNavigate } from 'react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, LoaderCircleIcon } from 'lucide-react';

/**
 * Custom modules
 */
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputPassword } from '@/components/InputPassword';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

/**
 * Assets
 */
import { signupBanner } from '@/assets';

/**
 * Types
 */
import type {
  ActionResponse,
  AuthResponse,
  ErrorResponse,
  ValidationError,
} from '@/types';
type SignupField = 'email' | 'password' | 'role';

/**
 * Constants
 */
const SIGNUP_FORM = {
  title: 'Create an account',
  description: 'Enter your email below to create an account',
  footerText: 'Already have an account?',
} as const;

/**
 * Signup form schema
 */
const formSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .max(50, 'Email must be less than 50 characters')
    .email('Invalid email address'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['user', 'admin']),
});

export const SignupForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const signupResponse = fetcher.data as ActionResponse<AuthResponse>;

  const isLoading = fetcher.state !== 'idle';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'user',
    },
  });

  useEffect(() => {
    if (!signupResponse) return;

    if (signupResponse.ok) {
      navigate('/', { viewTransition: true });
      return;
    }

    if (!signupResponse.err) return;

    if (signupResponse.err.code === 'AuthorizationError') {
      const authorizationError = signupResponse.err as ErrorResponse;
      toast.error(authorizationError.message, { position: 'top-center' });
    }

    if (signupResponse.err.code === 'ValidationError') {
      const validationErrors = signupResponse.err as ValidationError;
      Object.entries(validationErrors.errors).forEach((value) => {
        const [, validationError] = value;
        const signupField = validationError.path as SignupField;

        form.setError(
          signupField,
          { type: 'custom', message: validationError.msg },
          { shouldFocus: true },
        );
      });
    }
  }, [signupResponse]);

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    await fetcher.submit(values, {
      action: '/signup',
      method: 'post',
      encType: 'application/json',
    });
  }, []);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {/* Return Home Button */}
      <Link 
        to="/" 
        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-orange-600 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <Card className='overflow-hidden p-0 shadow-xl border-border/50'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form
              className='p-6 md:p-8'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-bold tracking-tight'>
                    {SIGNUP_FORM.title}
                  </h1>
                  <p className='text-muted-foreground text-balance'>
                    {SIGNUP_FORM.description}
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel>Register as</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className='grid grid-cols-2 gap-0 border border-input rounded-xl p-1'
                        >
                          <Label className='h-9 w-full grid place-items-center rounded-lg cursor-pointer text-muted-foreground hover:text-foreground has-checked:bg-orange-600 has-checked:text-white transition-all'>
                            <RadioGroupItem value='user' className='sr-only' />
                            User
                          </Label>
                          <Label className='h-9 w-full grid place-items-center rounded-lg cursor-pointer text-muted-foreground hover:text-foreground has-checked:bg-orange-600 has-checked:text-white transition-all'>
                            <RadioGroupItem value='admin' className='sr-only' />
                            Admin
                          </Label>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='john@example.com'
                          className="h-11 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <InputPassword
                          placeholder='Enter your password'
                          className="h-11 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full h-11 rounded-xl bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all active:scale-[0.98]'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoaderCircleIcon className='animate-spin' />
                  ) : (
                    <span>Create Account</span>
                  )}
                </Button>
              </div>

              <div className='mt-6 text-center text-sm'>
                {SIGNUP_FORM.footerText}{' '}
                <Link
                  to='/login'
                  className='font-semibold text-orange-600 underline underline-offset-4 hover:text-orange-700'
                  viewTransition
                >
                  Login
                </Link>
              </div>
            </form>
          </Form>

          <figure className='bg-muted relative hidden md:block'>
            <img
              src={signupBanner}
              alt='Signup banner'
              className='absolute inset-0 w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500'
            />
            <div className="absolute inset-0 bg-orange-600/10" />
          </figure>
        </CardContent>
      </Card>

      <div className='text-muted-foreground text-center text-xs text-balance'>
        By clicking continue, you agree to our <a href='#' className="underline underline-offset-4 hover:text-orange-600">Terms of Service</a>{' '}
        and <a href='#' className="underline underline-offset-4 hover:text-orange-600">Privacy Policy</a>.
      </div>
    </div>
  );
};